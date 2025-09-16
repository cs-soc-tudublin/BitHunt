import type { Actions, PageServerLoad } from './$types';
import { v4 as uuidv4 } from 'uuid';
import prisma from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const gameId = params.slug;

	const game = await prisma.game.findFirst({
		where: {
			id: Number(gameId)
		}
	});

	if (!game) {
		return {
			game: {
				notFound: true
			}
		};
	} else {
		return {
			game
		};
	}
};

export const actions = {
	login: async ({ cookies, request }) => {
		const formData = await request.formData();
		const studentId = String(formData.get('student-number')).toLowerCase();

		const player = await prisma.player.findFirst({
			where: {
				studentId
			}
		});

		if (player) {
			const loginToken = uuidv4();

			await prisma.login.create({
				data: {
					token: loginToken,
					player: studentId,
					expiration: new Date(Date.now() + 1000 * 60 * 60)
				}
			});

			cookies.set('playerToken', loginToken, {
				maxAge: 60 * 60,
				path: '/'
			});

			throw redirect(303, '/');
		} else {
			return {
				login: {
					successful: false,
					reason: 'Student Number does not exist, please try again'
				}
			};
		}
	}
} satisfies Actions;
