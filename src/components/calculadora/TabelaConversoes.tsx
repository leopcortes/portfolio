import { formatarFator } from "~/lib/calculadora/conversao";
import {
  acharUnidade,
  type GrupoUnidades,
  type LinhaTabela,
} from "~/lib/calculadora/unidades";

function montarLinhas(grupo: GrupoUnidades): LinhaTabela[] {
  if (grupo.linhasTabela) return grupo.linhasTabela;

  const base = acharUnidade(grupo, grupo.idBase);
  if (!base) return [];

  // O símbolo já aparece na equivalência ("1 min = 60 s"), então repeti-lo no
  // rótulo só produziria ruído em nomes que já têm parêntese: "Mês (30 dias) (mês)".
  return grupo.unidades.map((unidade) => ({
    rotulo: unidade.nome,
    equivalencia: `1 ${unidade.simbolo} = ${formatarFator(unidade.paraBase(1))} ${base.simbolo}`,
  }));
}

export default function TabelaConversoes({ grupo }: { grupo: GrupoUnidades }) {
  const linhas = montarLinhas(grupo);
  const cabecalhos = grupo.linhasTabela
    ? ["Conversão", "Fórmula"]
    : ["Unidade", "Equivalência"];

  return (
    <section className="flex min-w-0 flex-col gap-2">
      <h2 className="text-lg">Conversões básicas</h2>

      {/* A tabela rola sozinha em vez de empurrar a página na horizontal. */}
      <div className="-mx-1 min-w-0 overflow-x-auto px-1">
        <table className="w-full border-collapse text-left text-sm font-light sm:text-base">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-white/40">
              <th scope="col" className="pb-1 pr-4 font-medium">
                {cabecalhos[0]}
              </th>
              <th scope="col" className="pb-1 text-right font-medium">
                {cabecalhos[1]}
              </th>
            </tr>
          </thead>

          <tbody>
            {linhas.map((linha) => (
              <tr key={linha.rotulo} className="border-b border-calc_campo">
                <th scope="row" className="py-1 pr-4 font-light">
                  {linha.rotulo}
                </th>
                <td className="whitespace-nowrap py-1 text-right tabular-nums">
                  {linha.equivalencia}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
