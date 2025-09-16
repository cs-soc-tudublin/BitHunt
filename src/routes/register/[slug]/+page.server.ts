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
	register: async ({ cookies, request, params }) => {
		const gameId = Number(params.slug);
		const formData = await request.formData();
		const studentId = String(formData.get('student-number')).toLowerCase();
		const name = String(formData.get('name'));

		const doesPlayerExist = await prisma.player.findFirst({
			where: {
				studentId
			}
		});

		if (doesPlayerExist) {
			return {
				registration: {
					successful: false,
					reason: 'A user has already registered with that Student Number, please try again'
				}
			};
		} else {
			const loginToken = uuidv4();

			const locationIds = await prisma.location.findMany({
				where: {
					gameId
				},
				select: {
					id: true
				}
			});

			await prisma.player.create({
				data: {
					studentId,
					name,
					gameId,
					nextLocation: locationIds[Math.floor(Math.random() * locationIds.length)].id
				}
			});

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
		}
	}
} satisfies Actions;
