import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from '$lib/schemas/user';

// --- Start of new code ---
import { building } from '$app/environment';
import 'dotenv/config';

// When building for production, SvelteKit's $env modules are not directly available.
// In a script context (like seeding), we must use process.env.
const getEnv = () => {
	if (building || !process) {
		// Fallback for environments where process.env is not available
		// You might need to adjust this depending on your deployment target
		return {
			DATABASE_URL: '',
			DATABASE_AUTH_TOKEN: ''
		};
	}
	// Dynamically import for SvelteKit context, fallback to process.env
	try {
		const env = require('$env/dynamic/private');
		return {
			DATABASE_URL: env.DATABASE_URL,
			DATABASE_AUTH_TOKEN: env.DATABASE_AUTH_TOKEN
		};
	} catch (e) {
		return {
			DATABASE_URL: process.env.DATABASE_URL,
			DATABASE_AUTH_TOKEN: process.env.DATABASE_AUTH_TOKEN
		};
	}
};

const { DATABASE_URL, DATABASE_AUTH_TOKEN } = getEnv();
// --- End of new code ---

const client = createClient({
	url: DATABASE_URL as string,
	authToken: DATABASE_AUTH_TOKEN as string
});

export const db = drizzle(client, { schema });
