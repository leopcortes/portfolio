import { Unplug } from "lucide-react";
import { type ConfigAssociacao } from "../associacao";

export const RESISTORES: ConfigAssociacao = {
  slug: "resistores",
  titulo: "Resistores",
  icone: Unplug,
  simbolo: "R",
  grandeza: "Resistência equivalente",
  unidadeBase: "Ω",
  unidadePadrao: "ohm",
  serieSoma: true,
  imagemSerie: { src: "/resistoresserie.jpg", largura: 389, altura: 114 },
  imagemParalelo: { src: "/resistoresparalelo.jpg", largura: 329, altura: 130 },
  unidades: [
    { id: "ohm", simbolo: "Ω", rotulo: "Ω (ohms)", fator: 1 },
    { id: "kiloohm", simbolo: "kΩ", rotulo: "kΩ (kilohms)", fator: 1e3 },
    { id: "megaohm", simbolo: "MΩ", rotulo: "MΩ (megohms)", fator: 1e6 },
  ],
};
