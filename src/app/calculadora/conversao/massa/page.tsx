"use client";

import ConversorUnidades from "~/components/calculadora/ConversorUnidades";
import { MASSA } from "~/lib/calculadora/grupos/massa";

export default function ConversaoMassa() {
  return <ConversorUnidades grupo={MASSA} />;
}
