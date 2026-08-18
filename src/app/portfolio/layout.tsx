export const metadata = {
  title: "Portfolio | Leonardo P. Côrtes",
  description: "Portfólio de Leonardo Pereira Côrtes",
  icons: [{ rel: "icon", url: "/L2.png" }],
};

// Os providers (tRPC, sessão) e o Toaster vivem no layout raiz; repeti-los aqui
// montava um segundo Toaster e duplicava cada toast.
export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="font-poppins">{children}</div>;
}
