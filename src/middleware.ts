import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export const config = {
  matcher: ["/admin/:path*"],
};

/**
 * Barra /admin antes de qualquer renderização — sem isso o redirect do layout só
 * acontece depois que o streaming começou, e o Next cai num <meta refresh> de 1s.
 * O layout mantém a checagem como segunda camada.
 *
 * Não usa `withAuth` porque ele deduz o nome do cookie de sessão a partir de
 * NEXTAUTH_URL: se a variável não começar exatamente com "https://", ele procura
 * `next-auth.session-token` enquanto o login gravou `__Secure-next-auth.session-token`,
 * e rejeita sessões válidas sem emitir erro nenhum. Aqui o protocolo real da
 * requisição decide, então a configuração de NEXTAUTH_URL não influencia o login.
 */
export default async function middleware(req: NextRequest) {
  if (!process.env.NEXTAUTH_SECRET) {
    // withAuth apenas logaria e redirecionaria, produzindo um loop mudo no /login.
    return new NextResponse(
      "NEXTAUTH_SECRET ausente no ambiente do middleware.",
      { status: 500 },
    );
  }

  // O login grava `__Secure-next-auth.session-token` ou `next-auth.session-token`
  // dependendo de NEXTAUTH_URL. Tentar os dois nomes torna o middleware imune a
  // como essa variável está escrita. Ambos exigem assinatura válida com o secret,
  // então aceitar os dois não enfraquece nada.
  const ler = (seguro: boolean) =>
    getToken({ req, secret: process.env.NEXTAUTH_SECRET, secureCookie: seguro });

  const token = (await ler(true)) ?? (await ler(false));

  if (token?.papel === "admin") return NextResponse.next();

  const login = new URL("/login", req.url);
  login.searchParams.set("callbackUrl", req.nextUrl.pathname);

  const resposta = NextResponse.redirect(login);
  // Permite diagnosticar a recusa com um `curl -I` sem abrir os logs da Vercel.
  resposta.headers.set("x-admin-auth", token ? "papel-nao-admin" : "sem-token");
  return resposta;
}
