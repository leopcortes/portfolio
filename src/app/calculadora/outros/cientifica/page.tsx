"use client";

import { Calculator } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import TelaCalculadora from "~/components/calculadora/TelaCalculadora";
import { avaliarExpressao, fatorial } from "~/lib/calculadora/expressao";
import { cn } from "~/lib/utils";

type Acao =
  | { tipo: "inserir"; texto: string }
  | { tipo: "unario"; operacao: (valor: number) => number | null }
  | { tipo: "igual" }
  | { tipo: "limpar" };

type Tecla = {
  rotulo: string;
  estilo: "numero" | "operacao" | "igual" | "limpar";
  acao: Acao;
};

const inserir = (texto: string): Acao => ({ tipo: "inserir", texto });
const unario = (operacao: (valor: number) => number | null): Acao => ({
  tipo: "unario",
  operacao,
});

const numero = (digito: string): Tecla => ({
  rotulo: digito,
  estilo: "numero",
  acao: inserir(digito),
});

const TECLADO: Tecla[][] = [
  [
    { rotulo: "sin", estilo: "operacao", acao: unario(Math.sin) },
    { rotulo: "ln", estilo: "operacao", acao: unario(Math.log) },
    { rotulo: "(", estilo: "operacao", acao: inserir("(") },
    { rotulo: ")", estilo: "operacao", acao: inserir(")") },
    { rotulo: "%", estilo: "operacao", acao: unario((valor) => valor / 100) },
    { rotulo: "AC", estilo: "limpar", acao: { tipo: "limpar" } },
  ],
  [
    { rotulo: "cos", estilo: "operacao", acao: unario(Math.cos) },
    { rotulo: "log", estilo: "operacao", acao: unario(Math.log10) },
    numero("7"),
    numero("8"),
    numero("9"),
    { rotulo: "÷", estilo: "operacao", acao: inserir("/") },
  ],
  [
    { rotulo: "tan", estilo: "operacao", acao: unario(Math.tan) },
    { rotulo: "π", estilo: "operacao", acao: inserir("π") },
    numero("4"),
    numero("5"),
    numero("6"),
    { rotulo: "×", estilo: "operacao", acao: inserir("*") },
  ],
  [
    { rotulo: "√", estilo: "operacao", acao: unario(Math.sqrt) },
    { rotulo: "eˣ", estilo: "operacao", acao: unario(Math.exp) },
    numero("1"),
    numero("2"),
    numero("3"),
    { rotulo: "−", estilo: "operacao", acao: inserir("-") },
  ],
  [
    { rotulo: "x!", estilo: "operacao", acao: unario(fatorial) },
    { rotulo: "xʸ", estilo: "operacao", acao: inserir("^") },
    numero("0"),
    { rotulo: ",", estilo: "numero", acao: inserir(".") },
    { rotulo: "=", estilo: "igual", acao: { tipo: "igual" } },
    { rotulo: "+", estilo: "operacao", acao: inserir("+") },
  ],
];

const ESTILOS: Record<Tecla["estilo"], string> = {
  numero: "bg-calc_campo hover:bg-white/15",
  operacao: "bg-white/10 hover:bg-white/20",
  igual: "bg-calc_acento hover:bg-calc_acento_hover",
  limpar: "bg-[#a12d3b] hover:bg-[#8a2431]",
};

const ERRO = "Erro";

/** Precisa voltar como texto que o próprio analisador consiga reler. */
function paraVisor(valor: number): string {
  return String(Number(valor.toPrecision(12)));
}

export default function CalculadoraCientifica() {
  const [visor, setVisor] = useState("0");

  const executar = useCallback((acao: Acao) => {
    setVisor((atual) => {
      const emErro = atual === ERRO;

      if (acao.tipo === "limpar") return "0";

      if (acao.tipo === "inserir") {
        if (emErro) return acao.texto;
        // Zero inicial some ao receber um valor, mas continua na frente da vírgula
        // e dos operadores, para "0," e "0+" não virarem expressão solta.
        if (atual === "0" && /[0-9π(]/.test(acao.texto)) return acao.texto;
        return atual + acao.texto;
      }

      if (emErro) return ERRO;

      const valor = avaliarExpressao(atual);
      if (valor === null) return ERRO;

      if (acao.tipo === "igual") return paraVisor(valor);

      const resultado = acao.operacao(valor);
      if (resultado === null || !Number.isFinite(resultado)) return ERRO;
      return paraVisor(resultado);
    });
  }, []);

  const apagarUltimo = useCallback(() => {
    setVisor((atual) =>
      atual === ERRO || atual.length <= 1 ? "0" : atual.slice(0, -1),
    );
  }, []);

  // Teclado físico: a calculadora é um teclado numérico, não faz sentido exigir
  // o mouse. Ignora eventos vindos de campos de texto para não sequestrar digitação.
  useEffect(() => {
    function aoTeclar(evento: KeyboardEvent) {
      const alvo = evento.target as HTMLElement | null;
      if (alvo && /^(INPUT|TEXTAREA|SELECT)$/.test(alvo.tagName)) return;

      const tecla = evento.key;

      if (/^[0-9]$/.test(tecla) || "+-*/^()".includes(tecla)) {
        evento.preventDefault();
        executar(inserir(tecla));
      } else if (tecla === "." || tecla === ",") {
        evento.preventDefault();
        executar(inserir("."));
      } else if (tecla === "Enter" || tecla === "=") {
        evento.preventDefault();
        executar({ tipo: "igual" });
      } else if (tecla === "Backspace") {
        evento.preventDefault();
        apagarUltimo();
      } else if (tecla === "Escape") {
        evento.preventDefault();
        executar({ tipo: "limpar" });
      }
    }

    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [executar, apagarUltimo]);

  return (
    <TelaCalculadora titulo="Calculadora Científica" icone={Calculator}>
      <output
        aria-live="polite"
        className="flex h-16 items-center justify-end overflow-x-auto rounded-lg bg-calc_campo px-4 text-right text-3xl tabular-nums"
      >
        <span className="whitespace-nowrap">{visor}</span>
      </output>

      <div className="flex flex-col gap-1.5 sm:gap-2">
        {TECLADO.map((linha, indice) => (
          <div key={indice} className="grid grid-cols-6 gap-1.5 sm:gap-2">
            {linha.map((tecla) => (
              <button
                key={tecla.rotulo}
                type="button"
                onClick={() => executar(tecla.acao)}
                className={cn(
                  "h-12 rounded-lg text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-calc_superficie motion-reduce:transition-none sm:h-14 sm:text-lg",
                  ESTILOS[tecla.estilo],
                )}
              >
                {tecla.rotulo}
              </button>
            ))}
          </div>
        ))}
      </div>

      <p className="text-sm text-white/40">
        Também funciona pelo teclado: números, + − × ÷ ^ ( ), Enter para
        calcular, Backspace para apagar e Esc para limpar.
      </p>
    </TelaCalculadora>
  );
}
