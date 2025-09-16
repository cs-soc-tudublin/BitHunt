import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import { getCompletedLocationsCount } from '$lib/server/lib';

export const load: PageServerLoad = async ({ cookies }) => {
	const cookie = cookies.get('playerToken');

	const checkToken = await prisma.login.findFirst({
		where: {
			token: cookie,
			admin: false
		}
	});

	if (checkToken) {
		const player = await prisma.player.findFirst({
			where: {
				studentId: checkToken.player
			}
		});

		if ((await getCompletedLocationsCount(player.studentId, player.gameId)) === 0) {
			await prisma.player.update({
				where: {
					studentId: player.studentId
				},
				data: {
					completed: true
				}
			});
		}
	} else {
		throw redirect(303, '/');
	}

	return {};
};
