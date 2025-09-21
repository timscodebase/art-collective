import { auth } from '$lib/server/auth';
import { json } from '@sveltejs/kit';

export const POST = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) {
		await auth.invalidateSession(session.sessionId);
		locals.auth.setSession(null);
	}
	return json({ success: true });
};