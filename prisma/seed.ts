import { PrismaClient, AcaoContato, CategoriaProjeto } from "@prisma/client";

const db = new PrismaClient();

/// Primeiro dia do mês — as datas de experiência só são exibidas como mês/ano.
const mes = (ano: number, numeroMes: number): Date =>
  new Date(Date.UTC(ano, numeroMes - 1, 1));

const perfil = {
  id: 1,
  nome: "Leonardo Pereira Côrtes",
  titulo: "Desenvolvedor Full Stack.",
  dataNascimento: new Date(Date.UTC(2001, 8, 1)),
  fotoUrl: "/foto-perfil-leo.jpg",
  curriculoUrl: "/Curriculo_Leonardo_Cortes.pdf",
  localizacao: "Brasília - DF",
  // {idade} é substituído em tempo de renderização a partir de dataNascimento.
  bio:
    "Sou Leonardo Pereira Côrtes, tenho {idade} anos e sou universitário cursando " +
    "Engenharia de Computação na Universidade de Brasília. Cursei Engenharia de Redes " +
    "de Comunicação durante 6 semestres, antes de realizar mudança interna para Eng. de Comp.",
  tituloSobre: "Como posso ajudar sua empresa",
  tituloProjetos: "Projetos que já realizei",
  textoProjetos:
    "Esses são alguns dos projetos que já realizei, alguns por conta própria outros foram " +
    "feitos para universidade. Nesses projetos busquei trabalhar com aquilo que me interessa " +
    "buscando aprimorar meus conceitos nas áreas necessárias.",
  tituloExperiencias: "Minhas experiências profissionais",
  tituloContato: "Vamos trabalhar juntos",
  textoContato:
    "Moro em Brasília-DF, tenho horários flexíveis e desejo colocar meus conhecimentos em " +
    "prática buscando crescer profissionalmente, adquirindo experiência e novas habilidades " +
    "na área de tecnologia, computação e programação.",
};

const experiencias = [
  {
    organizacao: "Struct Empresa Júnior de Engenharia da Computação",
    cargo: "Voluntário Desenvolvedor Web",
    local: "Universidade de Brasília, Brasília - DF",
    url: null,
    dataInicio: mes(2023, 7),
    dataFim: mes(2024, 12),
    atividades: [
      "Gerência e desenvolvimento de projetos internos e externos.",
      "Gestão financeira e administrativa da empresa.",
      "Design de interfaces e protótipos funcionais.",
    ],
    ordem: 0,
  },
  {
    organizacao: "Struct Empresa Júnior de Engenharia da Computação",
    cargo: "Estágio - Desenvolvedor Full Stack",
    local: "Curitiba, Paraná (Remoto)",
    url: "https://exati.com/pt/",
    dataInicio: mes(2025, 4),
    dataFim: null,
    atividades: [
      "Desenvolvimento Web com Vue, Java e PostgreSQL.",
      "Auxiliar integração entre Back-End e App Mobile.",
    ],
    ordem: 1,
  },
];

const projetos = [
  {
    titulo: "Site Struct EJ",
    descricao:
      "Projeto do atual site da empresa júnior de engenharia de computação da Universidade " +
      "de Brasília onde atuei como gerente, designer e desenvolvedor.",
    categoria: CategoriaProjeto.EMPRESA_JUNIOR,
    url: "https://www.struct.unb.br/",
    tecnologias: ["React", "TypeScript", "Prisma", "TailwindCSS"],
    ordem: 0,
  },
  {
    titulo: "Aplicativo para o Evento CSBC 2024",
    descricao:
      "Aplicativo para consulta de eventos e recebimento de notícias do evento Congresso da " +
      "Sociedade Brasileira de Computação 2024. Prototipação e desenvolvimento do front-end.",
    categoria: CategoriaProjeto.EMPRESA_JUNIOR,
    url: null,
    tecnologias: ["React Native", "Expo"],
    ordem: 1,
  },
  {
    titulo: "Sistema de Gerenciamento de Estoque",
    descricao:
      "Sistema web de gerenciamento de estoque para empresa que assessora restaurantes. " +
      "Interfaces para controle de usuários, estoque, importação de notas fiscais, geração " +
      "de inventários, entre outros. Gerência da equipe, prototipação e desenvolvimento full-stack.",
    categoria: CategoriaProjeto.EMPRESA_JUNIOR,
    url: null,
    tecnologias: ["React", "TypeScript", "Prisma", "TailwindCSS"],
    ordem: 2,
  },
  {
    titulo: "Irrigador Automático",
    descricao:
      "Projeto para a universidade de um irrigador automático para plantas pequenas.",
    categoria: CategoriaProjeto.UNIVERSIDADE,
    url: null,
    tecnologias: ["Arduino", "C++", "Sensores de umidade", "Bomba peristáltica", "LEDs"],
    ordem: 3,
  },
  {
    titulo: "Cofre Automático",
    descricao:
      "Projeto para a universidade de um cofre inteligente com abertura via senha ou celular.",
    categoria: CategoriaProjeto.UNIVERSIDADE,
    url: null,
    tecnologias: ["Arduino", "C++", "LCD", "Motores", "LEDs"],
    ordem: 4,
  },
  {
    titulo: "Jogo Escape",
    descricao: "Projeto de um pequeno jogo de fuga da prisão.",
    categoria: CategoriaProjeto.PESSOAL,
    url: null,
    tecnologias: ["Unity", "C#"],
    ordem: 5,
  },
];

