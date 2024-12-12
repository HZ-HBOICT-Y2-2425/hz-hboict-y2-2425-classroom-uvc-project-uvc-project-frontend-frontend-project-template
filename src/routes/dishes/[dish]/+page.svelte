<script>
  import {
    cart,
    loadCart,
    saveCart,
    clearLocalCart,
  } from "../../../stores/cart"; // Winkelwagen store importeren
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  const { params } = $page;
  const { dish } = params;

  let recipe;
  let people = 1;
  let selectedIngredients = [];
  let steps = [];

  $: scaledIngredients = recipe?.ingredients
    ? recipe.ingredients.map((ingredient) => ({
        ...ingredient,
        scaledAmount: (ingredient.amount * people).toFixed(1),
      }))
    : [];

  // Haal receptdata op via de API
  onMount(async () => {
    try {
      const response = await fetch(`http://localhost:3010/recipes/${dish}`);
      if (response.ok) {
        recipe = await response.json();

        // Populate steps after recipe is fetched
        if (recipe.description) {
          steps = recipe.description.split(/(?=\d+\.\s)/); // Split into steps
        }
      } else {
        console.error("Failed to fetch recipe:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }

    loadCart(); // Laad de winkelwagen bij het laden van de pagina
  });

  // Voeg geselecteerde ingrediënten toe aan de winkelwagen
  const addToCart = () => {
    if (selectedIngredients.length === 0) {
      alert("Selecteer eerst ingrediënten!");
      return;
    }

    // Maak de items voor de winkelwagen
    const itemsToAdd = selectedIngredients.map((ingredient) => ({
      id: ingredient.id,
      name: `${ingredient.amount} ${ingredient.unit} ${ingredient.name}`,
      quantity: people, // Aantal van het ingrediënt op basis van de geselecteerde personen
    }));

    // Voeg de items toe aan de winkelwagen store
    cart.update((currentCart) => {
      // We controleren of het item al bestaat in de winkelwagen
      const existingItemIndex = currentCart.findIndex(
        (item) => item.id === itemsToAdd[0].id,
      );
      if (existingItemIndex !== -1) {
        // Als het item al bestaat, verhoog de hoeveelheid
        currentCart[existingItemIndex].quantity += people;
      } else {
        // Als het item nog niet bestaat, voeg het toe
        currentCart.push(...itemsToAdd);
      }
      saveCart(); // Winkelwagen opslaan in localStorage
      return currentCart;
    });

    alert("Ingrediënten toegevoegd aan de winkelwagen!");

    // Reset de geselecteerde ingrediënten na toevoegen
    selectedIngredients = [];
  };

  // Beperk de minimumwaarde van mensen tot 1
  const changePeople = (delta) => {
    people = Math.max(1, people + delta);
  };

  console.log("Steps:", steps);
</script>

{#if recipe}
  <img
    class="block mx-auto max-h-[400px] w-auto rounded-lg shadow-md"
    src={recipe.image_url || "https://via.placeholder.com/800x400"}
    alt="Recept afbeelding"
  />
  <h1 class="text-6xl text-center mt-3">{recipe.name}</h1>

  <div class="flex items-center mt-2 ml-12">
    <p class="font-bold mr-2">Aantal personen:</p>
    <button
      class="border-2 border-black min-w-[2vw] bg-zinc-200"
      on:click={() => changePeople(-1)}>-</button
    >
    <p class="text-center border-2 border-black max-w-[4vw] min-w-[4vw]">
      {people}
    </p>
    <button
      class="border-2 border-black min-w-[2vw] bg-zinc-200"
      on:click={() => changePeople(1)}>+</button
    >
  </div>

  <div class="flex mt-4 ml-10">
    <!-- Ingredients Section -->
    <div
      class="border-2 border-solid rounded border-black p-2 min-w-[18vw] max-w-[18vw]"
    >
      <h3 class="text-xl font-bold ml-2">Ingrediënten:</h3>
      <ul>
        {#each scaledIngredients as ingredient}
          <label class="flex items-center space-x-2 ml-2">
            <input
              type="checkbox"
              bind:group={selectedIngredients}
              value={ingredient}
              class="form-checkbox"
            />
            <span
              >{ingredient.scaledAmount}
              {ingredient.unit}
              {ingredient.name}</span
            >
          </label>
        {/each}
      </ul>

      <button
        class="mt-4 p-2 bg-green-500 text-white rounded"
        on:click={addToCart}
      >
        Voeg toe aan winkelwagen
      </button>
    </div>

    <!-- Description Section -->
    <div class="w-1/2 ml-10">
      <h2 class="text-2xl font-bold">Instructies</h2>
      <div class="border-2 border-solid rounded border-black p-2">
        {#each steps as step}
          <p>{step}</p>
        {/each}
      </div>
    </div>
  </div>
{:else}
  <p>Loading...</p>
{/if}
