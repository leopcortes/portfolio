export type Marcacao = { done: true; data: string };
export type Marcacoes = Record<string, Marcacao>;

const CHAVE_LOCALSTORAGE = "lagonorte.marks.v1";

/**
 * Lê o progresso salvo no localStorage deste navegador — versão anterior ao banco
 * de dados. Usada só pelo fluxo de importação única em Rastreador.tsx; nada mais
 * grava aqui.
 */
export function lerMarcacoesDoNavegador(): Marcacoes {
  try {
    const raw = localStorage.getItem(CHAVE_LOCALSTORAGE);
    const d: unknown = raw ? JSON.parse(raw) : null;
    return d && typeof d === "object" ? (d as Marcacoes) : {};
  } catch {
    return {};
  }
}

export function limparMarcacoesDoNavegador() {
  try {
    localStorage.removeItem(CHAVE_LOCALSTORAGE);
  } catch {
    // sem localStorage disponível: nada para limpar
  }
}

// Data local, não UTC — toISOString() erra o dia à noite no Brasil.
export function hoje() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
