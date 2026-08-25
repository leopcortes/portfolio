import { type LucideIcon } from "lucide-react";

/**
 * Toda unidade é um par de funções para/de a unidade base do grupo — inclusive as
 * lineares, que poderiam ser só um fator. Isso faz a temperatura (relação afim,
 * `K = °C + 273,15`) atravessar exatamente o mesmo caminho das demais, sem que o
 * motor de conversão precise saber que ela existe.
 */
export type Unidade = {
  id: string;
  nome: string;
  simbolo: string;
  paraBase: (valor: number) => number;
  deBase: (valor: number) => number;
};

export type LinhaTabela = {
  rotulo: string;
  equivalencia: string;
};

export type GrupoUnidades = {
  slug: string;
  titulo: string;
  icone: LucideIcon;
  unidades: Unidade[];
  idBase: string;
  padraoEntrada: string;
  padraoSaida: string;
  /** Substitui a tabela calculada automaticamente quando ela não faz sentido. */
  linhasTabela?: LinhaTabela[];
};

export function linear(
  id: string,
  nome: string,
  simbolo: string,
  fator: number,
): Unidade {
  return {
    id,
    nome,
    simbolo,
    paraBase: (valor) => valor * fator,
    deBase: (valor) => valor / fator,
  };
}

export function afim(
  id: string,
  nome: string,
  simbolo: string,
  paraBase: (valor: number) => number,
  deBase: (valor: number) => number,
): Unidade {
  return { id, nome, simbolo, paraBase, deBase };
}

export function acharUnidade(
  grupo: GrupoUnidades,
  id: string,
): Unidade | undefined {
  return grupo.unidades.find((unidade) => unidade.id === id);
}
