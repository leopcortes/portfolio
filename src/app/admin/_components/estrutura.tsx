"use client";

import { ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { cn } from "~/lib/utils";

export function CabecalhoAdmin({
  titulo,
  descricao,
  acao,
}: {
  titulo: string;
  descricao: string;
  acao?: React.ReactNode;
}) {
  return (
    <header className="mb-6 flex flex-col gap-3 border-b border-borda_azul_1 pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="font-abril_fatface text-[26px] leading-tight text-texto_principal">
          {titulo}
        </h1>
        <p className="text-[12px] text-texto_secundario">{descricao}</p>
      </div>
      {acao}
    </header>
  );
}

export function Cartao({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[14px] border border-borda_azul_1 bg-fundo_azul_2 p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

const CLASSES_BOTAO_ICONE =
  "rounded-md border border-borda_azul_1 p-2 text-texto_secundario transition-colors disabled:cursor-not-allowed disabled:opacity-30";

export function AcoesItem({
  aoEditar,
  aoSubir,
  aoDescer,
  aoRemover,
  podeSubir,
  podeDescer,
  descricaoRemocao,
  ocupado,
}: {
  aoEditar: () => void;
  aoSubir: () => void;
  aoDescer: () => void;
  aoRemover: () => void;
  podeSubir: boolean;
  podeDescer: boolean;
  descricaoRemocao: string;
  ocupado?: boolean;
}) {
  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <button
        type="button"
        onClick={aoSubir}
        disabled={!podeSubir || ocupado}
        aria-label="Mover para cima"
        className={cn(CLASSES_BOTAO_ICONE, "hover:enabled:border-azul_principal hover:enabled:text-azul_principal")}
      >
        <ChevronUp size={14} />
      </button>

      <button
        type="button"
        onClick={aoDescer}
        disabled={!podeDescer || ocupado}
        aria-label="Mover para baixo"
        className={cn(CLASSES_BOTAO_ICONE, "hover:enabled:border-azul_principal hover:enabled:text-azul_principal")}
      >
        <ChevronDown size={14} />
      </button>

      <button
        type="button"
        onClick={aoEditar}
        disabled={ocupado}
        aria-label="Editar"
        className={cn(CLASSES_BOTAO_ICONE, "hover:enabled:border-verde_principal hover:enabled:text-verde_principal")}
      >
        <Pencil size={14} />
      </button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            type="button"
            disabled={ocupado}
            aria-label="Remover"
            className={cn(CLASSES_BOTAO_ICONE, "hover:enabled:border-vermelho_aviso hover:enabled:text-vermelho_aviso")}
          >
            <Trash2 size={14} />
          </button>
        </AlertDialogTrigger>

        <AlertDialogContent className="border-borda_azul_1 bg-fundo_azul_2 font-poppins text-texto_principal">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-lexend">
              Remover definitivamente?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-texto_secundario">
              {descricaoRemocao} Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="border-borda_azul_1 bg-transparent text-texto_secundario hover:bg-fundo_azul_3 hover:text-texto_principal">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={aoRemover}
              className="bg-vermelho_aviso text-white hover:bg-vermelho_aviso/85"
            >
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export function BotaoPrimario({
  children,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      {...props}
      className={cn(
        "rounded-[8px] border border-verde_principal bg-verde_principal px-4 py-[9px] text-[13px] font-medium text-fundo_azul_1 transition-colors duration-150 hover:bg-verde_hover hover:text-texto_principal disabled:cursor-not-allowed disabled:opacity-60",
        props.className,
      )}
    >
      {children}
    </button>
  );
}

export function BotaoSecundario({
  children,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      {...props}
      className={cn(
        "rounded-[8px] border border-borda_azul_1 px-4 py-[9px] text-[13px] font-medium text-texto_secundario transition-colors duration-150 hover:border-borda_azul_2 hover:text-texto_principal disabled:cursor-not-allowed disabled:opacity-60",
        props.className,
      )}
    >
      {children}
    </button>
  );
}
