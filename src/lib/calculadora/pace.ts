export type ResultadoPace = {
  /** Ritmo em minutos por quilômetro, formatado como "5:30". */
  pace: string;
  /** Velocidade média em km/h. */
  velocidade: number;
};

/** Tabela de referência do projeto original: velocidade em km/h e o pace correspondente. */
export const REFERENCIA_PACE = [
  ["7 km/h", "8:34"],
  ["8 km/h", "7:30"],
  ["9 km/h", "6:40"],
  ["10 km/h", "6:00"],
  ["11 km/h", "5:27"],
  ["12 km/h", "5:00"],
  ["13 km/h", "4:37"],
  ["14 km/h", "4:15"],
  ["15 km/h", "4:00"],
];

/**
 * O legado obtinha os segundos multiplicando a parte decimal por 0,6 e depois
 * arredondando com toFixed(2) — um pace de 5,999 min/km saía como "5:60".
 * Trabalhar em segundos inteiros desde o início elimina o caso.
 */
export function calcularPace(
  distanciaKm: number,
  horas: number,
  minutos: number,
  segundos: number,
): ResultadoPace | null {
  if (distanciaKm <= 0) return null;

  const totalSegundos = horas * 3600 + minutos * 60 + segundos;
  if (totalSegundos <= 0) return null;

  const segundosPorKm = Math.round(totalSegundos / distanciaKm);
  const minutosPorKm = Math.floor(segundosPorKm / 60);
  const restoSegundos = segundosPorKm % 60;

  return {
    pace: `${minutosPorKm}:${String(restoSegundos).padStart(2, "0")}`,
    velocidade: distanciaKm / (totalSegundos / 3600),
  };
}
