"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

type Props = {
  feitos: number;
  total: number;
};

export default function Cabecalho({ feitos, total }: Props) {
  const razao = total ? (feitos / total) * 100 : 0;

  return (
    <header className="flex shrink-0 items-center gap-8 border-b border-borda_azul_1 bg-fundo_azul_2 px-7 py-[18px]">
      <div className="flex min-w-0 flex-col gap-[2px]">
        <div className="">
          <Link
            className="whitespace-nowrap font-abril_fatface text-[26px] leading-[1.05] tracking-[-0.01em] text-texto_principal"
            href="/"
          >
            Lago&nbsp;Norte
          </Link>
        </div>
        <div className="whitespace-nowrap text-[11px] uppercase tracking-[0.14em] text-texto_secundario">
          rastreador de corrida
        </div>
      </div>

      <div className="flex min-w-[140px] flex-1 flex-col gap-2">
        <div className="flex items-baseline justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold leading-none text-verde_principal">
              {Math.round(razao)}%
            </span>
          </div>
          <div className="whitespace-nowrap text-xs text-texto_secundario">
            <span className="font-medium text-texto_principal">{feitos}</span>{" "}
            de {total} conjuntos
          </div>
        </div>

        <div className="h-[7px] overflow-hidden rounded-[99px] border border-borda_azul_1 bg-trilha_azul_1">
          <div
            className="h-full rounded-[99px] bg-verde_principal transition-[width] duration-[350ms] ease-[ease]"
            style={{ width: `${razao}%` }}
          />
        </div>
      </div>

      <ControleSessao />
    </header>
  );
}

const BOTAO_SESSAO =
  "whitespace-nowrap rounded-[7px] border border-borda_azul_2 px-[13px] py-[7px] text-[11.5px] text-texto_secundario transition-colors duration-150 hover:border-azul_principal hover:text-texto_principal";

function ControleSessao() {
  const { data: sessao, status } = useSession();

  // enquanto a sessão não resolve, nada aparece — evita piscar "Entrar" para o admin
  if (status === "loading") return <div className="w-[70px] shrink-0" />;

  if (sessao?.user?.papel === "admin") {
    return (
      <div className="flex shrink-0 items-center gap-3">
        <span className="whitespace-nowrap text-[11px] uppercase tracking-[0.12em] text-verde_principal">
          admin
        </span>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/lago-norte" })}
          className={BOTAO_SESSAO}
        >
          Sair
        </button>
      </div>
    );
  }

  return (
    <>
      {/* <Link
        href="/login?callbackUrl=/lago-norte"
        className={`${BOTAO_SESSAO} shrink-0`}
      >
        Entrar
      </Link> */}
    </>
  );
}
