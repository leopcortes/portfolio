"use client";

import ConversorUnidades from "~/components/calculadora/ConversorUnidades";
import { AREA } from "~/lib/calculadora/grupos/area";

export default function ConversaoArea() {
  return <ConversorUnidades grupo={AREA} />;
}
