<script lang="ts">
  import { onMount } from 'svelte';
  import { getCollections } from '../../lib/db';

  let latestUploads = $state([]);

  onMount(async () => {
    const { images: imagesCollection } = await getCollections();
    imagesCollection
      .find({
        sort: [{ createdAt: 'desc' }]
      })
      .$.subscribe((imageDocs) => {
        latestUploads = imageDocs.map(doc => doc.toJSON());
      });
  });
</script>

<h1>Latest Uploads</h1>

{#if latestUploads.length > 0}
  <div class="grid-container">
    {#each latestUploads as image, i (image.id)}
      <div class="grid-item {i === 0 ? 'featured' : ''}">
        <img src={image.url} alt={image.title} />
        <p>{image.title}</p>
      </div>
    {/each}
  </div>
{:else}
  <p>No images uploaded yet.</p>
{/if}


<style>
  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }

  .grid-item {
    border: 1px solid #ccc;
    padding: 1rem;
    overflow: hidden;
  }

  .featured {
    grid-column: 1 / span 2;
    grid-row: 1 / span 2;
    border-color: gold;
    border-width: 2px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>