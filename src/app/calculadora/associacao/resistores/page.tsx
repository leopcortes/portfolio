"use client";

import AssociacaoComponentes from "~/components/calculadora/AssociacaoComponentes";
import { RESISTORES } from "~/lib/calculadora/associacoes/resistores";

export default function AssociacaoResistores() {
  return <AssociacaoComponentes config={RESISTORES} />;
}
