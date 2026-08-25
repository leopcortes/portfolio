import { ChartArea } from "lucide-react";
import { type GrupoUnidades, linear } from "../unidades";

export const AREA: GrupoUnidades = {
  slug: "area",
  titulo: "Área",
  icone: ChartArea,
  idBase: "metro_quadrado",
  padraoEntrada: "metro_quadrado",
  padraoSaida: "centimetro_quadrado",
  unidades: [
    linear("milimetro_quadrado", "Milímetro quadrado", "mm²", 1e-6),
    linear("centimetro_quadrado", "Centímetro quadrado", "cm²", 1e-4),
    linear("metro_quadrado", "Metro quadrado", "m²", 1),
    linear("quilometro_quadrado", "Quilômetro quadrado", "km²", 1e6),
    linear("are", "Are", "a", 100),
    linear("hectare", "Hectare", "ha", 10000),
    linear("alqueire_paulista", "Alqueire paulista", "alq", 24200),
    linear("polegada_quadrada", "Polegada quadrada", "pol²", 0.00064516),
    linear("pe_quadrado", "Pé quadrado", "ft²", 0.09290304),
    linear("acre", "Acre", "ac", 4046.8564224),
  ],
};
