import { ThermometerSun } from "lucide-react";
import { afim, type GrupoUnidades, linear } from "../unidades";

/**
 * Único grupo com relação afim: Celsius e Fahrenheit têm deslocamento de zero,
 * então não dá para representá-los por um fator. Kelvin e Rankine compartilham o
 * zero absoluto e continuam lineares.
 */
export const TEMPERATURA: GrupoUnidades = {
  slug: "temperatura",
  titulo: "Temperatura",
  icone: ThermometerSun,
  idBase: "kelvin",
  padraoEntrada: "celsius",
  padraoSaida: "fahrenheit",
  unidades: [
    afim(
      "celsius",
      "Celsius",
      "°C",
      (valor) => valor + 273.15,
      (valor) => valor - 273.15,
    ),
    afim(
      "fahrenheit",
      "Fahrenheit",
      "°F",
      (valor) => ((valor - 32) * 5) / 9 + 273.15,
      (valor) => ((valor - 273.15) * 9) / 5 + 32,
    ),
    linear("kelvin", "Kelvin", "K", 1),
    linear("rankine", "Rankine", "°R", 5 / 9),
  ],
  // "1 °C = 274,15 K" é verdade, mas inútil como referência: numa escala com
  // deslocamento de zero o que importa é a fórmula, não a equivalência de 1 grau.
  linhasTabela: [
    { rotulo: "Celsius → Fahrenheit", equivalencia: "°F = °C × 9/5 + 32" },
    { rotulo: "Celsius → Kelvin", equivalencia: "K = °C + 273,15" },
    { rotulo: "Celsius → Rankine", equivalencia: "°R = (°C + 273,15) × 9/5" },
    { rotulo: "Fahrenheit → Celsius", equivalencia: "°C = (°F − 32) × 5/9" },
    { rotulo: "Kelvin → Celsius", equivalencia: "°C = K − 273,15" },
    { rotulo: "Rankine → Celsius", equivalencia: "°C = °R × 5/9 − 273,15" },
  ],
};
