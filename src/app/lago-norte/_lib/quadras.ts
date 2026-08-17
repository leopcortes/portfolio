export type Tipo = "QI" | "QL";

export type Conjunto = {
  num: number;
  key: string;
};

export type Quadra = {
  id: string;
  tipo: Tipo;
  num: number;
  nome: string;
  conj: Conjunto[];
};

export const TIPOS: Tipo[] = ["QL", "QI"];

// Intervalos conferidos contra os dados reais do OpenStreetMap. Ponto de partida,
// não verdade final — ver absorverOSM().
export const SPEC: Record<Tipo, Record<number, [number, number]>> = {
  QI: {
    1: [1, 10],
    2: [1, 14],
    3: [1, 12],
    4: [1, 11],
    5: [1, 9],
    6: [1, 11],
    7: [1, 17],
    8: [1, 13],
    9: [1, 11],
    10: [1, 12],
    11: [1, 13],
    12: [1, 8],
    13: [1, 8],
    14: [1, 10],
    15: [1, 2],
    16: [1, 5],
  },
  QL: {
    1: [1, 8],
    2: [1, 12],
    3: [1, 8],
    4: [1, 7],
    5: [1, 7],
    6: [1, 7],
    7: [1, 7],
    8: [1, 8],
    9: [1, 7],
    10: [1, 6],
    11: [1, 8],
    12: [1, 6],
    13: [1, 6],
    14: [1, 8],
    15: [1, 9],
    16: [1, 6],
  },
};

export function chaveDe(tipo: Tipo, quadra: number, conjunto: number) {
  return `${tipo}-${quadra}-${conjunto}`;
}

export function rotuloDe(key: string) {
  const [tipo, quadra, conjunto] = key.split("-");
  return `${tipo} ${quadra} · Conjunto ${conjunto}`;
}

/** Conjuntos vistos no OSM que não existem no SPEC, agrupados por quadra. */
export type Extras = Record<string, number[]>;

// Ordem intercalada pelo número da quadra, QL antes de QI: QL 1, QI 1, QL 2, QI 2…
export function montarQuadras(extras: Extras = {}): Quadra[] {
  const nums = new Set<number>();
  for (const tipo of TIPOS) {
    for (const n of Object.keys(SPEC[tipo])) nums.add(Number(n));
  }

  const quadras: Quadra[] = [];
  for (const n of [...nums].sort((a, b) => a - b)) {
    for (const tipo of TIPOS) {
      const faixa = SPEC[tipo][n];
      if (!faixa) continue;

      const id = `${tipo}-${n}`;
      const conjuntos = new Set<number>();
      for (let c = faixa[0]; c <= faixa[1]; c++) conjuntos.add(c);
      for (const c of extras[id] ?? []) conjuntos.add(c);

      quadras.push({
        id,
        tipo,
        num: n,
        nome: `${tipo} ${n}`,
        conj: [...conjuntos]
          .sort((a, b) => a - b)
          .map((num) => ({ num, key: chaveDe(tipo, n, num) })),
      });
    }
  }
  return quadras;
}

// A lista se corrige pelos dados reais: qualquer conjunto que exista no mapa e não
// no SPEC entra na quadra correspondente, senão some da lista continuando no mapa.
export function absorverOSM(chaves: Iterable<string>): Extras {
  const extras: Extras = {};
  for (const k of chaves) {
    const [tipo, quadra, conjunto] = k.split("-");
    if (!tipo || !quadra || !conjunto) continue;

    const faixa = SPEC[tipo as Tipo]?.[Number(quadra)];
    const c = Number(conjunto);
    if (faixa && c >= faixa[0] && c <= faixa[1]) continue;

    const id = `${tipo}-${quadra}`;
    const lista = (extras[id] ??= []);
    if (!lista.includes(c)) lista.push(c);
  }
  return extras;
}
