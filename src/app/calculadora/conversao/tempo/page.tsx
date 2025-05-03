import { Clock, Equal } from "lucide-react";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function ConversaoTempo() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#212121]">
      <div className="flex w-1/2 flex-col items-center justify-center gap-4 rounded-xl bg-[#303030] p-4">
        {/* Linha 1 - Titulo e botão */}
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock size={32} />
            <p className="text-2xl">Tempo</p>
          </div>

          <button className="rounded-lg bg-[#194b8c] px-6 py-2 text-lg transition ease-in hover:bg-[#123a6e]">
            Calcular
          </button>
        </div>

        {/* Linha 2 - Inputs e Selects */}
        <div className="flex w-full flex-col gap-0">
          <div className="flex w-full items-center gap-3">
            <Input className="flex-1 border-none bg-[#262626]" />
            <Equal size={44} strokeWidth={1.5} className="" />
            <Input className="flex-1 border-none bg-[#262626]" />
          </div>
          {/* Linha 2 - Inputs e Selects */}
          <div className="flex w-full items-center gap-3">
            <Select>
              <SelectTrigger className="flex-1 border-none bg-[#262626]">
                <SelectValue placeholder="Unidade 1" />
              </SelectTrigger>
              <SelectContent className="font-lexend font-light">
                <SelectItem value="nanosegundo">Nanosegundo</SelectItem>
                <SelectItem value="microsegundo">Microsegundo</SelectItem>
                <SelectItem value="milisegundo">Milisegundo</SelectItem>
                <SelectItem value="segundo">Segundo</SelectItem>
                <SelectItem value="minuto">Minuto</SelectItem>
                <SelectItem value="hora">Hora</SelectItem>
                <SelectItem value="dia">Dia</SelectItem>
                <SelectItem value="semana">Semana</SelectItem>
                <SelectItem value="mes">Mês</SelectItem>
                <SelectItem value="ano">Ano</SelectItem>
              </SelectContent>
            </Select>

            <Equal size={44} strokeWidth={1.5} className="text-[#303030]" />

            <Select>
              <SelectTrigger className="flex-1 border-none bg-[#262626]">
                <SelectValue placeholder="Unidade 2" />
              </SelectTrigger>
              <SelectContent className="font-lexend font-light">
                <SelectItem value="nanosegundo">Nanosegundo</SelectItem>
                <SelectItem value="microsegundo">Microsegundo</SelectItem>
                <SelectItem value="milisegundo">Milisegundo</SelectItem>
                <SelectItem value="segundo">Segundo</SelectItem>
                <SelectItem value="minuto">Minuto</SelectItem>
                <SelectItem value="hora">Hora</SelectItem>
                <SelectItem value="dia">Dia</SelectItem>
                <SelectItem value="semana">Semana</SelectItem>
                <SelectItem value="mes">Mês</SelectItem>
                <SelectItem value="ano">Ano</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Linha 3 - Tabela */}
        <div className="flex w-full flex-col gap-1">
          <p className="text-lg">Conversões:</p>
          <div className="flex w-full flex-col gap-[2px]">
            <div className="flex justify-between border-b-[1px] border-[#262626] text-base font-light">
              <p>Nanosegundo (ns)</p>
              <p>1.000.000.000 seg</p>
            </div>

            <div className="flex justify-between border-b-[1px] border-[#262626] text-base font-light">
              <p>Microsegundo (μs)</p>
              <p>1.000.000 seg</p>
            </div>

            <div className="flex justify-between border-b-[1px] border-[#262626] text-base font-light">
              <p>Milisegundo (ms)</p>
              <p>1.000 seg</p>
            </div>

            <div className="flex justify-between border-b-[1px] border-[#262626] text-base font-light">
              <p>Segundo (seg)</p>
              <p>1 seg</p>
            </div>

            <div className="flex justify-between border-b-[1px] border-[#262626] text-base font-light">
              <p>Minuto (min)</p>
              <p>60 seg</p>
            </div>

            <div className="flex justify-between border-b-[1px] border-[#262626] text-base font-light">
              <p>Hora (hr)</p>
              <p>60 min</p>
            </div>

            <div className="flex justify-between border-b-[1px] border-[#262626] text-base font-light">
              <p>Dia (dia)</p>
              <p>24 horas</p>
            </div>

            <div className="flex justify-between border-b-[1px] border-[#262626] text-base font-light">
              <p>Semana (sem)</p>
              <p>7 dias</p>
            </div>

            <div className="flex justify-between border-b-[1px] border-[#262626] text-base font-light">
              <p>Mês (mes)</p>
              <p>30 dias</p>
            </div>

            <div className="flex justify-between border-b-[1px] border-[#262626] text-base font-light">
              <p>Ano (ano)</p>
              <p>365 dias</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
