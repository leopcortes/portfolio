"use client";

import { BriefcaseBusiness } from "lucide-react";
import { useId, useState } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

import "./relogio.css";

import TelaCalculadora from "~/components/calculadora/TelaCalculadora";

const JORNADA_MINUTOS = 8 * 60;
const INTERVALO_MINIMO = 60;
const MINUTOS_POR_DIA = 24 * 60;

/** Minutos desde a meia-noite, ou null se o horário estiver vazio ou inválido. */
function minutosDoHorario(horario: string | null): number | null {
  if (!horario) return null;

  const [horaTexto, minutoTexto] = horario.split(":");
  if (!horaTexto || !minutoTexto) return null;

  const horas = Number(horaTexto);
  const minutos = Number(minutoTexto);

  if (!Number.isInteger(horas) || !Number.isInteger(minutos)) return null;
  if (horas < 0 || horas > 23 || minutos < 0 || minutos > 59) return null;

  return horas * 60 + minutos;
}

function formatarHorario(totalMinutos: number): string {
  const horas = Math.floor(totalMinutos / 60) % 24;
  const minutos = totalMinutos % 60;
  return `${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}`;
}

/**
 * Uma entrada no fim da tarde empurra a saída para depois da meia-noite. Exibir
 * só "03:00" faria parecer que é no mesmo dia.
 */
function sufixoDeDia(totalMinutos: number): string {
  const dias = Math.floor(totalMinutos / MINUTOS_POR_DIA);
  if (dias === 0) return "";
  return dias === 1 ? " (dia seguinte)" : ` (+${dias} dias)`;
}

function CampoHorario({
  rotulo,
  valor,
  aoMudar,
}: {
  rotulo: string;
  valor: string | null;
  aoMudar: (valor: string | null) => void;
}) {
  const idRotulo = useId();

  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
      <span id={idRotulo} className="text-lg font-light">
        {rotulo}
      </span>

      {/* O TimePicker renderiza dois inputs (hora e minuto), então `htmlFor` não
          daria conta: o nome do grupo é que carrega o rótulo. */}
      <div
        role="group"
        aria-labelledby={idRotulo}
        className="campo-horario rounded-md bg-calc_campo px-3 py-2 text-base focus-within:ring-2 focus-within:ring-white/40 focus-within:ring-offset-2 focus-within:ring-offset-calc_superficie"
      >
        <TimePicker
          onChange={aoMudar}
          value={valor}
          format="HH:mm"
          locale="pt-BR"
          disableClock
          clearIcon={null}
          hourAriaLabel="Hora"
          minuteAriaLabel="Minuto"
        />
      </div>
    </div>
  );
}

export default function CalculadoraExpediente() {
  const [entrada, setEntrada] = useState<string | null>("08:00");
  const [intervalo, setIntervalo] = useState<string | null>("01:00");
  const [resultado, setResultado] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  function calcular() {
    const entradaMin = minutosDoHorario(entrada);
    const intervaloMin = minutosDoHorario(intervalo);

    if (entradaMin === null || intervaloMin === null) {
      setResultado(null);
      setErro("Preencha os dois horários no formato HH:MM.");
      return;
    }

    if (intervaloMin < INTERVALO_MINIMO) {
      setResultado(null);
      setErro("O intervalo deve ser de no mínimo 1 hora.");
      return;
    }

    const saida = entradaMin + JORNADA_MINUTOS + intervaloMin;
    setErro(null);
    setResultado(formatarHorario(saida) + sufixoDeDia(saida));
  }

  // Mudar um horário invalida o que está na tela, para o resultado nunca se
  // referir a valores que o usuário já trocou.
  function trocar(definir: (valor: string | null) => void) {
    return (valor: string | null) => {
      definir(valor);
      setResultado(null);
      setErro(null);
    };
  }

  return (
    <TelaCalculadora
      titulo="Calculadora de Horário de Saída"
      icone={BriefcaseBusiness}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <CampoHorario
            rotulo="Horário de entrada"
            valor={entrada}
            aoMudar={trocar(setEntrada)}
          />
          <CampoHorario
            rotulo="Duração do intervalo"
            valor={intervalo}
            aoMudar={trocar(setIntervalo)}
          />
        </div>

        <button
          type="button"
          onClick={calcular}
          className="w-full rounded-lg bg-[#0045c6] px-6 py-2 text-lg transition-colors hover:bg-[#003393] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-calc_superficie active:bg-[#003393] motion-reduce:transition-none sm:w-fit sm:self-start"
        >
          Calcular
        </button>

        {/* A região viva existe desde o primeiro render: criada junto com o
            conteúdo, o leitor de tela não anunciaria a mudança. */}
        <div aria-live="polite" className="empty:hidden">
          {erro && (
            <p role="alert" className="text-sm text-red-400">
              {erro}
            </p>
          )}

          {resultado && (
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-calc_campo pt-4 text-xl">
              <p>Horário de saída:</p>
              <p className="text-2xl font-bold tabular-nums">{resultado}</p>
            </div>
          )}
        </div>
      </div>
    </TelaCalculadora>
  );
}
