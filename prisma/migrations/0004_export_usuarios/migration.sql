-- AlterEnum
ALTER TYPE "AdminAccessAction" ADD VALUE 'EXPORT_USERS';

-- AlterTable
ALTER TABLE "AdminAccessLog" ADD COLUMN     "exportedCount" INTEGER;
