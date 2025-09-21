<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';

	let { data } = $props();
	let createGalleryDialog: HTMLDialogElement;
</script>

<h1>My Galleries</h1>

{#if $page.data.user?.plan === 'paid'}
	<button onclick={() => createGalleryDialog.showModal()}>Create New Gallery</button>
{/if}

<dialog bind:this={createGalleryDialog}>
	<h2>Create New Gallery</h2>
	<form
		method="POST"
		action="?/create"
		use:enhance={() => {
			createGalleryDialog.close();
			return async ({ update }) => {
				await update();
			};
		}}
	>
		<label for="gallery-name">Name</label>
		<input id="gallery-name" name="name" type="text" placeholder="Gallery Name" required />

		<label for="gallery-description">Description</label>
		<textarea id="gallery-description" name="description" placeholder="Description"></textarea>

		<label for="gallery-price">Price ($)</label>
		<input id="gallery-price" name="price" type="number" placeholder="0" min="0" />

		<div>
			<button type="button" onclick={() => createGalleryDialog.close()}>Cancel</button>
			<button type="submit">Create</button>
		</div>
	</form>
</dialog>

{#if data.galleries && data.galleries.length > 0}
	<ul>
		{#each data.galleries as gallery (gallery.id)}
			<a href="/galleries/{gallery.id}">
				<li>
					<h2>{gallery.name}</h2>
					<p>{gallery.description}</p>
					<p>{gallery.price > 0 ? `$${gallery.price}` : 'Free'}</p>
				</li>
			</a>
		{/each}
	</ul>
{:else if $page.data.user}
	<p>You haven't created any galleries yet.</p>
{:else}
	<p>Please log in to view galleries.</p>
{/if}

<style>
	ul {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1rem;
		list-style: none;
		padding: 0;
	}

	li {
		border: 1px solid #ccc;
		padding: 1rem;
		height: 100%;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	dialog {
		width: 500px;
		padding: 2rem;
		border: 1px solid #ccc;
		border-radius: 8px;
	}
	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.5);
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>