-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "AdminAccessAction" AS ENUM ('VIEW_PROFILE', 'VIEW_USER_LIST', 'UNAUTHORIZED_ATTEMPT');

-- CreateEnum
CREATE TYPE "AdminModerationAction" AS ENUM ('APPLY_RESTRICTION', 'LIFT_RESTRICTION');

-- AlterTable
ALTER TABLE "AppSession" ADD COLUMN     "adminVerifiedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER',
ADD COLUMN     "totpConfirmedAt" TIMESTAMP(3),
ADD COLUMN     "totpSecret" TEXT;

-- CreateTable
CREATE TABLE "AdminAccessLog" (
    "id" TEXT NOT NULL,
    "adminUserId" TEXT,
    "targetUserId" TEXT,
    "action" "AdminAccessAction" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT NOT NULL,

    CONSTRAINT "AdminAccessLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminModerationLog" (
    "id" TEXT NOT NULL,
    "adminUserId" TEXT NOT NULL,
    "targetUserId" TEXT NOT NULL,
    "action" "AdminModerationAction" NOT NULL,
    "restriction" "RestrictionType" NOT NULL,
    "reason" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT NOT NULL,

    CONSTRAINT "AdminModerationLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AdminAccessLog_timestamp_idx" ON "AdminAccessLog"("timestamp");

-- CreateIndex
CREATE INDEX "AdminModerationLog_timestamp_idx" ON "AdminModerationLog"("timestamp");

-- AddForeignKey
ALTER TABLE "AdminAccessLog" ADD CONSTRAINT "AdminAccessLog_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminAccessLog" ADD CONSTRAINT "AdminAccessLog_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminModerationLog" ADD CONSTRAINT "AdminModerationLog_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminModerationLog" ADD CONSTRAINT "AdminModerationLog_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
