import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	// Pass the full user object from the hook to the page data
	return { user: locals.user };
};