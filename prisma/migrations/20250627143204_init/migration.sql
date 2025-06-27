-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "prizes" TEXT,
    "prizeQty" INTEGER,
    "description" TEXT,
    "enableLeaderboard" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organiser" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT,
    "showLink" BOOLEAN NOT NULL DEFAULT true,
    "image" TEXT,
    "showLogo" BOOLEAN NOT NULL DEFAULT false,
    "gameId" INTEGER,

    CONSTRAINT "Organiser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "studentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "showOnBoard" BOOLEAN NOT NULL DEFAULT true,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "gameId" INTEGER,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("studentId")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hint" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "qrCode" TEXT NOT NULL,
    "gameId" INTEGER,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerLocation" (
    "id" SERIAL NOT NULL,
    "playerId" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,
    "completionTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlayerLocation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Organiser" ADD CONSTRAINT "Organiser_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerLocation" ADD CONSTRAINT "PlayerLocation_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerLocation" ADD CONSTRAINT "PlayerLocation_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
