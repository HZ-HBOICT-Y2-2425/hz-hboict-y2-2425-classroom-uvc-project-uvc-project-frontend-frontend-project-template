<script>
  // @ts-nocheck

  import { onMount } from "svelte";

  export let dishes = ["Spaghetti", "Sushi", "Tacos"];

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

  let query = ""; // Holds the search input value
  let selectedFilters = {
    Categorieën: [],
    Allergieën: [],
    Seizoen: [],
  };

  let recipes = [];
  let filteredRecipes = [];
  let error = null;

  async function fetchData() {
    try {
      const recipesResponse = await fetch("http://localhost:3010/recipes/");
      if (!recipesResponse.ok) throw new Error("Failed to fetch data");
      recipes = await recipesResponse.json();
      filteredRecipes = recipes; // Initially show all recipes

      // Log the categories of each recipe
      recipes.forEach((recipe) => {
        console.log(`Recipe: ${recipe.name}, Category:`, recipe.category);
      });
    } catch (err) {
      error = err.message;
    }

    // Fetch the dropdown options (categories, allergies, season)
    try {
      const recipesResponse = await fetch("http://localhost:3010/recipes/");
      if (!recipesResponse.ok) throw new Error("Failed to fetch recipes");

      const recipes = await recipesResponse.json();

      // Check if `category` exists and process it
      const allCategories = recipes
        .flatMap((recipe) => recipe.category || [])
        .reduce((unique, category) => {
          if (!unique.some((item) => item.id === category.id)) {
            unique.push(category);
          }
          return unique;
        }, []);

      // Assign the categories to dropdownContent (store both id and name)
      dropdownContent.Categorieën = allCategories.map((category) => ({
        id: category.id,
        name: category.name,
      }));
    } catch (err) {
      console.error("Error fetching recipes and categories:", err.message);
    }
  }

  // Handle selecting an option in a dropdown
  function selectFilter(key, item) {
    if (key === "Categorieën") {
      // Handle category selection by storing category ID
      const selectedCategoryId = item.id;
      if (selectedFilters[key].includes(selectedCategoryId)) {
        selectedFilters[key] = selectedFilters[key].filter(
          (filter) => filter !== selectedCategoryId,
        ); // Remove the category ID from selected filters
      } else {
        selectedFilters[key].push(selectedCategoryId); // Add category ID to selected filters
      }

      // Log the selected filters for debugging
      console.log(
        "Selected filters after category selection:",
        selectedFilters,
      );
    } else {
      // For other filters like Allergieën, Seizoen, etc., handle normally
      if (selectedFilters[key].includes(item)) {
        selectedFilters[key] = selectedFilters[key].filter(
          (filter) => filter !== item,
        ); // Remove from selected
      } else {
        selectedFilters[key].push(item); // Add to selected
      }
    }

    // After selecting or unselecting a filter, update the filtered recipes
    filterRecipes();
  }

  function filterRecipes() {
    console.log("Filtering recipes with selected filters:", selectedFilters); // Log selected filters

    filteredRecipes = recipes.filter((recipe) => {
      const matchesQuery =
        !query ||
        recipe.name.toLowerCase().includes(query.toLowerCase()) ||
        recipe.description?.toLowerCase().includes(query.toLowerCase());

      const matchesCategories =
        selectedFilters.Categorieën.length === 0 ||
        selectedFilters.Categorieën.every((selectedCategoryId) =>
          recipe.category.some(
            (category) => category.id === selectedCategoryId,
          ),
        );

      const matchesFilters =
        matchesCategories &&
        (selectedFilters.Allergieën.length === 0 ||
          selectedFilters.Allergieën.some((allergy) =>
            recipe.allergens?.includes(allergy),
          )) &&
        (selectedFilters.Seizoen.length === 0 ||
          selectedFilters.Seizoen.includes(recipe.season));

      console.log(
        `Recipe: ${recipe.name}, Category Match: ${matchesCategories}`,
      ); // Log category match
      return matchesQuery && matchesFilters;
    });

    console.log("Filtered recipes:", filteredRecipes); // Log the filtered recipes
  }

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
    fetchData();
    return () => document.removeEventListener("click", handleClickOutside);
  });
</script>

<h1 class="text-8xl text-green-600 text-center">Recepten</h1>

<!-- Search Bar -->
<div class="flex items-center max-w-[30%] mx-auto mt-10">
  <input
    type="text"
    bind:value={query}
    placeholder="Zoeken..."
    class="border border-black px-4 py-2 rounded-l w-full focus:border-black focus:outline-none outline-none border-2 border-r-0"
    on:input={filterRecipes}
  />
  <button
    on:click={filterRecipes}
    class="px-4 py-2 bg-zinc-200 text-black rounded-r border-2 border-black"
  >
    Zoeken
  </button>
</div>

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
            {#each dropdownContent[key] as item (item)}
              <li
                class="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                on:click={() => selectFilter(key, item)}
              >
                {item.name}
                <!-- Display category name -->
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    </div>
  {/each}
</div>

<!-- Recipes Section -->
<div class="grid grid-cols-4 gap-4 mx-auto justify-center max-w-[90%] mt-20">
  {#if error}
    <p class="text-red-600">{error}</p>
  {:else if filteredRecipes.length === 0}
    <p>No recipes found.</p>
  {:else}
    {#each filteredRecipes as recipe}
      <a
        href={`/dishes/${recipe.id}`}
        class="btn px-4 py-2 rounded min-w-[8vw] text-center text-white"
      >
        <div
          class="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
        >
          <img
            src={recipe.image_url}
            alt={recipe.name}
            class="h-60 w-full object-cover"
          />
          <div class="p-4">
            <h3 class="text-lg font-bold text-gray-800">{recipe.name}</h3>
          </div>
        </div>
      </a>
    {/each}
  {/if}
</div>
