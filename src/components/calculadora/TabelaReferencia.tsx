import { cn } from "~/lib/utils";

type Props = {
  titulo?: string;
  cabecalhos: string[];
  /** Cada linha vira uma <tr>; a primeira célula é o cabeçalho da linha. */
  linhas: string[][];
  className?: string;
};

/**
 * Tabela de referência das calculadoras: conversões, faixas de IMC, pace por
 * velocidade. Rola sozinha na horizontal em vez de empurrar a página.
 */
export default function TabelaReferencia({
  titulo,
  cabecalhos,
  linhas,
  className,
}: Props) {
  return (
    <section className={cn("flex min-w-0 flex-col gap-2", className)}>
      {titulo && <h2 className="text-lg">{titulo}</h2>}

      <div className="-mx-1 min-w-0 overflow-x-auto px-1">
        <table className="w-full border-collapse text-left text-sm font-light sm:text-base">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-white/40">
              {cabecalhos.map((cabecalho, indice) => (
                <th
                  key={cabecalho}
                  scope="col"
                  className={cn(
                    "pb-1 font-medium",
                    indice === 0 ? "pr-4" : "pl-4 text-right",
                  )}
                >
                  {cabecalho}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {linhas.map((celulas) => (
              <tr key={celulas[0]} className="border-b border-calc_campo">
                {celulas.map((celula, indice) =>
                  indice === 0 ? (
                    <th
                      key={indice}
                      scope="row"
                      className="py-1 pr-4 font-light"
                    >
                      {celula}
                    </th>
                  ) : (
                    <td
                      key={indice}
                      className="whitespace-nowrap py-1 pl-4 text-right tabular-nums"
                    >
                      {celula}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
