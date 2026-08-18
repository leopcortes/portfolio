"use client";

import { ExternalLink, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

import { cn } from "~/lib/utils";

const PAGINAS = [
  { href: "/admin", rotulo: "Perfil" },
  { href: "/admin/experiencias", rotulo: "Experiências" },
  { href: "/admin/projetos", rotulo: "Projetos" },
  { href: "/admin/skills", rotulo: "Skills" },
  { href: "/admin/contatos", rotulo: "Contatos" },
] as const;

export default function NavAdmin() {
  const caminho = usePathname();

  return (
    <header className="border-b border-borda_azul_1 bg-fundo_azul_2">
      <div className="mx-auto flex w-full max-w-[900px] flex-col gap-3 px-5 py-3 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/portfolio"
            className="font-abril_fatface text-[1.6rem] tracking-[1px] text-texto_principal"
          >
            <span className="text-verde_principal">L</span>PC.
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/portfolio"
              className="flex items-center gap-1.5 rounded-md border border-borda_azul_1 px-3 py-[7px] text-[12px] text-texto_secundario transition-colors hover:border-azul_principal hover:text-texto_principal"
            >
              Ver site
              <ExternalLink size={13} />
            </Link>

            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/portfolio" })}
              className="flex items-center gap-1.5 rounded-md border border-borda_azul_1 px-3 py-[7px] text-[12px] text-texto_secundario transition-colors hover:border-vermelho_aviso hover:text-vermelho_aviso"
            >
              Sair
              <LogOut size={13} />
            </button>
          </div>
        </div>

        <nav className="-mx-1 flex gap-1 overflow-x-auto pb-1">
          {PAGINAS.map((pagina) => (
            <Link
              key={pagina.href}
              href={pagina.href}
              className={cn(
                "shrink-0 rounded-md px-3 py-[7px] text-[12.5px] font-medium transition-colors",
                caminho === pagina.href
                  ? "bg-fundo_azul_3 text-verde_principal"
                  : "text-texto_secundario hover:bg-fundo_azul_3 hover:text-texto_principal",
              )}
            >
              {pagina.rotulo}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
