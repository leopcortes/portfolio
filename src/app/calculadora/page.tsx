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
  GraduationCap,
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

export default function Calculadora() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#212121] p-8 sm:p-24">
      <div className="grid w-full grid-cols-1 bg-[#212121] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ButtonCalculator
          link="/calculadora/outros/cientifica"
          text="Científica"
          icon={<Calculator strokeWidth={2.5} />}
          color="bg-[#e02443] hover:bg-[#c20e2c] active:bg-[#c20e2c]"
        />

        <ButtonCalculator
          link="/calculadora/outros/sistemas"
          text="Sistemas"
          icon={<SquareSigma strokeWidth={2.5} />}
          color="bg-[#e02443] hover:bg-[#c20e2c] active:bg-[#c20e2c]"
        />

        <ButtonCalculator
          link="/calculadora/outros/sigaa"
          text="SIGAA"
          icon={<GraduationCap strokeWidth={2.5} />}
          color="bg-[#00853e] hover:bg-[#046d35] active:bg-[#046d35]"
        />

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
          link="/calculadora/conversao/dados"
          text="Dados"
          icon={<DatabaseZap strokeWidth={2.5} />}
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
          link="/calculadora/associacao/resistores"
          text="Resistores"
          icon={<Unplug strokeWidth={2.5} />}
          color="bg-[#814e13] hover:bg-[#663b0b] active:bg-[#663b0b]"
        />

        <ButtonCalculator
          link="/calculadora/associacao/capacitores"
          text="Capacitores"
          icon={<CircuitBoard strokeWidth={2.5} />}
          color="bg-[#814e13] hover:bg-[#663b0b] active:bg-[#663b0b]"
        />

        <ButtonCalculator
          link="/calculadora/associacao/indutores"
          text="Indutores"
          icon={<BatteryCharging strokeWidth={2.5} />}
          color="bg-[#814e13] hover:bg-[#663b0b] active:bg-[#663b0b]"
        />

        <ButtonCalculator
          link="/calculadora/outros/coresresistores"
          text="Cores Resistores"
          icon={<Paintbrush strokeWidth={2.5} />}
          color="bg-[#bea05d] hover:bg-[#a7894f] active:bg-[#a7894f]"
        />

        <ButtonCalculator
          link="/calculadora/outros/imc"
          text="IMC"
          icon={<Scale strokeWidth={2.5} />}
          color="bg-[#194b8c] hover:bg-[#0f3566] active:bg-[#0f3566]"
        />

        <ButtonCalculator
          link="/calculadora/outros/pace"
          text="Pace"
          icon={<Rabbit strokeWidth={2.5} />}
          color="bg-[#ed4224] hover:bg-[#b1321c] active:bg-[#b1321c]"
        />

        <ButtonCalculator
          link="/calculadora/outros/exati"
          text="Expediente"
          icon={<BriefcaseBusiness strokeWidth={2.5} />}
          color="bg-[#0045c6] hover:bg-[#003393] active:bg-[#003393]"
        />
      </div>
    </div>
  );
}
