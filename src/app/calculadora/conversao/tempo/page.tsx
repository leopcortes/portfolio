"use client";

import ConversorUnidades from "~/components/calculadora/ConversorUnidades";
import { TEMPO } from "~/lib/calculadora/grupos/tempo";

export default function ConversaoTempo() {
  return <ConversorUnidades grupo={TEMPO} />;
}
