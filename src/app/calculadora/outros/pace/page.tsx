"use client";

import { Rabbit } from "lucide-react";
import { type FormEvent, useState } from "react";

import BotaoCalcular from "~/components/calculadora/BotaoCalcular";
import BotaoSecundario from "~/components/calculadora/BotaoSecundario";
import CampoNumero from "~/components/calculadora/CampoNumero";
import PainelResultado from "~/components/calculadora/PainelResultado";
import TabelaReferencia from "~/components/calculadora/TabelaReferencia";
import TelaCalculadora from "~/components/calculadora/TelaCalculadora";
import { parsearNumero } from "~/lib/calculadora/conversao";
import { calcularPace, REFERENCIA_PACE } from "~/lib/calculadora/pace";

type Resultado = { pace: string; velocidade: string };

/** Campo de tempo vazio conta como zero — só a distância é obrigatória. */
function tempoOuZero(texto: string): number | null {
  if (texto.trim() === "") return 0;
  const valor = parsearNumero(texto);
  return valor === null || valor < 0 ? null : valor;
}

export default function CalculadoraPace() {
  const [distancia, setDistancia] = useState("");
  const [horas, setHoras] = useState("");
  const [minutos, setMinutos] = useState("");
  const [segundos, setSegundos] = useState("");
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  function limparSaida() {
    setResultado(null);
    setErro(null);
  }

  function trocar(definir: (valor: string) => void) {
    return (valor: string) => {
      definir(valor);
      limparSaida();
    };
  }

  function calcular(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const km = parsearNumero(distancia);
    const h = tempoOuZero(horas);
    const min = tempoOuZero(minutos);
    const seg = tempoOuZero(segundos);

    if (km === null || km <= 0) {
      setResultado(null);
      setErro("Informe uma distância maior que zero.");
      return;
    }

    if (h === null || min === null || seg === null) {
      setResultado(null);
      setErro("O tempo deve conter apenas números não negativos.");
      return;
    }

    const calculado = calcularPace(km, h, min, seg);
    if (!calculado) {
      setResultado(null);
      setErro("Informe um tempo total maior que zero.");
      return;
    }

    setErro(null);
    setResultado({
      pace: calculado.pace,
      velocidade: calculado.velocidade.toFixed(1).replace(".", ","),
    });
  }

  function limpar() {
    setDistancia("");
    setHoras("");
    setMinutos("");
    setSegundos("");
    limparSaida();
  }

  return (
    <TelaCalculadora titulo="Calculadora de Pace" icone={Rabbit}>
      <form onSubmit={calcular} noValidate className="flex flex-col gap-4">
        <CampoNumero
          rotulo="Distância (km)"
          valor={distancia}
          aoMudar={trocar(setDistancia)}
          placeholder="Quilômetros"
          invalido={erro !== null}
          className="sm:max-w-xs"
        />

        <fieldset className="flex min-w-0 flex-col gap-1.5">
          <legend className="mb-1.5 text-sm text-white/50">Tempo total</legend>
          <div className="grid grid-cols-3 gap-3">
            <CampoNumero
              rotulo="Horas"
              valor={horas}
              aoMudar={trocar(setHoras)}
              placeholder="0"
            />
            <CampoNumero
              rotulo="Minutos"
              valor={minutos}
              aoMudar={trocar(setMinutos)}
              placeholder="0"
            />
            <CampoNumero
              rotulo="Segundos"
              valor={segundos}
              aoMudar={trocar(setSegundos)}
              placeholder="0"
            />
          </div>
        </fieldset>

        <div className="flex flex-wrap gap-3">
          <BotaoCalcular className="grow sm:grow-0" />
          <BotaoSecundario aoClicar={limpar} className="grow sm:grow-0">
            Limpar
          </BotaoSecundario>
        </div>

        <PainelResultado erro={erro}>
          {resultado && (
            <div className="flex flex-wrap gap-x-8 gap-y-2 border-t border-calc_campo pt-4 text-xl">
              <p className="flex items-baseline gap-3">
                Pace:
                <span className="text-2xl font-bold tabular-nums">
                  {resultado.pace}
                </span>
                <span className="text-base text-white/50">min/km</span>
              </p>
              <p className="flex items-baseline gap-3">
                Velocidade média:
                <span className="text-2xl font-bold tabular-nums">
                  {resultado.velocidade}
                </span>
                <span className="text-base text-white/50">km/h</span>
              </p>
            </div>
          )}
        </PainelResultado>
      </form>

      <TabelaReferencia
        titulo="Referência"
        cabecalhos={["Velocidade", "Pace"]}
        linhas={REFERENCIA_PACE}
      />
    </TelaCalculadora>
  );
}
