import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import { getCompletedLocationsCount, getNextLocation } from '$lib/server/lib';

export const load: PageServerLoad = async ({ url, params, cookies }) => {
	const qrCode = params.slug;
	const cookie = cookies.get('playerToken');

	const checkToken = await prisma.login.findFirst({
		where: {
			token: cookie,
			admin: false
		}
	});

	if (!checkToken || cookie === null || cookie === undefined) {
		throw redirect(303, '/');
	}

	const studentId = checkToken.player !== null ? checkToken.player : '';

	const location = await prisma.location.findFirst({
		where: {
			qrCode: `https://${url.host}/qr/${qrCode}`
		}
	});

	const player = await prisma.player.findFirst({
		where: {
			studentId: studentId !== null ? studentId : ''
		}
	});

	if (player !== null && location !== null) {
		if (player.nextLocation === location.id) {
			await prisma.playerLocation.create({
				data: {
					playerId: player.studentId,
					locationId: location.id
				}
			});

			if ((await getCompletedLocationsCount(studentId, player.gameId)) === 0) {
				await prisma.player.update({
					where: {
						studentId
					},
					data: {
						completed: true
					}
				});

				throw redirect(303, '/win');
			}

			const newLocation = await getNextLocation(studentId, player.gameId);

			await prisma.player.update({
				where: {
					studentId: studentId !== null ? studentId : ''
				},
				data: {
					nextLocation: newLocation.id
				}
			});

			return {
				location: {
					found: true,
					name: location.name
				}
			};
		} else {
			return {
				location: {
					found: false,
					reason: 'You found the wrong location!'
				}
			};
		}
	} else {
		return {
			location: {
				found: false,
				reason: 'An unexpected error occurred.'
			}
		};
	}
};
