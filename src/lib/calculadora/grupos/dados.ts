import { DatabaseZap } from "lucide-react";
import { type GrupoUnidades, linear } from "../unidades";

const KIB = 1024;

export const DADOS: GrupoUnidades = {
  slug: "dados",
  titulo: "Dados",
  icone: DatabaseZap,
  idBase: "byte",
  padraoEntrada: "megabyte",
  padraoSaida: "kilobyte",
  unidades: [
    linear("bit", "Bit", "b", 1 / 8),
    linear("byte", "Byte", "B", 1),
    linear("kilobyte", "Kilobyte", "KB", KIB),
    linear("megabyte", "Megabyte", "MB", KIB ** 2),
    linear("gigabyte", "Gigabyte", "GB", KIB ** 3),
    linear("terabyte", "Terabyte", "TB", KIB ** 4),
    linear("petabyte", "Petabyte", "PB", KIB ** 5),
  ],
};
