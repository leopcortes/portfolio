"use client";

import AssociacaoComponentes from "~/components/calculadora/AssociacaoComponentes";
import { CAPACITORES } from "~/lib/calculadora/associacoes/capacitores";

export default function AssociacaoCapacitores() {
  return <AssociacaoComponentes config={CAPACITORES} />;
}
