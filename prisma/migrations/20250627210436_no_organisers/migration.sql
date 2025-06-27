/*
  Warnings:

  - You are about to drop the `Organiser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `organisers` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Organiser" DROP CONSTRAINT "Organiser_gameId_fkey";

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "organisers" TEXT NOT NULL;

-- DropTable
DROP TABLE "Organiser";
