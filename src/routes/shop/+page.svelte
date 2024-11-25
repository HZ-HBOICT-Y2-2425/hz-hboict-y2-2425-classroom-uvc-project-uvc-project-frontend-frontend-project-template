<script>
  import '../../app.css';

  // Placeholder data with image paths and random coin amounts
  const options = {
    TREES: [
      { name: 'Oak', image: '/coins.png', coins: Math.floor(Math.random() * 10) + 1 },
      { name: 'Pine', image: '/coins.png', coins: Math.floor(Math.random() * 10) + 1 },
      { name: 'Maple', image: '/coins.png', coins: Math.floor(Math.random() * 10) + 1 },
      { name: 'Birch', image: '/coins.png', coins: Math.floor(Math.random() * 10) + 1 }
    ],
    BUSHES: [
      { name: 'Rose', image: '/coins.png', coins: Math.floor(Math.random() * 10) + 1 },
      { name: 'Hibiscus', image: '/coins.png', coins: Math.floor(Math.random() * 10) + 1 },
      { name: 'Azalea', image: '/coins.png', coins: Math.floor(Math.random() * 10) + 1 },
      { name: 'Lilac', image: '/coins.png', coins: Math.floor(Math.random() * 10) + 1 }
    ],
    FLOWERS: [
      { name: 'Sunflower', image: '/coins.png', coins: Math.floor(Math.random() * 10) + 1 },
      { name: 'Tulip', image: '/coins.png', coins: Math.floor(Math.random() * 10) + 1 },
      { name: 'Daisy', image: '/coins.png', coins: Math.floor(Math.random() * 10) + 1 },
      { name: 'Lily', image: '/coins.png', coins: Math.floor(Math.random() * 10) + 1 }
    ],
    ANIMALS: [
      { name: 'Lion', image: '/coins.png', coins: Math.floor(Math.random() * 10) + 1 },
      { name: 'Elephant', image: '/coins.png', coins: Math.floor(Math.random() * 10) + 1 },
      { name: 'Tiger', image: '/coins.png', coins: Math.floor(Math.random() * 10) + 1 },
      { name: 'Zebra', image: '/coins.png', coins: Math.floor(Math.random() * 10) + 1 }
    ],
    INSECTS: [
      { name: 'Bee', image: '/coins.png', coins: Math.floor(Math.random() * 10) + 1 },
      { name: 'Butterfly', image: '/coins.png', coins: Math.floor(Math.random() * 10) + 1 },
      { name: 'Ant', image: '/coins.png', coins: Math.floor(Math.random() * 10) + 1 },
      { name: 'Grasshopper', image: '/coins.png', coins: Math.floor(Math.random() * 10) + 1 }
    ]
  };
  
  

  // Reactive variable to hold the currently selected category
  let selectedCategory = 'TREES';

  // Update the selected category when a button is clicked
  const selectCategory = (category) => {
    selectedCategory = category;
  };
</script>

<div class="bg-beige h-screen flex flex-col justify-between">
  <!-- Header Section -->
  <div class="flex items-center justify-center relative">
    <!-- Back Button -->
    <a href="/" class="absolute left-4">
      <img src="/back.png" alt="Back" class="h-6 w-6" />
    </a>
    <h1 class="text-black text-center text-2xl font-bold">SHOP</h1>
  </div>

  <!-- Middle Green Box -->
  <div class="flex-grow flex items-start justify-center bg-beige pt-20">
    <!-- Green Box -->
    <div class="bg-dark-green h-96 w-80 rounded-3xl p-5 flex">
      <!-- Left Section with Buttons -->
      <div class="w-1/3 flex flex-col justify-center gap-4 pr-4">
        <button
          class="bg-light-green text-dark-green rounded-lg py-2 px-4 text-center text-sm font-medium hover:bg-dark-green hover:text-beige transform transition-transform duration-300"
          on:click={() => selectCategory('TREES')}
        >
          TREES
        </button>
        <button
          class="bg-light-green text-dark-green rounded-lg py-2 px-4 text-center text-sm font-medium hover:bg-dark-green hover:text-beige transform transition-transform duration-300"
          on:click={() => selectCategory('BUSHES')}
        >
          BUSHES
        </button>
        <button
          class="bg-light-green text-dark-green rounded-lg py-2 px-4 text-center text-sm font-medium hover:bg-dark-green hover:text-beige transform transition-transform duration-300"
          on:click={() => selectCategory('FLOWERS')}
        >
          FLOWERS
        </button>
        <button
          class="bg-light-green text-dark-green rounded-lg py-2 px-4 text-center text-sm font-medium hover:bg-dark-green hover:text-beige transform transition-transform duration-300"
          on:click={() => selectCategory('ANIMALS')}
        >
          ANIMALS
        </button>
        <button
          class="bg-light-green text-dark-green rounded-lg py-2 px-4 text-center text-sm font-medium hover:bg-dark-green hover:text-beige transform transition-transform duration-300"
          on:click={() => selectCategory('INSECTS')}
        >
          INSECTS
        </button>
      </div>

      <!-- Vertical Divider -->
      <div class="border-l-2 border-black"></div>

      <!-- Right Content Section -->
      <div class="flex-grow flex flex-wrap justify-evenly items-center gap-4 pl-4">
        <!-- Dynamically render items -->
        {#each options[selectedCategory] as { name, image, coins }}
        <div class="bg-beige w-[45%] h-40 flex flex-col items-center justify-between rounded-lg p-2 shadow-md">
          <!-- Image -->
          <img src={image} alt={name} class="h-16 w-auto" />
          
          <!-- Brown/Orange Box -->
          <div class="bg-orange-500 text-white w-full flex items-center justify-between px-2 py-1 rounded-md">
            <!-- Name -->
            <p class="text-sm font-medium">{name}</p>
            <!-- Coins -->
            <div class="flex items-center gap-1">
              <img src="/coins.png" alt="coins" class="h-4 w-4" />
              <span class="text-sm font-medium">{coins}</span>
            </div>
          </div>
        </div>        
        {/each}
      </div>
    </div>
  </div>

  <!-- Footer Placeholder -->
  <div></div>
</div>

<style>
  .bg-beige {
    background-color: #f5e6c8;
  }
  .bg-dark-green {
    background-color: #3d6b35;
  }
  .bg-light-green {
    background-color: #a8d5a2;
  }
  .text-dark-green {
    color: #3d6b35;
  }
  .text-beige {
    color: #f5e6c8;
  }
</style>
