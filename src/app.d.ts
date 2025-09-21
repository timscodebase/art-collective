declare global {
	namespace App {
		interface Locals {
			user: {
				id: string;
				email: string;
				plan: string; // Add plan
			} | null;
		}
		interface PageData {
			user: {
				id: string;
				email: string;
				plan: string; // Add plan
			} | null;
		}
	}
}

export {};