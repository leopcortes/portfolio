import { CircuitBoard } from "lucide-react";
import { type ConfigAssociacao } from "../associacao";

export const CAPACITORES: ConfigAssociacao = {
  slug: "capacitores",
  titulo: "Capacitores",
  icone: CircuitBoard,
  simbolo: "C",
  grandeza: "Capacitância equivalente",
  unidadeBase: "F",
  unidadePadrao: "microfarad",
  // Capacitor é o caso invertido: soma em paralelo, inverso da soma dos inversos em série.
  serieSoma: false,
  imagemSerie: { src: "/capacitoresserie.jpg", largura: 384, altura: 112 },
  imagemParalelo: {
    src: "/capacitoresparalelo.jpg",
    largura: 329,
    altura: 136,
  },
  unidades: [
    { id: "farad", simbolo: "F", rotulo: "F (farads)", fator: 1 },
    { id: "milifarad", simbolo: "mF", rotulo: "mF (milifarads)", fator: 1e-3 },
    {
      id: "microfarad",
      simbolo: "µF",
      rotulo: "µF (microfarads)",
      fator: 1e-6,
    },
    { id: "nanofarad", simbolo: "nF", rotulo: "nF (nanofarads)", fator: 1e-9 },
    { id: "picofarad", simbolo: "pF", rotulo: "pF (picofarads)", fator: 1e-12 },
  ],
};
