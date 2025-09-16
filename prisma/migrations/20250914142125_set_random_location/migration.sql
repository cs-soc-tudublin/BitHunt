-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "nextLocation" INTEGER;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_nextLocation_fkey" FOREIGN KEY ("nextLocation") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
