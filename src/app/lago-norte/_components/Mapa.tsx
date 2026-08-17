"use client";

import "leaflet/dist/leaflet.css";
import "./mapa.css";

import type * as L from "leaflet";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { CONFIG, CORES, MAPA, TILES, TRACO } from "../_lib/config";
import { type Marcacoes } from "../_lib/marcacoes";
import { rotuloDe } from "../_lib/quadras";
import { type Via } from "../_lib/ruas";

export type EstadoMapa =
  | { fase: "iniciando" }
  | { fase: "erro-mapa" }
  | { fase: "erro-desenho" }
  | { fase: "desenhado"; comTracado: number };

export type MapaHandle = {
  focar: (key: string) => void;
};

type Props = {
  vias: Via[] | null;
  marks: Marcacoes;
  sel: string | null;
  onSelecionar: (key: string) => void;
  onAlternar: (key: string) => void;
  onEstado: (estado: EstadoMapa) => void;
};

const Mapa = forwardRef<MapaHandle, Props>(function Mapa(
  { vias, marks, sel, onSelecionar, onAlternar, onEstado },
  ref,
) {
  const elRef = useRef<HTMLDivElement>(null);
  const LRef = useRef<typeof L | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const grupoRef = useRef<L.LayerGroup | null>(null);
  const layersRef = useRef<Record<string, L.Polyline[]>>({});
  const dadosRef = useRef({ marks, sel });
  const acoesRef = useRef({ onSelecionar, onAlternar, onEstado });
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    acoesRef.current = { onSelecionar, onAlternar, onEstado };
  });

  useEffect(() => {
    let vivo = true;
    let timer: ReturnType<typeof setTimeout>;

    const iniciar = async () => {
      let leaflet: typeof L;
      try {
        leaflet = (await import("leaflet")).default;
      } catch {
        if (vivo) acoesRef.current.onEstado({ fase: "erro-mapa" });
        return;
      }
      if (!vivo) return;
      LRef.current = leaflet;

      let tentativas = 0;
      const tick = () => {
        if (!vivo) return;
        const el = elRef.current;
        // Exige largura E altura reais: o renderer do Leaflet precisa do layout
        // pronto. Nada de requestAnimationFrame — não dispara com a aba oculta.
        if (el && el.offsetWidth > 40 && el.offsetHeight > 40) {
          // Nada de preferCanvas: o renderer de canvas quebra em Bounds.intersects
          // quando as primeiras polilinhas entram antes do layout estabilizar.
          const map = leaflet
            .map(el, { zoomControl: true, attributionControl: true })
            .setView(MAPA.centro, MAPA.zoom);
          mapRef.current = map;
          map.invalidateSize();

          const tile = TILES[CONFIG.estiloMapa];
          leaflet
            .tileLayer(tile.url, {
              maxZoom: MAPA.maxZoom,
              attribution: tile.attribution,
            })
            .addTo(map);

          setPronto(true);
          return;
        }
        if (tentativas++ > 300) {
          acoesRef.current.onEstado({ fase: "erro-mapa" });
          return;
        }
        timer = setTimeout(tick, 80);
      };
      tick();
    };

    void iniciar();

    const aoRedimensionar = () => mapRef.current?.invalidateSize();
    window.addEventListener("resize", aoRedimensionar);

    return () => {
      vivo = false;
      clearTimeout(timer);
      window.removeEventListener("resize", aoRedimensionar);
      mapRef.current?.remove();
      mapRef.current = null;
      grupoRef.current = null;
      layersRef.current = {};
      setPronto(false);
    };
  }, []);

  useEffect(() => {
    const leaflet = LRef.current;
    const map = mapRef.current;
    if (!pronto || !map || !leaflet || !vias) return;

    try {
      if (grupoRef.current) map.removeLayer(grupoRef.current);
      const grupo = leaflet.layerGroup().addTo(map);
      const layers: Record<string, L.Polyline[]> = {};

      for (const via of vias) {
        if (!via.k) {
          if (CONFIG.mostrarAcessos) {
            leaflet
              .polyline(via.g, {
                color: CORES.acesso,
                ...TRACO.acesso,
                lineCap: "round",
                interactive: false,
              })
              .addTo(grupo);
          }
          continue;
        }

        const key = via.k;
        const linha = leaflet.polyline(via.g, {
          color: CORES.pendente,
          ...TRACO.pendente,
          lineCap: "round",
          // impede que o clique na rua chegue ao mapa e dispare o zoom de duplo clique
          bubblingMouseEvents: false,
        });
        linha.bindTooltip(rotuloDe(key), { sticky: true, direction: "top" });
        linha.on("click", () => acoesRef.current.onSelecionar(key));
        linha.on("dblclick", () => acoesRef.current.onAlternar(key));
        linha.addTo(grupo);
        (layers[key] ??= []).push(linha);
      }

      grupoRef.current = grupo;
      layersRef.current = layers;
      recolorir();
      // O aviso só sai depois de um desenho de verdade — se sair antes, a contagem
      // de "sem traçado" dá o total inteiro com o mapa já desenhado na tela.
      acoesRef.current.onEstado({
        fase: "desenhado",
        comTracado: Object.keys(layers).length,
      });
    } catch (e) {
      console.error("[Lago Norte] falha ao desenhar as ruas:", e);
      acoesRef.current.onEstado({ fase: "erro-desenho" });
    }
  }, [pronto, vias]);

  useEffect(() => {
    dadosRef.current = { marks, sel };
    recolorir();
  }, [marks, sel, pronto]);

  function recolorir() {
    const { marks, sel } = dadosRef.current;
    for (const [key, linhas] of Object.entries(layersRef.current)) {
      const feito = !!marks[key]?.done;
      const selecionado = sel === key;

      // Precedências diferentes de propósito: a cor de "feito" vence a de seleção,
      // mas a espessura da seleção vence a de "feito".
      const cor = feito
        ? CORES.feito
        : selecionado
          ? CORES.selecionado
          : CORES.pendente;
      const weight = selecionado
        ? TRACO.selecionado.weight
        : feito
          ? TRACO.feito.weight
          : TRACO.pendente.weight;
      const opacity = feito || selecionado ? 1 : TRACO.pendente.opacity;

      for (const linha of linhas) {
        linha.setStyle({ color: cor, weight, opacity });
        if (selecionado) linha.bringToFront();
      }
    }
  }

  useImperativeHandle(
    ref,
    () => ({
      focar(key) {
        const leaflet = LRef.current;
        const map = mapRef.current;
        const linhas = layersRef.current[key];
        if (!leaflet || !map || !linhas?.length) return;

        let limites: L.LatLngBounds | null = null;
        for (const linha of linhas) {
          const b = linha.getBounds();
          limites = limites
            ? limites.extend(b)
            : leaflet.latLngBounds(b.getSouthWest(), b.getNorthEast());
        }
        if (limites) {
          map.fitBounds(limites, {
            padding: [90, 90],
            maxZoom: 17,
            animate: true,
          });
        }
      },
    }),
    [],
  );

  return (
    <div className="mapa-lago-norte absolute inset-0">
      <div ref={elRef} className="h-full w-full" />
    </div>
  );
});

export default Mapa;
