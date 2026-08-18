"use client";

import { Plus, X } from "lucide-react";

import { cn } from "~/lib/utils";

export const CLASSES_INPUT =
  "w-full rounded-lg border border-borda_azul_1 bg-fundo_azul_1 px-3 py-[10px] text-[13px] text-texto_principal outline-none transition-colors placeholder:text-texto_secundario/60 focus:border-azul_principal";

const CLASSES_LABEL =
  "text-[11px] uppercase tracking-[0.12em] text-texto_secundario";

function Rotulo({ children }: { children: React.ReactNode }) {
  return <span className={CLASSES_LABEL}>{children}</span>;
}

type CampoBase = {
  rotulo: string;
  className?: string;
};

export function CampoTexto({
  rotulo,
  valor,
  aoMudar,
  tipo = "text",
  placeholder,
  className,
}: CampoBase & {
  valor: string;
  aoMudar: (valor: string) => void;
  tipo?: "text" | "url" | "date" | "month";
  placeholder?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-[6px]", className)}>
      <Rotulo>{rotulo}</Rotulo>
      <input
        type={tipo}
        value={valor}
        placeholder={placeholder}
        onChange={(evento) => aoMudar(evento.target.value)}
        className={CLASSES_INPUT}
      />
    </label>
  );
}

export function CampoArea({
  rotulo,
  valor,
  aoMudar,
  linhas = 4,
  className,
}: CampoBase & {
  valor: string;
  aoMudar: (valor: string) => void;
  linhas?: number;
}) {
  return (
    <label className={cn("flex flex-col gap-[6px]", className)}>
      <Rotulo>{rotulo}</Rotulo>
      <textarea
        value={valor}
        rows={linhas}
        onChange={(evento) => aoMudar(evento.target.value)}
        className={cn(CLASSES_INPUT, "resize-y leading-6")}
      />
    </label>
  );
}

export function CampoSelect<T extends string>({
  rotulo,
  valor,
  aoMudar,
  opcoes,
  className,
}: CampoBase & {
  valor: T;
  aoMudar: (valor: T) => void;
  opcoes: { valor: T; rotulo: string }[];
}) {
  return (
    <label className={cn("flex flex-col gap-[6px]", className)}>
      <Rotulo>{rotulo}</Rotulo>
      <select
        value={valor}
        onChange={(evento) => aoMudar(evento.target.value as T)}
        className={CLASSES_INPUT}
      >
        {opcoes.map((opcao) => (
          <option key={opcao.valor} value={opcao.valor}>
            {opcao.rotulo}
          </option>
        ))}
      </select>
    </label>
  );
}

export function CampoBool({
  rotulo,
  valor,
  aoMudar,
  className,
}: CampoBase & {
  valor: boolean;
  aoMudar: (valor: boolean) => void;
}) {
  return (
    <label
      className={cn("flex cursor-pointer items-center gap-2 py-1", className)}
    >
      <input
        type="checkbox"
        checked={valor}
        onChange={(evento) => aoMudar(evento.target.checked)}
        className="h-4 w-4 accent-verde_principal"
      />
      <Rotulo>{rotulo}</Rotulo>
    </label>
  );
}

/** Lista de strings editável — usada por atividades da experiência e tecnologias do projeto. */
export function CampoLista({
  rotulo,
  itens,
  aoMudar,
  placeholder,
  className,
}: CampoBase & {
  itens: string[];
  aoMudar: (itens: string[]) => void;
  placeholder?: string;
}) {
  const trocar = (indice: number, texto: string) =>
    aoMudar(itens.map((item, i) => (i === indice ? texto : item)));

  const remover = (indice: number) =>
    aoMudar(itens.filter((_, i) => i !== indice));

  return (
    <div className={cn("flex flex-col gap-[6px]", className)}>
      <Rotulo>{rotulo}</Rotulo>

      <div className="flex flex-col gap-2">
        {itens.map((item, indice) => (
          <div key={indice} className="flex items-center gap-2">
            <input
              value={item}
              placeholder={placeholder}
              onChange={(evento) => trocar(indice, evento.target.value)}
              className={CLASSES_INPUT}
            />
            <button
              type="button"
              onClick={() => remover(indice)}
              aria-label={`Remover item ${indice + 1}`}
              className="shrink-0 rounded-md border border-borda_azul_1 p-2 text-texto_secundario transition-colors hover:border-vermelho_aviso hover:text-vermelho_aviso"
            >
              <X size={14} />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => aoMudar([...itens, ""])}
          className="flex w-fit items-center gap-1.5 rounded-md border border-borda_azul_1 px-3 py-2 text-[12px] text-texto_secundario transition-colors hover:border-verde_principal hover:text-verde_principal"
        >
          <Plus size={14} />
          Adicionar
        </button>
      </div>
    </div>
  );
}
