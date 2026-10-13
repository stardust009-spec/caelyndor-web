-- CreateTable
CREATE TABLE "QuizIntento" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "obra" TEXT NOT NULL,
    "modalidad" TEXT NOT NULL,
    "preguntas" TEXT[],
    "ordenOpciones" JSONB NOT NULL,
    "respuestas" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "entregadoEn" TIMESTAMP(3),
    "aciertos" INTEGER,
    "aprobado" BOOLEAN,
    "eventoFracaso" TEXT,

    CONSTRAINT "QuizIntento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "QuizIntento_userId_obra_modalidad_createdAt_idx" ON "QuizIntento"("userId", "obra", "modalidad", "createdAt");

-- CreateIndex
CREATE INDEX "QuizIntento_userId_aprobado_idx" ON "QuizIntento"("userId", "aprobado");

-- AddForeignKey
ALTER TABLE "QuizIntento" ADD CONSTRAINT "QuizIntento_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

