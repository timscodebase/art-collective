import { db } from '$lib/server/db';
import { users } from '$lib/schemas/user';
import { eq } from 'drizzle-orm';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('session_id');

	if (!sessionId) {
		event.locals.user = null;
		return resolve(event);
	}

	const user = await db.query.users.findFirst({
		where: eq(users.id, sessionId)
	});

	if (user) {
		event.locals.user = user;
	} else {
		event.locals.user = null;
	}

	return resolve(event);
};