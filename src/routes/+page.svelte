<script>
  import { user } from '$lib/store'; // Importeer de user store
  import { onMount } from 'svelte';
  import '../app.css';

  let categories = [
    {
      title: "Groenten",
      image: "/images/groenten.png",
      description: "Verse en gezonde groenten direct van de boer.",
    },
    {
      title: "Zetmeel",
      image: "/images/zetmeel.png",
      description: "Producten die zetmeel en granen bevatten.",
    },
    {
      title: "Zuivel",
      image: "/images/zuivel.png",
      description: "Biologische melk, kaas en meer.",
    },
    {
      title: "Vlees",
      image: "/images/eiwitten.png",
      description: "Lokale en duurzame vleesproducten.",
    },
  ];

  $: userID = $user?.id || 1; // Dummy userID als fallback
  let products = [];
  let selectedProduct = null;
  let error = null;

  // Haal de producten op van de API die specifiek door deze gebruiker zijn toegevoegd
  onMount(async () => {
    try {
      const response = await fetch(`http://localhost:3013/user/${userID}`);
      if (!response.ok) {
        throw new Error('Kon producten niet laden.');
      }

      products = await response.json();
      console.log("Producten van gebruiker:", products); 
    } catch (err) {
      console.error('Fout bij het laden van producten:', err);
      error = 'Kon jouw producten niet ophalen. Probeer het later opnieuw.';
    }
  });

  // Haal details van een specifiek product op
  const getProductDetails = async (productid) => {
    try {
      const response = await fetch(`http://localhost:3013/product/${productid}`);
      if (!response.ok) {
        throw new Error('Kon productdetails niet laden.');
      }
      selectedProduct = await response.json();
    } catch (err) {
      console.error('Fout bij het ophalen van productdetails:', err);
    }
  };
</script>

<div class="min-h-screen bg-gray-50 flex flex-col space-y-12">
  <!-- Header Section -->
  <section class="flex flex-col items-center justify-center text-center py-16 bg-white">
    <p class="text-gray-500 text-lg">Fuse your Finds, with Hungry Minds</p>
    <h1 class="text-4xl md:text-6xl font-bold">
      <span class="text-black">Jouw</span>
      <span class="text-[#69A571]">overblijvers</span>
    </h1>
    <div class="relative mt-8 w-full max-w-md">
      <input
        type="text"
        placeholder="Zoek naar producten..."
        class="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#69A571]"
      />
    </div>
  </section>

  <!-- Categorieen Section -->
  <section class="px-4 md:px-16">
    <h2 class="text-3xl font-bold text-left mb-6">Categorieen</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each categories as category}
        <div class="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
          <img src={category.image} alt={category.title} class="h-60 w-full object-cover" />
          <div class="p-4">
            <h3 class="text-lg font-bold text-gray-800">{category.title}</h3>
            <p class="text-gray-600 text-sm">{category.description}</p>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Producten van de gebruiker Section -->
  <section class="px-4 md:px-16">
    <h2 class="text-3xl font-bold text-left mb-6">Jouw toegevoegde producten</h2>
    {#if error}
      <p class="text-red-600">{error}</p>
    {:else if products.length > 0}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each products as product}
          <div class="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            <img src={product.image || 'https://via.placeholder.com/300'} alt={product.title} class="h-60 w-full object-cover" />
            <div class="p-4">
              <h3 class="text-lg font-bold text-gray-800">{product.title}</h3>
              <p class="text-gray-600 text-sm">{product.description}</p>
              <p class="text-gray-700 font-semibold">Prijs: €{product.price}</p>
              <p class="text-gray-500 text-sm">Aantal: {product.amount} {product.unit}</p>
              <p class="text-gray-500 text-sm">CO2-bijdrage: {product.co2Contribution} kg</p>
              <p class="text-gray-500 text-sm">Vervaldatum: {new Date(product.expirationDate).toLocaleDateString()}</p>
              {#if product.reserved}
                <p class="text-red-500 text-sm">Gereserveerd door gebruiker {product.reservedByUserID}</p>
              {/if}
              <button
                class="mt-4 bg-[#69A571] text-white px-4 py-2 rounded-md"
                on:click={() => getProductDetails(product.id)}
              >
                Bekijk details
              </button>
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <p class="text-gray-600">Je hebt nog geen producten toegevoegd. Begin met het toevoegen van producten om te verkopen of delen!</p>
    {/if}
  </section>

  <!-- Product Detail Section (optioneel) -->
  {#if selectedProduct}
    <section class="px-4 md:px-16 py-8 bg-gray-100">
      <h2 class="text-3xl font-bold mb-6">Product Details</h2>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-2xl font-bold">{selectedProduct.title}</h3>
        <img src={selectedProduct.image} alt={selectedProduct.title} class="h-60 w-full object-cover mt-4" />
        <p class="text-lg text-gray-600 mt-4">{selectedProduct.description}</p>
        <p class="text-gray-700 font-semibold mt-2">Prijs: €{selectedProduct.price}</p>
        <p class="text-gray-500 mt-2">Aantal: {selectedProduct.amount} {selectedProduct.unit}</p>
        <p class="text-gray-500">CO2-bijdrage: {selectedProduct.co2Contribution} kg</p>
        <p class="text-gray-500">Vervaldatum: {new Date(selectedProduct.expirationDate).toLocaleDateString()}</p>
      </div>
    </section>
  {/if}

  <!-- About Section -->
  <section class="flex flex-col md:flex-row items-center gap-12 px-4 md:px-16 py-16 bg-gray-100">
    <div class="md:w-1/2 space-y-6">
      <h2 class="text-3xl font-bold">Meer over FoodieFuse</h2>
      <p class="text-lg text-gray-600">Fuse your Finds, with Hungry Minds!</p>
      <p class="text-gray-600">
        Bij FoodieFuse geloven we in de kracht van verbinding en duurzaamheid...
      </p>
    </div>
    <div class="md:w-1/2">
      <img src="/images/over-ons.png" alt="FoodieFuse" class="rounded-lg shadow-md" />
    </div>
  </section>
</div>
