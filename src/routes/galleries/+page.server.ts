import { db } from '$lib/server/db';
import { galleries } from '$lib/schemas/gallery';
import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { randomUUID } from 'crypto';

export async function load({ locals }) {
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	const userGalleries = await db.select()
		.from(galleries)
		.where(eq(galleries.userId, locals.user.id));

	return { galleries: userGalleries };
}

export const actions = {
	create: async ({ request, locals }: { request: Request; locals: App.Locals }) => {
		if (!locals.user || locals.user.plan !== 'paid') {
			return fail(403, { error: 'Forbidden' });
		}

		const data = await request.formData();
		const name = data.get('name') as string;
		const description = data.get('description') as string;
		const price = Number(data.get('price')) || 0;

		await db.insert(galleries).values({
			id: randomUUID(),
			name,
			description,
			price,
			userId: locals.user.id
		});

		return { success: true };
	}
};