import { z } from "zod";

import { adminProcedure, createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const PERFIL_ID = 1;

const dadosPerfil = z.object({
  nome: z.string().min(1),
  titulo: z.string().min(1),
  dataNascimento: z.coerce.date(),
  fotoUrl: z.string().min(1),
  curriculoUrl: z.string().min(1),
  localizacao: z.string().min(1),
  bio: z.string().min(1),
  tituloSobre: z.string().min(1),
  tituloProjetos: z.string().min(1),
  textoProjetos: z.string().min(1),
  tituloExperiencias: z.string().min(1),
  tituloContato: z.string().min(1),
  textoContato: z.string().min(1),
});

export const perfilRouter = createTRPCRouter({
  obter: publicProcedure.query(({ ctx }) =>
    ctx.db.perfil.findUnique({ where: { id: PERFIL_ID } }),
  ),

  atualizar: adminProcedure.input(dadosPerfil).mutation(({ ctx, input }) =>
    ctx.db.perfil.upsert({
      where: { id: PERFIL_ID },
      create: { id: PERFIL_ID, ...input },
      update: input,
    }),
  ),
});
