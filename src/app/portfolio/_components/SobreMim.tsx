import type { CategoriaSkill, Perfil, Skill } from "@prisma/client";

import GrupoSkills from "~/components/portfolio/GrupoSkills";
import SecaoPortfolio from "~/components/portfolio/SecaoPortfolio";
import { aplicarIdade } from "~/lib/formato";

type Props = {
  perfil: Perfil;
  categorias: (CategoriaSkill & { skills: Skill[] })[];
};

export default function SobreMim({ perfil, categorias }: Props) {
  return (
    <div className="rounded-[20px] bg-fundo_azul_2 p-6 sm:rounded-[28px] sm:p-9 lg:p-12">
      <SecaoPortfolio
        rotulo="Sobre mim e skills"
        titulo={perfil.tituloSobre}
        texto={aplicarIdade(perfil.bio, perfil.dataNascimento)}
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {categorias.map((categoria) => (
            <GrupoSkills
              key={categoria.id}
              nome={categoria.nome}
              skills={categoria.skills}
            />
          ))}
        </div>
      </SecaoPortfolio>
    </div>
  );
}
