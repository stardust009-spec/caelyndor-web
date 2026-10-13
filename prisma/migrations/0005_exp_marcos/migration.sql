-- AlterTable
ALTER TABLE "User" ADD COLUMN     "exp" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "marcoSlug" TEXT;

-- CreateTable
CREATE TABLE "ExpLedger" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "clave" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExpLedger_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ExpLedger_userId_idx" ON "ExpLedger"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ExpLedger_userId_clave_key" ON "ExpLedger"("userId", "clave");

-- AddForeignKey
ALTER TABLE "ExpLedger" ADD CONSTRAINT "ExpLedger_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

