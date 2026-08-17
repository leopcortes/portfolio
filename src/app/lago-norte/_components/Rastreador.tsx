"use client";

import { useSession } from "next-auth/react";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  carregarMarcacoes,
  hoje,
  salvarMarcacoes,
  type Marcacoes,
} from "../_lib/marcacoes";
import { absorverOSM, montarQuadras, rotuloDe } from "../_lib/quadras";
import { carregarRuas, type Via } from "../_lib/ruas";
import Cabecalho from "./Cabecalho";
import Lista from "./Lista";
import Mapa, { type EstadoMapa, type MapaHandle } from "./Mapa";
import { Aviso, BarraSelecao, Legenda, type AvisoTipo } from "./Overlays";

export default function Rastreador() {
  const { data: sessao } = useSession();
  const admin = sessao?.user?.papel === "admin";

  const [marks, setMarks] = useState<Marcacoes>({});
  const [vias, setVias] = useState<Via[] | null>(null);
  const [erroRede, setErroRede] = useState(false);
  const [estadoMapa, setEstadoMapa] = useState<EstadoMapa>({
    fase: "iniciando",
  });
  const [sel, setSel] = useState<string | null>(null);
  const mapaRef = useRef<MapaHandle>(null);

  // O progresso só existe no cliente: a lista renderiza na hora e recebe as marcas
  // depois da hidratação.
  useEffect(() => setMarks(carregarMarcacoes()), []);

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

  function persistir(novo: Marcacoes) {
    setMarks(novo);
    salvarMarcacoes(novo);
  }

  // Os controles de escrita já ficam escondidos para visitante; a trava aqui cobre
  // o duplo clique no mapa, que não passa por nenhum botão.
  function alternar(key: string) {
    if (!admin) return;
    const novo = { ...marks };
    // desmarcar remove a entrada inteira — nada de done:false guardado
    if (novo[key]?.done) delete novo[key];
    else novo[key] = { done: true, data: hoje() };
    persistir(novo);
  }

  function definirData(key: string, valor: string) {
    if (!admin) return;
    if (!marks[key]) return;
    persistir({ ...marks, [key]: { done: true, data: valor } });
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
          {aviso && <Aviso texto={aviso.texto} tipo={aviso.tipo} />}
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
