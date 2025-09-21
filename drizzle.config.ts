import type { Config } from 'drizzle-kit';
import 'dotenv/config';

export default {
	schema: './src/lib/schemas/user.ts',
	out: './drizzle',
	dialect: 'sqlite', // <-- This is the important change
	dbCredentials: {
		url: process.env.DATABASE_URL as string,
		authToken: process.env.DATABASE_AUTH_TOKEN as string
	}
} satisfies Config;