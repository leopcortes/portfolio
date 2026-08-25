"use client";

import ConversorUnidades from "~/components/calculadora/ConversorUnidades";
import { TEMPERATURA } from "~/lib/calculadora/grupos/temperatura";

export default function ConversaoTemperatura() {
  return <ConversorUnidades grupo={TEMPERATURA} />;
}
