export type AvisoTipo = "load" | "erro" | "info";

const OVERLAY =
  "absolute z-[500] rounded-[10px] border bg-fundo_azul_2/[0.94] backdrop-blur-[6px]";

export function Legenda() {
  return (
    <div
      className={`${OVERLAY} bottom-4 left-4 flex flex-col gap-[7px] border-borda_azul_1 px-[14px] py-3`}
    >
      <div className="mb-[1px] text-[10px] uppercase tracking-[0.12em] text-texto_secundario">
        Legenda
      </div>
      <Item cor="bg-verde_principal" altura="h-[4px]" destaque>
        já corri
      </Item>
      <Item cor="bg-texto_secundario" altura="h-[3px]">
        falta correr
      </Item>
      <Item cor="bg-azul_principal" altura="h-[3px]">
        selecionado
      </Item>
      <Item cor="bg-azul_acesso" altura="h-[2px]">
        vias de acesso
      </Item>
    </div>
  );
}

function Item({
  cor,
  altura,
  destaque,
  children,
}: {
  cor: string;
  altura: string;
  destaque?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-5 rounded-[2px] ${altura} ${cor}`} />
      <span
        className={`text-[11.5px] ${destaque ? "text-texto_principal" : "text-texto_secundario"}`}
      >
        {children}
      </span>
    </div>
  );
}

const COR_AVISO: Record<AvisoTipo, string> = {
  load: "bg-azul_principal",
  erro: "bg-vermelho_aviso",
  info: "bg-amarelo_aviso",
};

export function Aviso({ texto, tipo }: { texto: string; tipo: AvisoTipo }) {
  return (
    <div className="absolute left-1/2 top-[18px] z-[600] flex max-w-[420px] -translate-x-1/2 items-center gap-[10px] rounded-[10px] border border-borda_azul_2 bg-fundo_azul_2/[0.96] px-4 py-[11px] shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
      <span
        className={`h-[7px] w-[7px] shrink-0 rounded-[99px] ${COR_AVISO[tipo]}`}
      />
      <span className="text-xs leading-[1.45] text-texto_principal">
        {texto}
      </span>
    </div>
  );
}

export function BarraSelecao({
  nome,
  feito,
  admin,
  onAlternar,
}: {
  nome: string;
  feito: boolean;
  admin: boolean;
  onAlternar: () => void;
}) {
  return (
    <div
      className={`${OVERLAY} bottom-4 right-4 flex items-center gap-[14px] border-borda_azul_2 px-4 py-3`}
    >
      <div className="flex flex-col gap-[2px]">
        <span className="text-[10px] uppercase tracking-[0.12em] text-texto_secundario">
          selecionado
        </span>
        <span className="text-sm font-medium text-texto_principal">{nome}</span>
      </div>
      {admin ? (
        <button
          type="button"
          onClick={onAlternar}
          className={`whitespace-nowrap rounded-[7px] border px-[14px] py-2 text-xs font-medium ${
            feito
              ? "border-borda_azul_3 bg-transparent text-texto_secundario"
              : "border-verde_principal bg-verde_principal text-fundo_azul_1"
          }`}
        >
          {feito ? "Desmarcar" : "Marcar como corrido"}
        </button>
      ) : (
        <span
          className={`whitespace-nowrap rounded-[7px] border px-[14px] py-2 text-xs font-medium ${
            feito
              ? "border-verde_principal text-verde_principal"
              : "border-borda_azul_3 text-texto_secundario"
          }`}
        >
          {feito ? "já corri" : "falta correr"}
        </span>
      )}
    </div>
  );
}
