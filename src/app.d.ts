// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: import('better-auth').AuthRequest;
		}
		interface PageData {
			session: import('better-auth').Session | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};