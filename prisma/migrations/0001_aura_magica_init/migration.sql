-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Senda" AS ENUM ('LLAMA', 'AGUA', 'HIELO', 'AIRE', 'TIERRA', 'VIDA', 'CONEXION', 'TRUENO', 'VACIO', 'FE');

-- CreateEnum
CREATE TYPE "RangoAura" AS ENUM ('AURA_LATENTE', 'NOVATO_DEL_AURA', 'PRIMERA_ESPECIALIZACION', 'SEGUNDA_ESPECIALIZACION', 'MAESTRIA_AVANZADA', 'MAESTRO_DEL_AURA');

-- CreateEnum
CREATE TYPE "CategoriaLogro" AS ENUM ('PROGRESION', 'UNIVERSO', 'CONDUCTA');

-- CreateEnum
CREATE TYPE "RarezaHu" AS ENUM ('COMUN', 'INFRECUENTE', 'RARA', 'SINGULAR');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "currentRank" "RangoAura" NOT NULL DEFAULT 'AURA_LATENTE',
    "sendaPrincipal" "Senda",
    "sendasCercanas" "Senda"[] DEFAULT ARRAY[]::"Senda"[],
    "habilidadUnicaId" TEXT,
    "habilidadUnicaElegidaEn" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoryProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "storySlug" TEXT NOT NULL,
    "currentProgress" INTEGER NOT NULL DEFAULT 0,
    "highestProgress" INTEGER NOT NULL DEFAULT 0,
    "completedAt" TIMESTAMP(3),
    "completionRewardClaimed" BOOLEAN NOT NULL DEFAULT false,
    "rereadCount" INTEGER NOT NULL DEFAULT 0,
    "rereadArmed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StoryProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "CategoriaLogro" NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAchievement" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,
    "unlockedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAchievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SendaTestResult" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "respuestas" JSONB NOT NULL,
    "sendaPrincipalResultado" "Senda" NOT NULL,
    "sendasCercanasResultado" "Senda"[],
    "eligioManual" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SendaTestResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HabilidadUnica" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "rareza" "RarezaHu" NOT NULL,
    "sendasAfines" "Senda"[],

    CONSTRAINT "HabilidadUnica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfertaHu" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "opciones" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OfertaHu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "StoryProgress_userId_completedAt_idx" ON "StoryProgress"("userId", "completedAt");

-- CreateIndex
CREATE UNIQUE INDEX "StoryProgress_userId_storySlug_key" ON "StoryProgress"("userId", "storySlug");

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_slug_key" ON "Achievement"("slug");

-- CreateIndex
CREATE INDEX "UserAchievement_userId_idx" ON "UserAchievement"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserAchievement_userId_achievementId_key" ON "UserAchievement"("userId", "achievementId");

-- CreateIndex
CREATE UNIQUE INDEX "SendaTestResult_userId_key" ON "SendaTestResult"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OfertaHu_userId_key" ON "OfertaHu"("userId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_habilidadUnicaId_fkey" FOREIGN KEY ("habilidadUnicaId") REFERENCES "HabilidadUnica"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryProgress" ADD CONSTRAINT "StoryProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SendaTestResult" ADD CONSTRAINT "SendaTestResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfertaHu" ADD CONSTRAINT "OfertaHu_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
