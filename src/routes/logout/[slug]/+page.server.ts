import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies, params }) => {
	const studentId = params.slug;
	const cookie = cookies.get('playerToken');

	await prisma.login.delete({
		where: {
			token: cookie,
			player: studentId
		}
	});

	cookies.delete('playerToken', { path: '/' });

	throw redirect(303, '/');
};