const categoriasSkill = [
  {
    nome: "Idiomas",
    skills: [
      { nome: "Português", nivel: "Nativo" },
      { nome: "Inglês", nivel: "Fluente" },
      { nome: "Espanhol", nivel: "Básico" },
    ],
  },
  {
    nome: "Front End",
    skills: [
      { nome: "HTML", nivel: null },
      { nome: "CSS", nivel: null },
      { nome: "TailwindCSS", nivel: null },
      { nome: "JavaScript", nivel: null },
      { nome: "TypeScript", nivel: null },
      { nome: "ReactJS", nivel: null },
      { nome: "React Native", nivel: null },
      { nome: "Vue.js", nivel: null },
      { nome: "Next.js", nivel: null },
    ],
  },
  {
    nome: "Back End",
    skills: [
      { nome: "C++", nivel: "Avançado" },
      { nome: "C", nivel: "Avançado" },
      { nome: "Python", nivel: "Intermediário" },
      { nome: "Java", nivel: "Intermediário" },
      { nome: "Rust", nivel: "Iniciante" },
      { nome: "MySQL", nivel: null },
      { nome: "Prisma", nivel: null },
      { nome: "tRPC", nivel: null },
    ],
  },
  {
    nome: "Controle de Versão",
    skills: [
      { nome: "Git", nivel: null },
      { nome: "GitHub", nivel: null },
      { nome: "GitLab", nivel: null },
    ],
  },
  {
    nome: "Ferramentas e IDEs",
    skills: [
      { nome: "Pacote Office", nivel: null },
      { nome: "VSCode", nivel: null },
      { nome: "IntelliJ", nivel: null },
      { nome: "Apache NetBeans", nivel: null },
    ],
  },
  {
    nome: "Metodologias Ágeis",
    skills: [
      { nome: "Scrum", nivel: null },
      { nome: "XP", nivel: null },
    ],
  },
  {
    nome: "Outros",
    skills: [
      { nome: "Linux", nivel: null },
      { nome: "WSL", nivel: null },
      { nome: "Programação Embarcada", nivel: "Arduino" },
    ],
  },
];

const contatos = [
  {
    rotulo: "email",
    valor: "leo.pereira.cortes@gmail.com",
    url: null,
    acao: AcaoContato.COPIAR,
    ordem: 0,
  },
  {
    rotulo: "github",
    valor: "leopcortes",
    url: "https://github.com/leopcortes",
    acao: AcaoContato.LINK,
    ordem: 1,
  },
  {
    rotulo: "linkedin",
    valor: "Leonardo Côrtes",
    url: "https://www.linkedin.com/in/leonardo-c%C3%B4rtes-a789a91bb/",
    acao: AcaoContato.LINK,
    ordem: 2,
  },
  {
    rotulo: "instagram",
    valor: "leop.cortes",
    url: "https://www.instagram.com/leop.cortes",
    acao: AcaoContato.LINK,
    ordem: 3,
  },
  {
    rotulo: "whatsapp",
    valor: "(61)991164633",
    url: null,
    acao: AcaoContato.COPIAR,
    ordem: 4,
  },
  {
    rotulo: "discord",
    valor: "leop#3838",
    url: null,
    acao: AcaoContato.COPIAR,
    ordem: 5,
  },
];

async function main() {
  // Recriar do zero mantém o seed idempotente; o cascade de CategoriaSkill limpa as skills.
  await db.$transaction([
    db.contato.deleteMany(),
    db.projeto.deleteMany(),
    db.experiencia.deleteMany(),
    db.categoriaSkill.deleteMany(),
    db.perfil.deleteMany(),
  ]);

  await db.perfil.create({ data: perfil });
  await db.experiencia.createMany({ data: experiencias });
  await db.projeto.createMany({ data: projetos });
  await db.contato.createMany({ data: contatos });

  for (const [indice, categoria] of categoriasSkill.entries()) {
    await db.categoriaSkill.create({
      data: {
        nome: categoria.nome,
        ordem: indice,
        skills: {
          create: categoria.skills.map((skill, posicao) => ({
            nome: skill.nome,
            nivel: skill.nivel,
            ordem: posicao,
          })),
        },
      },
    });
  }

  const totais = {
    perfil: await db.perfil.count(),
    experiencias: await db.experiencia.count(),
    projetos: await db.projeto.count(),
    categoriasSkill: await db.categoriaSkill.count(),
    skills: await db.skill.count(),
    contatos: await db.contato.count(),
  };

  console.log("Seed concluído:", totais);
}

main()
  .catch((erro) => {
    console.error(erro);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
