type Token =
  | { tipo: "numero"; valor: number }
  | { tipo: "simbolo"; valor: string };

const SIMBOLOS = new Set(["+", "-", "*", "/", "^", "(", ")"]);

function tokenizar(texto: string): Token[] | null {
  const tokens: Token[] = [];
  let i = 0;

  while (i < texto.length) {
    const caractere = texto[i]!;

    if (caractere === " ") {
      i++;
      continue;
    }

    if (caractere === "π") {
      tokens.push({ tipo: "numero", valor: Math.PI });
      i++;
      continue;
    }

    if (/[0-9.]/.test(caractere)) {
      let bruto = "";
      while (i < texto.length && /[0-9.]/.test(texto[i]!)) bruto += texto[i++]!;

      // O visor mostra resultados muito pequenos como "1e-7", e esse mesmo texto
      // volta para cá quando o usuário continua a conta.
      const expoente = /^[eE][+-]?\d+/.exec(texto.slice(i));
      if (expoente) {
        bruto += expoente[0];
        i += expoente[0].length;
      }

      const valor = Number(bruto);
      if (!Number.isFinite(valor)) return null;
      tokens.push({ tipo: "numero", valor });
      continue;
    }

    if (SIMBOLOS.has(caractere)) {
      tokens.push({ tipo: "simbolo", valor: caractere });
      i++;
      continue;
    }

    return null;
  }

  return tokens;
}

/**
 * Descida recursiva sobre a gramática usual de precedência. O projeto original
 * chamava `eval()` no conteúdo do visor — além de executar qualquer coisa que o
 * usuário digitasse, quebrava com o "−" (U+2212) que o próprio teclado inseria.
 */
class Analisador {
  private posicao = 0;

  constructor(private readonly tokens: Token[]) {}

  private espiar(): Token | undefined {
    return this.tokens[this.posicao];
  }

  private consumirSimbolo(...aceitos: string[]): string | null {
    const token = this.espiar();
    if (token?.tipo === "simbolo" && aceitos.includes(token.valor)) {
      this.posicao++;
      return token.valor;
    }
    return null;
  }

  analisar(): number | null {
    const valor = this.soma();
    if (valor === null || this.posicao !== this.tokens.length) return null;
    return valor;
  }

  private soma(): number | null {
    let esquerda = this.produto();
    if (esquerda === null) return null;

    for (;;) {
      const operador = this.consumirSimbolo("+", "-");
      if (!operador) return esquerda;

      const direita = this.produto();
      if (direita === null) return null;
      esquerda = operador === "+" ? esquerda + direita : esquerda - direita;
    }
  }

  private produto(): number | null {
    let esquerda = this.potencia();
    if (esquerda === null) return null;

    for (;;) {
      const operador = this.consumirSimbolo("*", "/");
      if (!operador) return esquerda;

      const direita = this.potencia();
      if (direita === null) return null;
      esquerda = operador === "*" ? esquerda * direita : esquerda / direita;
    }
  }

  /** Potência associa à direita: 2^3^2 é 2^(3^2). */
  private potencia(): number | null {
    const base = this.unario();
    if (base === null) return null;

    if (!this.consumirSimbolo("^")) return base;

    const expoente = this.potencia();
    if (expoente === null) return null;
    return base ** expoente;
  }

  private unario(): number | null {
    const sinal = this.consumirSimbolo("+", "-");
    if (sinal === null) return this.primario();

    const valor = this.unario();
    if (valor === null) return null;
    return sinal === "-" ? -valor : valor;
  }

  private primario(): number | null {
    const token = this.espiar();
    if (!token) return null;

    if (token.tipo === "numero") {
      this.posicao++;
      return token.valor;
    }

    if (token.valor !== "(") return null;
    this.posicao++;

    const interno = this.soma();
    if (interno === null) return null;
    if (!this.consumirSimbolo(")")) return null;
    return interno;
  }
}

/** Devolve null para expressão vazia, malformada ou com resultado não finito. */
export function avaliarExpressao(texto: string): number | null {
  const tokens = tokenizar(texto);
  if (!tokens || tokens.length === 0) return null;

  const valor = new Analisador(tokens).analisar();
  return valor !== null && Number.isFinite(valor) ? valor : null;
}

const MAIOR_FATORIAL = 170;

export function fatorial(valor: number): number | null {
  if (!Number.isInteger(valor) || valor < 0 || valor > MAIOR_FATORIAL)
    return null;

  let resultado = 1;
  for (let i = 2; i <= valor; i++) resultado *= i;
  return resultado;
}
