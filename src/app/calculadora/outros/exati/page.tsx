"use client";
import React, { useState } from "react";
import "react-clock/dist/Clock.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

function parseTimeString(time: string): number {
  const parts = time.split(":");
  if (parts.length !== 2) {
    throw new Error(`Horário inválido: "${time}". Formato esperado HH:MM`);
  }

  const [hoursStr, minutesStr] = parts;
  const hours = Number(hoursStr);
  const minutes = Number(minutesStr);

  if (
    isNaN(hours) ||
    isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    throw new Error(
      `Horário inválido: "${time}". Horas devem ser 00-23 e minutos 00-59.`,
    );
  }

  return hours * 60 + minutes;
}

function formatMinutesToTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60) % 24; // só para 24h
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}


export default function WorkHoursCalculator() {
  const [entrada, setEntrada] = useState("10:00");
  const [tempoIntervalo, setTempoIntervalo] = useState("00:15");
  const [saidaFinal, setSaidaFinal] = useState("");

  const handleEntradaChange = (value: string | null) => {
    if (value !== null) {
      setEntrada(value);
    }
  };
  const handleTempoIntervaloChange = (value: string | null) => {
    if (value !== null) {
      setTempoIntervalo(value);
    }
  };
  
  const calcularSaida = () => {
    if (entrada && !tempoIntervalo) {
      const entradaMin = parseTimeString(entrada);
      const saida = entradaMin + 6 * 60 + 15;
      setSaidaFinal(formatMinutesToTime(saida));
    } else if (entrada && tempoIntervalo) {
      const entradaMin = parseTimeString(entrada);
      const tempoIntMin = parseTimeString(tempoIntervalo);
  
      if (isNaN(tempoIntMin) || tempoIntMin < 15) {
        setSaidaFinal("Erro: intervalo deve ser no mínimo 15 minutos");
        return;
      }
      const saida = entradaMin + 6 * 60 + tempoIntMin;
      setSaidaFinal(formatMinutesToTime(saida));
    } else {
      setSaidaFinal("Preencha os campos corretamente");
    }
  };
  

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#212121] font-lexend">
      <div className="flex w-fit flex-col items-center justify-center gap-1 rounded-xl bg-[#303030] px-10 py-6">
        <div className="mb-6 flex items-center gap-2">
          <p className="text-3xl">Calculadora de Horário de Saída</p>
        </div>
        <div className="mb-2 flex w-72 items-center justify-between">
          <label className="text-lg font-light">Horário de Entrada:</label>
          <TimePicker
            onChange={handleEntradaChange}
            value={entrada}
            format="HH:mm"
            disableClock
            clearIcon={null}
            required
            className="bg-[#212121] text-end"
          />
        </div>
        <div className="mb-2 flex w-72 items-center justify-between">
          <label className="text-lg font-light">Duração do Intervalo:</label>
          <TimePicker
            onChange={handleTempoIntervaloChange}
            value={tempoIntervalo}
            format="HH:mm"
            disableClock
            clearIcon={null}
            required
            className="bg-[#212121] text-end"
          />
        </div>
        <div className="flex justify-start">
          <button
            onClick={calcularSaida}
            className="mt-6 rounded bg-[#0045c6] px-4 py-2 text-white transition ease-in-out hover:bg-[#003393] active:bg-[#003393]"
          >
            Calcular
          </button>
        </div>

        {saidaFinal && (
          <div className="mt-6 flex items-center justify-center gap-3 text-xl">
            <p>Horário de Saída:</p>
            <p className="text-2xl font-bold">{saidaFinal}</p>
          </div>
        )}
      </div>
    </div>
  );
};
