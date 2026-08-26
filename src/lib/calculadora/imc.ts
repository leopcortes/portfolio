export type FaixaImc = {
  limite: number;
  classificacao: string;
  obesidade: string;
  rotuloFaixa: string;
};

/**
 * `limite` é o teto exclusivo da faixa. O legado comparava com 24,9 / 29,9 / 39,9,
 * o que jogava um IMC de 24,95 para fora de todas as faixas e imprimia "ERRO".
 */
export const FAIXAS_IMC: FaixaImc[] = [
  {
    limite: 18.5,
    classificacao: "Magreza",
    obesidade: "0",
    rotuloFaixa: "Menor que 18,5",
  },
  {
    limite: 25,
    classificacao: "Normal",
    obesidade: "0",
    rotuloFaixa: "Entre 18,5 e 24,9",
  },
  {
    limite: 30,
    classificacao: "Sobrepeso",
    obesidade: "I",
    rotuloFaixa: "Entre 25 e 29,9",
  },
  {
    limite: 40,
    classificacao: "Obesidade",
    obesidade: "II",
    rotuloFaixa: "Entre 30 e 39,9",
  },
  {
    limite: Infinity,
    classificacao: "Obesidade grave",
    obesidade: "III",
    rotuloFaixa: "Maior que 40",
  },
];

export function calcularImc(pesoKg: number, alturaM: number): number {
  return pesoKg / (alturaM * alturaM);
}

export function classificarImc(imc: number): FaixaImc | null {
  return FAIXAS_IMC.find((faixa) => imc < faixa.limite) ?? null;
}
