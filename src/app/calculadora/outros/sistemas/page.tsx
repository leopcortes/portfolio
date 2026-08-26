"use client";

import { SquareSigma } from "lucide-react";
import { type FormEvent, useState } from "react";

import BotaoCalcular from "~/components/calculadora/BotaoCalcular";
import BotaoSecundario from "~/components/calculadora/BotaoSecundario";
import PainelResultado from "~/components/calculadora/PainelResultado";
import TelaCalculadora from "~/components/calculadora/TelaCalculadora";
import { Input } from "~/components/ui/input";
import { formatarResultado, parsearNumero } from "~/lib/calculadora/conversao";
import { resolverSistema, VARIAVEIS } from "~/lib/calculadora/sistemaLinear";

const EQUACOES = [0, 1, 2];
const COLUNAS = [0, 1, 2, 3];

const CLASSES_COEFICIENTE =
  "h-11 w-full min-w-0 rounded-md border-none bg-calc_campo px-2 text-center text-base tabular-nums text-texto_principal placeholder:text-white/30 focus-visible:ring-white/40 focus-visible:ring-offset-calc_superficie md:text-base";

function vazio(): string[][] {
  return EQUACOES.map(() => COLUNAS.map(() => ""));
}

/** Célula em branco vale zero, como um coeficiente ausente na equação escrita. */
function lerCoeficiente(texto: string): number | null {
  if (texto.trim() === "") return 0;
  return parsearNumero(texto);
}

export default function CalculadoraSistemas() {
  const [celulas, setCelulas] = useState<string[][]>(vazio);
  const [resultado, setResultado] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  function alterar(equacao: number, coluna: number, valor: string) {
    setCelulas((atual) =>
      atual.map((linha, i) =>
        i === equacao ? linha.map((c, j) => (j === coluna ? valor : c)) : linha,
      ),
    );
    setResultado(null);
    setErro(null);
  }

  function calcular(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const numeros: number[][] = [];
    for (const linha of celulas) {
      const convertida: number[] = [];
      for (const celula of linha) {
        const valor = lerCoeficiente(celula);
        if (valor === null) {
          setResultado(null);
          setErro("Todos os coeficientes devem ser números.");
          return;
        }
        convertida.push(valor);
      }
      numeros.push(convertida);
    }

    const solucao = resolverSistema(numeros);

    if (solucao.tipo === "vazio") {
      setResultado(null);
      setErro("Preencha ao menos uma equação.");
      return;
    }

    setErro(null);

    if (solucao.tipo === "impossivel") {
      setResultado("O sistema não tem solução.");
      return;
    }
    if (solucao.tipo === "indeterminado") {
      setResultado("O sistema tem infinitas soluções.");
      return;
    }

    // Só as incógnitas que aparecem no que foi preenchido; `+ 0` troca por 0 o -0
    // que a eliminação às vezes produz.
    setResultado(
      solucao.valores
        .map(
          ({ variavel, valor }) =>
            `${variavel} = ${formatarResultado(valor + 0)}`,
        )
        .join("   "),
    );
  }

  return (
    <TelaCalculadora titulo="Sistemas de Equações" icone={SquareSigma}>
      <form onSubmit={calcular} noValidate className="flex flex-col gap-4">
        <div className="flex flex-col gap-2.5">
          {EQUACOES.map((equacao) => (
            <div key={equacao} className="flex items-center gap-1 sm:gap-2">
              {COLUNAS.map((coluna) => (
                <div
                  key={coluna}
                  className="flex min-w-0 flex-1 items-center gap-1 sm:gap-2"
                >
                  <Input
                    value={celulas[equacao]?.[coluna] ?? ""}
                    onChange={(evento) =>
                      alterar(equacao, coluna, evento.target.value)
                    }
                    inputMode="decimal"
                    autoComplete="off"
                    placeholder="0"
                    aria-label={
                      coluna === 3
                        ? `Termo independente da equação ${equacao + 1}`
                        : `Coeficiente de ${VARIAVEIS[coluna]} na equação ${equacao + 1}`
                    }
                    className={CLASSES_COEFICIENTE}
                  />

                  {coluna < 3 && (
                    <span
                      aria-hidden
                      className="shrink-0 whitespace-nowrap text-sm text-white/60 sm:text-base"
                    >
                      <i className="not-italic text-texto_principal">
                        {VARIAVEIS[coluna]}
                      </i>
                      {coluna === 2 ? " =" : " +"}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <BotaoCalcular className="grow sm:grow-0" />
          <BotaoSecundario
            aoClicar={() => {
              setCelulas(vazio());
              setResultado(null);
              setErro(null);
            }}
            className="grow sm:grow-0"
          >
            Limpar
          </BotaoSecundario>
        </div>

        <PainelResultado erro={erro}>
          {resultado && (
            <p className="border-t border-calc_campo pt-4 text-xl font-bold tabular-nums">
              {resultado}
            </p>
          )}
        </PainelResultado>
      </form>
    </TelaCalculadora>
  );
}
