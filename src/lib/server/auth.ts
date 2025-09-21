import { betterAuth } from 'better-auth';
import { db } from '$lib/server/db';
import { users, sessions, keys } from '$lib/db/schemas';
import { DrizzleAdapter } from '@better-auth/drizzle';

export const auth = betterAuth(new DrizzleAdapter(db, users, sessions, keys));