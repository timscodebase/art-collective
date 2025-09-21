import { auth } from '$lib/server/auth';
import type { RequestHandler } from '@sveltejs/kit';

// This handler will forward all GET and POST requests to the auth handler
export const GET: RequestHandler = ({ request }) => auth.handler(request);
export const POST: RequestHandler = ({ request }) => auth.handler(request);