import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { users } from '../src/lib/schemas/user';
import { hashPassword } from '../src/lib/server/auth';
import { randomUUID } from 'crypto';
import 'dotenv/config';

async function seed() {
	if (!process.env.DATABASE_URL) {
		throw new Error('DATABASE_URL environment variable is not set');
	}

	const client = createClient({
		url: process.env.DATABASE_URL,
		authToken: process.env.DATABASE_AUTH_TOKEN
	});

	const db = drizzle(client);

	console.log('Seeding database...');

	const testUserEmail = 'test@example.com';
	const existingUser = await db
		.select()
		.from(users)
		.where({ email: testUserEmail })
		.limit(1);

	if (existingUser.length === 0) {
		const hashedPassword = await hashPassword('password123');
		const userId = randomUUID();

		await db.insert(users).values({
			id: userId,
			email: testUserEmail,
			password: hashedPassword,
			plan: 'paid'
		});

		console.log('Database seeded successfully!');
		console.log('---');
		console.log('Test User Created:');
		console.log(`Email: ${testUserEmail}`);
		console.log('Password: password123');
		console.log('---');
	} else {
		console.log('Test user already exists. Skipping seed.');
	}

	client.close();
}

seed().catch((e) => {
	console.error('Failed to seed database:', e);
	process.exit(1);
});