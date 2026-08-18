import type { Contato as DadosContato, Perfil } from "@prisma/client";

import LinkContato from "~/components/portfolio/LinkContato";
import SecaoPortfolio from "~/components/portfolio/SecaoPortfolio";

export default function Contato({
  perfil,
  contatos,
}: {
  perfil: Perfil;
  contatos: DadosContato[];
}) {
  return (
    <SecaoPortfolio
      rotulo="Contate-me"
      titulo={perfil.tituloContato}
      texto={perfil.textoContato}
    >
      <ul className="grid gap-1 sm:grid-cols-2 lg:max-w-[760px]">
        {contatos.map((contato) => (
          <li key={contato.id} className="min-w-0">
            <LinkContato contato={contato} />
          </li>
        ))}
      </ul>
    </SecaoPortfolio>
  );
}
