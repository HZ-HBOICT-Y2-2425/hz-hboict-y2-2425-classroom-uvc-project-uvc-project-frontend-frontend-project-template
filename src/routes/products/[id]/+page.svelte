<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let product = {};
  let isLoading = true;
  let error = null;

  onMount(async () => {
    const productId = $page.params.id;
    try {
      const response = await fetch(`http://localhost:3013/products/${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      product = await response.json();
    } catch (err) {
      console.error('Error fetching product:', err);
      error = 'Failed to load product. Please try again later.';
    } finally {
      isLoading = false;
    }
  });
</script>

{#if isLoading}
  <p class="text-center text-gray-600">Loading product details...</p>
{:else if error}
  <p class="text-center text-red-600">{error}</p>
{:else if product.id}
  <div class="product-detail max-w-4xl mx-auto p-8 bg-gray-100 border border-gray-300 rounded-lg shadow-lg mt-8">
    <h1 class="text-2xl font-bold text-green-700 mb-4">{product.title}</h1>
    <img src="https://via.placeholder.com/800x400" alt="{product.title}" class="w-full h-auto rounded-lg mb-4" />
    <p class="mb-2"><strong>Description:</strong> {product.description}</p>
    <p class="mb-2"><strong>Price:</strong> <span class="text-green-700 font-bold text-xl">${product.price.toFixed(2)}</span></p>
    <p class="mb-2"><strong>Amount:</strong> {product.amount} {product.unit}</p>
    <p class="mb-2"><strong>Reserved:</strong> {product.reserved ? 'Yes' : 'No'}</p>
    <p class="mb-2"><strong>Expiration Date:</strong> {product.expirationDate}</p>
  </div>
{:else}
  <p class="text-center text-gray-600">Product not found.</p>
{/if}
