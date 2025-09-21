<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	let { data } = $props();
</script>

{#if data.gallery}
	<a href="/galleries">&larr; Back to Galleries</a>
	<h1>{data.gallery.name}</h1>
	<p>{data.gallery.description}</p>
	<div style="display: flex; align-items: center; gap: 8px;">
		Theme:
		<div
			style="background-color: {data.gallery.themeColor}; width: 20px; height: 20px; border-radius: 50%;"
		></div>
	</div>
	<p>Price: {data.gallery.price > 0 ? `$${data.gallery.price}` : 'Free'}</p>

	<hr />

	<h2>Upload New Image</h2>
	<form
		method="POST"
		action="?/upload"
		enctype="multipart/form-data"
		use:enhance={() => {
			return async ({ update }) => {
				await invalidateAll();
				await update();
			};
		}}
	>
		<input type="hidden" name="galleryId" value={data.gallery.id} />
		<label for="image-upload">Select Image:</label>
		<input id="image-upload" name="file" type="file" required />
		<button type="submit">Upload</button>
	</form>

	<hr />

	<h2>Images in this Gallery</h2>
	{#if data.gallery.images && data.gallery.images.length > 0}
		<div class="image-grid">
			{#each data.gallery.images as image (image.id)}
				<div class="grid-item">
					<img src={image.url} alt={image.title} />
					<p>{image.title}</p>
				</div>
			{/each}
		</div>
	{:else}
		<p>This gallery has no images yet.</p>
	{/if}
{/if}

<style>
	.image-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1rem;
	}
	.grid-item img {
		width: 100%;
		aspect-ratio: 1 / 1;
		object-fit: cover;
		border-radius: 8px;
	}
</style>