import type { Config } from 'drizzle-kit';
import 'dotenv/config';

export default {
	// Explicitly list all schema files to ensure they are all processed
	schema: [
		'./src/lib/schemas/user.ts',
		'./src/lib/schemas/gallery.ts',
		'./src/lib/schemas/image.ts'
	],
	out: './drizzle',
	dialect: 'sqlite',
	dbCredentials: {
		url: process.env.DATABASE_URL as string,
		authToken: process.env.DATABASE_AUTH_TOKEN as string
	}
} satisfies Config;