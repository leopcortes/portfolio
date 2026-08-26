import { type ReactNode } from "react";
import { cn } from "~/lib/utils";

type Props = {
  /**
   * Id do <form> quando o botão fica fora dele — nas conversões ele mora no
   * cabeçalho. Dentro do próprio form, basta omitir.
   */
  form?: string;
  children?: ReactNode;
  className?: string;
};

export default function BotaoCalcular({
  form,
  children = "Calcular",
  className,
}: Props) {
  return (
    <button
      type="submit"
      form={form}
      className={cn(
        "rounded-lg bg-calc_acento px-6 py-2 text-lg transition-colors hover:bg-calc_acento_hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-calc_superficie active:bg-calc_acento_hover motion-reduce:transition-none",
        className,
      )}
    >
      {children}
    </button>
  );
}
