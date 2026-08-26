import { type LucideIcon } from "lucide-react";

export type UnidadeComponente = {
  id: string;
  /** Texto curto do gatilho do select, onde não cabe o nome por extenso. */
  simbolo: string;
  rotulo: string;
  fator: number;
};

export type Diagrama = {
  src: string;
  largura: number;
  altura: number;
};

export type ConfigAssociacao = {
  slug: string;
  titulo: string;
  icone: LucideIcon;
  /** Letra do componente nas fórmulas: R, C ou L. */
  simbolo: string;
  grandeza: string;
  unidadeBase: string;
  unidades: UnidadeComponente[];
  unidadePadrao: string;
  imagemSerie: Diagrama;
  imagemParalelo: Diagrama;
  /**
   * Resistores e indutores somam em série; capacitores somam em paralelo. As duas
   * ligações restantes são sempre o inverso da soma dos inversos.
   */
  serieSoma: boolean;
};

export type Ligacao = "serie" | "paralelo";

/**
 * Valores ausentes ou zerados são ignorados, como no projeto original: as linhas
 * em branco não deveriam contar, e um zero no paralelo dividiria por zero.
 * Devolve null quando não sobrou nenhum componente.
 */
export function equivalente(valores: number[], soma: boolean): number | null {
  const validos = valores.filter(
    (valor) => Number.isFinite(valor) && valor > 0,
  );
  if (validos.length === 0) return null;

  if (soma) return validos.reduce((total, valor) => total + valor, 0);

  const somaDosInversos = validos.reduce(
    (total, valor) => total + 1 / valor,
    0,
  );
  return 1 / somaDosInversos;
}

export function somaNaLigacao(
  config: ConfigAssociacao,
  ligacao: Ligacao,
): boolean {
  return ligacao === "serie" ? config.serieSoma : !config.serieSoma;
}

/** Fórmula em texto, montada a partir da letra do componente. */
export function formula(config: ConfigAssociacao, ligacao: Ligacao): string {
  const s = config.simbolo;
  return somaNaLigacao(config, ligacao)
    ? `${s}eq = ${s}₁ + ${s}₂ + ${s}₃ + … + ${s}ₙ`
    : `1/${s}eq = 1/${s}₁ + 1/${s}₂ + 1/${s}₃ + … + 1/${s}ₙ`;
}
