import { auth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Fetch the current session using the new API
	const sessionData = await auth.api.getSession({
		headers: event.request.headers
	});

	// Make the session and user available on the server
	if (sessionData) {
		event.locals.session = sessionData.session;
		event.locals.user = sessionData.user;
	}

	// Pass the event to the Better Auth handler
	return svelteKitHandler({ event, resolve, auth, building });
};