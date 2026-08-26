"use client";

import { Scale } from "lucide-react";
import { type FormEvent, useState } from "react";

import BotaoCalcular from "~/components/calculadora/BotaoCalcular";
import BotaoSecundario from "~/components/calculadora/BotaoSecundario";
import CampoNumero from "~/components/calculadora/CampoNumero";
import PainelResultado from "~/components/calculadora/PainelResultado";
import TabelaReferencia from "~/components/calculadora/TabelaReferencia";
import TelaCalculadora from "~/components/calculadora/TelaCalculadora";
import { parsearNumero } from "~/lib/calculadora/conversao";
import { calcularImc, classificarImc, FAIXAS_IMC } from "~/lib/calculadora/imc";

type Resultado = { imc: string; classificacao: string };

const LINHAS_TABELA = FAIXAS_IMC.map((faixa) => [
  faixa.rotuloFaixa,
  faixa.classificacao,
  faixa.obesidade,
]);

export default function CalculadoraImc() {
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  function limparSaida() {
    setResultado(null);
    setErro(null);
  }

  function calcular(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const alturaM = parsearNumero(altura);
    const pesoKg = parsearNumero(peso);

    if (alturaM === null || pesoKg === null || alturaM <= 0 || pesoKg <= 0) {
      setResultado(null);
      setErro("Informe altura e peso como números maiores que zero.");
      return;
    }

    const imc = calcularImc(pesoKg, alturaM);
    const faixa = classificarImc(imc);
    if (!faixa) {
      setResultado(null);
      setErro("Não foi possível classificar esse IMC.");
      return;
    }

    setErro(null);
    setResultado({
      imc: imc.toFixed(1).replace(".", ","),
      classificacao: faixa.classificacao,
    });
  }

  function limpar() {
    setAltura("");
    setPeso("");
    limparSaida();
  }

  return (
    <TelaCalculadora titulo="Calculadora de IMC" icone={Scale}>
      <form onSubmit={calcular} noValidate className="flex flex-col gap-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <CampoNumero
            rotulo="Altura em metros (ex.: 1,78)"
            valor={altura}
            aoMudar={(valor) => {
              setAltura(valor);
              limparSaida();
            }}
            placeholder="Metros"
            invalido={erro !== null}
          />
          <CampoNumero
            rotulo="Peso em quilos (ex.: 72,3)"
            valor={peso}
            aoMudar={(valor) => {
              setPeso(valor);
              limparSaida();
            }}
            placeholder="Quilos"
            invalido={erro !== null}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <BotaoCalcular className="grow sm:grow-0" />
          <BotaoSecundario aoClicar={limpar} className="grow sm:grow-0">
            Limpar
          </BotaoSecundario>
        </div>

        <PainelResultado erro={erro}>
          {resultado && (
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-calc_campo pt-4">
              <p className="flex items-baseline gap-3 text-xl">
                Seu IMC:
                <span className="text-2xl font-bold tabular-nums">
                  {resultado.imc}
                </span>
              </p>
              <p className="text-xl uppercase tracking-wide text-verde_principal">
                {resultado.classificacao}
              </p>
            </div>
          )}
        </PainelResultado>
      </form>

      <TabelaReferencia
        titulo="Classificação"
        cabecalhos={["IMC", "Classificação", "Obesidade"]}
        linhas={LINHAS_TABELA}
      />
    </TelaCalculadora>
  );
}
