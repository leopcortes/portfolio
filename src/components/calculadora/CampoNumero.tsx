"use client";

import { useId } from "react";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";

type Props = {
  rotulo: string;
  valor: string;
  aoMudar: (valor: string) => void;
  placeholder?: string;
  invalido?: boolean;
  className?: string;
};

export const CLASSES_CAMPO =
  "h-11 w-full rounded-md border-none bg-calc_campo px-3 text-base tabular-nums text-texto_principal placeholder:text-white/30 focus-visible:ring-white/40 focus-visible:ring-offset-calc_superficie md:text-base";

export default function CampoNumero({
  rotulo,
  valor,
  aoMudar,
  placeholder,
  invalido,
  className,
}: Props) {
  const id = useId();

  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm text-white/50">
        {rotulo}
      </label>

      <Input
        id={id}
        value={valor}
        onChange={(evento) => aoMudar(evento.target.value)}
        inputMode="decimal"
        autoComplete="off"
        placeholder={placeholder}
        aria-invalid={invalido}
        className={CLASSES_CAMPO}
      />
    </div>
  );
}
