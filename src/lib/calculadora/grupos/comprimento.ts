import { Ruler } from "lucide-react";
import { type GrupoUnidades, linear } from "../unidades";

export const COMPRIMENTO: GrupoUnidades = {
  slug: "comprimento",
  titulo: "Comprimento",
  icone: Ruler,
  idBase: "metro",
  padraoEntrada: "metro",
  padraoSaida: "centimetro",
  unidades: [
    linear("milimetro", "Milímetro", "mm", 1e-3),
    linear("centimetro", "Centímetro", "cm", 1e-2),
    linear("metro", "Metro", "m", 1),
    linear("quilometro", "Quilômetro", "km", 1000),
    linear("polegada", "Polegada", "pol", 0.0254),
    linear("pe", "Pé", "ft", 0.3048),
    linear("jarda", "Jarda", "jd", 0.9144),
    linear("milha", "Milha", "mi", 1609.344),
    linear("milha_nautica", "Milha náutica", "NM", 1852),
  ],
};
