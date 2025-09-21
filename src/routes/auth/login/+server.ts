import { auth } from '$lib/server/auth';
import { json } from '@sveltejs/kit';

export const POST = async ({ request, locals }) => {
	const { email, password } = await request.json();
	try {
		const key = await auth.useKey('email', email, password);
		const session = await auth.createSession(key.userId);
		locals.auth.setSession(session);
		return json(session);
	} catch (e) {
		return json({ error: 'Invalid credentials' }, { status: 401 });
	}
};