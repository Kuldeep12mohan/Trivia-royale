-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_gameId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "gameId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "GameRoom"("code") ON DELETE SET NULL ON UPDATE CASCADE;
