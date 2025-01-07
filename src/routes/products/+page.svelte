<script>
  import { onMount } from 'svelte';
  import { getData, getDataUrls } from '$lib/dataHandler';
  import AddProductBtn from '$lib/components/product/addProductBtn.svelte';
  import IndividualProductBtn from '$lib/components/product/individualProductBtn.svelte';

  let products = [];
  let isLoading = true;
  let error = null;
  let searchQuery = '';  // Dit wordt de zoekquery die we uit de URL halen

  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    searchQuery = urlParams.get('search') || '';  // Haal de zoekquery uit de URL

    const productUrls = await getData('http://localhost:3010/products');

    // Laad de product details van alle producten
    const productDetails = await getDataUrls(productUrls);
    
    // Filter producten op basis van de zoekquery
    products = productDetails.filter(product => 
      !product.reserved && // Toon alleen producten die niet gereserveerd zijn
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) // Zoek naar producten die de zoekterm bevatten
    );
  
    isLoading = false;
  });
</script>

<div class="container mx-auto p-4">
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-2xl font-bold text-green-600">
      Producten
    </h1>
    <AddProductBtn />
  </div>

  {#if isLoading}
    <p class="text-center text-gray-600">Producten worden geladen...</p>
  {:else if error}
    <p class="text-center text-red-600">{error}</p>
  {:else if products.length > 0}
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {#each products as product (product.id)}
        <IndividualProductBtn {product} />
      {/each}
    </div>
  {:else}
    <p class="text-center text-gray-600">Geen producten gevonden...</p>
  {/if}
</div>
