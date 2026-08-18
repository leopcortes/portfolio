import type { Perfil, Projeto } from "@prisma/client";

import CartaoProjeto from "~/components/portfolio/CartaoProjeto";
import SecaoPortfolio from "~/components/portfolio/SecaoPortfolio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

const CLASSES_CONTROLE =
  "static h-9 w-9 translate-y-0 border-none bg-fundo_azul_2 text-texto_principal transition-colors hover:bg-fundo_azul_3 hover:text-verde_principal disabled:opacity-40";

export default function Projetos({
  perfil,
  projetos,
}: {
  perfil: Perfil;
  projetos: Projeto[];
}) {
  return (
    <SecaoPortfolio
      rotulo="Projetos"
      titulo={perfil.tituloProjetos}
      texto={perfil.textoProjetos}
    >
      <Carousel className="w-full" opts={{ align: "start" }}>
        <CarouselContent className="items-stretch">
          {projetos.map((projeto) => (
            <CarouselItem
              key={projeto.id}
              className="basis-full sm:basis-1/2 xl:basis-1/3"
            >
              <CartaoProjeto projeto={projeto} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Controles saem do posicionamento absoluto (-left-12) para não ficarem fora da tela. */}
        <div className="mt-5 flex justify-end gap-2">
          <CarouselPrevious className={CLASSES_CONTROLE} />
          <CarouselNext className={CLASSES_CONTROLE} />
        </div>
      </Carousel>
    </SecaoPortfolio>
  );
}
