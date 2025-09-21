import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { env } from '$env/dynamic/private';

// Import all of your schemas and their relations
import * as userSchema from '$lib/schemas/user';
import * as gallerySchema from '$lib/schemas/gallery';
import * as imageSchema from '$lib/schemas/image';

const client = createClient({
	url: env.DATABASE_URL,
	authToken: env.DATABASE_AUTH_TOKEN
});

// Combine all schemas into a single object for Drizzle
const combinedSchema = {
	...userSchema,
	...gallerySchema,
	...imageSchema
};

// Pass the combined schema to the drizzle instance
export const db = drizzle(client, { schema: combinedSchema });