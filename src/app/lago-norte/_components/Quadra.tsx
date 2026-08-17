import { CONFIG } from "../_lib/config";

export type ConjuntoVisivel = {
  key: string;
  num: number;
  done: boolean;
  data: string;
};

export type QuadraVisivel = {
  id: string;
  nome: string;
  feitos: number;
  total: number;
  aberto: boolean;
  conj: ConjuntoVisivel[];
};

type Props = {
  quadra: QuadraVisivel;
  sel: string | null;
  admin: boolean;
  onAbrir: (id: string) => void;
  onAlternar: (key: string) => void;
  onFocar: (key: string) => void;
  onData: (key: string, valor: string) => void;
};

const PADDING_LINHA = CONFIG.densidade === "Compacta" ? "py-[3px]" : "py-[7px]";

// "2025-08-16" → "16/08/2025", sem passar por Date para não escorregar de fuso
function emPtBr(iso: string) {
  const [a, m, d] = iso.split("-");
  return a && m && d ? `${d}/${m}/${a}` : iso;
}

export default function Quadra({
  quadra,
  sel,
  admin,
  onAbrir,
  onAlternar,
  onFocar,
  onData,
}: Props) {
  const pct = quadra.total ? (quadra.feitos / quadra.total) * 100 : 0;

  return (
    <div
      className={`mb-1 rounded-[10px] border ${
        quadra.aberto
          ? "border-borda_azul_1 bg-fundo_azul_3"
          : "border-transparent bg-transparent"
      }`}
    >
      <button
        type="button"
        onClick={() => onAbrir(quadra.id)}
        aria-expanded={quadra.aberto}
        className="flex w-full select-none items-center gap-[10px] px-3 py-[10px] text-left"
      >
        <span
          className={`w-[9px] text-[10px] text-texto_secundario transition-transform duration-[180ms] ease-[ease] ${
            quadra.aberto ? "rotate-90" : "rotate-0"
          }`}
        >
          ▸
        </span>
        <span className="min-w-[52px] text-[13.5px] font-medium text-texto_principal">
          {quadra.nome}
        </span>
        <div className="h-[5px] flex-1 overflow-hidden rounded-[99px] bg-trilha_azul_2">
          <div
            className={`h-full rounded-[99px] transition-[width] duration-300 ease-[ease] ${
              quadra.feitos > 0 ? "bg-verde_principal" : "bg-borda_azul_2"
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="min-w-[46px] text-right text-[11.5px] text-texto_secundario">
          {quadra.feitos}/{quadra.total}
        </span>
      </button>

      {quadra.aberto && (
        <div className="flex flex-col px-2 pb-2 pt-[2px]">
          {quadra.conj.map((c) => {
            const selecionado = sel === c.key;

            const estiloMarca = `flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-[5px] border-[1.5px] transition-all duration-150 ${
              c.done
                ? "border-verde_principal bg-verde_principal"
                : `bg-transparent ${
                    selecionado
                      ? "border-azul_principal"
                      : "border-borda_azul_3"
                  }`
            }`;
            const tique = (
              <span
                className={`text-[11px] font-bold leading-none text-fundo_azul_1 ${
                  c.done ? "opacity-100" : "opacity-0"
                }`}
              >
                ✓
              </span>
            );

            return (
              <div
                key={c.key}
                className={`flex items-center gap-[10px] rounded-md px-[6px] hover:bg-trilha_azul_1 ${PADDING_LINHA}`}
              >
                {admin ? (
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={c.done}
                    aria-label={`Conjunto ${c.num}`}
                    onClick={() => onAlternar(c.key)}
                    className={estiloMarca}
                  >
                    {tique}
                  </button>
                ) : (
                  // visitante enxerga o estado, mas não tem o que clicar
                  <span
                    role="checkbox"
                    aria-checked={c.done}
                    aria-disabled="true"
                    aria-label={`Conjunto ${c.num}`}
                    className={estiloMarca}
                  >
                    {tique}
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => onFocar(c.key)}
                  className={`flex-1 text-left text-[12.5px] hover:text-azul_principal ${
                    c.done
                      ? "text-texto_secundario"
                      : selecionado
                        ? "text-azul_principal"
                        : "text-texto_principal"
                  }`}
                >
                  Conjunto {c.num}
                </button>

                {c.done &&
                  (admin ? (
                    <input
                      type="date"
                      value={c.data}
                      onChange={(e) => onData(c.key, e.target.value)}
                      style={{ colorScheme: "dark" }}
                      className="cursor-pointer rounded-[5px] border border-borda_azul_1 bg-transparent px-1 py-[2px] text-[10.5px] text-texto_secundario outline-none hover:border-borda_azul_2 hover:text-texto_principal"
                    />
                  ) : (
                    <span className="rounded-[5px] border border-transparent px-1 py-[2px] text-[10.5px] text-texto_secundario">
                      {emPtBr(c.data)}
                    </span>
                  ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
