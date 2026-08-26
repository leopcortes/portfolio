import { formatarFator } from "~/lib/calculadora/conversao";
import { acharUnidade, type GrupoUnidades } from "~/lib/calculadora/unidades";
import TabelaReferencia from "./TabelaReferencia";

function montarLinhas(grupo: GrupoUnidades): string[][] {
  if (grupo.linhasTabela) {
    return grupo.linhasTabela.map((linha) => [
      linha.rotulo,
      linha.equivalencia,
    ]);
  }

  const base = acharUnidade(grupo, grupo.idBase);
  if (!base) return [];

  // O símbolo já aparece na equivalência ("1 min = 60 s"), então repeti-lo no
  // rótulo só produziria ruído em nomes que já têm parêntese: "Mês (30 dias) (mês)".
  return grupo.unidades.map((unidade) => [
    unidade.nome,
    `1 ${unidade.simbolo} = ${formatarFator(unidade.paraBase(1))} ${base.simbolo}`,
  ]);
}

export default function TabelaConversoes({ grupo }: { grupo: GrupoUnidades }) {
  return (
    <TabelaReferencia
      titulo="Conversões básicas"
      cabecalhos={
        grupo.linhasTabela
          ? ["Conversão", "Fórmula"]
          : ["Unidade", "Equivalência"]
      }
      linhas={montarLinhas(grupo)}
    />
  );
}
