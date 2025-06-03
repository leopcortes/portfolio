"use client";
import { Element } from "react-scroll";

export default function SobreMim() {
  const calcularIdade = (dataNascimento: string): number => {
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();

    if (
      mesAtual < nascimento.getMonth() ||
      (mesAtual === nascimento.getMonth() && diaAtual < nascimento.getDate())
    ) {
      idade--;
    }

    return idade;
  };

  const idade = calcularIdade("2001-09-01");

  return (
    <Element
      className="relative w-full justify-center overflow-hidden"
      name="sobremim"
    >
      <div className="flex flex-row items-center justify-center gap-16 rounded-[32px] bg-fundo_azul_2 p-12">
        <div>
          <h3 className="leading-3.5 mb-3 border-l-[3px] border-azul_principal px-3 py-[0.2rem] text-[0.85rem] font-medium uppercase tracking-[0.5px] text-verde_principal transition duration-300">
            SOBRE MIM E SKILLS
          </h3>

          <h1 className="leading-20 font-abril_fatface text-[2.5rem] font-normal text-texto_principal transition duration-300">
            Como posso ajudar sua empresa
          </h1>

          <p className="mt-3 text-[0.95rem] leading-8 text-texto_secundario">
            Sou Leonardo Pereira Côrtes, tenho {idade} anos e sou universitário
            cursando Engenharia de Computação na Universidade de Brasília.
            Cursei Engenharia de Redes de Comunicação durante 6 semestres, antes
            de realizar mudança interna para Eng. de Comp. <br></br>
            <br></br>
            <strong>Idiomas</strong>: Português (Nativo), Inglês (Fluente),
            Espanhol (Básico). <br></br>
            <strong>Front End</strong>: HTML, CSS e TailwindCSS, JavaScript e
            TypeScript, ReactJS e React Native, Vue.js, Next.js. <br></br>
            <strong>Back End</strong>: C++ e C (Avançado), Python e Java
            (Intermediário), Rust (Iniciante), MySQL, Prisma, tRCP.{" "}
            <br></br>
            <strong>Controle de Versão</strong>: Git, Github e Gitlab. <br></br>
            <strong>Ferramentas e IDEs</strong>: Pacote Office, VSCode, IntelliJ, Apache
            NetBeans.<br></br>
            <strong>Metodologias Ágeis</strong>: Scrum, XP. <br></br>
            <strong>Outros</strong>: Linux, WSL, Programação Embarcada
            (Arduino).
          </p>
        </div>
      </div>
    </Element>
  );
}
