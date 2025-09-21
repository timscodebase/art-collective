<script lang="ts">
  import { onMount } from 'svelte';
  import { getCollections } from '$lib/schemas/gallery'; // Corrected path
  import { page } from '$app/stores';

  let gallery = $state(null);
  let images = $state([]);
  onMount(async () => {
    const { galleries: galleriesCollection, images: imagesCollection } = await getCollections();
    const galleryId = $page.params.id;

    const galleryDoc = await galleriesCollection.findOne(galleryId).exec();
    gallery = galleryDoc.toJSON();

    imagesCollection.find({ selector: { galleryId } }).$.subscribe((imageDocs) => {
      images = imageDocs.map(doc => doc.toJSON());
    });
  });
</script>

{#if gallery}
  <h1>{gallery.name}</h1>
  <p>{gallery.description}</p>
  <div style="background-color: {gallery.themeColor}; width: 20px; height: 20px;"></div>

  <h2>Images</h2>
  <ul>
    {#each images as image (image.id)}
      <li>
        <img src="{image.url}" alt="{image.title}" />
        <p>{image.title}</p>
      </li>
    {/each}
  </ul>
{:else}
  <p>Gallery not found.</p>
{/if}