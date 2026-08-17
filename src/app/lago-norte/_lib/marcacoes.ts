export type Marcacao = { done: true; data: string };
export type Marcacoes = Record<string, Marcacao>;

const KEY = "lagonorte.marks.v1";

export function carregarMarcacoes(): Marcacoes {
  try {
    const raw = localStorage.getItem(KEY);
    const d: unknown = raw ? JSON.parse(raw) : null;
    return d && typeof d === "object" ? (d as Marcacoes) : {};
  } catch {
    return {};
  }
}

export function salvarMarcacoes(marks: Marcacoes) {
  try {
    localStorage.setItem(KEY, JSON.stringify(marks));
  } catch {
    // navegador sem localStorage disponível: o progresso vale só para a sessão
  }
}

// Data local, não UTC — toISOString() erra o dia à noite no Brasil.
export function hoje() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
