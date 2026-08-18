"use client";

import type { Contato } from "@prisma/client";
import { ArrowUpRight, ClipboardCopy } from "lucide-react";

import { useToast } from "~/hooks/use-toast";

const CLASSES_BASE =
  "group flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[1rem] font-medium text-verde_principal transition-colors duration-300 hover:bg-fundo_azul_3 hover:text-verde_hover";

export default function LinkContato({ contato }: { contato: Contato }) {
  const { toast } = useToast();

  async function copiar() {
    try {
      await navigator.clipboard.writeText(contato.valor);
      toast({
        description: `${contato.rotulo} copiado para a área de transferência.`,
        className: "font-lexend",
        duration: 2500,
      });
    } catch {
      toast({
        description: "Não foi possível copiar.",
        variant: "destructive",
        duration: 2500,
      });
    }
  }

  const Icone = contato.acao === "LINK" ? ArrowUpRight : ClipboardCopy;

  // O valor fica sempre visível: no layout antigo ele só aparecia no hover, o que o
  // tornava inalcançável em telas de toque.
  const conteudo = (
    <>
      <span className="shrink-0">{contato.rotulo}</span>
      <span className="min-w-0 truncate text-[0.9rem] font-normal text-texto_secundario">
        {contato.valor}
      </span>
      <Icone
        size={18}
        className="ml-auto shrink-0 transition-transform duration-300 group-hover:translate-x-[4px]"
      />
    </>
  );

  if (contato.acao === "LINK" && contato.url) {
    return (
      <a
        href={contato.url}
        target="_blank"
        rel="noopener noreferrer"
        className={CLASSES_BASE}
      >
        {conteudo}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={copiar}
      aria-label={`Copiar ${contato.rotulo}: ${contato.valor}`}
      className={CLASSES_BASE}
    >
      {conteudo}
    </button>
  );
}
