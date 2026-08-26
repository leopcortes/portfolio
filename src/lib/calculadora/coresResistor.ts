export type Faixa = {
  id: string;
  nome: string;
  hex: string;
};

export type FaixaDigito = Faixa & { digito: number };
export type FaixaMultiplicador = Faixa & { fator: number; rotuloFator: string };
export type FaixaTolerancia = Faixa & { tolerancia: string };

/** Cor do corpo cerâmico e dos terminais, herdadas do desenho original. */
export const COR_CORPO = "#dbbc7b";
export const COR_TERMINAL = "#787878";

export const DIGITOS: FaixaDigito[] = [
  { id: "preto", nome: "Preto", hex: "#111111", digito: 0 },
  { id: "marrom", nome: "Marrom", hex: "#964b00", digito: 1 },
  { id: "vermelho", nome: "Vermelho", hex: "#e01b24", digito: 2 },
  { id: "laranja", nome: "Laranja", hex: "#ff7800", digito: 3 },
  { id: "amarelo", nome: "Amarelo", hex: "#f6d32d", digito: 4 },
  { id: "verde", nome: "Verde", hex: "#2ec27e", digito: 5 },
  { id: "azul", nome: "Azul", hex: "#3584e4", digito: 6 },
  { id: "roxo", nome: "Roxo", hex: "#9141ac", digito: 7 },
  { id: "cinza", nome: "Cinza", hex: "#9a9996", digito: 8 },
  { id: "branco", nome: "Branco", hex: "#ffffff", digito: 9 },
];

export const MULTIPLICADORES: FaixaMultiplicador[] = [
  {
    id: "prata",
    nome: "Prata",
    hex: "#a8a9ad",
    fator: 0.01,
    rotuloFator: "× 0,01",
  },
  {
    id: "ouro",
    nome: "Ouro",
    hex: "#d4af37",
    fator: 0.1,
    rotuloFator: "× 0,1",
  },
  { id: "preto", nome: "Preto", hex: "#111111", fator: 1, rotuloFator: "× 1" },
  {
    id: "marrom",
    nome: "Marrom",
    hex: "#964b00",
    fator: 10,
    rotuloFator: "× 10",
  },
  {
    id: "vermelho",
    nome: "Vermelho",
    hex: "#e01b24",
    fator: 100,
    rotuloFator: "× 100",
  },
  {
    id: "laranja",
    nome: "Laranja",
    hex: "#ff7800",
    fator: 1e3,
    rotuloFator: "× 1k",
  },
  {
    id: "amarelo",
    nome: "Amarelo",
    hex: "#f6d32d",
    fator: 1e4,
    rotuloFator: "× 10k",
  },
  {
    id: "verde",
    nome: "Verde",
    hex: "#2ec27e",
    fator: 1e5,
    rotuloFator: "× 100k",
  },
  { id: "azul", nome: "Azul", hex: "#3584e4", fator: 1e6, rotuloFator: "× 1M" },
  {
    id: "roxo",
    nome: "Roxo",
    hex: "#9141ac",
    fator: 1e7,
    rotuloFator: "× 10M",
  },
];

export const TOLERANCIAS: FaixaTolerancia[] = [
  { id: "prata", nome: "Prata", hex: "#a8a9ad", tolerancia: "± 10%" },
  { id: "ouro", nome: "Ouro", hex: "#d4af37", tolerancia: "± 5%" },
  { id: "marrom", nome: "Marrom", hex: "#964b00", tolerancia: "± 1%" },
  { id: "vermelho", nome: "Vermelho", hex: "#e01b24", tolerancia: "± 2%" },
  { id: "verde", nome: "Verde", hex: "#2ec27e", tolerancia: "± 0,5%" },
  { id: "azul", nome: "Azul", hex: "#3584e4", tolerancia: "± 0,25%" },
  { id: "roxo", nome: "Roxo", hex: "#9141ac", tolerancia: "± 0,1%" },
];

export function resistencia(
  primeiro: FaixaDigito,
  segundo: FaixaDigito,
  multiplicador: FaixaMultiplicador,
): number {
  return (primeiro.digito * 10 + segundo.digito) * multiplicador.fator;
}
