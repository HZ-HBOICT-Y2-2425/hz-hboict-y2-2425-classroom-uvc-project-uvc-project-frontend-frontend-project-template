<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    let product = {};
  
    onMount(async () => {
      try {
        const response = await fetch(`http://localhost:3013/producten`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const products = await response.json();
        const productId = parseInt($page.params.id, 10);
        product = products.find(p => p.id === productId) || {};
      } catch (error) {
        console.error('Error fetching product:', error);
        product = {};
      }
    });
  </script>
  
  <style>
    .product-detail {
      padding: 2rem;
      max-width: 800px;
      margin: auto;
      background-color: #f9f9f9;
      border: 2px solid #ccc;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      margin-top: 2rem;
    }
    .product-detail h1 {
      color: #64AD6C;
      margin-bottom: 1rem;
    }
    .product-detail img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin-bottom: 1rem;
    }
    .product-detail p {
      margin: 0.5rem 0;
    }
    .product-price {
      color: #2e7d32; /* Green color */
      font-size: 1.25rem;
      font-weight: bold;
    }
  </style>
  
  {#if product.id}
    <div class="product-detail">
      <h1>{product.title}</h1>
      <img src="https://via.placeholder.com/800x400" alt="{product.title}" />
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Price:</strong> <span class="product-price">${product.price.toFixed(2)}</span></p>
      <p><strong>Amount:</strong> {product.amount} {product.unit}</p>
      <p><strong>Reserved:</strong> {product.reserved ? 'Yes' : 'No'}</p>
      <p><strong>Expiration Date:</strong> {product.expirationDate}</p>
    </div>
  {:else}
    <p>Product not found.</p>
  {/if}
  