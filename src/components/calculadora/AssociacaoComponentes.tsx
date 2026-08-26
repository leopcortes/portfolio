"use client";

import { Plus, X } from "lucide-react";
import Image from "next/image";
import { type FormEvent, useId, useState } from "react";

import BotaoCalcular from "~/components/calculadora/BotaoCalcular";
import PainelResultado from "~/components/calculadora/PainelResultado";
import TelaCalculadora from "~/components/calculadora/TelaCalculadora";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  type ConfigAssociacao,
  equivalente,
  formula,
  type Ligacao,
  somaNaLigacao,
} from "~/lib/calculadora/associacao";
import { parsearNumero } from "~/lib/calculadora/conversao";
import { formatarComPrefixo } from "~/lib/calculadora/prefixoSI";
import { cn } from "~/lib/utils";

const MINIMO = 2;
const MAXIMO = 10;
const INICIAIS = 3;

type Componente = { chave: number; valor: string; unidade: string };

const LIGACOES: { id: Ligacao; rotulo: string }[] = [
  { id: "serie", rotulo: "Série" },
  { id: "paralelo", rotulo: "Paralelo" },
];

/**
 * Base das três telas de associação. A lista de componentes é compartilhada pelas
 * duas abas de propósito: o projeto original pedia os mesmos valores duas vezes,
 * uma para série e outra para paralelo, e alternar a aba aqui já recalcula.
 */
