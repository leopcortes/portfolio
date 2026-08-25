import { type Unidade } from "./unidades";

const LIMITE_SUPERIOR = 1e15;
const LIMITE_INFERIOR = 1e-6;
const DIGITOS_SIGNIFICATIVOS = 12;

export function converter(valor: number, de: Unidade, para: Unidade): number {
  return para.deBase(de.paraBase(valor));
}

/**
 * Aceita as duas formas que um usuário brasileiro digita: "1,5" no teclado do
 * celular e "1.5" no numérico do teclado físico. Quando os dois separadores
 * aparecem juntos ("1.234,56") o ponto só pode ser separador de milhar; sozinho
 * ele é tratado como decimal, porque "1.5" é muito mais provável que "1500".
 */
export function parsearNumero(texto: string): number | null {
  const limpo = texto.trim();
  if (limpo === "") return null;

  const normalizado = limpo.includes(",")
    ? limpo.replace(/\./g, "").replace(",", ".")
    : limpo;

  if (!/^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i.test(normalizado)) return null;

  const numero = Number(normalizado);
  return Number.isFinite(numero) ? numero : null;
}

export function formatarResultado(valor: number): string {
  if (!Number.isFinite(valor)) return "—";

  // Arredondar antes de formatar elimina o ruído de ponto flutuante: sem isto,
  // converter 0,1 m para cm produz 10,000000000000002.
  const limpo = Number(valor.toPrecision(DIGITOS_SIGNIFICATIVOS));
  const magnitude = Math.abs(limpo);

  if (
    magnitude !== 0 &&
    (magnitude >= LIMITE_SUPERIOR || magnitude < LIMITE_INFERIOR)
  ) {
    return limpo.toExponential(6).replace(".", ",");
  }

  return new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 10 }).format(
    limpo,
  );
}

/**
 * Formatação da tabela de referência, mais tolerante que a do resultado: fatores
 * como 1e-9 precisam aparecer por extenso ("0,000000001") em vez de virar notação
 * científica, e fatores inteiros grandes (1024⁵) leem melhor com separador de
 * milhar do que como expoente.
 */
export function formatarFator(valor: number): string {
  if (!Number.isFinite(valor)) return "—";

  const limpo = Number.isInteger(valor) ? valor : Number(valor.toPrecision(6));
  const magnitude = Math.abs(limpo);

  if (magnitude !== 0 && (magnitude >= 1e18 || magnitude < 1e-15)) {
    return limpo.toExponential(4).replace(".", ",");
  }

  return new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 20 }).format(
    limpo,
  );
}
