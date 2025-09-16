-- AlterTable
ALTER TABLE "Login" ADD COLUMN     "admin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "player" TEXT;

-- AddForeignKey
ALTER TABLE "Login" ADD CONSTRAINT "Login_player_fkey" FOREIGN KEY ("player") REFERENCES "Player"("studentId") ON DELETE SET NULL ON UPDATE CASCADE;
