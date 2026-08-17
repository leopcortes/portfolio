import Link from "next/link";

type Props = {
  feitos: number;
  total: number;
};

export default function Cabecalho({ feitos, total }: Props) {
  const razao = total ? (feitos / total) * 100 : 0;

  return (
    <header className="flex shrink-0 items-center gap-8 border-b border-borda_azul_1 bg-fundo_azul_2 px-7 py-[18px]">
      <div className="flex min-w-0 flex-col gap-[2px]">
        <div className="">
          <Link
            className="whitespace-nowrap font-abril_fatface text-[26px] leading-[1.05] tracking-[-0.01em] text-texto_principal"
            href="/"
          >
            Lago&nbsp;Norte
          </Link>
        </div>
        <div className="whitespace-nowrap text-[11px] uppercase tracking-[0.14em] text-texto_secundario">
          rastreador de corrida
        </div>
      </div>

      <div className="flex min-w-[140px] flex-1 flex-col gap-2">
        <div className="flex items-baseline justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold leading-none text-verde_principal">
              {Math.round(razao)}%
            </span>
          </div>
          <div className="whitespace-nowrap text-xs text-texto_secundario">
            <span className="font-medium text-texto_principal">{feitos}</span>{" "}
            de {total} conjuntos
          </div>
        </div>

        <div className="h-[7px] overflow-hidden rounded-[99px] border border-borda_azul_1 bg-trilha_azul_1">
          <div
            className="h-full rounded-[99px] bg-verde_principal transition-[width] duration-[350ms] ease-[ease]"
            style={{ width: `${razao}%` }}
          />
        </div>
      </div>
    </header>
  );
}
