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
  let userId = 1; // Hardcoded user ID (voorbeeld)
  let addedToCart = false;
  let reviews = [];
  let averageReview = {};

  // Recept ophalen bij het laden van de pagina
  onMount(async () => {
    try {
      const recipeResponse = await fetch(`http://localhost:3010/recipes/${dish}`);
      if (recipeResponse.ok) recipe = await recipeResponse.json();
      fetchReviews();
    } catch (error) {
      console.error('Fout:', error);
    }
    loadCart();
  });

  // Reviews ophalen
  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:3016/recipe/${dish}`);
      if (response.ok) {
        reviews = await response.json();
        calculateAverageReview();
      }
    } catch (error) {
      console.error('Fout bij ophalen reviews:', error);
    }
  };

  // Gemiddelde review berekenen
  const calculateAverageReview = () => {
    if (reviews.length === 0) return (averageReview = null);
    let totalTaste = 0, totalCost = 0, totalDifficulty = 0, totalRating = 0;

    reviews.forEach(r => {
      totalTaste += r.tasteRating || 0;
      totalCost += r.costRating || 0;
      totalDifficulty += r.difficultyRating || 0;
      totalRating += r.totalRating || 0;
    });

    const count = reviews.length;
    averageReview = {
      taste: (totalTaste / count).toFixed(1),
      cost: (totalCost / count).toFixed(1),
      difficulty: (totalDifficulty / count).toFixed(1),
      total: (totalRating / count).toFixed(1),
    };
  };

  // Voeg ingrediënten toe aan de winkelwagen (oude logica)
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
          body: JSON.stringify(itemToAdd),
        });
        if (!response.ok) throw new Error('Fout bij toevoegen aan winkelwagen');
      }
      addedToCart = true;
      setTimeout(() => (addedToCart = false), 3000);
    } catch (error) {
      console.error('Fout:', error);
      alert('Er is een fout opgetreden bij het toevoegen aan de winkelwagen.');
    }
  };

  const changePeople = (delta) => (people = Math.max(1, people + delta));
  const goToReviews = () => goto(`/reviews/${dish}`);
</script>

{#if recipe}
  <!-- Notificatie -->
  {#if addedToCart}
    <div class="mt-2 mb-4 p-3 bg-green-500 text-white text-center font-bold rounded shadow-lg">
      Product toegevoegd aan de winkelwagen!
    </div>
  {/if}

  <!-- Recept Afbeelding -->
  <img 
    class="block mx-auto w-full max-h-[250px] sm:max-h-[400px] object-cover rounded-lg shadow-md" 
    src={recipe.image_url || 'https://via.placeholder.com/800x400'} 
    alt="Recept afbeelding" 
  />

  <h1 class="text-3xl sm:text-5xl text-center mt-3 font-bold">{recipe.name}</h1>

  <!-- Personen Selectie -->
  <div class="flex justify-center items-center mt-4">
    <p class="font-bold mr-2">Personen:</p>
    <button class="px-3 py-1 bg-gray-200 rounded" on:click={() => changePeople(-1)}>-</button>
    <p class="mx-2 text-lg font-bold">{people}</p>
    <button class="px-3 py-1 bg-gray-200 rounded" on:click={() => changePeople(1)}>+</button>
  </div>

  <!-- Grid Layout -->
  <div class="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 px-4">
    <!-- Ingrediënten -->
    <div class="p-4 border rounded-lg shadow">
      <h3 class="text-xl font-bold mb-2">Ingrediënten:</h3>
      <ul>
        {#each recipe.ingredients as ingredient}
          <label class="flex items-center space-x-2 mb-2">
            <input type="checkbox" bind:group={selectedIngredients} value={ingredient} />
            <span>{ingredient.amount * people} {ingredient.unit} {ingredient.name}</span>
          </label>
        {/each}
      </ul>
      <button class="mt-4 w-full p-2 bg-green-500 text-white rounded" on:click={addToCart}>
        Voeg toe aan winkelwagen
      </button>
    </div>

    <!-- Beschrijving -->
    <div class="p-4 border rounded-lg shadow">
      <h2 class="text-2xl font-bold mb-2">Beschrijving</h2>
      <p>{recipe.description}</p>
    </div>
  </div>

  <!-- Gemiddelde Review -->
  <div class="text-center mt-6">
    <h2 class="text-2xl font-bold mb-2">Gemiddelde Beoordeling</h2>
    {#if averageReview}
      <div class="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-8">
        <p>⭐ <strong>{averageReview.total}</strong>/5</p>
        <p>💰 Kosten: {averageReview.cost}/5</p>
        <p>⚙️ Moeilijkheid: {averageReview.difficulty}/5</p>
        <p>🍴 Smaak: {averageReview.taste}/5</p>
      </div>
    {:else}
      <p>Geen reviews beschikbaar.</p>
    {/if}
  </div>

  <!-- Review Knop -->
  <div class="flex justify-center mt-4">
    <button 
      class="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
          <li class="p-4 border rounded shadow">
            <p>⭐ Totale Beoordeling: {review.totalRating}/5</p>
            <p>🍴 Smaak: {review.tasteRating || 'N.v.t.'}/5</p>
            <p>💰 Kosten: {review.costRating || 'N.v.t.'}/5</p>
            <p>⚙️ Moeilijkheid: {review.difficultyRating || 'N.v.t.'}/5</p>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="text-center text-gray-500">Geen reviews beschikbaar.</p>
    {/if}
  </div>
{:else}
  <p class="text-center">Loading...</p>
{/if}
