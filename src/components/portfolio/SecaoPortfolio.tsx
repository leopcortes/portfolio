import { cn } from "~/lib/utils";

type Props = {
  rotulo: string;
  titulo: string;
  texto?: string | null;
  children?: React.ReactNode;
  className?: string;
};

/**
 * Cabeçalho padrão de todas as seções do portfólio: etiqueta, título e texto de apoio.
 * Centraliza o padrão que antes estava copiado em cada seção.
 */
export default function SecaoPortfolio({
  rotulo,
  titulo,
  texto,
  children,
  className,
}: Props) {
  return (
    <div className={cn("flex flex-col gap-6 sm:gap-8", className)}>
      <header>
        <p className="mb-3 border-l-[3px] border-azul_principal px-3 py-[0.2rem] text-[0.8rem] font-medium uppercase tracking-[0.5px] text-verde_principal sm:text-[0.85rem]">
          {rotulo}
        </p>

        <h2 className="font-abril_fatface text-[clamp(1.6rem,5vw,2.5rem)] font-normal leading-tight text-texto_principal">
          {titulo}
        </h2>

        {texto && (
          <p className="mt-3  text-[0.95rem] leading-7 text-texto_secundario sm:leading-8">
            {texto}
          </p>
        )}
      </header>

      {children}
    </div>
  );
}
