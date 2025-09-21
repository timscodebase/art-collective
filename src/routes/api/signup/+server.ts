import { db } from '$lib/server/db';
import { users } from '$lib/schemas/user';
import { hashPassword } from '$lib/server/password'; // Corrected import
import { json } from '@sveltejs/kit';
import { randomUUID } from 'crypto';

export async function POST({ request }) {
	const { email, password } = await request.json();
	const hashedPassword = await hashPassword(password);
	try {
		await db.insert(users).values({
			id: randomUUID(),
			email,
			password: hashedPassword,
			plan: 'paid'
		});
		return json({ success: true });
	} catch (e) {
		return json({ error: 'User already exists.' }, { status: 409 });
	}
}