export const VARIAVEIS = ["x", "y", "z"] as const;

export type ResultadoSistema =
  | { tipo: "unica"; valores: { variavel: string; valor: number }[] }
  | { tipo: "indeterminado" }
  | { tipo: "impossivel" }
  | { tipo: "vazio" };

const TOLERANCIA = 1e-9;

const zero = (valor: number) => Math.abs(valor) < TOLERANCIA;

/**
 * Resolve o sistema considerando apenas o que foi preenchido.
 *
 * Linha totalmente em branco não é a equação "0x + 0y + 0z = 0", é uma equação que
 * o usuário não escreveu — e coluna sem nenhum coeficiente é uma incógnita que não
 * existe no sistema dele. Sem essa distinção, digitar só `2x + 3y = 8` e `x + y = 3`
 * produzia uma terceira linha nula e um `z` livre, e a resposta virava "infinitas
 * soluções" quando x e y estão perfeitamente determinados.
 *
 * Trabalha então sobre a submatriz das equações e incógnitas usadas, com
 * Gauss-Jordan e pivoteamento parcial.
 */
export function resolverSistema(linhas: number[][]): ResultadoSistema {
  const usadas = linhas.filter((linha) => linha.some((valor) => !zero(valor)));
  if (usadas.length === 0) return { tipo: "vazio" };

  const colunas = VARIAVEIS.map((_, indice) => indice).filter((indice) =>
    usadas.some((linha) => !zero(linha[indice] ?? 0)),
  );

  // Sobrou só termo independente: alguma equação afirma "0 = d" com d ≠ 0.
  if (colunas.length === 0) return { tipo: "impossivel" };

  const largura = colunas.length + 1;
  const m = new Float64Array(usadas.length * largura);
  const ler = (linha: number, coluna: number) =>
    m[linha * largura + coluna] ?? 0;
  const gravar = (linha: number, coluna: number, valor: number) => {
    m[linha * largura + coluna] = valor;
  };

  usadas.forEach((linha, indice) => {
    colunas.forEach((coluna, destino) =>
      gravar(indice, destino, linha[coluna] ?? 0),
    );
    gravar(indice, colunas.length, linha[3] ?? 0);
  });

  let posto = 0;
  for (
    let coluna = 0;
    coluna < colunas.length && posto < usadas.length;
    coluna++
  ) {
    let melhor = posto;
    for (let linha = posto + 1; linha < usadas.length; linha++) {
      if (Math.abs(ler(linha, coluna)) > Math.abs(ler(melhor, coluna)))
        melhor = linha;
    }

    if (zero(ler(melhor, coluna))) continue;

    if (melhor !== posto) {
      for (let j = 0; j < largura; j++) {
        const guardado = ler(posto, j);
        gravar(posto, j, ler(melhor, j));
        gravar(melhor, j, guardado);
      }
    }

    const divisor = ler(posto, coluna);
    for (let j = 0; j < largura; j++) gravar(posto, j, ler(posto, j) / divisor);

    for (let linha = 0; linha < usadas.length; linha++) {
      if (linha === posto) continue;
      const fator = ler(linha, coluna);
      if (zero(fator)) continue;
      for (let j = 0; j < largura; j++) {
        gravar(linha, j, ler(linha, j) - fator * ler(posto, j));
      }
    }

    posto++;
  }

  for (let linha = 0; linha < usadas.length; linha++) {
    const semCoeficientes = colunas.every((_, coluna) =>
      zero(ler(linha, coluna)),
    );
    if (semCoeficientes && !zero(ler(linha, colunas.length))) {
      return { tipo: "impossivel" };
    }
  }

  if (posto < colunas.length) return { tipo: "indeterminado" };

  // Com posto igual ao número de incógnitas, cada coluna recebeu o pivô na sua
  // vez, então a linha k guarda o valor da k-ésima incógnita usada.
  return {
    tipo: "unica",
    valores: colunas.map((coluna, k) => ({
      variavel: VARIAVEIS[coluna] ?? "?",
      valor: ler(k, colunas.length),
    })),
  };
}
