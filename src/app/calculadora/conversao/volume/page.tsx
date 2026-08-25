"use client";

import ConversorUnidades from "~/components/calculadora/ConversorUnidades";
import { VOLUME } from "~/lib/calculadora/grupos/volume";

export default function ConversaoVolume() {
  return <ConversorUnidades grupo={VOLUME} />;
}
