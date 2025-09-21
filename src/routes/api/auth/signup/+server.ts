import { auth } from '$lib/server/auth';
import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const { email, password } = await request.json();
	if (!email || !password) {
		return json({ error: 'Email and password are required' }, { status: 400 });
	}
	try {
		await auth.createUser('email', email, {
			password
		});
	} catch (e) {
		return json({ error: 'User already exists' }, { status: 409 });
	}
	return json({ success: true });
};