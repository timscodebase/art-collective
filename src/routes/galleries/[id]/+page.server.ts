import { db } from '$lib/server/db';
import { galleries } from '$lib/schemas/gallery';
import { images } from '$lib/schemas/image'; // Import the images schema
import { eq } from 'drizzle-orm';
import { error, fail, redirect } from '@sveltejs/kit';
import { v2 as cloudinary } from 'cloudinary';
import { env } from '$env/dynamic/private';
import { randomUUID } from 'crypto';

// Configure Cloudinary
cloudinary.config({
	cloud_name: env.CLOUDINARY_CLOUD_NAME,
	api_key: env.CLOUDINARY_API_KEY,
	api_secret: env.CLOUDINARY_API_SECRET
});

export async function load({ params, locals }) {
	// ... (your existing load function remains the same)
}

// --- NEW UPLOAD ACTION ---
export const actions = {
	upload: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, { error: 'Unauthorized' });
		}

		const data = await request.formData();
		const file = data.get('file') as File;
		const galleryId = data.get('galleryId') as string;

		if (!file || !galleryId) {
			return fail(400, { error: 'Missing file or gallery ID' });
		}

		try {
			const arrayBuffer = await file.arrayBuffer();
			const buffer = Buffer.from(arrayBuffer);

			const result: any = await new Promise((resolve, reject) => {
				cloudinary.uploader
					.upload_stream({ folder: 'art-collective' }, (err, res) => {
						if (err) return reject(err);
						return resolve(res);
					})
					.end(buffer);
			});

			// Save the new image URL to your database
			await db.insert(images).values({
				id: randomUUID(),
				galleryId: galleryId,
				url: result.secure_url,
				title: file.name,
				createdAt: new Date().toISOString()
			});

			return { success: true, url: result.secure_url };
		} catch (err) {
			console.error('Upload failed:', err);
			return fail(500, { error: 'Upload failed. Check server console for details.' });
		}
	}
};