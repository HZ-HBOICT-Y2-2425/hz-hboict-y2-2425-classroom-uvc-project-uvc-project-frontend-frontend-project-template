<script>
    import { onMount } from 'svelte';
    let products = [];
  
    onMount(async () => {
      try {
        const response = await fetch('http://localhost:3013/producten');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        products = await response.json();
      } catch (error) {
        console.error('Error fetching products:', error);
        products = []; // Set to an empty array in case of an error
      }
    });
  </script>
  
  <style>
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      padding: 1rem;
    }
    .product-card {
      border: 2px solid #ccc;
      border-radius: 8px;
      overflow: hidden;
      background-color: #f9f9f9;
      transition: transform 0.2s, box-shadow 0.2s;
      cursor: pointer;
    }
    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .product-card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    .product-details {
      padding: 1rem;
    }
    .product-title {
      font-size: 1.25rem;
      font-weight: bold;
      color: #64AD6C;
      margin-bottom: 0.5rem;
    }
    .product-price {
      color: #64AD6C;
      font-size: 1rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
    .product-description {
      color: #333;
      font-size: 0.875rem;
    }
  </style>
  
  {#if products.length > 0}
    <div class="products-grid">
      {#each products as product (product.id)}
        <div class="product-card" on:click={() => window.location.href = `/producten/${product.id}`}>
          <img src="https://via.placeholder.com/400x200" alt="{product.title}" />
          <div class="product-details">
            <h2 class="product-title">{product.title}</h2>
            <p class="product-price">${product.price.toFixed(2)}</p>
            <p class="product-description">{product.description.slice(0, 100)}...</p>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <p>No products available.</p>
  {/if}
  