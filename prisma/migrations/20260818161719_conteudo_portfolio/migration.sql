-- CreateEnum
CREATE TYPE "CategoriaProjeto" AS ENUM ('EMPRESA_JUNIOR', 'UNIVERSIDADE', 'PESSOAL', 'PROFISSIONAL');

-- CreateEnum
CREATE TYPE "AcaoContato" AS ENUM ('COPIAR', 'LINK');

-- CreateTable
CREATE TABLE "Perfil" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "nome" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "fotoUrl" TEXT NOT NULL,
    "curriculoUrl" TEXT NOT NULL,
    "localizacao" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "tituloSobre" TEXT NOT NULL,
    "tituloProjetos" TEXT NOT NULL,
    "textoProjetos" TEXT NOT NULL,
    "tituloContato" TEXT NOT NULL,
    "textoContato" TEXT NOT NULL,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Perfil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experiencia" (
    "id" SERIAL NOT NULL,
    "organizacao" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "url" TEXT,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3),
    "atividades" TEXT[],
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "visivel" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Experiencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projeto" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "categoria" "CategoriaProjeto" NOT NULL,
    "url" TEXT,
    "imagemUrl" TEXT,
    "tecnologias" TEXT[],
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "visivel" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Projeto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriaSkill" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CategoriaSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "nivel" TEXT,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "categoriaId" INTEGER NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contato" (
    "id" SERIAL NOT NULL,
    "rotulo" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "url" TEXT,
    "acao" "AcaoContato" NOT NULL,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "visivel" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Contato_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Experiencia_ordem_idx" ON "Experiencia"("ordem");

-- CreateIndex
CREATE INDEX "Projeto_ordem_idx" ON "Projeto"("ordem");

-- CreateIndex
CREATE UNIQUE INDEX "CategoriaSkill_nome_key" ON "CategoriaSkill"("nome");

-- CreateIndex
CREATE INDEX "CategoriaSkill_ordem_idx" ON "CategoriaSkill"("ordem");

-- CreateIndex
CREATE INDEX "Skill_categoriaId_ordem_idx" ON "Skill"("categoriaId", "ordem");

-- CreateIndex
CREATE INDEX "Contato_ordem_idx" ON "Contato"("ordem");

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "CategoriaSkill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
