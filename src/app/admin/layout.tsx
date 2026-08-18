import { redirect } from "next/navigation";

import { ehAdmin, getServerAuthSession } from "~/server/auth";

import NavAdmin from "./_components/NavAdmin";

export const metadata = {
  title: "Admin | Leonardo P. Côrtes",
  description: "Administração do conteúdo do portfólio.",
  icons: [{ rel: "icon", url: "/L2.png" }],
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessao = await getServerAuthSession();

  if (!sessao?.user) redirect("/login?callbackUrl=/admin");
  if (!ehAdmin(sessao.user.papel)) redirect("/");

  return (
    <div className="min-h-screen bg-fundo_azul_1 font-poppins text-texto_principal">
      <NavAdmin />
      <main className="mx-auto w-full max-w-[900px] px-5 py-8 sm:px-8">
        {children}
      </main>
    </div>
  );
}
