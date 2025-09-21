import { db } from '$lib/server/db';
import { users } from '$lib/schemas/user';
import { verifyPassword } from '$lib/server/password'; // Corrected import
import { eq } from 'drizzle-orm';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	const { email, password } = await request.json();
	const user = await db.query.users.findFirst({
		where: eq(users.email, email)
	});

	if (!user || !(await verifyPassword(password, user.password))) {
		return json({ error: 'Invalid credentials.' }, { status: 401 });
	}

	cookies.set('session_id', user.id, { path: '/' });
	return json({ id: user.id, email: user.email });
}