import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import type { Actions } from '../../../../.svelte-kit/types/src/routes/admin/$types';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const studentId = params.slug;
	const cookie = cookies.get('adminToken');

	const cookieCheck = await prisma.login.findFirst({
		where: {
			token: cookie,
			admin: true
		}
	});

	if (!cookieCheck) {
		throw redirect(303, '/admin');
	}

	const playerCheck = await prisma.player.findFirst({
		where: {
			studentId
		},
		select: {
			studentId: true,
			name: true,
			completed: true,
			receivedPrize: true
		}
	});

	if (playerCheck) {
		return {
			meta: {
				notFound: false
			},
			won: playerCheck.completed,
			receivedPrize: playerCheck.receivedPrize,
			player: {
				name: playerCheck.name,
				id: playerCheck.studentId
			}
		};
	} else {
		return {
			meta: {
				notFound: true
			}
		};
	}
};

export const actions = {
	received: async ({ request }) => {
		const formData = await request.formData();
		const studentId = formData.get('id');

		await prisma.player.update({
			where: {
				studentId: studentId ? String(studentId) : ''
			},
			data: {
				receivedPrize: true
			}
		});

		throw redirect(303, '/admin');
	}
} satisfies Actions;
