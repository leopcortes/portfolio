"use client";
import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { Element } from "react-scroll";

export default function Experiencias() {
  return (
    <Element className="flex flex-col gap-8" name="experiencias">
      <div>
        <h3 className="leading-3.5 mb-3 border-l-[3px] border-azul_principal px-3 py-[0.2rem] text-[0.85rem] font-medium uppercase tracking-[0.5px] text-verde_principal transition duration-300">
          Experiências
        </h3>

        <h1 className="leading-20 font-abril_fatface text-[2.5rem] font-normal text-texto_principal transition duration-300">
          Minhas experiências profissionais
        </h1>

        {/* <p className="mt-3 text-[0.95rem] leading-8 text-texto_secundario">
          Esses são alguns dos projetos que já realizei, alguns por conta
          própria outros foram feitos para universidade. Nesses projetos busquei
          trabalhar com aquilo que me interessa buscando aprimorar meus
          conceitos nas áreas necessárias.
        </p> */}

        <div className="mt-8 flex justify-between gap-8 border-b-[2px] border-b-fundo_azul_2 pb-2">
          <div className="flex flex-col gap-2">
            <p className="font-lexend text-2xl">
              Struct Empresa Júnior de Engenharia da Computação
            </p>
            <p>Voluntário Desenvolvedor Web</p>
            <ul className="list-disc pl-5 text-texto_secundario">
              <li>
                Gerência e desenvolvimento de projetos internos e externos.
              </li>
              <li>Gestão financeira e administrativa da empresa.</li>
              <li>Design de interfaces e protótipos funcionais.</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Calendar />
              <p>Julho/2023 – Dezembro/2024</p>
            </div>

            <div className="flex items-center gap-2">
              <MapPin />
              <p>Universidade de Brasília, Brasília - DF</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between gap-8 border-b-[2px] border-b-fundo_azul_2 pb-4">
          <div className="flex flex-col gap-2">
            <p className="font-lexend text-2xl">
              Struct Empresa Júnior de Engenharia da Computação
            </p>
            <p>Estágio - Desenvolvedor Full Stack</p>
            <ul className="list-disc pl-5 text-texto_secundario">
              <li>
                Desenvolvimento Web com Vue, Java e PostgreSQL.
              </li>
              <li>Auxiliar integração entre Back-End e App Mobile.</li>
              <li className="underline">
                <Link href={"https://exati.com/pt/"} target="_blank">
                exati.com
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Calendar />
              <p>Abril/2025 - Presente</p>
            </div>

            <div className="flex items-center gap-2">
              <MapPin />
              <p>Curitiba, Paraná (Remoto)</p>
            </div>
          </div>
        </div>
      </div>
    </Element>
  );
}
