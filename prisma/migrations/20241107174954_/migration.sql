/*
  Warnings:

  - You are about to drop the column `difficulty` on the `Question` table. All the data in the column will be lost.
  - Added the required column `gameroomCode` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "difficulty",
ADD COLUMN     "gameroomCode" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_gameroomCode_fkey" FOREIGN KEY ("gameroomCode") REFERENCES "GameRoom"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
