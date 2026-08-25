"use client";

import ConversorUnidades from "~/components/calculadora/ConversorUnidades";
import { COMPRIMENTO } from "~/lib/calculadora/grupos/comprimento";

export default function ConversaoComprimento() {
  return <ConversorUnidades grupo={COMPRIMENTO} />;
}
