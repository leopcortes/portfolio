"use client";

import { Menu, X } from "lucide-react";
import NextLink from "next/link";
import { useState } from "react";
import { Link as LinkScroll } from "react-scroll";

const SECOES = [
  { nome: "inicio", rotulo: "Início" },
  { nome: "sobremim", rotulo: "Sobre Mim" },
  { nome: "projetos", rotulo: "Projetos" },
  { nome: "experiencias", rotulo: "Experiências" },
  { nome: "contatos", rotulo: "Contato" },
] as const;

const CLASSES_LINK =
  "inline-block cursor-pointer text-sm font-semibold uppercase tracking-[0.5px] text-texto_secundario opacity-90 transition duration-300 ease-in hover:text-verde_principal";

const CLASSES_LOGO =
  "font-abril_fatface text-[1.75rem] tracking-[1px] text-texto_principal transition duration-300 sm:text-[2rem]";

function ItensNav({
  aoClicar,
  classeItem,
}: {
  aoClicar: () => void;
  classeItem?: string;
}) {
  return (
    <>
      {SECOES.map((secao) => (
        <li key={secao.nome} className={classeItem}>
          <LinkScroll
            to={secao.nome}
            spy
            smooth
            duration={700}
            offset={-100}
            activeClass="!text-verde_principal"
            onClick={aoClicar}
            className={CLASSES_LINK}
          >
            {secao.rotulo}
          </LinkScroll>
        </li>
      ))}
    </>
  );
}

export default function Navbar() {
  const [aberto, setAberto] = useState(false);
  const fechar = () => setAberto(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-fundo_azul_1/80 backdrop-blur-lg transition duration-300">
      <nav className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-5 sm:px-8">
        <NextLink href="/" className={CLASSES_LOGO}>
          <span className="text-verde_principal">L</span>PC.
        </NextLink>

        <ul className="hidden items-center gap-8 lg:flex xl:gap-12">
          <ItensNav aoClicar={fechar} />
        </ul>

        <button
          type="button"
          onClick={() => setAberto((estado) => !estado)}
          aria-expanded={aberto}
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          className="text-texto_principal transition-colors duration-300 hover:text-verde_principal lg:hidden"
        >
          {aberto ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {aberto && (
        <ul className="flex flex-col border-t border-borda_azul_1 bg-fundo_azul_1 px-5 pb-4 pt-2 sm:px-8 lg:hidden">
          <ItensNav aoClicar={fechar} classeItem="py-2.5" />
        </ul>
      )}
    </header>
  );
}
