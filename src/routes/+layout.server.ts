import type { LayoutServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { config } from 'dotenv';

config();

export const load = (async ({ cookies }) => {
	const cookie = cookies.get('playerToken');
	let player = null;

	const doesTokenExist = await prisma.login.findFirst({
		where: {
			token: cookie,
			admin: false
		}
	});

	if (doesTokenExist) {
		if (doesTokenExist.expiration >= new Date()) {
			player = await prisma.player.findFirst({
				where: {
					studentId: doesTokenExist.player != null ? doesTokenExist.player : ''
				}
			});
		}
	}

	const game = await prisma.game.findFirst({
		where: {
			active: true
		},
		select: {
			id: true,
			name: true,
			organisers: true,
			prizes: true,
			prizeQty: true,
			description: true,
			enableLeaderboard: true
		}
	});

	if (player != null && game != null && player.gameId === game.id) {
		const totalScanned = await prisma.playerLocation.findMany({
			where: {
				playerId: player.studentId
			}
		});

		return {
			login: {
				successful: true
			},
			player: {
				name: player.name,
				studentId: player.studentId,
				scanned: totalScanned.length !== null ? totalScanned.length : 0
			},
			game
		};
	} else {
		return {
			login: {
				successful: false
			},
			game
		};
	}
}) satisfies LayoutServerLoad;
