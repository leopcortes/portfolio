import { Clock } from "lucide-react";
import { type GrupoUnidades, linear } from "../unidades";

export const TEMPO: GrupoUnidades = {
  slug: "tempo",
  titulo: "Tempo",
  icone: Clock,
  idBase: "segundo",
  padraoEntrada: "hora",
  padraoSaida: "minuto",
  unidades: [
    linear("nanossegundo", "Nanossegundo", "ns", 1e-9),
    linear("microssegundo", "Microssegundo", "µs", 1e-6),
    linear("milissegundo", "Milissegundo", "ms", 1e-3),
    linear("segundo", "Segundo", "s", 1),
    linear("minuto", "Minuto", "min", 60),
    linear("hora", "Hora", "h", 3600),
    linear("dia", "Dia", "d", 86400),
    linear("semana", "Semana", "sem", 604800),
    linear("mes", "Mês (30 dias)", "mês", 2592000),
    linear("ano", "Ano (365 dias)", "ano", 31536000),
  ],
};
