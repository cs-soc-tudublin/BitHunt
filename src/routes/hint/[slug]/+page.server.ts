import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const studentId = params.slug;
	const cookie = cookies.get('playerToken');

	const player = await prisma.player.findFirst({
		where: {
			studentId
		}
	});

	const checkToken = await prisma.login.findFirst({
		where: {
			token: cookie,
			player: studentId,
			admin: false
		}
	});

	if (!checkToken || cookie === null || cookie === undefined) {
		throw redirect(303, `/`);
	}

	if (player) {
		if (!player.nextLocation) {
			await prisma.player.update({
				where: {
					studentId
				},
				data: {
					nextLocation: Math.floor(Math.random() * (await prisma.location.count()))
				}
			});

			throw redirect(303, `/hint/${studentId}`);
		} else {
			const location = await prisma.location.findFirst({
				where: {
					id: player.nextLocation
				},
				select: {
					hint: true
				}
			});

			if (location) {
				return {
					meta: {
						locationExists: true
					},
					player: {
						name: player.name
					},
					location: {
						hint: location.hint
					}
				};
			} else {
				return {
					meta: {
						locationExists: false
					}
				};
			}
		}
	} else {
		throw redirect(303, '/login');
	}
};
