import { auth } from '$lib/server/auth';
import { sveltekit } from 'better-auth/integrations';
import { building } from '$app/environment';

export const handle = sveltekit(auth, { building });