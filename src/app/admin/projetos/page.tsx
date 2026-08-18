"use client";

import { CategoriaProjeto } from "@prisma/client";
import { Plus } from "lucide-react";
import { useState } from "react";

import { useToast } from "~/hooks/use-toast";
import { ROTULO_CATEGORIA } from "~/lib/formato";
import { api } from "~/trpc/react";

import {
  CampoArea,
  CampoBool,
  CampoLista,
  CampoSelect,
  CampoTexto,
} from "../_components/campos";
import {
  BotaoPrimario,
  BotaoSecundario,
  CabecalhoAdmin,
  Cartao,
} from "../_components/estrutura";
import ListaAdmin from "../_components/ListaAdmin";

type Formulario = {
  titulo: string;
  descricao: string;
  categoria: CategoriaProjeto;
  url: string;
  tecnologias: string[];
  visivel: boolean;
};

const VAZIO: Formulario = {
  titulo: "",
  descricao: "",
  categoria: CategoriaProjeto.PESSOAL,
  url: "",
  tecnologias: [""],
  visivel: true,
};

const OPCOES_CATEGORIA = Object.values(CategoriaProjeto).map((categoria) => ({
  valor: categoria,
  rotulo: ROTULO_CATEGORIA[categoria],
}));

export default function PaginaProjetos() {
  const { toast } = useToast();
  const utils = api.useUtils();
  const { data: projetos = [], isPending } = api.projeto.listarTodos.useQuery();

  const [editando, setEditando] = useState<number | "novo" | null>(null);
  const [formulario, setFormulario] = useState<Formulario>(VAZIO);

  const aoFalhar = (erro: { message: string }) =>
    toast({ description: erro.message, variant: "destructive", duration: 4000 });

  const concluir = async (mensagem: string) => {
    await utils.projeto.listarTodos.invalidate();
    setEditando(null);
    toast({ description: mensagem, duration: 2500 });
  };

  const criar = api.projeto.criar.useMutation({
    onSuccess: () => concluir("Projeto criado."),
    onError: aoFalhar,
  });
  const atualizar = api.projeto.atualizar.useMutation({
    onSuccess: () => concluir("Projeto salvo."),
    onError: aoFalhar,
  });
  const remover = api.projeto.remover.useMutation({
    onSuccess: () => concluir("Projeto removido."),
    onError: aoFalhar,
  });
  const reordenar = api.projeto.reordenar.useMutation({
    onSuccess: () => utils.projeto.listarTodos.invalidate(),
    onError: aoFalhar,
  });

  const ocupado =
    criar.isPending ||
    atualizar.isPending ||
    remover.isPending ||
    reordenar.isPending;

  function enviar(evento: React.FormEvent) {
    evento.preventDefault();

    const dados = {
      titulo: formulario.titulo.trim(),
      descricao: formulario.descricao.trim(),
      categoria: formulario.categoria,
      url: formulario.url.trim() || null,
      tecnologias: formulario.tecnologias
        .map((tecnologia) => tecnologia.trim())
        .filter(Boolean),
      visivel: formulario.visivel,
    };

    if (editando === "novo") criar.mutate(dados);
    else if (typeof editando === "number")
      atualizar.mutate({ id: editando, dados });
  }

  if (isPending) {
    return <p className="text-[13px] text-texto_secundario">Carregando…</p>;
  }

  return (
    <>
      <CabecalhoAdmin
        titulo="Projetos"
        descricao="Cartões exibidos no carrossel de projetos."
        acao={
          <BotaoPrimario
            onClick={() => {
              setFormulario(VAZIO);
              setEditando("novo");
            }}
            disabled={ocupado}
            className="flex w-fit items-center gap-1.5"
          >
            <Plus size={15} />
            Novo projeto
          </BotaoPrimario>
        }
      />

      {editando !== null && (
        <form onSubmit={enviar} className="mb-5 flex flex-col gap-4">
          <Cartao className="grid gap-4 sm:grid-cols-2">
            <CampoTexto
              rotulo="Título"
              valor={formulario.titulo}
              aoMudar={(valor) =>
                setFormulario({ ...formulario, titulo: valor })
              }
            />
            <CampoSelect
              rotulo="Categoria"
              valor={formulario.categoria}
              opcoes={OPCOES_CATEGORIA}
              aoMudar={(valor) =>
                setFormulario({ ...formulario, categoria: valor })
              }
            />
            <CampoTexto
              rotulo="Link (opcional)"
              tipo="url"
              valor={formulario.url}
              placeholder="https://exemplo.com"
              aoMudar={(valor) => setFormulario({ ...formulario, url: valor })}
              className="sm:col-span-2"
            />
            <CampoArea
              rotulo="Descrição"
              valor={formulario.descricao}
              linhas={5}
              aoMudar={(valor) =>
                setFormulario({ ...formulario, descricao: valor })
              }
              className="sm:col-span-2"
            />
            <CampoLista
              rotulo="Tecnologias"
              itens={formulario.tecnologias}
              placeholder="React"
              aoMudar={(itens) =>
                setFormulario({ ...formulario, tecnologias: itens })
              }
              className="sm:col-span-2"
            />
            <CampoBool
              rotulo="Visível no site"
              valor={formulario.visivel}
              aoMudar={(valor) =>
                setFormulario({ ...formulario, visivel: valor })
              }
              className="sm:col-span-2"
            />
          </Cartao>

          <div className="flex gap-2">
            <BotaoPrimario type="submit" disabled={ocupado}>
              {ocupado ? "Salvando…" : "Salvar"}
            </BotaoPrimario>
            <BotaoSecundario type="button" onClick={() => setEditando(null)}>
              Cancelar
            </BotaoSecundario>
          </div>
        </form>
      )}

      <ListaAdmin
        itens={projetos}
        idDe={(item) => item.id}
        titulo={(item) => item.titulo}
        oculto={(item) => !item.visivel}
        detalhe={(item) => (
          <>
            {ROTULO_CATEGORIA[item.categoria]}
            {item.tecnologias.length > 0 && ` · ${item.tecnologias.join(", ")}`}
          </>
        )}
        rotuloRemocao={(item) => `O projeto "${item.titulo}" será apagado.`}
        aoEditar={(item) => {
          setFormulario({
            titulo: item.titulo,
            descricao: item.descricao,
            categoria: item.categoria,
            url: item.url ?? "",
            tecnologias: item.tecnologias.length > 0 ? item.tecnologias : [""],
            visivel: item.visivel,
          });
          setEditando(item.id);
        }}
        aoRemover={(item) => remover.mutate({ id: item.id })}
        aoReordenar={(ids) => reordenar.mutate({ ids })}
        ocupado={ocupado}
        vazio="Nenhum projeto cadastrado."
      />
    </>
  );
}
