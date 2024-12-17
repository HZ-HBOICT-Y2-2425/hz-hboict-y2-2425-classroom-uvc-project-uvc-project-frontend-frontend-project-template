<script>
  import { onMount } from "svelte";

  let products = [];
  let isLoading = true;
  let error = null;

  onMount(async () => {
    try {
      // Laad de URLs van alle producten
      const response = await fetch("http://localhost:3010/products");
      if (!response.ok) {
        throw new Error("Gefaald om product URLs te laden");
      }

      const productUrls = await response.json();

      // Laat de product details van alle producten
      const productDetails = await Promise.all(
        productUrls.map(async (url) => {
          const productResponse = await fetch(`http://localhost:3010/${url}`);
          if (!productResponse.ok) {
            throw new Error(`Gefaald om producten te laden van: ${url}`);
          }
          return await productResponse.json();
        }),
      );

      products = productDetails;
    } catch (err) {
      console.error("Error bij het laden van producten:", err);
      error =
        "Producten konden niet worden geladen. Probeer het later opnieuw.";
    } finally {
      isLoading = false;
    }
  });
</script>

{#if isLoading}
  <p class="text-center text-gray-600">Producten worden geladen...</p>
{:else if error}
  <p class="text-center text-red-600">{error}</p>
{:else if products.length > 0}
  <div class="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-4 p-4">
    {#each products as product (product.id)}
      <div
        class="border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-100 transition-transform transform hover:translate-y-[-5px] hover:shadow-lg cursor-pointer"
        on:click={() => (window.location.href = `/products/${product.id}`)}
      >
        <img
          src="https://via.placeholder.com/400x200"
          alt={product.title}
          class="w-full h-48 object-cover"
        />
        <div class="p-4">
          <h2 class="text-lg font-bold text-green-700 mb-2">{product.title}</h2>
          <p class="text-green-700 font-bold text-base mb-2">
            ${product.price.toFixed(2)}
          </p>
          <p class="text-gray-700 text-sm truncate">
            {product.description.slice(0, 100)}...
          </p>
        </div>
      </div>
    {/each}
  </div>
{:else}
  <p class="text-center text-gray-600">Geen producten gevonden...</p>
{/if}
