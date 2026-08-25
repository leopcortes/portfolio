import { Gauge } from "lucide-react";
import { type GrupoUnidades, linear } from "../unidades";

export const VELOCIDADE: GrupoUnidades = {
  slug: "velocidade",
  titulo: "Velocidade",
  icone: Gauge,
  idBase: "metro_por_segundo",
  padraoEntrada: "quilometro_por_hora",
  padraoSaida: "metro_por_segundo",
  unidades: [
    linear("metro_por_segundo", "Metro por segundo", "m/s", 1),
    linear("quilometro_por_hora", "Quilômetro por hora", "km/h", 1 / 3.6),
    linear("quilometro_por_segundo", "Quilômetro por segundo", "km/s", 1000),
    linear("milha_por_hora", "Milha por hora", "mph", 0.44704),
    linear("pe_por_segundo", "Pé por segundo", "ft/s", 0.3048),
    linear("no", "Nó", "kn", 1852 / 3600),
    linear("mach", "Mach (ao nível do mar)", "Mach", 340.29),
  ],
};
