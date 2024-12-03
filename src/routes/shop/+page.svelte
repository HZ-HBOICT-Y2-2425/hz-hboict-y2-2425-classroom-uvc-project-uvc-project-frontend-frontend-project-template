<script>
// @ts-nocheck

    import Shop from "$lib/components/Shop.svelte";

  let selectedCategory = "trees"; 

  const selectCategory = (category) => {
    selectedCategory = category; 
  };
  function goBack() {
    window.history.back();
  }
</script>

<div class="h-screen flex flex-col justify-between p-5">
  <div class="flex items-center justify-center relative">
    <a href="/" class="absolute left-4">
      <img on:click={goBack} src="back.png" alt="Back" class="h-8 w-8 bg-orange-red rounded-full"
      />
    </a>
    <h1 class=" text-center text-2xl font-bold">SHOP</h1>
  </div>

  <div class="flex-grow flex justify-center pt-10">
    <div class="bg-darker-green h-fit w-full rounded-3xl p-3 flex">
      <div class="w-1/4 flex flex-col gap-4 pr-2">
        <button
          class="bg-green rounded-full p-2 text-base hover:border-2 hover:border-orange-red transform transition-transform duration-300"
          on:click={() => selectCategory("trees")}
        >
          TREES
        </button>
        <button
          class="bg-green rounded-full p-2 text-base font-medium hover:border-2 hover:border-orange-red transform transition-transform duration-300"
          on:click={() => selectCategory("bushes")}
        >
          BUSHES
        </button>
        <button
          class="bg-green rounded-full p-2 text-base font-medium hover:border-2 hover:border-orange-red transform transition-transform duration-300"
          on:click={() => selectCategory("flowers")}
        >
          FLOWERS
        </button>
        <button
          class="bg-green rounded-full p-2 text-base font-medium hover:border-2 hover:border-orange-red transform transition-transform duration-300"
          on:click={() => selectCategory("animals")}
        >
          ANIMALS
        </button>
        <button
          class="bg-green rounded-full p-2 text-base font-medium hover:border-2 hover:border-orange-red transform transition-transform duration-300"
          on:click={() => selectCategory("bugs")}
        >
          BUGS
        </button>
      </div>

      <div class="border-l-2 border-black"></div>

      <Shop {selectedCategory} />
    </div>
  </div>
</div>

<style>

</style>
