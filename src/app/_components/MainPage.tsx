import Link from "next/link";
import Nome from "./Nome";

export default function MainPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#0f0f0f] text-center">
      <div className="flex flex-col items-center">
        <Nome />

        {/* Botão - Portfólio */}
        <div className="mt-4 flex w-full p-2">
          <Link
            className="pointer relative inline-block w-full bg-verde_principal py-6 text-4xl font-bold uppercase text-white/70 transition-all duration-300 ease-in hover:bg-verde_hover hover:text-white/100 active:translate-y-[2px] active:bg-[#474a5c] active:shadow-[0.5px_0.5px_rgb(59,59,59)]"
            href="/portfolio"
          >
            PORTFÓLIO
          </Link>
        </div>

        {/* Botão - Calculadoras */}
        <div className="flex w-full p-2">
          <Link
            className="pointer relative inline-block w-full bg-[#606582] py-6 text-4xl font-bold uppercase text-white/70 transition-all duration-300 ease-in hover:bg-[#50546e] hover:text-white/100 active:translate-y-[2px] active:bg-[#474a5c] active:shadow-[0.5px_0.5px_rgb(59,59,59)]"
            href="/calculadora"
          >
            PROJETO CALCULADORAS
          </Link>
        </div>

        {/* Botão - Rastreador Lago Norte */}
        <div className="flex w-full p-2">
          <Link
            className="pointer relative inline-block w-full bg-azul_principal py-6 text-4xl font-bold uppercase text-white/70 transition-all duration-300 ease-in hover:bg-[#4b83c8] hover:text-white/100 active:translate-y-[2px] active:bg-[#474a5c] active:shadow-[0.5px_0.5px_rgb(59,59,59)]"
            href="/lago-norte"
          >
            RASTREADOR CORRIDA LN
          </Link>
        </div>
      </div>
    </div>
  );
}
