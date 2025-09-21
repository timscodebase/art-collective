<h1>Latest Uploads</h1>

<div class="grid-container">
  <div class="grid-item top-rated">
    <p>Highest Rated Upload</p>
  </div>
  <div class="grid-item">
    <p>Upload</p>
  </div>
  <div class="grid-item">
    <p>Upload</p>
  </div>
  <div class="grid-item">
    <p>Upload</p>
  </div>
</div>

<style>
  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }

  .grid-item {
    border: 1px solid #ccc;
    padding: 1rem;
  }

  .top-rated {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    background-color: #f0f0f0;
  }
</style>