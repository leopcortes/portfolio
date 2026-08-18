/** Move um item de posição, devolvendo uma nova lista. Fora dos limites, devolve a original. */
export function mover<T>(lista: T[], de: number, para: number): T[] {
  if (para < 0 || para >= lista.length || de === para) return lista;

  const copia = [...lista];
  const [item] = copia.splice(de, 1);
  if (item === undefined) return lista;

  copia.splice(para, 0, item);
  return copia;
}
