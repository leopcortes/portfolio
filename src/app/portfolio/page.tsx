import { notFound } from "next/navigation";

import AncoraSecao from "~/components/portfolio/AncoraSecao";
import { api } from "~/trpc/server";

import Contato from "./_components/Contato";
import Experiencias from "./_components/Experiencias";
import Footer from "./_components/Footer";
import Inicio from "./_components/Inicio";
import Navbar from "./_components/Navbar";
import Projetos from "./_components/Projetos";
import SobreMim from "./_components/SobreMim";

export default async function Portfolio() {
  const [perfil, experiencias, projetos, categorias, contatos] = await Promise.all([
    api.perfil.obter(),
    api.experiencia.listar(),
    api.projeto.listar(),
    api.skill.listarCategorias(),
    api.contato.listar(),
  ]);

  if (!perfil) notFound();

  return (
    <div className="flex min-h-screen flex-col bg-fundo_azul_1 text-texto_principal">
      <Navbar />

      <main className="mx-auto mb-24 mt-24 flex w-full max-w-[1200px] flex-1 flex-col gap-20 px-5 sm:mt-28 sm:gap-24 sm:px-8 lg:gap-32">
        <AncoraSecao name="inicio">
          <Inicio perfil={perfil} />
        </AncoraSecao>

        <AncoraSecao name="sobremim">
          <SobreMim perfil={perfil} categorias={categorias} />
        </AncoraSecao>

        <AncoraSecao name="projetos">
          <Projetos perfil={perfil} projetos={projetos} />
        </AncoraSecao>

        <AncoraSecao name="experiencias">
          <Experiencias perfil={perfil} experiencias={experiencias} />
        </AncoraSecao>

        <AncoraSecao name="contatos">
          <Contato perfil={perfil} contatos={contatos} />
        </AncoraSecao>
      </main>

      <Footer />
    </div>
  );
}
