import { json } from '@sveltejs/kit';

export async function POST({ cookies }) {
	cookies.delete('session_id', { path: '/' });
	return json({ success: true });
}