"use client";

import { Equal } from "lucide-react";
import { type FormEvent, useId, useState } from "react";

import { Input } from "~/components/ui/input";
import {
  converter,
  formatarResultado,
  parsearNumero,
} from "~/lib/calculadora/conversao";
import { acharUnidade, type GrupoUnidades } from "~/lib/calculadora/unidades";
import { cn } from "~/lib/utils";
import BotaoCalcular from "./BotaoCalcular";
import SeletorUnidade from "./SeletorUnidade";
import TabelaConversoes from "./TabelaConversoes";
import TelaCalculadora from "./TelaCalculadora";

const CLASSES_CAMPO =
  "h-11 w-full rounded-md border-none bg-calc_campo px-3 text-base tabular-nums text-texto_principal md:text-base";

const CLASSES_ROTULO = "text-sm text-white/50";

/**
 * Padrão único das nove calculadoras de conversão. Cada página só escolhe o grupo
 * de unidades; o layout, o cálculo e a tabela de referência vivem aqui.
 *
 * A ordem dos elementos no DOM é a ordem empilhada do celular; a partir de `sm` o
 * posicionamento explícito no grid remonta as duas colunas com o "=" no meio, sem
 * precisar duplicar marcação.
 */
export default function ConversorUnidades({ grupo }: { grupo: GrupoUnidades }) {
  const prefixo = useId();
  const idFormulario = `${prefixo}-form`;
  const idValor = `${prefixo}-valor`;
  const idErro = `${prefixo}-erro`;

  const [valor, setValor] = useState("");
  const [idEntrada, setIdEntrada] = useState(grupo.padraoEntrada);
  const [idSaida, setIdSaida] = useState(grupo.padraoSaida);
  const [resultado, setResultado] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const unidadeSaida = acharUnidade(grupo, idSaida);

  // Mudar qualquer campo invalida o que está na tela: sem isto o número exibido
  // continuaria se referindo a unidades que o usuário já trocou.
  function descartarResultado() {
    setResultado(null);
    setErro(null);
  }

  function calcular(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const numero = parsearNumero(valor);
    if (numero === null) {
      setResultado(null);
      setErro("Informe um número válido.");
      return;
    }

    const de = acharUnidade(grupo, idEntrada);
    const para = acharUnidade(grupo, idSaida);
    if (!de || !para) return;

    setErro(null);
    setResultado(formatarResultado(converter(numero, de, para)));
  }

  return (
    <TelaCalculadora
      titulo={grupo.titulo}
      icone={grupo.icone}
      acao={<BotaoCalcular form={idFormulario} />}
    >
      <form
        id={idFormulario}
        onSubmit={calcular}
        noValidate
        className="grid gap-x-3 gap-y-2 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]"
      >
        <label
          htmlFor={idValor}
          className={cn(CLASSES_ROTULO, "sm:col-start-1 sm:row-start-1")}
        >
          Valor
        </label>

        <Input
          id={idValor}
          value={valor}
          onChange={(evento) => {
            setValor(evento.target.value);
            descartarResultado();
          }}
          inputMode="decimal"
          enterKeyHint="go"
          autoComplete="off"
          placeholder="0"
          aria-invalid={erro !== null}
          aria-describedby={erro ? idErro : undefined}
          className={cn(
            CLASSES_CAMPO,
            "placeholder:text-white/30 focus-visible:ring-white/40 focus-visible:ring-offset-calc_superficie",
            "sm:col-start-1 sm:row-start-2",
          )}
        />

        <SeletorUnidade
          rotulo="Unidade de entrada"
          unidades={grupo.unidades}
          valor={idEntrada}
          aoMudar={(id) => {
            setIdEntrada(id);
            descartarResultado();
          }}
          className="sm:col-start-1 sm:row-start-3"
        />

        <Equal
          size={40}
          strokeWidth={1.5}
          aria-hidden
          className="my-1 self-center justify-self-center text-white/50 sm:col-start-2 sm:row-start-2 sm:my-0"
        />

        <span className={cn(CLASSES_ROTULO, "sm:col-start-3 sm:row-start-1")}>
          Resultado
        </span>

        <output
          htmlFor={idValor}
          aria-live="polite"
          className={cn(
            CLASSES_CAMPO,
            "flex items-center justify-between gap-2 sm:col-start-3 sm:row-start-2",
          )}
        >
          <span
            title={resultado ?? undefined}
            className={cn("truncate", resultado === null && "text-white/30")}
          >
            {resultado ?? "—"}
          </span>

          {resultado !== null && unidadeSaida && (
            <span className="shrink-0 text-white/50">
              {unidadeSaida.simbolo}
            </span>
          )}
        </output>

        <SeletorUnidade
          rotulo="Unidade de saída"
          unidades={grupo.unidades}
          valor={idSaida}
          aoMudar={(id) => {
            setIdSaida(id);
            descartarResultado();
          }}
          className="sm:col-start-3 sm:row-start-3"
        />

        {erro && (
          <p
            id={idErro}
            role="alert"
            className="text-sm text-red-400 sm:col-span-3 sm:col-start-1 sm:row-start-4"
          >
            {erro}
          </p>
        )}
      </form>

      <TabelaConversoes grupo={grupo} />
    </TelaCalculadora>
  );
}
