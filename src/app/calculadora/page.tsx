import {
  BatteryCharging,
  Box,
  BriefcaseBusiness,
  Calculator,
  ChartArea,
  CircleGauge,
  CircuitBoard,
  Clock,
  DatabaseZap,
  Gauge,
  Paintbrush,
  Rabbit,
  Ruler,
  Scale,
  SquareSigma,
  ThermometerSun,
  Unplug,
  Weight,
} from "lucide-react";
import ButtonCalculator from "~/components/buttonCalculator";

const CORES = {
  numerica: "bg-[#e02443] hover:bg-[#c20e2c] active:bg-[#c20e2c]",
  associacao: "bg-[#814e13] hover:bg-[#663b0b] active:bg-[#663b0b]",
  cores: "bg-[#bea05d] hover:bg-[#a7894f] active:bg-[#a7894f]",
  saude: "bg-[#194b8c] hover:bg-[#0f3566] active:bg-[#0f3566]",
  corrida: "bg-[#ed4224] hover:bg-[#b1321c] active:bg-[#b1321c]",
  trabalho: "bg-[#0045c6] hover:bg-[#003393] active:bg-[#003393]",
} as const;

export default function Calculadora() {
  return (
    <main className="flex flex-col gap-6 min-h-dvh w-full items-center justify-center bg-calc_fundo px-4 py-60 sm:px-8 sm:py-10">
      <div className="flex w-full max-w-6xl flex-col gap-1">
        <h1 className="text-3xl">Exati</h1>

        <div className="grid w-full max-w-6xl grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-3">
          <ButtonCalculator
            link="/calculadora/outros/exati"
            text="Expediente"
            icon={<BriefcaseBusiness strokeWidth={2.5} />}
            color={CORES.trabalho}
            />
        </div>
      </div>

      <div className="flex w-full max-w-6xl flex-col gap-1">
        <h1 className="text-3xl">Conversões</h1>

        <div className="grid w-full max-w-6xl grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-3">
          <ButtonCalculator
            link="/calculadora/conversao/tempo"
            text="Tempo"
            icon={<Clock strokeWidth={2.5} />}
          />

          <ButtonCalculator
            link="/calculadora/conversao/velocidade"
            text="Velocidade"
            icon={<Gauge strokeWidth={2.5} />}
          />

          <ButtonCalculator
            link="/calculadora/conversao/massa"
            text="Massa"
            icon={<Weight strokeWidth={2.5} />}
          />

          <ButtonCalculator
            link="/calculadora/conversao/comprimento"
            text="Comprimento"
            icon={<Ruler strokeWidth={2.5} />}
          />

          <ButtonCalculator
            link="/calculadora/conversao/temperatura"
            text="Temperatura"
            icon={<ThermometerSun strokeWidth={2.5} />}
          />

          <ButtonCalculator
            link="/calculadora/conversao/volume"
            text="Volume"
            icon={<Box strokeWidth={2.5} />}
          />

          <ButtonCalculator
            link="/calculadora/conversao/area"
            text="Área"
            icon={<ChartArea strokeWidth={2.5} />}
          />

          <ButtonCalculator
            link="/calculadora/conversao/pressao"
            text="Pressão"
            icon={<CircleGauge strokeWidth={2.5} />}
          />

          <ButtonCalculator
            link="/calculadora/conversao/dados"
            text="Dados"
            icon={<DatabaseZap strokeWidth={2.5} />}
          />
        </div>
      </div>

      <div className="flex w-full max-w-6xl flex-col gap-1">
        <h1 className="text-3xl">Elétrica</h1>

        <div className="grid w-full max-w-6xl grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-3">
          <ButtonCalculator
            link="/calculadora/associacao/resistores"
            text="Resistores"
            icon={<Unplug strokeWidth={2.5} />}
            color={CORES.associacao}
          />

          <ButtonCalculator
            link="/calculadora/associacao/capacitores"
            text="Capacitores"
            icon={<CircuitBoard strokeWidth={2.5} />}
            color={CORES.associacao}
          />

          <ButtonCalculator
            link="/calculadora/associacao/indutores"
            text="Indutores"
            icon={<BatteryCharging strokeWidth={2.5} />}
            color={CORES.associacao}
          />

          <ButtonCalculator
            link="/calculadora/outros/coresresistores"
            text="Cores Resistores"
            icon={<Paintbrush strokeWidth={2.5} />}
            color={CORES.cores}
          />
        </div>
      </div>

      <div className="flex w-full max-w-6xl flex-col gap-1">
        <h1 className="text-3xl">Outras</h1>

        <div className="grid w-full max-w-6xl grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-3">
          <ButtonCalculator
            link="/calculadora/outros/cientifica"
            text="Científica"
            icon={<Calculator strokeWidth={2.5} />}
            color={CORES.numerica}
          />

          <ButtonCalculator
            link="/calculadora/outros/sistemas"
            text="Sistemas"
            icon={<SquareSigma strokeWidth={2.5} />}
            color={CORES.numerica}
          />

          <ButtonCalculator
            link="/calculadora/outros/pace"
            text="Pace"
            icon={<Rabbit strokeWidth={2.5} />}
            color={CORES.corrida}
          />

          <ButtonCalculator
            link="/calculadora/outros/imc"
            text="IMC"
            icon={<Scale strokeWidth={2.5} />}
            color={CORES.saude}
          />
        </div>
      </div>
    </main>
  );
}
