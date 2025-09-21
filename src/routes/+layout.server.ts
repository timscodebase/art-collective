import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	// Access the session directly from locals, providing a fallback
	return { session: locals.session ?? null };
};