<script>
  import { onMount } from 'svelte';
  import { user } from '$lib/store';
  import { getData, getDataUrls, putData } from '$lib/dataHandler';
  import AddProductBtn from '$lib/components/product/addProductBtn.svelte';
  import IndividualProductBtn from '$lib/components/product/individualProductBtn.svelte';

  let products = {
    unreserved: [],
    reserved: [],
    yourReservations: [],
  }
  let isLoading = true;
  let error = null;

  onMount(async () => setTimeout(async () => {
    try {
      let productsArray = [];
      const productUrls = await getData(`http://localhost:3010/products/user/${$user.id}`);
      if (productUrls.length !== 0) {
        productsArray = await getDataUrls(productUrls);
      } else {
        error = 'U heeft nog geen producten';
      };

      // Filter producten op de basis dat ze gereserveerd zijn
      products.unreserved = productsArray.filter(product => !product.reserved );
      products.reserved = productsArray.filter(product => product.reserved );

      const reservationUrls = await getData(`http://localhost:3010/products/reservation/${$user.id}`);
      
      if (reservationUrls.length !== 0) {
        products.yourReservations = await getDataUrls(reservationUrls);
      }
      
      console.log("products:", products);
      
    } catch (err) {
      console.error('Error bij het laden van producten:', err);
      error = 'Producten konden niet worden geladen. Probeer het later opnieuw.';
    } finally {
      isLoading = false;
    }
  }, 100));

  async function removeReservation(product) {
    await putData(`http://localhost:3010/products/unreserve/${product.id}/${product.userID}`);
    window.location.reload();
  }

  async function approveReservation() {
    // TODO vraag wat hier gedaan moet worden met het product
    window.location.reload();
  }
</script>

<div class="container mx-auto p-4">
  {#if products.yourReservations.length > 0}
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold text-green-600">
        Reservaties:
      </h1>
      <AddProductBtn />
    </div>

    {#if !isLoading && error === null}
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        {#each products.yourReservations as product}
        <div class="grid border border-black rounded-lg gap-4 p-1">
          <IndividualProductBtn product={product} />
          <button 
            on:click={() => removeReservation(product)} 
            class="bg-red-500 rounded-lg transition-transform transform hover:translate-y-[-2px] hover:shadow-lg cursor-pointer text-center text-white font-bold p-1"
          >
            Reservatie Verwijderen
          </button>
        </div>
        {/each}
      </div>
    {/if}
  {/if}
  
  {#if products.reserved.length > 0}
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold text-green-600">
        Gereserveerde producten:
      </h1>
      {#if products.yourReservations.length === 0}
        <AddProductBtn />
      {/if}
    </div>

    {#if $user !== null && !isLoading && error === null}
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
      {#each products.reserved as product}
        <div class="grid border border-black rounded-lg gap-4 p-1">
          <IndividualProductBtn product={product} />
          <div class="grid grid-cols-2 gap-4">
            <button 
              on:click={() => approveReservation()} 
              class="bg-green-500 rounded-lg transition-transform transform hover:translate-y-[-2px] hover:shadow-lg cursor-pointer text-center text-white font-bold p-1"
            >
              Product is Opgehaald
            </button>
            <button 
              on:click={() => removeReservation(product)} 
              class="bg-red-500 rounded-lg transition-transform transform hover:translate-y-[-2px] hover:shadow-lg cursor-pointer text-center text-white font-bold p-1"
            >
              Reservatie Verwijderen
            </button>
          </div>
        </div>
      {/each}
  </div>
    {/if}
  {/if}
  
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-2xl font-bold text-green-600">
      Eigen producten:
    </h1>
    {#if products.reserved.length === 0 && products.yourReservations.length === 0}
      <AddProductBtn />
    {/if}
  </div>

  {#if $user === null}
    <p class="text-center text-red-600">Log in om uw producten te zien</p>
  {:else if isLoading}
    <p class="text-center text-gray-600">Producten worden geladen...</p>
  {:else if error}
    <p class="text-center text-red-600">{error}</p>
  {:else if products.unreserved.length > 0}
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
    {#each products.unreserved as product}
      <IndividualProductBtn product={product} />
    {/each}
  </div>
  {:else}
    <p class="text-center text-gray-600">Geen producten gevonden...</p>
  {/if}
</div>
