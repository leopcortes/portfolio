import { ArrowLeft, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { type ReactNode } from "react";

type Props = {
  titulo: string;
  icone: LucideIcon;
  /** Ação principal, alinhada à direita do título — o botão "Calcular". */
  acao?: ReactNode;
  children: ReactNode;
};

/**
 * Moldura comum a todas as telas de calculadora: fundo, cartão centrado, volta
 * para o índice e cabeçalho com ícone e título.
 */
export default function TelaCalculadora({
  titulo,
  icone: Icone,
  acao,
  children,
}: Props) {
  return (
    <main className="flex min-h-dvh w-full justify-center bg-calc_fundo px-4 py-8 sm:items-center sm:px-6 sm:py-10">
      <div className="flex w-full min-w-0 max-w-2xl flex-col gap-3">
        <Link
          href="/calculadora"
          className="inline-flex w-fit items-center gap-1.5 rounded-md text-sm text-white/50 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-calc_fundo motion-reduce:transition-none"
        >
          <ArrowLeft className="size-4" />
          Calculadoras
        </Link>

        {/* min-w-0: sem isto o `min-width: auto` de item flex deixa o conteúdo largo
            (a tabela) esticar o cartão para além da largura da tela. */}
        <div className="flex min-w-0 flex-col gap-5 rounded-xl bg-calc_superficie p-4 sm:p-6">
          <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
            <div className="flex items-center gap-2.5">
              <Icone
                className="size-7 shrink-0 sm:size-8"
                strokeWidth={2}
                aria-hidden
              />
              <h1 className="text-[clamp(1.35rem,5vw,1.75rem)] leading-tight">
                {titulo}
              </h1>
            </div>

            {acao}
          </header>

          {children}
        </div>
      </div>
    </main>
  );
}
