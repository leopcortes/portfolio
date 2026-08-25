"use client";

import ConversorUnidades from "~/components/calculadora/ConversorUnidades";
import { PRESSAO } from "~/lib/calculadora/grupos/pressao";

export default function ConversaoPressao() {
  return <ConversorUnidades grupo={PRESSAO} />;
}
