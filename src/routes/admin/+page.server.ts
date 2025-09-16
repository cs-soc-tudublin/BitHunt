import type { PageServerLoad, Actions } from './$types';
import { v4 as uuidv4 } from 'uuid';
import { config } from 'dotenv';
import prisma from '$lib/server/prisma';
import process from 'process';

config();

export const load = (async ({ cookies }) => {
	const token = cookies.get('adminToken');
	let loggedIn = false;

	const tokenFromDatabase = await prisma.login.findFirst({
		where: {
			token: token,
			admin: true
		}
	});

	if (tokenFromDatabase) {
		if (tokenFromDatabase.expiration >= new Date()) {
			loggedIn = true;
		}
	}

	if (loggedIn) {
		const games = await prisma.game.findMany();
		const locations = await prisma.location.findMany();

		return {
			loggedIn,
			games,
			locations
		};
	}

	return {
		loggedIn
	};
}) satisfies PageServerLoad;

export const actions = {
	login: async ({ cookies, request }) => {
		const formData = await request.formData();
		const password = formData.get('password');

		if (password === process.env.ADMIN_PASSWORD) {
			const newToken = uuidv4();

			await prisma.login.create({
				data: {
					token: newToken,
					admin: true,
					expiration: new Date(Date.now() + 1000 * 60 * 60)
				}
			});

			cookies.set('adminToken', newToken, {
				maxAge: 60 * 60,
				path: '/admin'
			});

			return {
				attemptSuccessful: true
			};
		} else {
			return {
				attemptSuccessful: false
			};
		}
	},

	logout: async ({ cookies }) => {
		const token = cookies.get('token');

		await prisma.login.deleteMany({
			where: {
				token: token
			}
		});

		cookies.delete('token', {
			path: '/'
		});
	},

	createGame: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('game-name') as string;
		const description = formData.get('game-description') as string;
		const organisers = String(formData.getAll('organisers'));
		const active = formData.get('activate') === 'true';
		const prize = formData.get('prizes') as string;
		const prizeQty = Number(formData.get('prize-qty'));
		const leaderboard = formData.get('leaderboard') === 'true';

		await prisma.game.create({
			data: {
				name,
				description,
				organisers,
				active,
				prizes: prize,
				prizeQty,
				enableLeaderboard: leaderboard
			}
		});

		return;
	},

	editGame: async ({ request }) => {
		const formData = await request.formData();
		const id = Number(formData.get('gameId'));
		const name = formData.get('game-name') as string;
		const description = formData.get('game-description') as string;
		const organisers = String(formData.getAll('organisers'));
		const active = formData.get('activate') === 'true';
		const prize = formData.get('prizes') as string;
		const prizeQty = Number(formData.get('prize-qty'));
		const leaderboard = formData.get('leaderboard') === 'true';

		await prisma.game.update({
			where: {
				id: id
			},
			data: {
				name,
				description,
				organisers,
				active,
				prizes: prize,
				prizeQty,
				enableLeaderboard: leaderboard
			}
		});

		return;
	},

	deleteGame: async ({ request }) => {
		const formData = await request.formData();
		const gameId = Number(formData.get('gameId'));

		await prisma.game.delete({
			where: {
				id: gameId
			}
		});

		return;
	},

	createLocation: async ({ url, request }) => {
		const formData = await request.formData();
		const name = formData.get('location-name') as string;
		const hint = formData.get('hint') as string;
		const active = Boolean(formData.get('activate'));
		const gameId = Number(formData.getAll('game'));

		await prisma.location.create({
			data: {
				name,
				hint,
				active,
				gameId,
				qrCode: 'https://' + url.host + '/qr/' + uuidv4()
			}
		});

		return;
	},

	editLocation: async ({ request }) => {
		const formData = await request.formData();
		const id = Number(formData.get('id'));
		const name = formData.get('location-name') as string;
		const hint = formData.get('hint') as string;
		const active = Boolean(formData.get('activate'));
		const gameId = Number(formData.getAll('game'));

		await prisma.location.update({
			where: {
				id: id
			},
			data: {
				name,
				hint,
				active,
				gameId
			}
		});

		return;
	},

	deleteLocation: async ({ request }) => {
		const formData = await request.formData();
		const gameId = Number(formData.get('id'));

		await prisma.location.delete({
			where: {
				id: gameId
			}
		});

		return;
	}
} satisfies Actions;
