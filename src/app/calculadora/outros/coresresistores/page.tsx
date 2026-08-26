"use client";

import { Paintbrush } from "lucide-react";
import { type FormEvent, useState } from "react";

import BotaoCalcular from "~/components/calculadora/BotaoCalcular";
import PainelResultado from "~/components/calculadora/PainelResultado";
import TelaCalculadora from "~/components/calculadora/TelaCalculadora";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  COR_CORPO,
  COR_TERMINAL,
  DIGITOS,
  type Faixa,
  MULTIPLICADORES,
  resistencia,
  TOLERANCIAS,
} from "~/lib/calculadora/coresResistor";
import { formatarComPrefixo } from "~/lib/calculadora/prefixoSI";

const NENHUMA = "nenhuma";

type Selecao = {
  primeiro: string;
  segundo: string;
  multiplicador: string;
  tolerancia: string;
};

const INICIAL: Selecao = {
  primeiro: NENHUMA,
  segundo: NENHUMA,
  multiplicador: NENHUMA,
  tolerancia: NENHUMA,
};

function acharFaixa<T extends Faixa>(lista: T[], id: string): T | undefined {
  return lista.find((faixa) => faixa.id === id);
}

function SeletorCor({
  rotulo,
  opcoes,
  valor,
  aoMudar,
}: {
  rotulo: string;
  opcoes: { id: string; nome: string; hex: string; detalhe: string }[];
  valor: string;
  aoMudar: (id: string) => void;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <span className="text-sm text-white/50">{rotulo}</span>

      <Select value={valor} onValueChange={aoMudar}>
        <SelectTrigger
          aria-label={rotulo}
          className="h-11 w-full border-none bg-calc_campo text-base text-texto_principal focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-calc_superficie"
        >
          <SelectValue />
        </SelectTrigger>

        <SelectContent className="max-h-72 border-none bg-calc_campo font-lexend font-light text-texto_principal">
          <SelectItem
            value={NENHUMA}
            className="text-base focus:bg-white/10 focus:text-texto_principal"
          >
            Selecione uma cor
          </SelectItem>

          {opcoes.map((opcao) => (
            <SelectItem
              key={opcao.id}
              value={opcao.id}
              className="text-base focus:bg-white/10 focus:text-texto_principal"
            >
              <span className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="size-3.5 shrink-0 rounded-full border border-white/25"
                  style={{ backgroundColor: opcao.hex }}
                />
                {opcao.nome} ({opcao.detalhe})
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

/** Posição de cada faixa no corpo: três juntas à esquerda, tolerância isolada à direita. */
const POSICOES = [95, 133, 171, 285];

function DesenhoResistor({ cores }: { cores: (string | null)[] }) {
  return (
    <svg
      viewBox="0 0 400 120"
      role="img"
      aria-label="Resistor com as faixas de cores selecionadas"
      className="h-auto w-full"
    >
      <line
        x1="0"
        y1="60"
        x2="80"
        y2="60"
        stroke={COR_TERMINAL}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <line
        x1="320"
        y1="60"
        x2="400"
        y2="60"
        stroke={COR_TERMINAL}
        strokeWidth="7"
        strokeLinecap="round"
      />

      <rect x="70" y="22" width="260" height="76" rx="20" fill={COR_CORPO} />

      {POSICOES.map((x, indice) => (
        <rect
          key={x}
          x={x}
          y="22"
          width="24"
          height="76"
          fill={cores[indice] ?? COR_CORPO}
        />
      ))}
    </svg>
  );
}

export default function CoresResistores() {
  const [selecao, setSelecao] = useState<Selecao>(INICIAL);
  const [aplicada, setAplicada] = useState<Selecao | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  function trocar(campo: keyof Selecao) {
    return (id: string) => {
      setSelecao((atual) => ({ ...atual, [campo]: id }));
      setAplicada(null);
      setErro(null);
    };
  }

  function calcular(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const primeiro = acharFaixa(DIGITOS, selecao.primeiro);
    const segundo = acharFaixa(DIGITOS, selecao.segundo);
    const multiplicador = acharFaixa(MULTIPLICADORES, selecao.multiplicador);

    if (!primeiro || !segundo || !multiplicador) {
      setAplicada(null);
      setErro("Escolha as cores das faixas 1, 2 e do multiplicador.");
      return;
    }

    setErro(null);
    setAplicada(selecao);
  }

  const mostrada = aplicada ?? INICIAL;
  const primeiro = acharFaixa(DIGITOS, mostrada.primeiro);
  const segundo = acharFaixa(DIGITOS, mostrada.segundo);
  const multiplicador = acharFaixa(MULTIPLICADORES, mostrada.multiplicador);
  const tolerancia = acharFaixa(TOLERANCIAS, mostrada.tolerancia);

  const valor =
    primeiro && segundo && multiplicador
      ? formatarComPrefixo(resistencia(primeiro, segundo, multiplicador), "Ω")
      : null;

  return (
    <TelaCalculadora titulo="Código de Cores" icone={Paintbrush}>
      <form onSubmit={calcular} noValidate className="flex flex-col gap-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <SeletorCor
            rotulo="Faixa 1"
            opcoes={DIGITOS.map((cor) => ({
              ...cor,
              detalhe: String(cor.digito),
            }))}
            valor={selecao.primeiro}
            aoMudar={trocar("primeiro")}
          />
          <SeletorCor
            rotulo="Faixa 2"
            opcoes={DIGITOS.map((cor) => ({
              ...cor,
              detalhe: String(cor.digito),
            }))}
            valor={selecao.segundo}
            aoMudar={trocar("segundo")}
          />
          <SeletorCor
            rotulo="Faixa 3 (multiplicador)"
            opcoes={MULTIPLICADORES.map((cor) => ({
              ...cor,
              detalhe: cor.rotuloFator,
            }))}
            valor={selecao.multiplicador}
            aoMudar={trocar("multiplicador")}
          />
          <SeletorCor
            rotulo="Faixa 4 (tolerância)"
            opcoes={TOLERANCIAS.map((cor) => ({
              ...cor,
              detalhe: cor.tolerancia,
            }))}
            valor={selecao.tolerancia}
            aoMudar={trocar("tolerancia")}
          />
        </div>

        <div className="rounded-lg bg-calc_campo px-4 py-6 sm:px-8">
          <DesenhoResistor
            cores={[
              primeiro?.hex ?? null,
              segundo?.hex ?? null,
              multiplicador?.hex ?? null,
              tolerancia?.hex ?? null,
            ]}
          />
        </div>

        <BotaoCalcular className="w-full sm:w-fit" />

        <PainelResultado erro={erro}>
          {valor && (
            <p className="flex flex-wrap items-baseline gap-x-3 border-t border-calc_campo pt-4 text-xl">
              Resistor de
              <span className="text-2xl font-bold tabular-nums">{valor}</span>
              {tolerancia && (
                <span className="text-base text-white/60">
                  {tolerancia.tolerancia}
                </span>
              )}
            </p>
          )}
        </PainelResultado>
      </form>
    </TelaCalculadora>
  );
}
