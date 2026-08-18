import type { Experiencia, Perfil } from "@prisma/client";

import ItemExperiencia from "~/components/portfolio/ItemExperiencia";
import SecaoPortfolio from "~/components/portfolio/SecaoPortfolio";

export default function Experiencias({
  perfil,
  experiencias,
}: {
  perfil: Perfil;
  experiencias: Experiencia[];
}) {
  return (
    <SecaoPortfolio rotulo="Experiências" titulo={perfil.tituloExperiencias}>
      <div className="flex flex-col gap-8">
        {experiencias.map((experiencia) => (
          <ItemExperiencia key={experiencia.id} experiencia={experiencia} />
        ))}
      </div>
    </SecaoPortfolio>
  );
}
