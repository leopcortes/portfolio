import { Suspense } from "react";

import FormularioLogin from "./_components/FormularioLogin";

export const metadata = {
  title: "Entrar | Leonardo P. Côrtes",
  description: "Acesso restrito à administração do site.",
  icons: [{ rel: "icon", url: "/L2.png" }],
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-fundo_azul_1 px-4">
      {/* useSearchParams exige fronteira de Suspense no App Router */}
      <Suspense>
        <FormularioLogin />
      </Suspense>
    </main>
  );
}
