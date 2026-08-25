import { type LucideIcon } from "lucide-react";
import TelaCalculadora from "./TelaCalculadora";

/**
 * Marcador das calculadoras que ainda não foram migradas do projeto original.
 * Sem ele o índice leva a uma tela preta vazia.
 */
export default function EmConstrucao({
  titulo,
  icone,
}: {
  titulo: string;
  icone: LucideIcon;
}) {
  return (
    <TelaCalculadora titulo={titulo} icone={icone}>
      <p className="text-white/50">
        Esta calculadora ainda não foi migrada para a nova versão do site.
      </p>
    </TelaCalculadora>
  );
}
