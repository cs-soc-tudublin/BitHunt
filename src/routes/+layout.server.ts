import type { LayoutServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { config } from 'dotenv';

config();

export const load = (async ({ cookies }) => {
	const games = await prisma.game.findMany({
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

	return { games };
}) satisfies LayoutServerLoad;
