-- CreateTable
CREATE TABLE "ForoHilo" (
    "id" TEXT NOT NULL,
    "espacio" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "autorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ultimaActividad" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fijado" BOOLEAN NOT NULL DEFAULT false,
    "cerrado" BOOLEAN NOT NULL DEFAULT false,
    "ocultoEn" TIMESTAMP(3),
    "ocultoPorId" TEXT,
    "ocultoMotivo" TEXT,

    CONSTRAINT "ForoHilo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForoMensaje" (
    "id" TEXT NOT NULL,
    "hiloId" TEXT NOT NULL,
    "autorId" TEXT NOT NULL,
    "cuerpo" TEXT NOT NULL,
    "esApertura" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "likesCount" INTEGER NOT NULL DEFAULT 0,
    "ocultoEn" TIMESTAMP(3),
    "ocultoPorId" TEXT,
    "ocultoMotivo" TEXT,

    CONSTRAINT "ForoMensaje_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForoLike" (
    "userId" TEXT NOT NULL,
    "mensajeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ForoLike_pkey" PRIMARY KEY ("userId","mensajeId")
);

-- CreateTable
CREATE TABLE "ForoReporte" (
    "id" TEXT NOT NULL,
    "mensajeId" TEXT NOT NULL,
    "autorId" TEXT NOT NULL,
    "motivo" TEXT NOT NULL,
    "detalle" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resueltoEn" TIMESTAMP(3),
    "resueltoPorId" TEXT,
    "resolucion" TEXT,

    CONSTRAINT "ForoReporte_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ForoHilo_espacio_ocultoEn_fijado_ultimaActividad_idx" ON "ForoHilo"("espacio", "ocultoEn", "fijado", "ultimaActividad");

-- CreateIndex
CREATE INDEX "ForoMensaje_hiloId_createdAt_idx" ON "ForoMensaje"("hiloId", "createdAt");

-- CreateIndex
CREATE INDEX "ForoReporte_resueltoEn_createdAt_idx" ON "ForoReporte"("resueltoEn", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "ForoReporte_mensajeId_autorId_key" ON "ForoReporte"("mensajeId", "autorId");

-- AddForeignKey
ALTER TABLE "ForoHilo" ADD CONSTRAINT "ForoHilo_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForoHilo" ADD CONSTRAINT "ForoHilo_ocultoPorId_fkey" FOREIGN KEY ("ocultoPorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForoMensaje" ADD CONSTRAINT "ForoMensaje_hiloId_fkey" FOREIGN KEY ("hiloId") REFERENCES "ForoHilo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForoMensaje" ADD CONSTRAINT "ForoMensaje_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForoMensaje" ADD CONSTRAINT "ForoMensaje_ocultoPorId_fkey" FOREIGN KEY ("ocultoPorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForoLike" ADD CONSTRAINT "ForoLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForoLike" ADD CONSTRAINT "ForoLike_mensajeId_fkey" FOREIGN KEY ("mensajeId") REFERENCES "ForoMensaje"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForoReporte" ADD CONSTRAINT "ForoReporte_mensajeId_fkey" FOREIGN KEY ("mensajeId") REFERENCES "ForoMensaje"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForoReporte" ADD CONSTRAINT "ForoReporte_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForoReporte" ADD CONSTRAINT "ForoReporte_resueltoPorId_fkey" FOREIGN KEY ("resueltoPorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

