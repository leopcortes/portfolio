"use client";

import { EyeOff } from "lucide-react";

import { mover } from "~/lib/lista";

import { AcoesItem, Cartao } from "./estrutura";

type Props<T> = {
  itens: T[];
  idDe: (item: T) => number;
  titulo: (item: T) => React.ReactNode;
  detalhe?: (item: T) => React.ReactNode;
  oculto?: (item: T) => boolean;
  rotuloRemocao: (item: T) => string;
  aoEditar: (item: T) => void;
  aoRemover: (item: T) => void;
  aoReordenar: (ids: number[]) => void;
  ocupado?: boolean;
  vazio: string;
};

/**
 * Casca comum dos editores: ordenação, ações por item e estado vazio. Cada página
 * só descreve o que aparece em cada linha.
 */
export default function ListaAdmin<T>({
  itens,
  idDe,
  titulo,
  detalhe,
  oculto,
  rotuloRemocao,
  aoEditar,
  aoRemover,
  aoReordenar,
  ocupado,
  vazio,
}: Props<T>) {
  if (itens.length === 0) {
    return (
      <Cartao className="text-[13px] text-texto_secundario">{vazio}</Cartao>
    );
  }

  const reordenarPara = (de: number, para: number) =>
    aoReordenar(mover(itens, de, para).map(idDe));

  return (
    <ul className="flex flex-col gap-3">
      {itens.map((item, indice) => (
        <li key={idDe(item)}>
          <Cartao className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-lexend text-[15px] text-texto_principal">
                  {titulo(item)}
                </span>
                {oculto?.(item) && (
                  <span
                    title="Oculto no site"
                    className="flex items-center gap-1 rounded-full bg-fundo_azul_3 px-2 py-[2px] text-[10px] uppercase tracking-[0.1em] text-amarelo_aviso"
                  >
                    <EyeOff size={11} />
                    oculto
                  </span>
                )}
              </div>

              {detalhe && (
                <div className="text-[12.5px] leading-5 text-texto_secundario">
                  {detalhe(item)}
                </div>
              )}
            </div>

            <AcoesItem
              aoEditar={() => aoEditar(item)}
              aoRemover={() => aoRemover(item)}
              aoSubir={() => reordenarPara(indice, indice - 1)}
              aoDescer={() => reordenarPara(indice, indice + 1)}
              podeSubir={indice > 0}
              podeDescer={indice < itens.length - 1}
              descricaoRemocao={rotuloRemocao(item)}
              ocupado={ocupado}
            />
          </Cartao>
        </li>
      ))}
    </ul>
  );
}
