import { CategoriaProjeto } from "@prisma/client";
import { z } from "zod";

import { adminProcedure, createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const dadosProjeto = z.object({
  titulo: z.string().min(1),
  descricao: z.string().min(1),
  categoria: z.nativeEnum(CategoriaProjeto),
  url: z.string().url().nullish(),
  imagemUrl: z.string().nullish(),
  tecnologias: z.array(z.string().min(1)),
  visivel: z.boolean().default(true),
});

export const projetoRouter = createTRPCRouter({
  listar: publicProcedure.query(({ ctx }) =>
    ctx.db.projeto.findMany({
      where: { visivel: true },
      orderBy: { ordem: "asc" },
    }),
  ),

  listarTodos: adminProcedure.query(({ ctx }) =>
    ctx.db.projeto.findMany({ orderBy: { ordem: "asc" } }),
  ),

  criar: adminProcedure.input(dadosProjeto).mutation(async ({ ctx, input }) => {
    const ultimo = await ctx.db.projeto.findFirst({
      orderBy: { ordem: "desc" },
      select: { ordem: true },
    });

    return ctx.db.projeto.create({
      data: { ...input, ordem: (ultimo?.ordem ?? -1) + 1 },
    });
  }),

  atualizar: adminProcedure
    .input(z.object({ id: z.number().int(), dados: dadosProjeto }))
    .mutation(({ ctx, input }) =>
      ctx.db.projeto.update({ where: { id: input.id }, data: input.dados }),
    ),

  remover: adminProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(({ ctx, input }) => ctx.db.projeto.delete({ where: { id: input.id } })),

  reordenar: adminProcedure
    .input(z.object({ ids: z.array(z.number().int()) }))
    .mutation(({ ctx, input }) =>
      ctx.db.$transaction(
        input.ids.map((id, ordem) =>
          ctx.db.projeto.update({ where: { id }, data: { ordem } }),
        ),
      ),
    ),
});
