<script>
  import { onMount } from 'svelte';
  import { user } from '../../lib/store'; // Importeer de user store
  import { writable } from 'svelte/store'; // Importeer writable voor local store
  import { goto } from '$app/navigation'; // Importeer goto voor navigatie

  let cart = []; // Winkelwagengegevens
  let userId = null; // Gebruikers-ID is initieel null

  // Laad de winkelwagen van de gebruiker bij het laden van de pagina
  onMount(() => {
    // Abonneer je op de user store om het juiste userId te verkrijgen
    const unsubscribe = user.subscribe((storedUser) => {
      if (storedUser) {
        userId = storedUser.id; // Haal het userId op uit de store
        console.log(`Ingelogd gebruikers ID: ${userId}`);
        loadCart(userId); // Laad de winkelwagen voor deze gebruiker
      } else {
        console.error('Geen ingelogde gebruiker gevonden!');
      }
    });

    // Zorg ervoor dat de abonnee wordt opgeruimd bij het verlaten van de component
    return () => unsubscribe();
  });

  // Laad de winkelwagen van de gebruiker via de API
  async function loadCart(userId) {
    try {
      const response = await fetch(`http://localhost:3010/user/${userId}/cart`);
      console.log('Statuscode:', response.status); // Log de statuscode
      if (response.ok) {
        const data = await response.json();
        console.log('Winkelwagengegevens:', data); // Log de respons naar de console

        if (data.length === 0) {
          console.log('De winkelwagen is leeg voor deze gebruiker.');
        } else {
          cart = data; // Zet de winkelwagenitems
        }
      } else {
        console.error('Er is een probleem bij het ophalen van de winkelwagen.');
      }
    } catch (error) {
      console.error('Fout bij het laden van winkelwagen:', error);
    }
  }

  // Verwijder item uit de winkelwagen
  async function handleRemoveItem(itemId) {
    try {
      // Verwijder het item op de backend via de DELETE-aanroep
      const response = await fetch(`http://localhost:3010/user/${userId}/cart/${itemId}`, {
        method: 'DELETE', // Gebruik DELETE-methode om item te verwijderen
      });

      if (response.ok) {
        console.log(`Item ${itemId} succesvol verwijderd!`);
        // Verwijder het item uit de frontend
        cart = cart.filter(item => item.id !== itemId);
      } else {
        console.error('Fout bij het verwijderen van item');
      }
    } catch (error) {
      console.error('Fout bij het verwijderen van item:', error);
    }
  }
</script>

<div class="flex flex-col items-center p-6 bg-gray-50 min-h-screen font-sans pt-24">
  <h1 class="text-3xl font-semibold text-green-600 mb-4 sm:mb-6">Winkelwagen</h1>

  {#if cart.length}
    <div class="w-full max-w-4xl">
      {#each cart as item (item.id)}
        <div class="flex justify-between items-center bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-md">
          <span class="text-lg text-gray-800">
            {item.name} ({item.amount} {item.unit})
          </span>
          <div class="flex items-center space-x-2">
            <!-- Verwijderknop voor het item -->
            <button
              class="text-sm text-white bg-red-500 py-2 px-4 rounded-md hover:bg-red-600 transition"
              on:click={() => handleRemoveItem(item.id)}
              aria-label="Verwijder item"
            >
              🗑️
            </button>
            <button
              class="text-sm text-white bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600 transition"
              on:click={() => navigateToProductPage(item.name)}
              aria-label="Bekijk product"
            >
              👁️
            </button>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <p class="text-gray-500">Je winkelmand is leeg!</p>
  {/if}
</div>