export default function AssociacaoComponentes({
  config,
}: {
  config: ConfigAssociacao;
}) {
  const prefixo = useId();
  const [ligacao, setLigacao] = useState<Ligacao>("serie");
  const [componentes, setComponentes] = useState<Componente[]>(() =>
    Array.from({ length: INICIAIS }, (_, indice) => ({
      chave: indice,
      valor: "",
      unidade: config.unidadePadrao,
    })),
  );
  const [calculado, setCalculado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const diagrama =
    ligacao === "serie" ? config.imagemSerie : config.imagemParalelo;

  function invalidar() {
    setCalculado(false);
    setErro(null);
  }

  function alterar(chave: number, mudanca: Partial<Componente>) {
    setComponentes((atual) =>
      atual.map((item) =>
        item.chave === chave ? { ...item, ...mudanca } : item,
      ),
    );
    invalidar();
  }

  function adicionar() {
    setComponentes((atual) =>
      atual.length >= MAXIMO
        ? atual
        : [
            ...atual,
            {
              chave: Math.max(...atual.map((item) => item.chave)) + 1,
              valor: "",
              unidade: config.unidadePadrao,
            },
          ],
    );
    invalidar();
  }

  function remover(chave: number) {
    setComponentes((atual) =>
      atual.length <= MINIMO
        ? atual
        : atual.filter((item) => item.chave !== chave),
    );
    invalidar();
  }

  /** Converte cada linha para a unidade base; texto inválido derruba o cálculo. */
  function valoresNaBase(): number[] | null {
    const valores: number[] = [];

    for (const componente of componentes) {
      if (componente.valor.trim() === "") continue;

      const numero = parsearNumero(componente.valor);
      const unidade = config.unidades.find((u) => u.id === componente.unidade);
      if (numero === null || !unidade) return null;

      valores.push(numero * unidade.fator);
    }

    return valores;
  }

  function calcular(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const valores = valoresNaBase();
    if (valores === null) {
      setCalculado(false);
      setErro("Os valores devem ser números.");
      return;
    }
    if (equivalente(valores, true) === null) {
      setCalculado(false);
      setErro("Informe ao menos um valor maior que zero.");
      return;
    }

    setErro(null);
    setCalculado(true);
  }

  const valores = valoresNaBase();
  const resultado =
    calculado && valores
      ? equivalente(valores, somaNaLigacao(config, ligacao))
      : null;

  return (
    <TelaCalculadora
      titulo={`Associação de ${config.titulo}`}
      icone={config.icone}
    >
      <div role="tablist" aria-label="Tipo de ligação" className="flex gap-1.5">
        {LIGACOES.map((opcao) => (
          <button
            key={opcao.id}
            role="tab"
            type="button"
            aria-selected={ligacao === opcao.id}
            aria-controls={`${prefixo}-painel`}
            onClick={() => setLigacao(opcao.id)}
            className={cn(
              "flex-1 rounded-lg px-4 py-2 text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-calc_superficie motion-reduce:transition-none",
              ligacao === opcao.id
                ? "bg-calc_acento text-texto_principal"
                : "bg-calc_campo text-white/60 hover:bg-white/10 hover:text-texto_principal",
            )}
          >
            {opcao.rotulo}
          </button>
        ))}
      </div>

      <div
        id={`${prefixo}-painel`}
        role="tabpanel"
        className="flex flex-col gap-4"
      >
        {/* O diagrama é linha preta sobre branco; invertido, vira linha branca e
            encaixa no tema escuro sem precisar reexportar as imagens. */}
        <div className="flex flex-col items-center gap-3 rounded-lg bg-black px-4 py-4">
          <Image
            src={diagrama.src}
            alt={`Diagrama de ${config.titulo.toLowerCase()} em ${ligacao}`}
            width={diagrama.largura}
            height={diagrama.altura}
            className="h-auto w-full max-w-sm invert"
          />
          <p className="text-center text-sm tabular-nums text-white/60">
            {formula(config, ligacao)}
          </p>
        </div>

        <form onSubmit={calcular} noValidate className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            {componentes.map((componente, indice) => (
              <div key={componente.chave} className="flex items-center gap-2">
                <span className="w-8 shrink-0 text-sm tabular-nums text-white/50">
                  {config.simbolo}
                  {indice + 1}
                </span>

                <Input
                  value={componente.valor}
                  onChange={(evento) =>
                    alterar(componente.chave, { valor: evento.target.value })
                  }
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder="0"
                  aria-label={`Valor de ${config.simbolo}${indice + 1}`}
                  className="h-11 min-w-0 flex-1 rounded-md border-none bg-calc_campo px-3 text-base tabular-nums text-texto_principal placeholder:text-white/30 focus-visible:ring-white/40 focus-visible:ring-offset-calc_superficie md:text-base"
                />

                <Select
                  value={componente.unidade}
                  onValueChange={(unidade) =>
                    alterar(componente.chave, { unidade })
                  }
                >
                  <SelectTrigger
                    aria-label={`Unidade de ${config.simbolo}${indice + 1}`}
                    className="h-11 w-20 shrink-0 border-none bg-calc_campo text-base text-texto_principal focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-calc_superficie sm:w-24"
                  >
                    {/* Só o símbolo: o nome por extenso não cabe no gatilho e era
                        truncado para "µF…". A lista abaixo mantém o nome completo. */}
                    <SelectValue>
                      {
                        config.unidades.find((u) => u.id === componente.unidade)
                          ?.simbolo
                      }
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent className="border-none bg-calc_campo font-lexend font-light text-texto_principal">
                    {config.unidades.map((unidade) => (
                      <SelectItem
                        key={unidade.id}
                        value={unidade.id}
                        className="text-base focus:bg-white/10 focus:text-texto_principal"
                      >
                        {unidade.rotulo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <button
                  type="button"
                  onClick={() => remover(componente.chave)}
                  disabled={componentes.length <= MINIMO}
                  aria-label={`Remover ${config.simbolo}${indice + 1}`}
                  className="flex size-9 shrink-0 items-center justify-center rounded-md text-white/40 transition-colors hover:bg-white/10 hover:text-texto_principal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:pointer-events-none disabled:opacity-30 motion-reduce:transition-none"
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={adicionar}
            disabled={componentes.length >= MAXIMO}
            className="flex w-fit items-center gap-1.5 rounded-md text-sm text-white/60 transition-colors hover:text-texto_principal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-calc_superficie disabled:pointer-events-none disabled:opacity-30 motion-reduce:transition-none"
          >
            <Plus className="size-4" />
            Adicionar componente
          </button>

          <BotaoCalcular className="mt-1 w-full sm:w-fit" />

          <PainelResultado erro={erro}>
            {resultado !== null && (
              <p className="flex flex-wrap items-baseline gap-x-3 border-t border-calc_campo pt-4 text-lg">
                {config.grandeza}:
                <span className="text-2xl font-bold tabular-nums">
                  {formatarComPrefixo(resultado, config.unidadeBase)}
                </span>
              </p>
            )}
          </PainelResultado>
        </form>
      </div>
    </TelaCalculadora>
  );
}
