<script>
  import { cart, loadCart, saveCart, clearLocalCart } from '../../../stores/cart';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  const { params } = $page;
  const { dish } = params;
  let recipe;
  let people = 1;
  let selectedIngredients = [];
  let userId = 1;
  let addedToCart = false;
  let reviews = []; // Opslag voor reviews

  // Recept en reviews ophalen bij pagina-load
  onMount(async () => {
    try {
      const recipeResponse = await fetch(`http://localhost:3010/recipes/${dish}`);
      if (recipeResponse.ok) {
        recipe = await recipeResponse.json();
      } else {
        throw new Error('Recept niet gevonden');
      }
      fetchReviews(); // Haal de reviews op
    } catch (error) {
      console.error('Er is een fout opgetreden:', error);
    }
    loadCart();
  });

  // Haal de reviews van de backend op
  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:3016/recipe/${dish}`);
      if (response.ok) {
        reviews = await response.json();
      } else {
        console.error('Geen reviews gevonden.');
      }
    } catch (error) {
      console.error('Fout bij ophalen van reviews:', error);
    }
  };

  // Voeg ingrediënten toe aan de winkelwagen
  const addToCart = async () => {
    if (selectedIngredients.length === 0) {
      alert('Selecteer eerst ingrediënten!');
      return;
    }
    try {
      for (const ingredient of selectedIngredients) {
        const itemToAdd = {
          name: ingredient.name,
          amount: ingredient.amount * people,
          unit: ingredient.unit
        };
        const response = await fetch(`http://localhost:3012/${userId}/cart`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(itemToAdd)
        });
        if (!response.ok) throw new Error('Fout bij toevoegen aan winkelwagen');

        const updatedCart = await response.json();
        cart.set(updatedCart);
        saveCart();
      }
      addedToCart = true;
      selectedIngredients = [];
      setTimeout(() => addedToCart = false, 3000);
    } catch (error) {
      console.error('Er is een fout opgetreden:', error);
    }
  };

  // Pas het aantal personen aan (minimaal 1)
  const changePeople = (delta) => people = Math.max(1, people + delta);

  // Ga naar de reviewpagina
  const goToReviews = () => goto(`/reviews/${dish}`);
</script>

{#if recipe}
  <!-- Melding bij toevoegen aan winkelwagen -->
  {#if addedToCart}
    <div class="mt-2 mb-4 p-3 bg-green-500 text-white text-center font-bold rounded shadow-lg">
      Product toegevoegd aan de winkelwagen!
    </div>
  {/if}

  <!-- Recept Afbeelding -->
  <img 
    class="block mx-auto max-h-[400px] w-auto rounded-lg shadow-md" 
    src={recipe.image_url || 'https://via.placeholder.com/800x400'} 
    alt="Recept afbeelding" 
  />
  <h1 class="text-6xl text-center mt-3">{recipe.name}</h1>

  <!-- Aantal personen -->
  <div class="flex items-center justify-center mt-4">
    <p class="font-bold mr-2">Aantal personen:</p>
    <button class="border-2 border-black px-4 py-1 bg-gray-200" on:click={() => changePeople(-1)}>-</button>
    <p class="text-center border-2 border-black w-12 mx-2">{people}</p>
    <button class="border-2 border-black px-4 py-1 bg-gray-200" on:click={() => changePeople(1)}>+</button>
  </div>

  <!-- Ingrediënten en Beschrijving -->
  <div class="flex justify-center mt-6 space-x-10">
    <!-- Ingrediënten Sectie -->
    <div class="border-2 rounded border-black p-4 w-1/4">
      <h3 class="text-xl font-bold mb-2">Ingrediënten:</h3>
      <ul>
        {#each recipe.ingredients as ingredient}
          <label class="flex items-center space-x-2">
            <input 
              type="checkbox" 
              bind:group={selectedIngredients} 
              value={ingredient} 
              class="form-checkbox" />
            <span>{ingredient.amount * people} {ingredient.unit} {ingredient.name}</span>
          </label>
        {/each}
      </ul>
      <button class="mt-4 w-full p-2 bg-green-500 text-white rounded" on:click={addToCart}>
        Voeg toe aan winkelwagen
      </button>
    </div>

    <!-- Beschrijving Sectie -->
    <div class="border-2 rounded border-black p-4 w-1/3">
      <h2 class="text-2xl font-bold mb-2">Beschrijving</h2>
      <p>{recipe.description}</p>
    </div>
  </div>

  <!-- Schrijf een review knop -->
  <div class="text-center mt-6">
    <button 
      class="p-2 bg-blue-500 text-white rounded" 
      on:click={goToReviews}
    >
      Schrijf een review
    </button>
  </div>

  <!-- Reviews Sectie -->
  <div class="mt-6 px-4">
    <h2 class="text-2xl font-bold mb-4 text-center">Reviews</h2>
    {#if reviews.length > 0}
      <ul class="space-y-4">
        {#each reviews as review}
          <li class="border rounded p-4 shadow">
            <!-- Toon de gemiddelde beoordeling als sterren -->
            <p class="text-lg font-semibold">⭐ {review.totalRating}/5</p>
            <div class="text-gray-700">
              <p>Kosten: {review.costRating}/5</p>
              <p>Moeilijkheid: {review.difficultyRating}/5</p>
              <p>Smaak: {review.tasteRating}/5</p>
            </div>
            <p class="text-sm text-gray-500 mt-2">Datum: {review.creationDate}</p>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="text-center text-gray-500">Er zijn nog geen reviews voor dit recept.</p>
    {/if}
  </div>
{:else}
  <p class="text-center">Loading...</p>
{/if}
