import type { Skill } from "@prisma/client";

import Etiqueta from "~/components/portfolio/Etiqueta";

type Props = {
  nome: string;
  skills: Pick<Skill, "id" | "nome" | "nivel">[];
};

export default function GrupoSkills({ nome, skills }: Props) {
  if (skills.length === 0) return null;

  return (
    <div className="flex flex-col gap-2.5">
      <h3 className="font-lexend text-[0.78rem] font-semibold uppercase tracking-[1px] text-texto_principal">
        {nome}
      </h3>

      <ul className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <li key={skill.id}>
            <Etiqueta>
              {skill.nome}
              {skill.nivel && ` (${skill.nivel})`}
            </Etiqueta>
          </li>
        ))}
      </ul>
    </div>
  );
}
