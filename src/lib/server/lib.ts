import prisma from '$lib/server/prisma';

/**
 * Get the next location for a player to find
 * @param playerId The Player's Student ID
 * @param gameId The game ID
 */
export async function getNextLocation(playerId: string, gameId: number) {
	const locations = await prisma.location.findMany({
		where: {
			gameId,
			PlayerLocation: {
				none: {
					playerId
				}
			}
		}
	});

	return locations[Math.floor(Math.random() * locations.length)];
}

export async function getCompletedLocationsCount(playerId: string, gameId: number) {
	const locations = await prisma.location.findMany({
		where: {
			gameId,
			PlayerLocation: {
				none: {
					playerId
				}
			}
		}
	});

	if (locations === undefined || locations === null) {
		return 0;
	} else {
		return locations.length;
	}
}
