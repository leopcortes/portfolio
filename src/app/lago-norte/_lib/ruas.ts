import { SPEC, type Tipo } from "./quadras";

export type Ponto = [number, number];

export type Via = {
  /** Chave do conjunto (`QL-10-3`), ou null quando é via de acesso da quadra. */
  k: string | null;
  q: string;
  g: Ponto[];
};

// Geometria pré-computada a partir da mesma query Overpass abaixo (~38 KB).
// Mantida em public/ para o mapa carregar instantâneo e sem depender dos mirrors.
const ASSET = "/lago-norte/ruas.json";

const QUERY =
  '[out:json][timeout:180];way["highway"~"^(residential|unclassified|living_street|tertiary|secondary|primary)$"](-15.782,-47.895,-15.712,-47.795);out geom;';

// Disparados em paralelo — vence o primeiro que responder. Nada de filtro por `name`
// na query: fica ordens de magnitude mais lenta. Os nomes são filtrados aqui.
const MIRRORS = [
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
  "https://overpass-api.de/api/interpreter",
  "https://overpass.osm.jp/api/interpreter",
];

type ElementoOSM = {
  type?: string;
  tags?: { name?: string };
  geometry?: ({ lat: number; lon: number } | null)[];
};

function parsear(elementos: ElementoOSM[]): Via[] {
  const vias: Via[] = [];
  for (const el of elementos) {
    if (el.type !== "way" || !el.geometry || !el.tags?.name) continue;

    const quadra = /\b(QI|QL)\s*0*(\d+)\b/i.exec(el.tags.name);
    if (!quadra?.[1] || !quadra[2]) continue;

    const tipo = quadra[1].toUpperCase() as Tipo;
    const qn = parseInt(quadra[2], 10);
    if (!SPEC[tipo]?.[qn]) continue;

    const conjunto = /conj(?:unto)?\.?\s*0*(\d+)/i.exec(el.tags.name);
    const cn = conjunto?.[1] ? parseInt(conjunto[1], 10) : null;

    const g: Ponto[] = [];
    for (const p of el.geometry) {
      if (p) g.push([+p.lat.toFixed(5), +p.lon.toFixed(5)]);
    }
    if (g.length < 2) continue;

    vias.push({ k: cn ? `${tipo}-${qn}-${cn}` : null, q: `${tipo}-${qn}`, g });
  }
  return vias;
}

async function doAsset(): Promise<Via[]> {
  const r = await fetch(ASSET);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const d = (await r.json()) as { ways?: Via[] };
  if (!Array.isArray(d.ways) || !d.ways.length) throw new Error("asset vazio");
  return d.ways;
}

async function doOverpass(): Promise<Via[]> {
  const data = await Promise.any(
    MIRRORS.map((ep) =>
      fetch(`${ep}?data=${encodeURIComponent(QUERY)}`).then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<{ elements?: ElementoOSM[] }>;
      }),
    ),
  );
  const vias = parsear(data.elements ?? []);
  if (!vias.length) throw new Error("nenhuma via reconhecida");
  return vias;
}

export async function carregarRuas(): Promise<Via[]> {
  try {
    return await doAsset();
  } catch (e) {
    console.warn("[Lago Norte] asset local indisponível, indo ao Overpass:", e);
    return doOverpass();
  }
}
