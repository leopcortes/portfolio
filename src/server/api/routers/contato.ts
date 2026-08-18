import { AcaoContato } from "@prisma/client";
import { z } from "zod";

import { adminProcedure, createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const dadosContato = z
  .object({
    rotulo: z.string().min(1),
    valor: z.string().min(1),
    url: z.string().url().nullish(),
    acao: z.nativeEnum(AcaoContato),
    visivel: z.boolean().default(true),
  })
  .refine((dados) => dados.acao !== AcaoContato.LINK || !!dados.url, {
    message: "Contatos com ação LINK precisam de uma URL.",
    path: ["url"],
  });

export const contatoRouter = createTRPCRouter({
  listar: publicProcedure.query(({ ctx }) =>
    ctx.db.contato.findMany({
      where: { visivel: true },
      orderBy: { ordem: "asc" },
    }),
  ),

  listarTodos: adminProcedure.query(({ ctx }) =>
    ctx.db.contato.findMany({ orderBy: { ordem: "asc" } }),
  ),

  criar: adminProcedure.input(dadosContato).mutation(async ({ ctx, input }) => {
    const ultimo = await ctx.db.contato.findFirst({
      orderBy: { ordem: "desc" },
      select: { ordem: true },
    });

    return ctx.db.contato.create({
      data: { ...input, ordem: (ultimo?.ordem ?? -1) + 1 },
    });
  }),

  atualizar: adminProcedure
    .input(z.object({ id: z.number().int(), dados: dadosContato }))
    .mutation(({ ctx, input }) =>
      ctx.db.contato.update({ where: { id: input.id }, data: input.dados }),
    ),

  remover: adminProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(({ ctx, input }) => ctx.db.contato.delete({ where: { id: input.id } })),

  reordenar: adminProcedure
    .input(z.object({ ids: z.array(z.number().int()) }))
    .mutation(({ ctx, input }) =>
      ctx.db.$transaction(
        input.ids.map((id, ordem) =>
          ctx.db.contato.update({ where: { id }, data: { ordem } }),
        ),
      ),
    ),
});
