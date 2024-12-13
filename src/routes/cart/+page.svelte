<script>
  import { cart, loadCart, saveCart, clearLocalCart } from '../../stores/cart';
  import { user } from "$lib/store";  // Importeer de user store

  // Laad de winkelwagen bij het inladen van de pagina
  import { onMount } from 'svelte';
  
  onMount(() => {
      loadCart();  // Laad winkelwagen uit localStorage
  });

  // Verwijder item uit winkelwagen
  function removeItem(id) {
      cart.update(items => {
          const updatedItems = items.filter(item => item.id !== id);
          saveCart(); // Bewaar de bijgewerkte winkelwagen
          return updatedItems;
      });
  }

  // Leeg de winkelwagen
  function clearCart() {
      clearLocalCart(); // Verwijder winkelwagen uit localStorage en reset de store
  }

  // Download de winkelwagen als tekstbestand
  function downloadCartAsText() {
      const textData = $cart
          .map(item => `${item.name}: ${item.quantity}`)
          .join('\n');

      const blob = new Blob([textData], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Boodschappenlijst.txt';
      a.click();
      URL.revokeObjectURL(url);
  }

  // Deel de winkelwagen (met de share API)
  async function shareCart() {
      const textData = $cart
          .map(item => `${item.name}: ${item.quantity}`)
          .join('\n');

      if (navigator.share) {
          try {
              await navigator.share({
                  title: 'Mijn Boodschappenlijst',
                  text: textData,
              });
          } catch (error) {
              console.error('Error sharing:', error);
          }
      } else {
          alert('Delen wordt niet ondersteund op jouw apparaat.');
      }
  }
</script>

<div class="flex flex-col items-center p-6 bg-gray-50 min-h-screen font-sans">
  <h1 class="text-3xl font-semibold text-green-600 mb-6">Winkelwagen</h1>
  
  {#if $cart.length}
      <div class="w-full max-w-md">
          {#each $cart as item}
              <div class="flex justify-between items-center bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-md">
                  <span class="text-lg text-gray-800">{item.name}</span>
                  <div class="flex items-center space-x-2">
                      <button
                          class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xl text-gray-600 hover:bg-gray-300"
                          on:click={() => item.quantity--} 
                          disabled={item.quantity <= 0}
                          aria-label="Decrement quantity"
                      >
                          -
                      </button>
                      <span class="text-lg text-gray-800">{item.quantity}</span>
                      <button
                          class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xl text-gray-600 hover:bg-gray-300"
                          on:click={() => item.quantity++}
                          aria-label="Increment quantity"
                      >
                          +
                      </button>
                      <button
                          class="text-sm text-white bg-red-500 py-1 px-3 rounded-md hover:bg-red-600 transition"
                          on:click={() => removeItem(item.id)}
                          aria-label="Remove item"
                      >
                          🗑️
                      </button>
                  </div>
              </div>
          {/each}
      </div>

      <button
          class="w-full max-w-xs bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition mt-6"
          on:click={clearCart}
          aria-label="Clear all items"
      >
          Alles verwijderen
      </button>

      <div class="flex space-x-6 mt-6">
          <button
              class="text-2xl text-gray-600 hover:text-gray-800"
              on:click={downloadCartAsText}
              aria-label="Download cart as text"
          >
              ⬇️
          </button>
          <button
              class="text-2xl text-gray-600 hover:text-gray-800"
              on:click={shareCart}
              aria-label="Share cart"
          >
              🔗
          </button>
      </div>
  {:else}
      <p class="text-gray-500">Je winkelmand is leeg!</p>
  {/if}
</div>
