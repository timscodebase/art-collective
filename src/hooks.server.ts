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

	// Fetch the full user object from the database
	const user = await db.query.users.findFirst({
		where: eq(users.id, sessionId)
	});

	// Attach the user object to locals
	if (user) {
		event.locals.user = user;
	} else {
		event.locals.user = null;
	}

	return resolve(event);
};