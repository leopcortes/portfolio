"use client";

import { AcaoContato } from "@prisma/client";
import { Plus } from "lucide-react";
import { useState } from "react";

import { useToast } from "~/hooks/use-toast";
import { api } from "~/trpc/react";

import { CampoBool, CampoSelect, CampoTexto } from "../_components/campos";
import {
  BotaoPrimario,
  BotaoSecundario,
  CabecalhoAdmin,
  Cartao,
} from "../_components/estrutura";
import ListaAdmin from "../_components/ListaAdmin";

type Formulario = {
  rotulo: string;
  valor: string;
  url: string;
  acao: AcaoContato;
  visivel: boolean;
};

const VAZIO: Formulario = {
  rotulo: "",
  valor: "",
  url: "",
  acao: AcaoContato.COPIAR,
  visivel: true,
};

const OPCOES_ACAO = [
  { valor: AcaoContato.COPIAR, rotulo: "Copiar o valor" },
  { valor: AcaoContato.LINK, rotulo: "Abrir o link" },
];

export default function PaginaContatos() {
  const { toast } = useToast();
  const utils = api.useUtils();
  const { data: contatos = [], isPending } = api.contato.listarTodos.useQuery();

  const [editando, setEditando] = useState<number | "novo" | null>(null);
  const [formulario, setFormulario] = useState<Formulario>(VAZIO);

  const aoFalhar = (erro: { message: string }) =>
    toast({ description: erro.message, variant: "destructive", duration: 4000 });

  const concluir = async (mensagem: string) => {
    await utils.contato.listarTodos.invalidate();
    setEditando(null);
    toast({ description: mensagem, duration: 2500 });
  };

  const criar = api.contato.criar.useMutation({
    onSuccess: () => concluir("Contato criado."),
    onError: aoFalhar,
  });
  const atualizar = api.contato.atualizar.useMutation({
    onSuccess: () => concluir("Contato salvo."),
    onError: aoFalhar,
  });
  const remover = api.contato.remover.useMutation({
    onSuccess: () => concluir("Contato removido."),
    onError: aoFalhar,
  });
  const reordenar = api.contato.reordenar.useMutation({
    onSuccess: () => utils.contato.listarTodos.invalidate(),
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
      rotulo: formulario.rotulo.trim(),
      valor: formulario.valor.trim(),
      url: formulario.url.trim() || null,
      acao: formulario.acao,
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
        titulo="Contatos"
        descricao="Links e valores copiáveis da seção de contato."
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
            Novo contato
          </BotaoPrimario>
        }
      />

      {editando !== null && (
        <form onSubmit={enviar} className="mb-5 flex flex-col gap-4">
          <Cartao className="grid gap-4 sm:grid-cols-2">
            <CampoTexto
              rotulo="Rótulo"
              valor={formulario.rotulo}
              placeholder="email"
              aoMudar={(valor) =>
                setFormulario({ ...formulario, rotulo: valor })
              }
            />
            <CampoSelect
              rotulo="Ação ao clicar"
              valor={formulario.acao}
              opcoes={OPCOES_ACAO}
              aoMudar={(valor) => setFormulario({ ...formulario, acao: valor })}
            />
            <CampoTexto
              rotulo="Valor exibido"
              valor={formulario.valor}
              placeholder="leo.pereira.cortes@gmail.com"
              aoMudar={(valor) => setFormulario({ ...formulario, valor })}
            />
            <CampoTexto
              rotulo="URL — obrigatória para a ação de link"
              tipo="url"
              valor={formulario.url}
              placeholder="https://github.com/leopcortes"
              aoMudar={(valor) => setFormulario({ ...formulario, url: valor })}
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
        itens={contatos}
        idDe={(item) => item.id}
        titulo={(item) => item.rotulo}
        oculto={(item) => !item.visivel}
        detalhe={(item) => (
          <>
            {item.valor} ·{" "}
            {item.acao === AcaoContato.LINK ? "abre link" : "copia valor"}
          </>
        )}
        rotuloRemocao={(item) => `O contato "${item.rotulo}" será apagado.`}
        aoEditar={(item) => {
          setFormulario({
            rotulo: item.rotulo,
            valor: item.valor,
            url: item.url ?? "",
            acao: item.acao,
            visivel: item.visivel,
          });
          setEditando(item.id);
        }}
        aoRemover={(item) => remover.mutate({ id: item.id })}
        aoReordenar={(ids) => reordenar.mutate({ ids })}
        ocupado={ocupado}
        vazio="Nenhum contato cadastrado."
      />
    </>
  );
}
