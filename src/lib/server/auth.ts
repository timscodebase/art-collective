import { betterAuth } from 'better-auth';
import { db } from '$lib/server/db';
import { users, sessions, keys } from '$lib/schemas/user';
// Correct the import path for the Drizzle adapter
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "sqlite",
        users,
        sessions,
        keys
    })
});