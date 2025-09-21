import { db } from '$lib/server/db';
import { users } from '$lib/schemas/user';
import { eq } from 'drizzle-orm';

export async function handle({ event, resolve }) {
	const sessionId = event.cookies.get('session_id');

	if (!sessionId) {
		event.locals.user = null;
		return resolve(event);
	}

	const user = await db.query.users.findFirst({
		where: eq(users.id, sessionId)
	});

	if (user) {
		// Pass the full user object to locals
		event.locals.user = { id: user.id, email: user.email, plan: user.plan };
	} else {
		event.locals.user = null;
	}

	return resolve(event);
}