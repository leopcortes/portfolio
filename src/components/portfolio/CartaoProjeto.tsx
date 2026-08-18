import type { Projeto } from "@prisma/client";
import { ArrowUpRight } from "lucide-react";

import Etiqueta from "~/components/portfolio/Etiqueta";
import { ROTULO_CATEGORIA } from "~/lib/formato";

export default function CartaoProjeto({ projeto }: { projeto: Projeto }) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-2xl border border-borda_azul_1 bg-fundo_azul_2 p-5 transition-colors duration-300 hover:border-borda_azul_2">
      <p className="border-l-[3px] border-azul_principal px-3 text-[0.72rem] font-medium uppercase leading-4 tracking-[0.5px] text-verde_principal">
        {ROTULO_CATEGORIA[projeto.categoria]}
      </p>

      <h3 className="font-lexend text-xl font-semibold leading-snug text-texto_principal sm:text-2xl">
        {projeto.url ? (
          <a
            href={projeto.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-start gap-1.5 transition-colors duration-300 hover:text-verde_principal"
          >
            {projeto.titulo}
            <ArrowUpRight
              size={18}
              className="mt-1 shrink-0 transition-transform duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
            />
          </a>
        ) : (
          projeto.titulo
        )}
      </h3>

      <p className="flex-grow text-[0.9rem] leading-6 text-texto_secundario">
        {projeto.descricao}
      </p>

      {projeto.tecnologias.length > 0 && (
        <ul className="flex flex-wrap gap-1.5">
          {projeto.tecnologias.map((tecnologia) => (
            <li key={tecnologia}>
              <Etiqueta>{tecnologia}</Etiqueta>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
