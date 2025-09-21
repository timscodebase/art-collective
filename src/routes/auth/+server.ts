import { auth } from '$lib/server/auth';
import { json } from '@sveltejs/kit';

export const GET = async ({ locals }) => {
	const session = await locals.auth.validate();
	return json(session);
};

export const POST = async ({ request, locals }) => {
	const { email, password } = await request.json();
	try {
		const key = await auth.useKey('email', email, password);
		const session = await auth.createSession(key.userId);
		locals.auth.setSession(session);
	} catch (e) {
		return json({ error: 'Invalid credentials' }, { status: 401 });
	}
	return json({ success: true });
};

export const DELETE = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) {
		await auth.invalidateSession(session.sessionId);
		locals.auth.setSession(null);
	}
	return json({ success: true });
};