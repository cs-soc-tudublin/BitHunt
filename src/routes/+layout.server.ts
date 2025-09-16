import type { LayoutServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { config } from 'dotenv';
import { redirect } from '@sveltejs/kit';

config();

export const load = (async ({ cookies, url }) => {
	const cookie = cookies.get('playerToken');
	const path = url.pathname;

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

		if (player.completed && !player.receivedPrize && path !== '/win') {
			throw redirect(303, '/win');
		}

		return {
			login: {
				successful: true
			},
			player: {
				name: player.name,
				studentId: player.studentId,
				scanned: totalScanned.length !== null ? totalScanned.length : 0,
				completed: player.completed,
				prizeGiven: player.receivedPrize
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
