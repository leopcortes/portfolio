import { useMemo, useState } from "react";

import { type Marcacoes } from "../_lib/marcacoes";
import { type Quadra as QuadraSpec } from "../_lib/quadras";
import Quadra, { type QuadraVisivel } from "./Quadra";

type Filtro = "todas" | "faltam" | "feitas";

const FILTROS: { id: Filtro; rotulo: string }[] = [
  { id: "todas", rotulo: "Todas" },
  { id: "faltam", rotulo: "Faltam" },
  { id: "feitas", rotulo: "Feitas" },
];

type Props = {
  quadras: QuadraSpec[];
  marks: Marcacoes;
  sel: string | null;
  onAlternar: (key: string) => void;
  onFocar: (key: string) => void;
  onData: (key: string, valor: string) => void;
};

export default function Lista({
  quadras,
  marks,
  sel,
  onAlternar,
  onFocar,
  onData,
}: Props) {
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const [busca, setBusca] = useState("");
  const [abertas, setAbertas] = useState<Record<string, boolean>>({});

  const termo = busca.trim().toLowerCase();
  const buscando = termo.length > 0;

  const { lista, contagem } = useMemo(() => {
    const lista: QuadraVisivel[] = [];
    let contagem = 0;

    for (const q of quadras) {
      let feitos = 0;
      const todos = q.conj.map((c) => {
        const marca = marks[c.key];
        const done = !!marca?.done;
        if (done) feitos++;
        return { key: c.key, num: c.num, done, data: marca?.data ?? "" };
      });

      const filtrados = todos.filter((c) => {
        if (filtro === "feitas" && !c.done) return false;
        if (filtro === "faltam" && c.done) return false;
        if (
          buscando &&
          !`${q.nome} conjunto ${c.num}`.toLowerCase().includes(termo)
        ) {
          return false;
        }
        return true;
      });

      if (!filtrados.length) continue;
      contagem += filtrados.length;

      lista.push({
        id: q.id,
        nome: q.nome,
        feitos,
        total: q.conj.length,
        // enquanto há busca, todo resultado aparece aberto — ignora o colapso
        aberto: buscando || !!abertas[q.id],
        conj: filtrados,
      });
    }

    return { lista, contagem };
  }, [quadras, marks, filtro, termo, buscando, abertas]);

  const algumaAberta = quadras.some((q) => abertas[q.id]);

  function alternarTodas() {
    if (algumaAberta) return setAbertas({});
    const todas: Record<string, boolean> = {};
    for (const q of quadras) todas[q.id] = true;
    setAbertas(todas);
  }

  return (
    <aside className="flex min-h-0 w-[420px] shrink-0 flex-col border-r border-borda_azul_1 bg-fundo_azul_2">
      <div className="flex shrink-0 flex-col gap-[10px] border-b border-borda_azul_1 px-4 py-[14px]">
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar quadra ou conjunto…"
          aria-label="Buscar quadra ou conjunto"
          className="w-full rounded-lg border border-borda_azul_1 bg-fundo_azul_1 px-3 py-[9px] text-[13px] text-texto_principal outline-none placeholder:text-texto_secundario focus:border-azul_principal"
        />

        <div className="flex gap-[2px] rounded-lg border border-borda_azul_1 bg-fundo_azul_1 p-[2px]">
          {FILTROS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFiltro(f.id)}
              className={`flex-1 rounded-md px-1 py-[6px] text-[11.5px] ${
                filtro === f.id
                  ? "bg-verde_principal text-fundo_azul_1"
                  : "bg-transparent text-texto_secundario"
              }`}
            >
              {f.rotulo}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] text-texto_secundario">
            {contagem} {contagem === 1 ? "conjunto" : "conjuntos"}{" "}
            {filtro === "todas" && !buscando ? "" : "no filtro"}
          </span>
          <button
            type="button"
            onClick={alternarTodas}
            className="px-2 py-1 text-[11px] text-azul_principal hover:text-verde_principal"
          >
            {algumaAberta ? "recolher todas" : "abrir todas"}
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-2 pb-10">
        {lista.map((q) => (
          <Quadra
            key={q.id}
            quadra={q}
            sel={sel}
            onAbrir={(id) =>
              setAbertas((atual) => ({ ...atual, [id]: !atual[id] }))
            }
            onAlternar={onAlternar}
            onFocar={onFocar}
            onData={onData}
          />
        ))}
      </div>
    </aside>
  );
}
