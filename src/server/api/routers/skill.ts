import { z } from "zod";

import { adminProcedure, createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const incluirSkills = {
  skills: { orderBy: { ordem: "asc" } },
} as const;

export const skillRouter = createTRPCRouter({
  listarCategorias: publicProcedure.query(({ ctx }) =>
    ctx.db.categoriaSkill.findMany({
      orderBy: { ordem: "asc" },
      include: incluirSkills,
    }),
  ),

  criarCategoria: adminProcedure
    .input(z.object({ nome: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const ultima = await ctx.db.categoriaSkill.findFirst({
        orderBy: { ordem: "desc" },
        select: { ordem: true },
      });

      return ctx.db.categoriaSkill.create({
        data: { nome: input.nome, ordem: (ultima?.ordem ?? -1) + 1 },
      });
    }),

  renomearCategoria: adminProcedure
    .input(z.object({ id: z.number().int(), nome: z.string().min(1) }))
    .mutation(({ ctx, input }) =>
      ctx.db.categoriaSkill.update({
        where: { id: input.id },
        data: { nome: input.nome },
      }),
    ),

  removerCategoria: adminProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(({ ctx, input }) =>
      ctx.db.categoriaSkill.delete({ where: { id: input.id } }),
    ),

  reordenarCategorias: adminProcedure
    .input(z.object({ ids: z.array(z.number().int()) }))
    .mutation(({ ctx, input }) =>
      ctx.db.$transaction(
        input.ids.map((id, ordem) =>
          ctx.db.categoriaSkill.update({ where: { id }, data: { ordem } }),
        ),
      ),
    ),

  criarSkill: adminProcedure
    .input(
      z.object({
        categoriaId: z.number().int(),
        nome: z.string().min(1),
        nivel: z.string().nullish(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const ultima = await ctx.db.skill.findFirst({
        where: { categoriaId: input.categoriaId },
        orderBy: { ordem: "desc" },
        select: { ordem: true },
      });

      return ctx.db.skill.create({
        data: { ...input, ordem: (ultima?.ordem ?? -1) + 1 },
      });
    }),

  atualizarSkill: adminProcedure
    .input(
      z.object({
        id: z.number().int(),
        nome: z.string().min(1),
        nivel: z.string().nullish(),
      }),
    )
    .mutation(({ ctx, input }) =>
      ctx.db.skill.update({
        where: { id: input.id },
        data: { nome: input.nome, nivel: input.nivel },
      }),
    ),

  removerSkill: adminProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(({ ctx, input }) => ctx.db.skill.delete({ where: { id: input.id } })),

  reordenarSkills: adminProcedure
    .input(z.object({ ids: z.array(z.number().int()) }))
    .mutation(({ ctx, input }) =>
      ctx.db.$transaction(
        input.ids.map((id, ordem) =>
          ctx.db.skill.update({ where: { id }, data: { ordem } }),
        ),
      ),
    ),
});
