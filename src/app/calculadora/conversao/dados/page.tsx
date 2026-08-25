"use client";

import ConversorUnidades from "~/components/calculadora/ConversorUnidades";
import { DADOS } from "~/lib/calculadora/grupos/dados";

export default function ConversaoDados() {
  return <ConversorUnidades grupo={DADOS} />;
}
