import { CircleGauge } from "lucide-react";
import { type GrupoUnidades, linear } from "../unidades";

export const PRESSAO: GrupoUnidades = {
  slug: "pressao",
  titulo: "Pressão",
  icone: CircleGauge,
  idBase: "pascal",
  padraoEntrada: "bar",
  padraoSaida: "pascal",
  unidades: [
    linear("pascal", "Pascal", "Pa", 1),
    linear("quilopascal", "Quilopascal", "kPa", 1000),
    linear("milibar", "Milibar", "mbar", 100),
    linear("bar", "Bar", "bar", 100000),
    linear("atmosfera", "Atmosfera", "atm", 101325),
    linear("mmhg", "Milímetro de mercúrio", "mmHg", 133.322387415),
    linear("psi", "Libra por polegada quadrada", "psi", 6894.757293168),
    linear("kgf_cm2", "Quilograma-força por cm²", "kgf/cm²", 98066.5),
  ],
};
