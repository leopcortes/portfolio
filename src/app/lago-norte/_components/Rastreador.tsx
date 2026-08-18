"use client";

import { useSession } from "next-auth/react";
import { useEffect, useMemo, useRef, useState } from "react";

import { useToast } from "~/hooks/use-toast";
import { api } from "~/trpc/react";

import {
  hoje,
  lerMarcacoesDoNavegador,
  limparMarcacoesDoNavegador,
  type Marcacoes,
} from "../_lib/marcacoes";
import { absorverOSM, montarQuadras, rotuloDe } from "../_lib/quadras";
import { carregarRuas, type Via } from "../_lib/ruas";
import Cabecalho from "./Cabecalho";
import Lista from "./Lista";
import Mapa, { type EstadoMapa, type MapaHandle } from "./Mapa";
import {
  AvisoImportacao,
  Aviso,
  BarraSelecao,
  Legenda,
  type AvisoTipo,
} from "./Overlays";

export default function Rastreador() {
  const { data: sessao } = useSession();
  const admin = sessao?.user?.papel === "admin";
  const { toast } = useToast();
  const utils = api.useUtils();

  const { data: marks = {}, isPending: marksCarregando } =
    api.rastreador.listar.useQuery();

  const [vias, setVias] = useState<Via[] | null>(null);
  const [erroRede, setErroRede] = useState(false);
  const [estadoMapa, setEstadoMapa] = useState<EstadoMapa>({
    fase: "iniciando",
  });
  const [sel, setSel] = useState<string | null>(null);
  const [importacaoDispensada, setImportacaoDispensada] = useState(false);
  const mapaRef = useRef<MapaHandle>(null);

  // Snapshot só para o banner de importação única do progresso salvo antes do banco existir.
  const marcasDoNavegador = useMemo(
    () => (typeof window !== "undefined" ? lerMarcacoesDoNavegador() : {}),
    [],
  );
  const chavesParaImportar = Object.keys(marcasDoNavegador);
  const mostrarImportacao =
    admin &&
    !marksCarregando &&
    !importacaoDispensada &&
    Object.keys(marks).length === 0 &&
    chavesParaImportar.length > 0;

  useEffect(() => {
    let vivo = true;
    carregarRuas()
      .then((v) => vivo && setVias(v))
      .catch((e) => {
        console.error("[Lago Norte] falha ao carregar o traçado das ruas:", e);
        if (vivo) setErroRede(true);
      });
    return () => {
      vivo = false;
    };
  }, []);

  const quadras = useMemo(() => {
    const chaves = (vias ?? []).flatMap((v) => (v.k ? [v.k] : []));
    return montarQuadras(absorverOSM(chaves));
  }, [vias]);

  const { total, feitos } = useMemo(() => {
    let total = 0;
    let feitos = 0;
    for (const q of quadras) {
      for (const c of q.conj) {
        total++;
        if (marks[c.key]?.done) feitos++;
      }
    }
    return { total, feitos };
  }, [quadras, marks]);

  const aviso = useMemo<{ texto: string; tipo: AvisoTipo } | null>(() => {
    if (erroRede) {
      return {
        texto:
          "Não consegui buscar o traçado das ruas agora. A lista funciona normalmente — recarregue depois para tentar de novo.",
        tipo: "erro",
      };
    }
    if (estadoMapa.fase === "erro-mapa") {
      return {
        texto:
          "Não foi possível carregar o mapa. A lista continua funcionando.",
        tipo: "erro",
      };
    }
    if (estadoMapa.fase === "erro-desenho") {
      return {
        texto:
          "O traçado das ruas não pôde ser desenhado no mapa. A lista funciona normalmente.",
        tipo: "erro",
      };
    }
    if (estadoMapa.fase === "desenhado") {
      const semTracado = total - estadoMapa.comTracado;
      if (semTracado <= 0) return null;
      return {
        texto: `${semTracado} conjuntos ainda não têm traçado no OpenStreetMap — marque pela lista.`,
        tipo: "info",
      };
    }
    return {
      texto: "Carregando o traçado das ruas do OpenStreetMap…",
      tipo: "load",
    };
  }, [erroRede, estadoMapa, total]);

  function aoErrar(erro: { message: string }, anterior?: Marcacoes) {
    if (anterior) utils.rastreador.listar.setData(undefined, anterior);
    toast({
      description: erro.message || "Não foi possível salvar. Tente de novo.",
      variant: "destructive",
      duration: 3500,
    });
  }

  const marcar = api.rastreador.marcar.useMutation({
    onMutate: async (input) => {
      await utils.rastreador.listar.cancel();
      const anterior = utils.rastreador.listar.getData();
      utils.rastreador.listar.setData(undefined, (atual) => ({
        ...atual,
        [input.chave]: { done: true, data: input.data },
      }));
      return { anterior };
    },
    onError: (erro, _input, contexto) => aoErrar(erro, contexto?.anterior),
    onSettled: () => utils.rastreador.listar.invalidate(),
  });

  const desmarcar = api.rastreador.desmarcar.useMutation({
    onMutate: async (input) => {
      await utils.rastreador.listar.cancel();
      const anterior = utils.rastreador.listar.getData();
      utils.rastreador.listar.setData(undefined, (atual) => {
        const novo = { ...atual };
        delete novo[input.chave];
        return novo;
      });
      return { anterior };
    },
    onError: (erro, _input, contexto) => aoErrar(erro, contexto?.anterior),
    onSettled: () => utils.rastreador.listar.invalidate(),
  });

  const importar = api.rastreador.importar.useMutation({
    onSuccess: async (resultado) => {
      await utils.rastreador.listar.invalidate();
      limparMarcacoesDoNavegador();
      setImportacaoDispensada(true);
      toast({
        description: `${resultado.importadas} marcações importadas para o banco.`,
        duration: 3000,
      });
    },
    onError: (erro) =>
      toast({ description: erro.message, variant: "destructive", duration: 4000 }),
  });

  // Os controles de escrita já ficam escondidos para visitante; a trava aqui cobre
  // o duplo clique no mapa, que não passa por nenhum botão.
  function alternar(key: string) {
    if (!admin) return;
    if (marks[key]?.done) desmarcar.mutate({ chave: key });
    else marcar.mutate({ chave: key, data: hoje() });
  }

  function definirData(key: string, valor: string) {
    if (!admin) return;
    if (!marks[key]) return;
    marcar.mutate({ chave: key, data: valor });
  }

  function focar(key: string) {
    setSel(key);
    mapaRef.current?.focar(key);
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-fundo_azul_1">
      <Cabecalho feitos={feitos} total={total} />

      <div className="flex min-h-0 flex-1">
        <Lista
          quadras={quadras}
          marks={marks}
          sel={sel}
          admin={admin}
          onAlternar={alternar}
          onFocar={focar}
          onData={definirData}
        />

        <main className="relative min-w-0 flex-1 bg-fundo_azul_1">
          <Mapa
            ref={mapaRef}
            vias={vias}
            marks={marks}
            sel={sel}
            onSelecionar={(key) =>
              setSel((atual) => (atual === key ? null : key))
            }
            onAlternar={alternar}
            onEstado={setEstadoMapa}
          />

          <Legenda />
          {mostrarImportacao ? (
            <AvisoImportacao
              quantidade={chavesParaImportar.length}
              importando={importar.isPending}
              onImportar={() =>
                importar.mutate(
                  chavesParaImportar.map((chave) => ({
                    chave,
                    data: marcasDoNavegador[chave]!.data,
                  })),
                )
              }
              onIgnorar={() => setImportacaoDispensada(true)}
            />
          ) : (
            aviso && <Aviso texto={aviso.texto} tipo={aviso.tipo} />
          )}
          {sel && (
            <BarraSelecao
              nome={rotuloDe(sel)}
              feito={!!marks[sel]?.done}
              admin={admin}
              onAlternar={() => alternar(sel)}
            />
          )}
        </main>
      </div>
    </div>
  );
}
