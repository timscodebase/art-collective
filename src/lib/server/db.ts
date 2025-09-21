import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { env } from '$env/dynamic/private';
import * as schema from '$lib/schemas/user'; // Import your schemas

const client = createClient({
	url: env.DATABASE_URL as string,
	authToken: env.DATABASE_AUTH_TOKEN as string
});

// Pass the schema to the drizzle instance
export const db = drizzle(client, { schema });