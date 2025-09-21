<script lang="ts">
  import { onMount } from 'svelte';
  import { getCollections } from '$lib/db';

  let galleries = $state([]);
  let name = $state('');
  let description = $state('');
  let themeColor = $state('#000000');
  let isFree = $state(true);
  let user = $state(null);

  onMount(async () => {
    const { galleries: galleriesCollection, images: imagesCollection } = await getCollections();

    const res = await fetch('/auth');
    if (res.ok) {
        user = await res.json();
    }

    if (user) {
      galleriesCollection.find({ selector: { userId: user.userId } }).$.subscribe(async (galleries) => {
        const galleriesWithImages = await Promise.all(galleries.map(async (gallery) => {
          const images = await imagesCollection.find({ selector: { galleryId: gallery.id } }).exec();
          return { ...gallery.toJSON(), images: images.map(img => img.toJSON()) };
        }));
        galleries = galleriesWithImages;
      });
    }
  });

  async function createGallery() {
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
      userId: user.userId
    });
    name = '';
    description = '';
    themeColor = '#000000';
    isFree = true;
  }

  async function addImage(galleryId: string, event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      const cloudinaryData = await response.json();
      const { images: imagesCollection } = await getCollections();
      await imagesCollection.insert({
        id: new Date().toISOString(),
        galleryId,
        url: cloudinaryData.secure_url,
        title: 'A new image',
        description: 'This is a new image',
        createdAt: new Date().toISOString()
      });
    }
  }
</script>

<h1>Galleries</h1>

{#if user}
  <form onsubmit="{createGallery}">
    <input type="text" bind:value="{name}" placeholder="Gallery Name" />
    <textarea bind:value="{description}" placeholder="Description"></textarea>
    <input type="color" bind:value="{themeColor}" />
    <label>
      <input type="checkbox" bind:checked="{isFree}" />
      Free
    </label>
    <button type="submit">Create Gallery</button>
  </form>

  <ul>
    {#each galleries as gallery (gallery.id)}
      <a href="/galleries/{gallery.id}">
        <li>
        <h2>{gallery.name}</h2>
        <p>{gallery.description}</p>
        <div style="background-color: {gallery.themeColor}; width: 20px; height: 20px;"></div>
        <p>{gallery.isFree ? 'Free' : 'Paid'}</p>
        <input type="file" onchange={(event) => addImage(gallery.id, event)} />
        <ul>
          {#each gallery.images as image (image.id)}
            <li>
              <img src="{image.url}" alt="{image.title}" />
              <p>{image.title}</p>
            </li>
          {/each}
        </ul>
        <button>Buy</button>
      </li>
    </a>
    {/each}
  </ul>
{:else}
  <p>Please log in to view and create galleries.</p>
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
  }

  img {
    max-width: 100%;
  }
</style>