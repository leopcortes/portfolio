import { formatarResultado } from "./conversao";

/** Referenciado à parte: com noUncheckedIndexedAccess o último item do array
    seria `T | undefined`, e ele é o fallback de valores menores que 1 pico. */
const PICO = { fator: 1e-12, simbolo: "p" } as const;

const PREFIXOS = [
  { fator: 1e12, simbolo: "T" },
  { fator: 1e9, simbolo: "G" },
  { fator: 1e6, simbolo: "M" },
  { fator: 1e3, simbolo: "k" },
  { fator: 1, simbolo: "" },
  { fator: 1e-3, simbolo: "m" },
  { fator: 1e-6, simbolo: "µ" },
  { fator: 1e-9, simbolo: "n" },
  PICO,
] as const;

/**
 * Escolhe o prefixo SI que deixa o número legível: 0,0003 F vira "300 µF" em vez
 * de "0,0003 F", e 4700 Ω vira "4,7 kΩ".
 */
export function formatarComPrefixo(valor: number, unidade: string): string {
  if (!Number.isFinite(valor)) return "—";
  if (valor === 0) return `0 ${unidade}`;

  const magnitude = Math.abs(valor);
  const escolhido =
    PREFIXOS.find((prefixo) => magnitude >= prefixo.fator) ?? PICO;

  return `${formatarResultado(valor / escolhido.fator)} ${escolhido.simbolo}${unidade}`;
}
