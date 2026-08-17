export type EstiloMapa = "Escuro" | "Claro" | "Satélite";
export type Densidade = "Confortável" | "Compacta";

export const CONFIG = {
  estiloMapa: "Claro" as EstiloMapa,
  mostrarAcessos: true,
  densidade: "Confortável" as Densidade,
};

export const TILES: Record<EstiloMapa, { url: string; attribution: string }> = {
  Escuro: {
    url: "https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution: "&copy; OpenStreetMap &copy; CARTO",
  },
  Claro: {
    url: "https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attribution: "&copy; OpenStreetMap &copy; CARTO",
  },
  Satélite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Esri, Maxar, Earthstar Geographics",
  },
};

export const MAPA = {
  centro: [-15.7448, -47.8452] as [number, number],
  zoom: 14,
  maxZoom: 19,
};

// O Leaflet desenha em SVG/canvas e não enxerga classe do Tailwind: as cores das
// polilinhas precisam ser hex. Espelham os tokens do tailwind.config.ts.
export const CORES = {
  feito: "#12bf97",
  selecionado: "#679fe4",
  pendente: "#8b97a7",
  acesso: "#2f4a70",
};

export const TRACO = {
  feito: { weight: 5, opacity: 1 },
  selecionado: { weight: 7, opacity: 1 },
  pendente: { weight: 3.5, opacity: 0.85 },
  acesso: { weight: 2, opacity: 0.7 },
};
