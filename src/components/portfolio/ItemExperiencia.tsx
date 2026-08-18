import type { Experiencia } from "@prisma/client";
import { Calendar, ExternalLink, MapPin } from "lucide-react";

import { dominio, periodo } from "~/lib/formato";

export default function ItemExperiencia({
  experiencia,
}: {
  experiencia: Experiencia;
}) {
  return (
    <article className="flex flex-col gap-4 border-b-[2px] border-b-fundo_azul_2 pb-6 lg:flex-row lg:justify-between lg:gap-8">
      <div className="flex flex-col gap-2">
        <h3 className="font-lexend text-xl leading-snug text-texto_principal sm:text-2xl">
          {experiencia.organizacao}
        </h3>

        <p className="text-[0.95rem] text-texto_principal">{experiencia.cargo}</p>

        <ul className="list-disc pl-5 text-[0.9rem] leading-6 text-texto_secundario">
          {experiencia.atividades.map((atividade) => (
            <li key={atividade}>{atividade}</li>
          ))}
        </ul>

        {experiencia.url && (
          <a
            href={experiencia.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1.5 text-[0.9rem] font-medium text-verde_principal underline-offset-4 transition-colors duration-300 hover:text-verde_hover hover:underline"
          >
            {dominio(experiencia.url)}
            <ExternalLink size={15} className="shrink-0" />
          </a>
        )}
      </div>

      {/* lg:flex-row-reverse alinha ícone à direita do texto quando a coluna encosta na borda */}
      <div className="flex shrink-0 flex-col gap-2 text-[0.9rem] text-texto_secundario lg:items-end lg:text-right">
        <div className="flex items-center gap-2 lg:flex-row-reverse">
          <Calendar size={17} className="shrink-0" />
          <p>{periodo(experiencia.dataInicio, experiencia.dataFim)}</p>
        </div>

        <div className="flex items-center gap-2 lg:flex-row-reverse">
          <MapPin size={17} className="shrink-0" />
          <p>{experiencia.local}</p>
        </div>
      </div>
    </article>
  );
}
