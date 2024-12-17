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
    } catch (err) {
      error = err.message;
    }

    // Fetch the dropdown options
    try {
      const consumablesResponse = await fetch(
        "http://localhost:3015/consumables",
      );
      if (!consumablesResponse.ok)
        throw new Error("Failed to fetch consumables");
      const consumables = await consumablesResponse.json();
      dropdownContent.Categorieën = consumables.map((item) => item.name);
    } catch (err) {
      console.error("Error fetching consumables:", err.message);
    }

    try {
      const allergiesResponse = await fetch("http://localhost:3015/allergies");
      if (!allergiesResponse.ok) throw new Error("Failed to fetch allergies");
      const allergies = await allergiesResponse.json();
      dropdownContent.Allergieën = allergies.map((item) => item.name);
    } catch (err) {
      console.error("Error fetching allergies:", err.message);
    }

    // try {
    //   const seasonsResponse = await fetch("http://localhost:3014/seasons");
    //   if (!seasonsResponse.ok) throw new Error("Failed to fetch seasons");
    //   const seasons = await seasonsResponse.json();
    //   dropdownContent.Seizoen = seasons.map((item) => item.name);
    // } catch (err) {
    //   console.error("Error fetching seasons:", err.message);
    // }
  }

  // Watch for changes in filters and search query
  function filterRecipes() {
    filteredRecipes = recipes.filter((recipe) => {
      // Map category IDs to their names
      const recipeCategories = recipe.category
        .map((categoryId) => {
          const category = dropdownContent.Categorieën.find(
            (cat) => cat.id === categoryId,
          );
          return category ? category.name : null;
        })
        .filter(Boolean); // Remove null values

      // Map allergy IDs to their names
      const recipeAllergies = recipe.allergyID
        .map((allergyId) => {
          const allergy = dropdownContent.Allergieën.find(
            (allergy) => allergy.id === allergyId,
          );
          return allergy ? allergy.name : null;
        })
        .filter(Boolean); // Remove null values

      // Map season IDs to their names
      const recipeSeasons = recipe.seasonID
        .map((seasonId) => {
          const season = dropdownContent.Seizoen.find(
            (season) => season.id === seasonId,
          );
          return season ? season.name : null;
        })
        .filter(Boolean); // Remove null values

      // Check if recipe matches the search query
      const matchesSearchQuery = recipe.name
        .toLowerCase()
        .includes(query.toLowerCase());

      // Check if recipe matches the selected categories
      const matchesCategories =
        selectedFilters.Categorieën.length === 0 ||
        selectedFilters.Categorieën.some((selectedCategory) =>
          recipeCategories.some((category) =>
            category.toLowerCase().includes(selectedCategory.toLowerCase()),
          ),
        );

      // Check if recipe matches the selected allergies
      const matchesAllergies =
        selectedFilters.Allergieën.length === 0 ||
        selectedFilters.Allergieën.some((selectedAllergy) =>
          recipeAllergies.some((allergy) =>
            allergy.toLowerCase().includes(selectedAllergy.toLowerCase()),
          ),
        );

      // Check if recipe matches the selected seasons
      const matchesSeasons =
        selectedFilters.Seizoen.length === 0 ||
        selectedFilters.Seizoen.some((selectedSeason) =>
          recipeSeasons.some((season) =>
            season.toLowerCase().includes(selectedSeason.toLowerCase()),
          ),
        );

      return (
        matchesSearchQuery &&
        matchesCategories &&
        matchesAllergies &&
        matchesSeasons
      );
    });
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

  // Handle selecting an option in a dropdown
  function selectFilter(key, item) {
    if (selectedFilters[key].includes(item)) {
      selectedFilters[key] = selectedFilters[key].filter(
        (filter) => filter !== item,
      ); // Remove from selected
    } else {
      selectedFilters[key].push(item); // Add to selected
    }

    filterRecipes();
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
                {item}
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
