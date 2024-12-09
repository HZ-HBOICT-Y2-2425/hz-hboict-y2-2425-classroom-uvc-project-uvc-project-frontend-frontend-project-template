<script>
  import { cart, loadCart, saveCart, clearLocalCart } from '../../../stores/cart'; // Winkelwagen store importeren
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  const { params } = $page;
  const { dish } = params;

  let recipe;
  let people = 1;
  let selectedIngredients = [];

  // Haal receptdata op via de API
  onMount(async () => {
    try {
      const response = await fetch(`http://localhost:3010/recipes/${dish}`);
      if (response.ok) {
        recipe = await response.json();
      } else {
        throw new Error('Recept niet gevonden');
      }
    } catch (error) {
      console.error('Er is een fout opgetreden:', error);
    }

    loadCart(); // Laad de winkelwagen bij het laden van de pagina
  });

  // Voeg geselecteerde ingrediënten toe aan de winkelwagen
  const addToCart = () => {
    if (selectedIngredients.length === 0) {
      alert('Selecteer eerst ingrediënten!');
      return;
    }

    // Maak de items voor de winkelwagen
    const itemsToAdd = selectedIngredients.map(ingredient => ({
      id: ingredient.id,
      name: `${ingredient.amount} ${ingredient.unit} ${ingredient.name}`,
      quantity: people // Aantal van het ingrediënt op basis van de geselecteerde personen
    }));

    // Voeg de items toe aan de winkelwagen store
    cart.update(currentCart => {
      // We controleren of het item al bestaat in de winkelwagen
      const existingItemIndex = currentCart.findIndex(item => item.id === itemsToAdd[0].id);
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

    alert('Ingrediënten toegevoegd aan de winkelwagen!');

    // Reset de geselecteerde ingrediënten na toevoegen
    selectedIngredients = [];
  };

  // Beperk de minimumwaarde van mensen tot 1
  const changePeople = (delta) => {
    people = Math.max(1, people + delta);
  };
</script>

{#if recipe}
  <img class="block mx-auto" src={recipe.image_url || 'https://via.placeholder.com/800x400'} alt="Recept afbeelding" />
  <h1 class="text-6xl text-center mt-3">{recipe.name}</h1>
  <h2 class="text-2xl font-bold mt-5 ml-2">Beschrijving</h2>
  <p class="max-w-[40vw] border-2 border-solid rounded border-black ml-2 p-1 px-2">
    {recipe.description}
  </p>

  <div class="flex items-center mt-2 ml-2">
    <p class="font-bold mr-2">Aantal personen:</p>
    <button class="border-2 border-black min-w-[2vw] bg-zinc-200" on:click={() => changePeople(-1)}>-</button>
    <p class="text-center border-2 border-black max-w-[4vw] min-w-[4vw]">{people}</p>
    <button class="border-2 border-black min-w-[2vw] bg-zinc-200" on:click={() => changePeople(1)}>+</button>
  </div>

  <h3 class="text-xl font-bold mt-4 ml-2">Ingrediënten:</h3>
  <ul>
    {#each recipe.ingredients as ingredient}
      <label class="flex items-center space-x-2 ml-2">
        <input 
          type="checkbox" 
          bind:group={selectedIngredients} 
          value={ingredient} 
          class="form-checkbox" />
        <span>{ingredient.amount} {ingredient.unit} {ingredient.name}</span>
      </label>
    {/each}
  </ul>

  <button class="mt-4 p-2 bg-green-500 text-white rounded" on:click={addToCart}>
    Voeg toe aan winkelwagen
  </button>

{:else}
  <p>Loading...</p>
{/if}
