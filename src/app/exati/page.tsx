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
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

const WorkHoursCalculator: React.FC = () => {
  const [entrada, setEntrada] = useState("10:00");
  const [saidaIntervalo, setSaidaIntervalo] = useState("");
  const [voltaIntervalo, setVoltaIntervalo] = useState("");
  const [saidaFinal, setSaidaFinal] = useState("");

  const handleEntradaChange = (value: string | null) => {
    if (value !== null) {
      setEntrada(value);
    }
  };
  const handleSaidaIntervaloChange = (value: string | null) => {
    if (value !== null) {
      setSaidaIntervalo(value);
    }
  };

  const handleVoltaIntervaloChange = (value: string | null) => {
    if (value !== null) {
      setVoltaIntervalo(value);
    }
  };

  const calcularSaida = () => {
    if (entrada && !saidaIntervalo && !voltaIntervalo) {
      // Caso 1: Apenas horário de entrada
      const entradaMin = parseTimeString(entrada);
      const saida = entradaMin + 6 * 60;
      setSaidaFinal(formatMinutesToTime(saida));
    } else if (entrada && saidaIntervalo && voltaIntervalo) {
      // Caso 2: Entrada + saída para intervalo + volta
      const entradaMin = parseTimeString(entrada);
      const saidaIntMin = parseTimeString(saidaIntervalo);
      const voltaIntMin = parseTimeString(voltaIntervalo);

      const intervaloDuracao = voltaIntMin - saidaIntMin;
      const cargaTotal = 6 * 60;
      const saida = voltaIntMin + (cargaTotal - (saidaIntMin - entradaMin));

      if (intervaloDuracao < 15) {
        setSaidaFinal("Erro: intervalo deve ser no mínimo 15 minutos");
      } else {
        setSaidaFinal(formatMinutesToTime(saida));
      }
    } else {
      setSaidaFinal("Preencha os campos corretamente");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#0f0f0f] text-center">
      <div className="mx-auto max-w-md bg-[#0f0f0f] p-4 text-white">
        <h2 className="mb-4 text-xl font-bold">
          Calculadora de Horário de Saída
        </h2>
        <div className="mb-2 flex w-64 items-center justify-between">
          <label>Horário de Entrada:</label>
          <TimePicker
            onChange={handleEntradaChange}
            value={entrada}
            format="HH:mm"
            disableClock
            clearIcon={null}
            required
            className="text-end"
          />
        </div>
        <div className="mb-2 flex w-64 items-center justify-between">
          <label>Saída para Intervalo:</label>
          <TimePicker
            onChange={handleSaidaIntervaloChange}
            value={saidaIntervalo}
            format="HH:mm"
            disableClock
            clearIcon={null}
            className="text-end"
          />
        </div>
        <div className="mb-2 flex w-64 items-center justify-between">
          <label>Volta do Intervalo:</label>
          <TimePicker
            onChange={handleVoltaIntervaloChange}
            value={voltaIntervalo}
            format="HH:mm"
            disableClock
            clearIcon={null}
            className="text-end"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={calcularSaida}
            className="mt-4 rounded bg-blue-600 px-4 py-2 text-white"
          >
            Calcular
          </button>
        </div>

        {saidaFinal && (
          <div className="mt-4">
            <strong>Horário de Saída Final: </strong> {saidaFinal}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkHoursCalculator;
