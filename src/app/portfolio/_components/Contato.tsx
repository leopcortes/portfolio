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
      <ul className="grid gap-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {contatos.map((contato) => (
          <li key={contato.id} className="min-w-0">
            <LinkContato contato={contato} />
          </li>
        ))}
      </ul>
    </SecaoPortfolio>
  );
}
