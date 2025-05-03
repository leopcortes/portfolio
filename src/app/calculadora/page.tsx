import {
  BatteryCharging,
  Box,
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
          link="/calculadoras/calculadoracientifica"
          text="Científica"
          icon={<Calculator strokeWidth={2.5} />}
          color="bg-[#e02443] hover:bg-[#c20e2c] active:bg-[#c20e2c]"
        />

        <ButtonCalculator
          link="/calculadoras/calculadorasistemas"
          text="Sistemas"
          icon={<SquareSigma strokeWidth={2.5} />}
          color="bg-[#e02443] hover:bg-[#c20e2c] active:bg-[#c20e2c]"
        />

        <ButtonCalculator
          link="/calculadoras/calculadorasigaa"
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
          link="/calculadoras/conversaovelocidade"
          text="Velocidade"
          icon={<Gauge strokeWidth={2.5} />}
        />

        <ButtonCalculator
          link="/calculadoras/conversaomassa"
          text="Massa"
          icon={<Weight strokeWidth={2.5} />}
        />

        <ButtonCalculator
          link="/calculadoras/conversaocomprimento"
          text="Comprimento"
          icon={<Ruler strokeWidth={2.5} />}
        />

        <ButtonCalculator
          link="/calculadoras/conversaodados"
          text="Dados"
          icon={<DatabaseZap strokeWidth={2.5} />}
        />

        <ButtonCalculator
          link="/calculadoras/conversaotemperatura"
          text="Temperatura"
          icon={<ThermometerSun strokeWidth={2.5} />}
        />

        <ButtonCalculator
          link="/calculadoras/conversaovolume"
          text="Volume"
          icon={<Box strokeWidth={2.5} />}
        />

        <ButtonCalculator
          link="/calculadoras/conversaoarea"
          text="Área"
          icon={<ChartArea strokeWidth={2.5} />}
        />

        <ButtonCalculator
          link="/calculadoras/conversaopressao"
          text="Pressão"
          icon={<CircleGauge strokeWidth={2.5} />}
        />

        <ButtonCalculator
          link="/calculadoras/associacaoresistores"
          text="Resistores"
          icon={<Unplug strokeWidth={2.5} />}
          color="bg-[#814e13] hover:bg-[#663b0b] active:bg-[#663b0b]"
        />

        <ButtonCalculator
          link="/calculadoras/associacaocapacitores"
          text="Capacitores"
          icon={<CircuitBoard strokeWidth={2.5} />}
          color="bg-[#814e13] hover:bg-[#663b0b] active:bg-[#663b0b]"
        />

        <ButtonCalculator
          link="/calculadoras/associacaoindutores"
          text="Indutores"
          icon={<BatteryCharging strokeWidth={2.5} />}
          color="bg-[#814e13] hover:bg-[#663b0b] active:bg-[#663b0b]"
        />

        <ButtonCalculator
          link="/calculadoras/codigocoresresistores"
          text="Cores Resistores"
          icon={<Paintbrush strokeWidth={2.5} />}
          color="bg-[#bea05d] hover:bg-[#a7894f] active:bg-[#a7894f]"
        />

        <ButtonCalculator
          link="/calculadoras/calculadoraimc"
          text="IMC"
          icon={<Scale strokeWidth={2.5} />}
          color="bg-[#194b8c] hover:bg-[#0f3566] active:bg-[#0f3566]"
        />

        <ButtonCalculator
          link="/calculadoras/calculadorapace"
          text="Pace"
          icon={<Rabbit strokeWidth={2.5} />}
          color="bg-[#ed4224] hover:bg-[#b1321c] active:bg-[#b1321c]"
        />
      </div>
    </div>
  );
}
