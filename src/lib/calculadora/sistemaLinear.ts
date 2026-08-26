export type ResultadoSistema =
  | { tipo: "unica"; x: number; y: number; z: number }
  | { tipo: "indeterminado" }
  | { tipo: "impossivel" };

const TOLERANCIA = 1e-9;
const ORDEM = 3;
const COLUNAS = 4;

/**
 * Gauss-Jordan com pivoteamento parcial sobre a matriz aumentada 3x4.
 *
 * O pivoteamento não é preciosismo: sem ele um pivô quase-zero amplifica o erro de
 * arredondamento e um sistema bem-comportado sai errado. E a classificação usa
 * tolerância — o legado comparava floats com `!=` exato, então um resíduo de 1e-16
 * bastava para ele declarar "sem solução" num sistema perfeitamente solúvel.
 */
export function resolverSistema(linhas: number[][]): ResultadoSistema {
  const m = new Float64Array(ORDEM * COLUNAS);
  const ler = (linha: number, coluna: number) =>
    m[linha * COLUNAS + coluna] ?? 0;
  const gravar = (linha: number, coluna: number, valor: number) => {
    m[linha * COLUNAS + coluna] = valor;
  };

  for (let linha = 0; linha < ORDEM; linha++) {
    for (let coluna = 0; coluna < COLUNAS; coluna++) {
      gravar(linha, coluna, linhas[linha]?.[coluna] ?? 0);
    }
  }

  for (let coluna = 0; coluna < ORDEM; coluna++) {
    let pivo = coluna;
    for (let linha = coluna + 1; linha < ORDEM; linha++) {
      if (Math.abs(ler(linha, coluna)) > Math.abs(ler(pivo, coluna)))
        pivo = linha;
    }

    if (Math.abs(ler(pivo, coluna)) < TOLERANCIA) continue;

    if (pivo !== coluna) {
      for (let j = 0; j < COLUNAS; j++) {
        const guardado = ler(coluna, j);
        gravar(coluna, j, ler(pivo, j));
        gravar(pivo, j, guardado);
      }
    }

    const divisor = ler(coluna, coluna);
    for (let j = 0; j < COLUNAS; j++)
      gravar(coluna, j, ler(coluna, j) / divisor);

    for (let linha = 0; linha < ORDEM; linha++) {
      if (linha === coluna) continue;
      const fator = ler(linha, coluna);
      if (fator === 0) continue;
      for (let j = 0; j < COLUNAS; j++) {
        gravar(linha, j, ler(linha, j) - fator * ler(coluna, j));
      }
    }
  }

  // Uma linha só de zeros nos coeficientes: 0 = d. Se d ≠ 0 o sistema é impossível;
  // se d = 0 a linha é redundante e sobram infinitas soluções.
  for (let linha = 0; linha < ORDEM; linha++) {
    const semCoeficientes = [0, 1, 2].every(
      (coluna) => Math.abs(ler(linha, coluna)) < TOLERANCIA,
    );
    if (semCoeficientes) {
      return Math.abs(ler(linha, 3)) < TOLERANCIA
        ? { tipo: "indeterminado" }
        : { tipo: "impossivel" };
    }
  }

  return { tipo: "unica", x: ler(0, 3), y: ler(1, 3), z: ler(2, 3) };
}
