import type { CategoriaProjeto } from "@prisma/client";

const MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
] as const;

// As datas são gravadas como o primeiro dia do mês em UTC; ler em UTC evita que o
// fuso de Brasília (-03) empurre a exibição para o mês anterior.
export function mesAno(data: Date): string {
  return `${MESES[data.getUTCMonth()]}/${data.getUTCFullYear()}`;
}

export function periodo(inicio: Date, fim: Date | null): string {
  return `${mesAno(inicio)} – ${fim ? mesAno(fim) : "Presente"}`;
}

export function calcularIdade(nascimento: Date, hoje = new Date()): number {
  let idade = hoje.getFullYear() - nascimento.getUTCFullYear();
  const mesAtual = hoje.getMonth();
  const mesNascimento = nascimento.getUTCMonth();

  if (
    mesAtual < mesNascimento ||
    (mesAtual === mesNascimento && hoje.getDate() < nascimento.getUTCDate())
  ) {
    idade--;
  }

  return idade;
}

export const ROTULO_CATEGORIA: Record<CategoriaProjeto, string> = {
  EMPRESA_JUNIOR: "Projeto para Empresa Júnior",
  UNIVERSIDADE: "Projeto para Universidade",
  PESSOAL: "Projeto Pessoal",
  PROFISSIONAL: "Projeto Profissional",
};

export function dominio(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function aplicarIdade(texto: string, nascimento: Date): string {
  return texto.replaceAll("{idade}", String(calcularIdade(nascimento)));
}
