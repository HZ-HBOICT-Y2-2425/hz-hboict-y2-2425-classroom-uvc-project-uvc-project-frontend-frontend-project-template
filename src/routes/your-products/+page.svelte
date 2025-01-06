<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
    import { user } from '$lib/store';
    import { getData, getDataUrls } from '$lib/dataHandler';

  let productsUnreserved = [];
  let productsReserved = [];
  let userReservations = [];
  // let userReservations = [];
  let isLoading = true;
  let error = null;

  onMount(async () => setTimeout(async () => {
    try {
      let products = [];
      const productUrls = await getData(`http://localhost:3010/products/user/${$user.id}`);
      if (productUrls.length !== 0) {
        products = await getDataUrls(productUrls);
      } else {
        error = 'U heeft nog geen producten';
      };

      // Filter producten op de basis dat ze gereserveerd zijn
      productsUnreserved = products.filter(product => !product.reserved );
      productsReserved = products.filter(product => product.reserved );

      const reservationUrls = await getData(`http://localhost:3010/products/reservation/${$user.id}`);
      
      if (reservationUrls.length !== 0) {
        userReservations = await getDataUrls(reservationUrls);
      }

      // if (productsReserved.length > 0) {
      //   productsReserved.forEach(async product => {
      //     let reseveredByUser = await getData(`http://localhost:3010/user/${product.reservedByUserID}`);
      //     userReservations.push({ name: reseveredByUser.name, userId: Number(reseveredByUser.id) });
      //   });
      // }
      // console.log("userReservations:", userReservations);

      // let test = userReservations.find(reservation => reservation.userId === 2);

      // console.log("test1:", test);

      // userReservations.forEach(res => {
      //   console.log("test");
        
      //   if (res.userId === 2) {
      //     test = true;
      //   }
      // });
      // console.log("test2:", test);
      
      console.log("products:", products, "reservations:", userReservations, "unreservered:", productsUnreserved, "reserved:", productsReserved);

      // const users = [
      //   { id: 1, name: 'John', age: 25 },
      //   { id: 2, name: 'Jane', age: 30 },
      //   { id: 3, name: 'Bob', age: 35 }
      // ];

      // const foundUser = users.find(user => user.age === 30);
      // console.log("foundUser", foundUser);
    } catch (err) {
      console.error('Error bij het laden van producten:', err);
      error = 'Producten konden niet worden geladen. Probeer het later opnieuw.';
    } finally {
      isLoading = false;
    }
  }, 100));
</script>

<div class="container mx-auto p-4">
  {#if userReservations.length > 0}
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold text-green-600">
        Reservaties:
      </h1>
    </div>
    {#if !isLoading && error === null}
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        {#each userReservations as product (product.id)}
          <button
            class="border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-100 transition-transform transform hover:translate-y-[-5px] hover:shadow-lg cursor-pointer text-left"
            on:click={() => goto(`/products/${product.id}`)}
          >
            <img
              src="https://via.placeholder.com/400x200"
              alt="{product.title}"
              class="w-full h-48 object-cover"
            />
            <div class="p-4">
              <h2 class="text-lg font-bold text-green-700 mb-2">{product.title}</h2>
              <p class="text-green-700 font-bold text-base mb-2">${product.price.toFixed(2)}</p>
              <p class="text-gray-700 text-sm truncate">{product.description.slice(0, 100)}...</p>
            </div>
          </button>
        {/each}
      </div>
    {/if}
  {/if}
  {#if productsReserved.length > 0}
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold text-green-600">
        Gereserveerd:
      </h1>

      <button
        class="text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
        style="background-color: rgb(100, 173, 108);"
        on:click={() => goto('products/add-product')}
      >
        + Product toevoegen
      </button>
    </div>

    {#if $user !== null && !isLoading && error === null}
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        {#each productsReserved as product (product.id)}
          <button
            class="border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-100 transition-transform transform hover:translate-y-[-5px] hover:shadow-lg cursor-pointer text-left"
            on:click={() => goto(`/products/${product.id}`)}
          >
            <img
              src="https://via.placeholder.com/400x200"
              alt="{product.title}"
              class="w-full h-48 object-cover"
            />
            <div class="p-4">
              <h2 class="text-lg font-bold text-green-700 mb-2">{product.title}</h2>
              <p class="text-green-700 font-bold text-base mb-2">${product.price.toFixed(2)}</p>
              <p class="text-gray-700 text-sm truncate">Gereserveerd door {product.reservedByUserID}</p>
            </div>
          </button>
        {/each}
      </div>
    {/if}
  {/if}
  
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-2xl font-bold text-green-600">
      Eigen producten:
    </h1>
    {#if productsReserved.length === 0 && userReservations}
      <button
        class="text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
        style="background-color: rgb(100, 173, 108);"
        on:click={() => goto('products/add-product')}
      >
        + Product toevoegen
      </button>
    {/if}
  </div>

  {#if $user === null}
    <p class="text-center text-red-600">Log in om uw producten te zien</p>
  {:else if isLoading}
    <p class="text-center text-gray-600">Producten worden geladen...</p>
  {:else if error}
    <p class="text-center text-red-600">{error}</p>
  {:else if productsUnreserved.length > 0}
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {#each productsUnreserved as product (product.id)}
        <button
          class="border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-100 transition-transform transform hover:translate-y-[-5px] hover:shadow-lg cursor-pointer text-left"
          on:click={() => goto(`/products/${product.id}`)}
        >
          <img
            src="https://via.placeholder.com/400x200"
            alt="{product.title}"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <h2 class="text-lg font-bold text-green-700 mb-2">{product.title}</h2>
            <p class="text-green-700 font-bold text-base mb-2">${product.price.toFixed(2)}</p>
            <p class="text-gray-700 text-sm truncate">{product.description.slice(0, 100)}...</p>
          </div>
        </button>
      {/each}
    </div>
  {:else}
    <p class="text-center text-gray-600">Geen producten gevonden...</p>
  {/if}
</div>
