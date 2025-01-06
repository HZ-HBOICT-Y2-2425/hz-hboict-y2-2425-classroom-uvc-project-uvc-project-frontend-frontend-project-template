<script>
  import { onMount } from 'svelte';
  import { user } from '$lib/store';
  import { getData, getDataUrls } from '$lib/dataHandler';
  import AddProductBtn from '$lib/components/product/addProductBtn.svelte';
  import Products from '$lib/components/product/products.svelte';
  import ReservedProducts from '$lib/components/product/reservedProducts.svelte';

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
      <Products products={products.yourReservations}/>
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
      <ReservedProducts products={products.reserved} />
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
    <Products products={products.unreserved} />
  {:else}
    <p class="text-center text-gray-600">Geen producten gevonden...</p>
  {/if}
</div>
