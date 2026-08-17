import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "~/env";

export type Papel = "admin" | "usuario";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      papel: Papel;
    } & DefaultSession["user"];
  }

  interface User {
    papel: Papel;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    papel: Papel;
  }
}

/**
 * O cadastro inteiro do sistema. Um usuário só, vindo do .env — não há banco de
 * usuários nem tela de registro. Para liberar outra conta, basta somar uma entrada.
 */
const USUARIOS: {
  usuario: string;
  senha: string;
  nome: string;
  papel: Papel;
}[] = [
  {
    usuario: env.ADMIN_USERNAME,
    senha: env.ADMIN_PASSWORD,
    nome: "Admin",
    papel: "admin",
  },
];

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  // O provider de credenciais do NextAuth v4 não funciona com sessão em banco:
  // sem adapter, a sessão vive no JWT do cookie.
  session: { strategy: "jwt" },
  secret: env.NEXTAUTH_SECRET,
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "Usuário e senha",
      credentials: {
        usuario: { label: "Usuário", type: "text" },
        senha: { label: "Senha", type: "password" },
      },
      authorize(credentials) {
        const conta = USUARIOS.find(
          (u) =>
            u.usuario === credentials?.usuario && u.senha === credentials?.senha,
        );
        if (!conta) return null;
        return { id: conta.usuario, name: conta.nome, papel: conta.papel };
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) token.papel = user.papel;
      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub ?? "",
        papel: token.papel,
      },
    }),
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);

export const ehAdmin = (papel: Papel | undefined) => papel === "admin";
