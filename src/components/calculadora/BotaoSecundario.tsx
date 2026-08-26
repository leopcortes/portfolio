import { type ReactNode } from "react";
import { cn } from "~/lib/utils";

type Props = {
  aoClicar: () => void;
  children: ReactNode;
  className?: string;
};

export default function BotaoSecundario({
  aoClicar,
  children,
  className,
}: Props) {
  return (
    <button
      type="button"
      onClick={aoClicar}
      className={cn(
        "rounded-lg bg-calc_campo px-6 py-2 text-lg text-white/70 transition-colors hover:bg-white/10 hover:text-texto_principal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-calc_superficie motion-reduce:transition-none",
        className,
      )}
    >
      {children}
    </button>
  );
}
