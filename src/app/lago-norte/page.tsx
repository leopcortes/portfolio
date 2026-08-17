import Rastreador from "./_components/Rastreador";

export const metadata = {
  title: "Rastreador de ruas | Lago Norte",
  description:
    "Quais ruas do Lago Norte eu já corri - checklist por quadra e conjunto sobre o mapa do bairro.",
  icons: [{ rel: "icon", url: "/L2.png" }],
};

export default function LagoNortePage() {
  return <Rastreador />;
}
