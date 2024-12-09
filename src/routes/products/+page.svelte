<script>
  import { onMount } from 'svelte';
  let products = [];
  let isLoading = true;
  let error = null;

  onMount(async () => {
    try {
      const response = await fetch('http://localhost:3013/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      products = await response.json();
    } catch (err) {
      console.error('Error fetching products:', err);
      error = 'Could not load products. Please try again later.';
    } finally {
      isLoading = false;
    }
  });
</script>

{#if isLoading}
  <p class="text-center text-gray-600">Loading products...</p>
{:else if error}
  <p class="text-center text-red-600">{error}</p>
{:else if products.length > 0}
  <div class="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-4 p-4">
    {#each products as product (product.id)}
      <div
        class="border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-100 transition-transform transform hover:translate-y-[-5px] hover:shadow-lg cursor-pointer"
        on:click={() => window.location.href = `/producten/${product.id}`}
      >
        <img
          src="https://via.placeholder.com/400x200"
          alt="{product.title}"
          class="w-full h-48 object-cover"
        />
        <div class="p-4">
          <h2 class="text-lg font-bold text-green-700 mb-2">{product.title}</h2>
          <p class="text-green-700 font-bold text-base mb-2">${product.price.toFixed(2)}</p>
          <p class="text-gray-700 text-sm truncate">{product.description.slice(0, 100)}...</p>
        </div>
      </div>
    {/each}
  </div>
{:else}
  <p class="text-center text-gray-600">No products available.</p>
{/if}
