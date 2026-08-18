import { withAuth } from "next-auth/middleware";

/**
 * Barra /admin antes de qualquer renderização. Sem isso o redirect do layout só
 * acontece depois que o streaming já começou, e o Next cai num <meta refresh> de 1s.
 * O layout mantém a checagem como segunda camada.
 */
export default withAuth({
  pages: { signIn: "/login" },
  callbacks: {
    authorized: ({ token }) => token?.papel === "admin",
  },
});

export const config = {
  matcher: ["/admin/:path*"],
};
