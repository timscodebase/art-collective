import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { users } from '../src/lib/schemas/user';
import { galleries } from '../src/lib/schemas/gallery';
import { images } from '../src/lib/schemas/image';
import { hashPassword } from '../src/lib/server/password';
import { randomUUID } from 'crypto';
import 'dotenv/config';
import { eq } from 'drizzle-orm';

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
	let user;

	// Check if user exists first
	const existingUsers = await db.select().from(users).where(eq(users.email, testUserEmail));
	user = existingUsers[0];

	// If user does not exist, create one
	if (!user) {
		const userId = randomUUID();
		const hashedPassword = await hashPassword('password1223'); // Corrected password
		await db.insert(users).values({
			id: userId,
			email: testUserEmail,
			password: hashedPassword,
			plan: 'paid'
		});
		// Fetch the user we just created
		const newUsers = await db.select().from(users).where(eq(users.email, testUserEmail));
		user = newUsers[0];
		console.log('Test User Created!');
	} else {
		console.log('Test user already exists.');
	}

	// Now that we are GUARANTEED to have a user object, seed galleries
	const existingGalleries = await db.select().from(galleries).where(eq(galleries.userId, user.id));

	if (existingGalleries.length === 0) {
		console.log('Seeding galleries for user:', user.email);
		const natureGalleryId = randomUUID();
		const cityGalleryId = randomUUID();

		await db.insert(galleries).values([
			{
				id: natureGalleryId,
				name: 'Nature Wonders',
				userId: user.id
			},
			{
				id: cityGalleryId,
				name: 'Urban Jungle',
				price: 15,
				userId: user.id
			}
		]);

		await db.insert(images).values([
			{
				id: randomUUID(),
				galleryId: natureGalleryId,
				url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
				title: 'Mountain Valley',
				createdAt: new Date().toISOString()
			},
			{
				id: randomUUID(),
				galleryId: cityGalleryId,
				url: 'https://images.unsplash.com/photo-1542345332-1d6854131549',
				title: 'City at Night',
				createdAt: new Date().toISOString()
			}
		]);
		console.log('Galleries seeded successfully!');
	} else {
		console.log('Galleries already exist for this user.');
	}

	console.log('---');
	console.log('Login with:');
	console.log(`Email: ${testUserEmail}`);
	console.log('Password: password1223');
	console.log('---');

	client.close();
}

seed().catch((e) => {
	console.error('Failed to seed database:', e);
	process.exit(1);
});