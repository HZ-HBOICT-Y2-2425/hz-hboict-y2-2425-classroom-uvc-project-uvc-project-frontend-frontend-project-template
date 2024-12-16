<script>
  import { onMount } from "svelte";

  let products = [];
  let isLoading = true;
  let error = null;

  // State for each dropdown
  let dropdownStates = {
    Categorieën: false,
    Allergieën: false,
    Seizoen: false,
    VindIkLeuks: false,
  };

  // Define dropdown content for each key
  const dropdownContent = {
    Categorieën: [],
    Allergieën: [],
    Seizoen: [],
    VindIkLeuks: [],
  };

  // Function to toggle a specific dropdown
  function toggleDropdown(key) {
    // Toggle the clicked dropdown while closing others
    for (const dropdown in dropdownStates) {
      if (dropdown !== key) {
        dropdownStates[dropdown] = false; // Close other dropdowns
      }
    }
    dropdownStates[key] = !dropdownStates[key]; // Toggle the clicked dropdown
  }

  // Close all dropdowns when clicking outside
  function handleClickOutside(event) {
    if (!event.target.closest(".dropdown")) {
      for (const key in dropdownStates) {
        dropdownStates[key] = false; // Close all dropdowns
      }
    }
  }

  // Attach event listener to document
  onMount(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });

  onMount(async () => {
    try {
      const response = await fetch("http://localhost:3015/consumables");
      if (!response.ok) throw new Error("Failed to fetch consumables");
      const consumables = await response.json();
      dropdownContent.Categorieën = consumables.map((item) => item.name);
    } catch (err) {
      console.error("Error fetching consumables:", err.message);
    }
  });

  onMount(async () => {
    try {
      const response = await fetch("http://localhost:3015/allergies");
      if (!response.ok) throw new Error("Failed to fetch allergies");
      const consumables = await response.json();
      dropdownContent.Allergieën = consumables.map((item) => item.name);
    } catch (err) {
      console.error("Error fetching consumables:", err.message);
    }
  });

  onMount(async () => {
    try {
      const response = await fetch("http://localhost:3014/seasons");
      if (!response.ok) throw new Error("Failed to fetch seasons");
      const consumables = await response.json();
      dropdownContent.Seizoen = consumables.map((item) => item.name);
    } catch (err) {
      console.error("Error fetching consumables:", err.message);
    }
  });

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

<!-- Dropdown Menus -->
<div class="grid grid-cols-2 mx-auto justify-center gap-6 max-w-[42%] mt-20">
  {#each Object.keys(dropdownStates) as key (key)}
    <div class="flex items-center justify-center text-center relative">
      <div class="dropdown">
        <!-- Dropdown Toggle Button -->
        <button
          class="btn px-4 py-2 border-2 border-black bg-zinc-200 rounded min-w-[8vw]"
          on:click={() => toggleDropdown(key)}
        >
          {key}
        </button>

        <!-- Dropdown Menu -->
        {#if dropdownStates[key]}
          <ul
            class="absolute bg-white border border-gray-300 rounded shadow-lg mt-2 w-52 z-10"
          >
            {#each dropdownContent[key] as item}
              <li class="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                {item}
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    </div>
  {/each}
</div>

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
