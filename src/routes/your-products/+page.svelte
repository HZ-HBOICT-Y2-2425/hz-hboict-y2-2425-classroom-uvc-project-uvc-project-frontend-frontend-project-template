<script>
  import { onMount } from 'svelte';
  import { user } from '$lib/store';
  import { getData, getDataUrls } from '$lib/dataHandler';
  import AddProductBtn from '$lib/components/product/addProductBtn.svelte';
  import Products from '$lib/components/product/products.svelte';
  import ReservedProducts from '$lib/components/product/reservedProducts.svelte';

  let productsUnreserved = [];
  let productsReserved = [];
  let yourReservations = [];
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
        yourReservations = await getDataUrls(reservationUrls);
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
      
      console.log("products:", products, "reservations:", yourReservations, "unreservered:", productsUnreserved, "reserved:", productsReserved);

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
  {#if yourReservations.length > 0}
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold text-green-600">
        Reservaties:
      </h1>
      <AddProductBtn />
    </div>

    {#if !isLoading && error === null}
      <Products products={yourReservations}/>
    {/if}
  {/if}
  
  {#if productsReserved.length > 0}
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold text-green-600">
        Gereserveerde producten:
      </h1>
      {#if yourReservations.length === 0}
        <AddProductBtn />
      {/if}
    </div>

    {#if $user !== null && !isLoading && error === null}
      <ReservedProducts products={productsReserved} />
    {/if}
  {/if}
  
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-2xl font-bold text-green-600">
      Eigen producten:
    </h1>
    {#if productsReserved.length === 0 && yourReservations.length === 0}
      <AddProductBtn />
    {/if}
  </div>

  {#if $user === null}
    <p class="text-center text-red-600">Log in om uw producten te zien</p>
  {:else if isLoading}
    <p class="text-center text-gray-600">Producten worden geladen...</p>
  {:else if error}
    <p class="text-center text-red-600">{error}</p>
  {:else if productsUnreserved.length > 0}
    <Products products={productsUnreserved} />
  {:else}
    <p class="text-center text-gray-600">Geen producten gevonden...</p>
  {/if}
</div>
