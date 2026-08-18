import type { Perfil } from "@prisma/client";
import { Download } from "lucide-react";
import Image from "next/image";

export default function Inicio({ perfil }: { perfil: Perfil }) {
  return (
    <div className="flex flex-col-reverse items-start gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-abril_fatface text-[clamp(2rem,7.5vw,3.7rem)] font-normal leading-[1.1] text-texto_principal">
          {perfil.nome}
        </h1>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          <p className="text-[0.95rem] text-texto_secundario">{perfil.titulo}</p>

          {/* Âncora com `download` em vez de clique via JS: mantém a seção no servidor. */}
          <a
            href={perfil.curriculoUrl}
            download
            className="inline-flex items-center gap-1.5 border-b-[2.5px] border-azul_principal px-[0.15rem] text-[1.05rem] font-medium text-verde_principal transition duration-300 ease-in hover:border-verde_principal hover:text-verde_hover"
          >
            Meu Currículo
            <Download size={17} className="shrink-0" />
          </a>
        </div>
      </div>

      <Image
        src={perfil.fotoUrl}
        alt={perfil.nome}
        width={192}
        height={192}
        priority
        className="h-28 w-28 shrink-0 rounded-full object-cover sm:h-36 sm:w-36 lg:h-48 lg:w-48"
      />
    </div>
  );
}
