import "~/styles/globals.css";

import { AuthProvider } from "~/components/authProvider";
import { Toaster } from "~/components/ui/toaster";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata = {
  title: "Leonardo P. Côrtes",
  description: "Portfólio de Leonardo Pereira Côrtes",
  icons: [{ rel: "icon", url: "/L2.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <TRPCReactProvider>
            <div
              className="mx-auto font-lexend text-texto_principal"
              style={
                {
                  // width: "min(1400px,100%)",
                }
              }
            >
              {children}
            </div>
            <Toaster />
          </TRPCReactProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
