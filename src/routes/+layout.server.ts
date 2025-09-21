export async function load({ locals }) {
	// Access the session directly from locals
	return { session: locals.session ?? null };
}