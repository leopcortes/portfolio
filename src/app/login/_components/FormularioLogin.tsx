"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function FormularioLogin() {
  const router = useRouter();
  const destino = useSearchParams().get("callbackUrl") ?? "/lago-norte";

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setEnviando(true);

    // redirect:false para tratar o erro aqui em vez de cair na página de erro do NextAuth
    const r = await signIn("credentials", { usuario, senha, redirect: false });

    if (r?.ok) {
      router.push(destino);
      router.refresh();
      return;
    }

    setErro("Usuário ou senha inválidos.");
    setEnviando(false);
  }

  return (
    <form
      onSubmit={enviar}
      className="flex w-full max-w-[360px] flex-col gap-4 rounded-[14px] border border-borda_azul_1 bg-fundo_azul_2 p-7"
    >
      <div className="flex flex-col gap-1">
        <h1 className="font-abril_fatface text-[26px] leading-tight text-texto_principal">
          Entrar
        </h1>
        <p className="text-[12px] text-texto_secundario">
          Acesso restrito à administração do site.
        </p>
      </div>

      <label className="flex flex-col gap-[6px]">
        <span className="text-[11px] uppercase tracking-[0.12em] text-texto_secundario">
          Usuário
        </span>
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          autoComplete="username"
          autoFocus
          required
          className="rounded-lg border border-borda_azul_1 bg-fundo_azul_1 px-3 py-[10px] text-[13px] text-texto_principal outline-none focus:border-azul_principal"
        />
      </label>

      <label className="flex flex-col gap-[6px]">
        <span className="text-[11px] uppercase tracking-[0.12em] text-texto_secundario">
          Senha
        </span>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          autoComplete="current-password"
          required
          className="rounded-lg border border-borda_azul_1 bg-fundo_azul_1 px-3 py-[10px] text-[13px] text-texto_principal outline-none focus:border-azul_principal"
        />
      </label>

      {erro && (
        <div
          role="alert"
          className="flex items-center gap-[10px] rounded-[8px] border border-borda_azul_2 bg-fundo_azul_3 px-3 py-[9px] text-[12px] text-texto_principal"
        >
          <span className="h-[7px] w-[7px] shrink-0 rounded-[99px] bg-vermelho_aviso" />
          {erro}
        </div>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="rounded-[8px] border border-verde_principal bg-verde_principal px-4 py-[10px] text-[13px] font-medium text-fundo_azul_1 transition-colors duration-150 hover:bg-verde_hover hover:text-texto_principal disabled:cursor-not-allowed disabled:opacity-60"
      >
        {enviando ? "Entrando…" : "Entrar"}
      </button>

      <Link
        href="/lago-norte"
        className="text-center text-[11.5px] text-texto_secundario hover:text-azul_principal"
      >
        voltar ao rastreador
      </Link>
    </form>
  );
}
