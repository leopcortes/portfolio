"use client";

import { Check, ChevronDown, ChevronUp, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";

import { useToast } from "~/hooks/use-toast";
import { mover } from "~/lib/lista";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

import { CLASSES_INPUT } from "../_components/campos";
import {
  BotaoPrimario,
  BotaoSecundario,
  CabecalhoAdmin,
  Cartao,
} from "../_components/estrutura";

type AlvoSkill =
  | { tipo: "nova"; categoriaId: number }
  | { tipo: "edicao"; id: number }
  | null;

const CLASSES_ICONE =
  "rounded-md border border-borda_azul_1 p-1.5 text-texto_secundario transition-colors disabled:cursor-not-allowed disabled:opacity-30";

export default function PaginaSkills() {
  const { toast } = useToast();
  const utils = api.useUtils();
  const { data: categorias = [], isPending } =
    api.skill.listarCategorias.useQuery();

  const [novaCategoria, setNovaCategoria] = useState<string | null>(null);
  const [renomeando, setRenomeando] = useState<number | null>(null);
  const [nomeCategoria, setNomeCategoria] = useState("");
  const [alvoSkill, setAlvoSkill] = useState<AlvoSkill>(null);
  const [formSkill, setFormSkill] = useState({ nome: "", nivel: "" });

  const aoFalhar = (erro: { message: string }) =>
    toast({ description: erro.message, variant: "destructive", duration: 4000 });

  const recarregar = () => utils.skill.listarCategorias.invalidate();

  const fecharTudo = async (mensagem: string) => {
    await recarregar();
    setNovaCategoria(null);
    setRenomeando(null);
    setAlvoSkill(null);
    toast({ description: mensagem, duration: 2500 });
  };

  const criarCategoria = api.skill.criarCategoria.useMutation({
    onSuccess: () => fecharTudo("Categoria criada."),
    onError: aoFalhar,
  });
  const renomearCategoria = api.skill.renomearCategoria.useMutation({
    onSuccess: () => fecharTudo("Categoria renomeada."),
    onError: aoFalhar,
  });
  const removerCategoria = api.skill.removerCategoria.useMutation({
    onSuccess: () => fecharTudo("Categoria removida."),
    onError: aoFalhar,
  });
  const reordenarCategorias = api.skill.reordenarCategorias.useMutation({
    onSuccess: recarregar,
    onError: aoFalhar,
  });
  const criarSkill = api.skill.criarSkill.useMutation({
    onSuccess: () => fecharTudo("Skill adicionada."),
    onError: aoFalhar,
  });
  const atualizarSkill = api.skill.atualizarSkill.useMutation({
    onSuccess: () => fecharTudo("Skill salva."),
    onError: aoFalhar,
  });
  const removerSkill = api.skill.removerSkill.useMutation({
    onSuccess: () => fecharTudo("Skill removida."),
    onError: aoFalhar,
  });
  const reordenarSkills = api.skill.reordenarSkills.useMutation({
    onSuccess: recarregar,
    onError: aoFalhar,
  });

  const ocupado = [
    criarCategoria,
    renomearCategoria,
    removerCategoria,
    reordenarCategorias,
    criarSkill,
    atualizarSkill,
    removerSkill,
    reordenarSkills,
  ].some((mutacao) => mutacao.isPending);

  function salvarSkill(evento: React.FormEvent) {
    evento.preventDefault();
    if (!alvoSkill) return;

    const nome = formSkill.nome.trim();
    if (!nome) return;
    const nivel = formSkill.nivel.trim() || null;

    if (alvoSkill.tipo === "nova") {
      criarSkill.mutate({ categoriaId: alvoSkill.categoriaId, nome, nivel });
    } else {
      atualizarSkill.mutate({ id: alvoSkill.id, nome, nivel });
    }
  }

  if (isPending) {
    return <p className="text-[13px] text-texto_secundario">Carregando…</p>;
  }

  const formularioSkill = (
    <form onSubmit={salvarSkill} className="flex flex-wrap items-end gap-2">
      <input
        value={formSkill.nome}
        autoFocus
        placeholder="Nome da skill"
        onChange={(evento) =>
          setFormSkill({ ...formSkill, nome: evento.target.value })
        }
        className={cn(CLASSES_INPUT, "w-[180px]")}
      />
      <input
        value={formSkill.nivel}
        placeholder="Nível (opcional)"
        onChange={(evento) =>
          setFormSkill({ ...formSkill, nivel: evento.target.value })
        }
        className={cn(CLASSES_INPUT, "w-[150px]")}
      />
      <BotaoPrimario type="submit" disabled={ocupado}>
        Salvar
      </BotaoPrimario>
      <BotaoSecundario type="button" onClick={() => setAlvoSkill(null)}>
        Cancelar
      </BotaoSecundario>
    </form>
  );

  return (
    <>
      <CabecalhoAdmin
        titulo="Skills"
        descricao="Categorias e habilidades exibidas na seção Sobre mim."
        acao={
          <BotaoPrimario
            onClick={() => setNovaCategoria("")}
            disabled={ocupado}
            className="flex w-fit items-center gap-1.5"
          >
            <Plus size={15} />
            Nova categoria
          </BotaoPrimario>
        }
      />

      {novaCategoria !== null && (
        <form
          onSubmit={(evento) => {
            evento.preventDefault();
            const nome = novaCategoria.trim();
            if (nome) criarCategoria.mutate({ nome });
          }}
          className="mb-5 flex flex-wrap items-end gap-2"
        >
          <input
            value={novaCategoria}
            autoFocus
            placeholder="Nome da categoria"
            onChange={(evento) => setNovaCategoria(evento.target.value)}
            className={cn(CLASSES_INPUT, "w-[240px]")}
          />
          <BotaoPrimario type="submit" disabled={ocupado}>
            Criar
          </BotaoPrimario>
          <BotaoSecundario type="button" onClick={() => setNovaCategoria(null)}>
            Cancelar
          </BotaoSecundario>
        </form>
      )}

      <div className="flex flex-col gap-3">
        {categorias.length === 0 && (
          <Cartao className="text-[13px] text-texto_secundario">
            Nenhuma categoria cadastrada.
          </Cartao>
        )}

        {categorias.map((categoria, indiceCategoria) => (
          <Cartao key={categoria.id} className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              {renomeando === categoria.id ? (
                <form
                  onSubmit={(evento) => {
                    evento.preventDefault();
                    const nome = nomeCategoria.trim();
                    if (nome)
                      renomearCategoria.mutate({ id: categoria.id, nome });
                  }}
                  className="flex flex-wrap items-center gap-2"
                >
                  <input
                    value={nomeCategoria}
                    autoFocus
                    onChange={(evento) => setNomeCategoria(evento.target.value)}
                    className={cn(CLASSES_INPUT, "w-[220px]")}
                  />
                  <button
                    type="submit"
                    disabled={ocupado}
                    aria-label="Confirmar nome"
                    className={cn(
                      CLASSES_ICONE,
                      "hover:enabled:border-verde_principal hover:enabled:text-verde_principal",
                    )}
                  >
                    <Check size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setRenomeando(null)}
                    aria-label="Cancelar"
                    className={cn(CLASSES_ICONE, "hover:border-borda_azul_2")}
                  >
                    <X size={14} />
                  </button>
                </form>
              ) : (
                <h2 className="font-lexend text-[15px] text-texto_principal">
                  {categoria.nome}
                  <span className="ml-2 text-[12px] font-normal text-texto_secundario">
                    {categoria.skills.length}
                  </span>
                </h2>
              )}

              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  disabled={indiceCategoria === 0 || ocupado}
                  onClick={() =>
                    reordenarCategorias.mutate({
                      ids: mover(categorias, indiceCategoria, indiceCategoria - 1).map(
                        (item) => item.id,
                      ),
                    })
                  }
                  aria-label="Mover categoria para cima"
                  className={cn(
                    CLASSES_ICONE,
                    "hover:enabled:border-azul_principal hover:enabled:text-azul_principal",
                  )}
                >
                  <ChevronUp size={14} />
                </button>
                <button
                  type="button"
                  disabled={indiceCategoria === categorias.length - 1 || ocupado}
                  onClick={() =>
                    reordenarCategorias.mutate({
                      ids: mover(categorias, indiceCategoria, indiceCategoria + 1).map(
                        (item) => item.id,
                      ),
                    })
                  }
                  aria-label="Mover categoria para baixo"
                  className={cn(
                    CLASSES_ICONE,
                    "hover:enabled:border-azul_principal hover:enabled:text-azul_principal",
                  )}
                >
                  <ChevronDown size={14} />
                </button>
                <button
                  type="button"
                  disabled={ocupado}
                  onClick={() => {
                    setNomeCategoria(categoria.nome);
                    setRenomeando(categoria.id);
                  }}
                  aria-label="Renomear categoria"
                  className={cn(
                    CLASSES_ICONE,
                    "hover:enabled:border-verde_principal hover:enabled:text-verde_principal",
                  )}
                >
                  <Pencil size={14} />
                </button>
                <button
                  type="button"
                  disabled={ocupado}
                  onClick={() => removerCategoria.mutate({ id: categoria.id })}
                  aria-label="Remover categoria"
                  className={cn(
                    CLASSES_ICONE,
                    "hover:enabled:border-vermelho_aviso hover:enabled:text-vermelho_aviso",
                  )}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <ul className="flex flex-col divide-y divide-borda_azul_1/60">
              {categoria.skills.map((skill, indiceSkill) => (
                <li
                  key={skill.id}
                  className="flex items-center justify-between gap-3 py-1.5"
                >
                  {alvoSkill?.tipo === "edicao" && alvoSkill.id === skill.id ? (
                    formularioSkill
                  ) : (
                    <>
                      <span className="text-[13px] text-texto_secundario">
                        {skill.nome}
                        {skill.nivel && ` (${skill.nivel})`}
                      </span>

                      <div className="flex shrink-0 items-center gap-1.5">
                        <button
                          type="button"
                          disabled={indiceSkill === 0 || ocupado}
                          onClick={() =>
                            reordenarSkills.mutate({
                              ids: mover(
                                categoria.skills,
                                indiceSkill,
                                indiceSkill - 1,
                              ).map((item) => item.id),
                            })
                          }
                          aria-label="Mover skill para cima"
                          className={cn(
                            CLASSES_ICONE,
                            "hover:enabled:border-azul_principal hover:enabled:text-azul_principal",
                          )}
                        >
                          <ChevronUp size={13} />
                        </button>
                        <button
                          type="button"
                          disabled={
                            indiceSkill === categoria.skills.length - 1 || ocupado
                          }
                          onClick={() =>
                            reordenarSkills.mutate({
                              ids: mover(
                                categoria.skills,
                                indiceSkill,
                                indiceSkill + 1,
                              ).map((item) => item.id),
                            })
                          }
                          aria-label="Mover skill para baixo"
                          className={cn(
                            CLASSES_ICONE,
                            "hover:enabled:border-azul_principal hover:enabled:text-azul_principal",
                          )}
                        >
                          <ChevronDown size={13} />
                        </button>
                        <button
                          type="button"
                          disabled={ocupado}
                          onClick={() => {
                            setFormSkill({
                              nome: skill.nome,
                              nivel: skill.nivel ?? "",
                            });
                            setAlvoSkill({ tipo: "edicao", id: skill.id });
                          }}
                          aria-label="Editar skill"
                          className={cn(
                            CLASSES_ICONE,
                            "hover:enabled:border-verde_principal hover:enabled:text-verde_principal",
                          )}
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          type="button"
                          disabled={ocupado}
                          onClick={() => removerSkill.mutate({ id: skill.id })}
                          aria-label="Remover skill"
                          className={cn(
                            CLASSES_ICONE,
                            "hover:enabled:border-vermelho_aviso hover:enabled:text-vermelho_aviso",
                          )}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>

            {alvoSkill?.tipo === "nova" &&
            alvoSkill.categoriaId === categoria.id ? (
              formularioSkill
            ) : (
              <button
                type="button"
                disabled={ocupado}
                onClick={() => {
                  setFormSkill({ nome: "", nivel: "" });
                  setAlvoSkill({ tipo: "nova", categoriaId: categoria.id });
                }}
                className="flex w-fit items-center gap-1.5 rounded-md border border-borda_azul_1 px-3 py-1.5 text-[12px] text-texto_secundario transition-colors hover:border-verde_principal hover:text-verde_principal"
              >
                <Plus size={13} />
                Adicionar skill
              </button>
            )}
          </Cartao>
        ))}
      </div>
    </>
  );
}
