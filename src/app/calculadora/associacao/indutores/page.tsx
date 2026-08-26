"use client";

import AssociacaoComponentes from "~/components/calculadora/AssociacaoComponentes";
import { INDUTORES } from "~/lib/calculadora/associacoes/indutores";

export default function AssociacaoIndutores() {
  return <AssociacaoComponentes config={INDUTORES} />;
}
