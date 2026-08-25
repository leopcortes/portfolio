import { Weight } from "lucide-react";
import { type GrupoUnidades, linear } from "../unidades";

export const MASSA: GrupoUnidades = {
  slug: "massa",
  titulo: "Massa",
  icone: Weight,
  idBase: "quilograma",
  padraoEntrada: "quilograma",
  padraoSaida: "grama",
  unidades: [
    linear("miligrama", "Miligrama", "mg", 1e-6),
    linear("grama", "Grama", "g", 1e-3),
    linear("quilograma", "Quilograma", "kg", 1),
    linear("tonelada", "Tonelada", "t", 1000),
    linear("onca", "Onça", "oz", 0.028349523125),
    linear("libra", "Libra", "lb", 0.45359237),
    linear("arroba", "Arroba", "@", 14.6886),
  ],
};
