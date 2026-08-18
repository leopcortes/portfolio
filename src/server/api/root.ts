import { contatoRouter } from "~/server/api/routers/contato";
import { experienciaRouter } from "~/server/api/routers/experiencia";
import { perfilRouter } from "~/server/api/routers/perfil";
import { projetoRouter } from "~/server/api/routers/projeto";
import { rastreadorRouter } from "~/server/api/routers/rastreador";
import { skillRouter } from "~/server/api/routers/skill";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  perfil: perfilRouter,
  experiencia: experienciaRouter,
  projeto: projetoRouter,
  rastreador: rastreadorRouter,
  skill: skillRouter,
  contato: contatoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.projeto.listar();
 *       ^? Projeto[]
 */
export const createCaller = createCallerFactory(appRouter);
