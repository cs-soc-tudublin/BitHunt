import { produce } from 'sveltekit-sse';
import prisma from '@prisma/client';

export function POST() {
	return produce();
}
