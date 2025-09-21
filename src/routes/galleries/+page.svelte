<script lang="ts">
  import { onMount } from 'svelte';
  import { getCollections } from '$lib/schemas/gallery';
  import { page } from '$app/stores';

  let galleries = $state([]);
  let name = $state('');
  let description = $state('');
  let themeColor = $state('#000000');
  let isFree = $state(true);
  const user = $page.data.user; // Get the user from the page store

  onMount(async () => {
    // Only proceed if the user is logged in
    if (user) {
      const { galleries: galleriesCollection, images: imagesCollection } = await getCollections();
      galleriesCollection.find({ selector: { userId: user.id } }).$.subscribe(async (galleries) => {
        const galleriesWithImages = await Promise.all(galleries.map(async (gallery) => {
          const images = await imagesCollection.find({ selector: { galleryId: gallery.id } }).exec();
          return { ...gallery.toJSON(), images: images.map(img => img.toJSON()) };
        }));
        galleries = galleriesWithImages;
      });
    }
  });

  async function createGallery(e: Event) {
    e.preventDefault();
    if (!user) {
      alert('You must be logged in to create a gallery.');
      return;
    }
    const { galleries: galleriesCollection } = await getCollections();
    await galleriesCollection.insert({
      id: new Date().toISOString(),
      name,
      description,
      themeColor,
      isFree,
      userId: user.id
    });
    name = '';
    description = '';
    themeColor = '#000000';
    isFree = true;
  }

  // ... (the rest of the file remains the same)
</script>

<h1>Galleries</h1>

{#if user}
  {:else}
  <p>Please log in to view and create galleries.</p>
{/if}