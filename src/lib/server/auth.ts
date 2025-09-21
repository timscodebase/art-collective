import { betterAuth } from 'better-auth';
import { db } from '$lib/server/db';
import { users, sessions, keys } from '$lib/schemas/user';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'sqlite',
		schema: {
			users,
			sessions,
			keys
		}
	}),
	emailAndPassword: {
		enabled: true
	}
});