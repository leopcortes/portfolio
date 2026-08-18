"use client";

import { useEffect, useState } from "react";

import { useToast } from "~/hooks/use-toast";
import { api } from "~/trpc/react";

import { CampoArea, CampoTexto } from "./_components/campos";
import { BotaoPrimario, CabecalhoAdmin, Cartao } from "./_components/estrutura";

type Formulario = {
  nome: string;
  titulo: string;
  dataNascimento: string;
  fotoUrl: string;
  curriculoUrl: string;
  localizacao: string;
  bio: string;
  tituloSobre: string;
  tituloProjetos: string;
  textoProjetos: string;
  tituloExperiencias: string;
  tituloContato: string;
  textoContato: string;
};

export default function PaginaPerfil() {
  const { toast } = useToast();
  const utils = api.useUtils();
  const { data: perfil, isPending } = api.perfil.obter.useQuery();
  const [formulario, setFormulario] = useState<Formulario | null>(null);

  useEffect(() => {
    if (!perfil) return;

    setFormulario({
      nome: perfil.nome,
      titulo: perfil.titulo,
      dataNascimento: perfil.dataNascimento.toISOString().slice(0, 10),
      fotoUrl: perfil.fotoUrl,
      curriculoUrl: perfil.curriculoUrl,
      localizacao: perfil.localizacao,
      bio: perfil.bio,
      tituloSobre: perfil.tituloSobre,
      tituloProjetos: perfil.tituloProjetos,
      textoProjetos: perfil.textoProjetos,
      tituloExperiencias: perfil.tituloExperiencias,
      tituloContato: perfil.tituloContato,
      textoContato: perfil.textoContato,
    });
  }, [perfil]);

  const salvar = api.perfil.atualizar.useMutation({
    onSuccess: async () => {
      await utils.perfil.obter.invalidate();
      toast({ description: "Perfil salvo.", duration: 2500 });
    },
    onError: (erro) =>
      toast({
        description: erro.message,
        variant: "destructive",
        duration: 4000,
      }),
  });

  function alterar<C extends keyof Formulario>(campo: C, valor: string) {
    setFormulario((atual) => (atual ? { ...atual, [campo]: valor } : atual));
  }

  if (isPending || !formulario) {
    return <p className="text-[13px] text-texto_secundario">Carregando…</p>;
  }

  return (
    <>
      <CabecalhoAdmin
        titulo="Perfil"
        descricao="Nome, foto, currículo e os textos de abertura de cada seção."
      />

      <form
        onSubmit={(evento) => {
          evento.preventDefault();
          salvar.mutate({
            ...formulario,
            // O <input type="date"> devolve YYYY-MM-DD, lido como meia-noite UTC.
            dataNascimento: new Date(`${formulario.dataNascimento}T00:00:00.000Z`),
          });
        }}
        className="flex flex-col gap-5"
      >
        <Cartao className="grid gap-4 sm:grid-cols-2">
          <CampoTexto
            rotulo="Nome"
            valor={formulario.nome}
            aoMudar={(valor) => alterar("nome", valor)}
          />
          <CampoTexto
            rotulo="Título"
            valor={formulario.titulo}
            aoMudar={(valor) => alterar("titulo", valor)}
          />
          <CampoTexto
            rotulo="Data de nascimento"
            tipo="date"
            valor={formulario.dataNascimento}
            aoMudar={(valor) => alterar("dataNascimento", valor)}
          />
          <CampoTexto
            rotulo="Localização"
            valor={formulario.localizacao}
            aoMudar={(valor) => alterar("localizacao", valor)}
          />
          <CampoTexto
            rotulo="Caminho da foto"
            valor={formulario.fotoUrl}
            placeholder="/foto-perfil-leo.jpg"
            aoMudar={(valor) => alterar("fotoUrl", valor)}
          />
          <CampoTexto
            rotulo="Caminho do currículo"
            valor={formulario.curriculoUrl}
            placeholder="/Curriculo_Leonardo_Cortes.pdf"
            aoMudar={(valor) => alterar("curriculoUrl", valor)}
          />
          <CampoArea
            rotulo="Bio — use {idade} para a idade calculada"
            valor={formulario.bio}
            linhas={5}
            aoMudar={(valor) => alterar("bio", valor)}
            className="sm:col-span-2"
          />
        </Cartao>

        <Cartao className="grid gap-4 sm:grid-cols-2">
          <CampoTexto
            rotulo="Título — Sobre mim"
            valor={formulario.tituloSobre}
            aoMudar={(valor) => alterar("tituloSobre", valor)}
          />
          <CampoTexto
            rotulo="Título — Experiências"
            valor={formulario.tituloExperiencias}
            aoMudar={(valor) => alterar("tituloExperiencias", valor)}
          />
          <CampoTexto
            rotulo="Título — Projetos"
            valor={formulario.tituloProjetos}
            aoMudar={(valor) => alterar("tituloProjetos", valor)}
          />
          <CampoTexto
            rotulo="Título — Contato"
            valor={formulario.tituloContato}
            aoMudar={(valor) => alterar("tituloContato", valor)}
          />
          <CampoArea
            rotulo="Texto — Projetos"
            valor={formulario.textoProjetos}
            aoMudar={(valor) => alterar("textoProjetos", valor)}
            className="sm:col-span-2"
          />
          <CampoArea
            rotulo="Texto — Contato"
            valor={formulario.textoContato}
            aoMudar={(valor) => alterar("textoContato", valor)}
            className="sm:col-span-2"
          />
        </Cartao>

        <BotaoPrimario
          type="submit"
          disabled={salvar.isPending}
          className="w-fit"
        >
          {salvar.isPending ? "Salvando…" : "Salvar perfil"}
        </BotaoPrimario>
      </form>
    </>
  );
}
