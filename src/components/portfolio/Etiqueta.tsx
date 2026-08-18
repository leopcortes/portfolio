import { cn } from "~/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Etiqueta({ children, className }: Props) {
  return (
    <span
      className={cn(
        "inline-block max-w-full break-words rounded-full border border-borda_azul_2 bg-fundo_azul_3 px-2.5 py-1 text-[0.72rem] font-medium tracking-[0.3px] text-texto_secundario",
        className,
      )}
    >
      {children}
    </span>
  );
}
