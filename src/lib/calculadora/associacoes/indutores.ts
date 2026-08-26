import { BatteryCharging } from "lucide-react";
import { type ConfigAssociacao } from "../associacao";

export const INDUTORES: ConfigAssociacao = {
  slug: "indutores",
  titulo: "Indutores",
  icone: BatteryCharging,
  simbolo: "L",
  grandeza: "Indutância equivalente",
  unidadeBase: "H",
  unidadePadrao: "milihenry",
  serieSoma: true,
  imagemSerie: { src: "/indutoresserie.jpg", largura: 521, altura: 104 },
  imagemParalelo: { src: "/indutoresparalelo.jpg", largura: 354, altura: 141 },
  unidades: [
    { id: "henry", simbolo: "H", rotulo: "H (henry)", fator: 1 },
    { id: "milihenry", simbolo: "mH", rotulo: "mH (milihenry)", fator: 1e-3 },
    { id: "microhenry", simbolo: "µH", rotulo: "µH (microhenry)", fator: 1e-6 },
    { id: "nanohenry", simbolo: "nH", rotulo: "nH (nanohenry)", fator: 1e-9 },
    { id: "picohenry", simbolo: "pH", rotulo: "pH (picohenry)", fator: 1e-12 },
  ],
};
