import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { type Unidade } from "~/lib/calculadora/unidades";
import { cn } from "~/lib/utils";

type Props = {
  rotulo: string;
  unidades: Unidade[];
  valor: string;
  aoMudar: (id: string) => void;
  className?: string;
};

/**
 * O Select do Radix não é um <select> nativo, então `htmlFor` não o alcança: o
 * nome acessível vem do aria-label do gatilho.
 */
export default function SeletorUnidade({
  rotulo,
  unidades,
  valor,
  aoMudar,
  className,
}: Props) {
  return (
    <Select value={valor} onValueChange={aoMudar}>
      <SelectTrigger
        aria-label={rotulo}
        className={cn(
          "h-11 w-full border-none bg-calc_campo text-base text-texto_principal focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-calc_superficie",
          className,
        )}
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent className="max-h-72 border-none bg-calc_campo font-lexend font-light text-texto_principal">
        {unidades.map((unidade) => (
          <SelectItem
            key={unidade.id}
            value={unidade.id}
            className="text-base focus:bg-white/10 focus:text-texto_principal"
          >
            {unidade.nome} ({unidade.simbolo})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
