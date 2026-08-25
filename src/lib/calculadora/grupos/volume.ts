import { Box } from "lucide-react";
import { type GrupoUnidades, linear } from "../unidades";

export const VOLUME: GrupoUnidades = {
  slug: "volume",
  titulo: "Volume",
  icone: Box,
  idBase: "litro",
  padraoEntrada: "litro",
  padraoSaida: "mililitro",
  unidades: [
    linear("mililitro", "Mililitro", "ml", 1e-3),
    linear("centimetro_cubico", "Centímetro cúbico", "cm³", 1e-3),
    linear("litro", "Litro", "L", 1),
    linear("metro_cubico", "Metro cúbico", "m³", 1000),
    linear("onca_fluida", "Onça fluida (US)", "fl oz", 0.0295735295625),
    linear("xicara", "Xícara (US)", "xíc", 0.2365882365),
    linear("pinta", "Pinta (US)", "pt", 0.473176473),
    linear("quarto", "Quarto (US)", "qt", 0.946352946),
    linear("galao", "Galão (US)", "gal", 3.785411784),
  ],
};
