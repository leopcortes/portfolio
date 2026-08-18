"use client";

import { Element } from "react-scroll";

/**
 * Isola o único motivo pelo qual as seções precisavam ser client components. Com o
 * `Element` do react-scroll aqui, o conteúdo passado como children continua sendo
 * renderizado no servidor.
 */
export default function AncoraSecao({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <Element name={name} className="scroll-mt-24">
      {children}
    </Element>
  );
}
