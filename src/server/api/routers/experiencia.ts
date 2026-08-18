import { z } from "zod";

import { adminProcedure, createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const dadosExperiencia = z.object({
  organizacao: z.string().min(1),
  cargo: z.string().min(1),
  local: z.string().min(1),
  url: z.string().url().nullish(),
  dataInicio: z.coerce.date(),
  dataFim: z.coerce.date().nullish(),
  atividades: z.array(z.string().min(1)),
  visivel: z.boolean().default(true),
});

export const experienciaRouter = createTRPCRouter({
  listar: publicProcedure.query(({ ctx }) =>
    ctx.db.experiencia.findMany({
      where: { visivel: true },
      orderBy: { ordem: "asc" },
    }),
  ),

  listarTodas: adminProcedure.query(({ ctx }) =>
    ctx.db.experiencia.findMany({ orderBy: { ordem: "asc" } }),
  ),

  criar: adminProcedure.input(dadosExperiencia).mutation(async ({ ctx, input }) => {
    const ultima = await ctx.db.experiencia.findFirst({
      orderBy: { ordem: "desc" },
      select: { ordem: true },
    });

    return ctx.db.experiencia.create({
      data: { ...input, ordem: (ultima?.ordem ?? -1) + 1 },
    });
  }),

  atualizar: adminProcedure
    .input(z.object({ id: z.number().int(), dados: dadosExperiencia }))
    .mutation(({ ctx, input }) =>
      ctx.db.experiencia.update({ where: { id: input.id }, data: input.dados }),
    ),

  remover: adminProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(({ ctx, input }) =>
      ctx.db.experiencia.delete({ where: { id: input.id } }),
    ),

  reordenar: adminProcedure
    .input(z.object({ ids: z.array(z.number().int()) }))
    .mutation(({ ctx, input }) =>
      ctx.db.$transaction(
        input.ids.map((id, ordem) =>
          ctx.db.experiencia.update({ where: { id }, data: { ordem } }),
        ),
      ),
    ),
});
