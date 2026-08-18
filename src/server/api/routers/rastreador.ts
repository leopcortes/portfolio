import { z } from "zod";

import { adminProcedure, createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const CHAVE = z.string().min(1);
const DATA = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida (esperado YYYY-MM-DD).");

export const rastreadorRouter = createTRPCRouter({
  listar: publicProcedure.query(async ({ ctx }) => {
    const marcacoes = await ctx.db.marcacaoRua.findMany();
    // Mesmo formato que o front já consumia do localStorage: Record<chave, {done,data}>.
    return Object.fromEntries(
      marcacoes.map((m) => [m.chave, { done: true as const, data: m.data }]),
    );
  }),

  marcar: adminProcedure
    .input(z.object({ chave: CHAVE, data: DATA }))
    .mutation(({ ctx, input }) =>
      ctx.db.marcacaoRua.upsert({
        where: { chave: input.chave },
        create: input,
        update: { data: input.data },
      }),
    ),

  desmarcar: adminProcedure
    .input(z.object({ chave: CHAVE }))
    .mutation(({ ctx, input }) =>
      ctx.db.marcacaoRua.deleteMany({ where: { chave: input.chave } }),
    ),

  /** Migração única do localStorage: grava só as chaves que ainda não existem no banco. */
  importar: adminProcedure
    .input(z.array(z.object({ chave: CHAVE, data: DATA })))
    .mutation(async ({ ctx, input }) => {
      const resultado = await ctx.db.marcacaoRua.createMany({
        data: input,
        skipDuplicates: true,
      });
      return { importadas: resultado.count };
    }),
});
