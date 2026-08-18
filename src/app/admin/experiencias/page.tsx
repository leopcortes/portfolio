"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { useToast } from "~/hooks/use-toast";
import { periodo } from "~/lib/formato";
import { api } from "~/trpc/react";

import { CampoBool, CampoLista, CampoTexto } from "../_components/campos";
import {
  BotaoPrimario,
  BotaoSecundario,
  CabecalhoAdmin,
  Cartao,
} from "../_components/estrutura";
import ListaAdmin from "../_components/ListaAdmin";

type Formulario = {
  organizacao: string;
  cargo: string;
  local: string;
  url: string;
  dataInicio: string;
  dataFim: string;
  atividades: string[];
  visivel: boolean;
};

const VAZIO: Formulario = {
  organizacao: "",
  cargo: "",
  local: "",
  url: "",
  dataInicio: "",
  dataFim: "",
  atividades: [""],
  visivel: true,
};

// <input type="month"> troca no formato YYYY-MM; o banco guarda o dia 1 em UTC.
const paraData = (mes: string): Date => new Date(`${mes}-01T00:00:00.000Z`);
const paraMes = (data: Date): string => data.toISOString().slice(0, 7);

export default function PaginaExperiencias() {
  const { toast } = useToast();
  const utils = api.useUtils();
  const { data: experiencias = [], isPending } =
    api.experiencia.listarTodas.useQuery();

  const [editando, setEditando] = useState<number | "nova" | null>(null);
  const [formulario, setFormulario] = useState<Formulario>(VAZIO);

  const aoFalhar = (erro: { message: string }) =>
    toast({ description: erro.message, variant: "destructive", duration: 4000 });

  const concluir = async (mensagem: string) => {
    await utils.experiencia.listarTodas.invalidate();
    setEditando(null);
    toast({ description: mensagem, duration: 2500 });
  };

  const criar = api.experiencia.criar.useMutation({
    onSuccess: () => concluir("Experiência criada."),
    onError: aoFalhar,
  });
  const atualizar = api.experiencia.atualizar.useMutation({
    onSuccess: () => concluir("Experiência salva."),
    onError: aoFalhar,
  });
  const remover = api.experiencia.remover.useMutation({
    onSuccess: () => concluir("Experiência removida."),
    onError: aoFalhar,
  });
  const reordenar = api.experiencia.reordenar.useMutation({
    onSuccess: () => utils.experiencia.listarTodas.invalidate(),
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
      organizacao: formulario.organizacao.trim(),
      cargo: formulario.cargo.trim(),
      local: formulario.local.trim(),
      url: formulario.url.trim() || null,
      dataInicio: paraData(formulario.dataInicio),
      dataFim: formulario.dataFim ? paraData(formulario.dataFim) : null,
      atividades: formulario.atividades
        .map((atividade) => atividade.trim())
        .filter(Boolean),
      visivel: formulario.visivel,
    };

    if (editando === "nova") criar.mutate(dados);
    else if (typeof editando === "number")
      atualizar.mutate({ id: editando, dados });
  }

  if (isPending) {
    return <p className="text-[13px] text-texto_secundario">Carregando…</p>;
  }

  return (
    <>
      <CabecalhoAdmin
        titulo="Experiências"
        descricao="Cargos exibidos na seção de experiências profissionais."
        acao={
          <BotaoPrimario
            onClick={() => {
              setFormulario(VAZIO);
              setEditando("nova");
            }}
            disabled={ocupado}
            className="flex w-fit items-center gap-1.5"
          >
            <Plus size={15} />
            Nova experiência
          </BotaoPrimario>
        }
      />

      {editando !== null && (
        <form onSubmit={enviar} className="mb-5 flex flex-col gap-4">
          <Cartao className="grid gap-4 sm:grid-cols-2">
            <CampoTexto
              rotulo="Organização"
              valor={formulario.organizacao}
              aoMudar={(valor) =>
                setFormulario({ ...formulario, organizacao: valor })
              }
            />
            <CampoTexto
              rotulo="Cargo"
              valor={formulario.cargo}
              aoMudar={(valor) => setFormulario({ ...formulario, cargo: valor })}
            />
            <CampoTexto
              rotulo="Local"
              valor={formulario.local}
              aoMudar={(valor) => setFormulario({ ...formulario, local: valor })}
            />
            <CampoTexto
              rotulo="Link (opcional)"
              tipo="url"
              valor={formulario.url}
              placeholder="https://exemplo.com"
              aoMudar={(valor) => setFormulario({ ...formulario, url: valor })}
            />
            <CampoTexto
              rotulo="Início"
              tipo="month"
              valor={formulario.dataInicio}
              aoMudar={(valor) =>
                setFormulario({ ...formulario, dataInicio: valor })
              }
            />
            <CampoTexto
              rotulo="Fim — vazio significa Presente"
              tipo="month"
              valor={formulario.dataFim}
              aoMudar={(valor) =>
                setFormulario({ ...formulario, dataFim: valor })
              }
            />
            <CampoLista
              rotulo="Atividades"
              itens={formulario.atividades}
              placeholder="O que você fez nessa posição"
              aoMudar={(itens) =>
                setFormulario({ ...formulario, atividades: itens })
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
        itens={experiencias}
        idDe={(item) => item.id}
        titulo={(item) => item.organizacao}
        oculto={(item) => !item.visivel}
        detalhe={(item) => (
          <>
            {item.cargo} · {periodo(item.dataInicio, item.dataFim)}
            <br />
            {item.local}
          </>
        )}
        rotuloRemocao={(item) => `A experiência "${item.organizacao}" será apagada.`}
        aoEditar={(item) => {
          setFormulario({
            organizacao: item.organizacao,
            cargo: item.cargo,
            local: item.local,
            url: item.url ?? "",
            dataInicio: paraMes(item.dataInicio),
            dataFim: item.dataFim ? paraMes(item.dataFim) : "",
            atividades: item.atividades.length > 0 ? item.atividades : [""],
            visivel: item.visivel,
          });
          setEditando(item.id);
        }}
        aoRemover={(item) => remover.mutate({ id: item.id })}
        aoReordenar={(ids) => reordenar.mutate({ ids })}
        ocupado={ocupado}
        vazio="Nenhuma experiência cadastrada."
      />
    </>
  );
}
