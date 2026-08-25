"use client";

import ConversorUnidades from "~/components/calculadora/ConversorUnidades";
import { VELOCIDADE } from "~/lib/calculadora/grupos/velocidade";

export default function ConversaoVelocidade() {
  return <ConversorUnidades grupo={VELOCIDADE} />;
}
