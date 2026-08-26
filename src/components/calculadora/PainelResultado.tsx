import { type ReactNode } from "react";
import { cn } from "~/lib/utils";

type Props = {
  erro?: string | null;
  children?: ReactNode;
  className?: string;
};

/**
 * A região viva precisa existir desde o primeiro render: criada junto com o
 * conteúdo, o leitor de tela não anuncia a mudança.
 */
export default function PainelResultado({ erro, children, className }: Props) {
  return (
    <div aria-live="polite" className={cn("empty:hidden", className)}>
      {erro ? (
        <p role="alert" className="text-sm text-red-400">
          {erro}
        </p>
      ) : (
        children
      )}
    </div>
  );
}
