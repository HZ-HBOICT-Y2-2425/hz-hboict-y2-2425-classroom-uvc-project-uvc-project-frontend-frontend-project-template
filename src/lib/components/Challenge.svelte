<script>
    import { onMount } from 'svelte';
  
    let challenges = [];
    let selectedChallenge = null; // Holds the selected challenge for the modal
    let showModal = false; // Controls whether the modal is visible
  
    async function fetchChallenges() {
      try {
        const response = await fetch('http://localhost:3010/challenges');
        const data = await response.json();
        challenges = data.sort(() => Math.random() - 0.5).slice(0, 3);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    }
  
    const openModal = (challenge) => {
      selectedChallenge = challenge;
      showModal = true;
    };
  
    const closeModal = () => {
      selectedChallenge = null;
      showModal = false;
    };
  
    onMount(() => {
      fetchChallenges();
    });
  </script>
  
  <!-- Main Content -->
  <main class="p-5">
    <section class="bg-green pl-5 p-5 m-3 rounded-3xl">
      {#each challenges as challenge}
        <div
          class="bg-beige p-2 mb-2 border border-orange-red rounded-2xl flex flex-row justify-between cursor-pointer"
          on:click={() => openModal(challenge)}
        >
          <h2 class="text-2xl mt-1">{challenge.title}</h2>
          <div class="flex flex-row">
            <img src="/coins.png" alt="coins" class="w-12 h-fit" />
            <h2 class="text-2xl mt-1">{challenge.coins}</h2>
          </div>
        </div>
      {/each}
    </section>
  </main>

<!-- Modal -->
{#if showModal}
<div class="fixed inset-0 z-50 flex flex-col justify-between bg-light-beige">
  <!-- Navbar -->
  <header class="flex justify-between items-center p-3 w-full" style="background-color: rgb(141 137 43 / var(--tw-bg-opacity, 1));">
    <div class="flex flex-row items-center">
      <img src="/coins.png" alt="coins" class="w-12 h-fit" />
      <h2 class="text-2xl mt-1 ml-2">2</h2>
    </div>
    <div class="flex-grow flex justify-center">
      <h2 class="text-3xl mt-1">CO2: 55</h2>
    </div>
    <button id="profile" class="ml-auto">
      <img src="/profile_icon.png" alt="profile" class="w-12 h-fit" />
    </button>
  </header>  

<!-- Modal Content -->
<div class="flex-grow flex flex-col justify-center items-center p-5">
  <div class="bg-white w-11/12 md:w-3/4 lg:w-1/2 rounded-xl p-5 shadow-lg relative">
    <!-- Title Section -->
    <div class="flex items-center justify-between mb-5">
      <!-- Back Button -->
      <button on:click={closeModal} class="mr-3">
        <img
          src="back.png"
          alt="Back"
          class="h-8 w-8 bg-orange-red rounded-full"
        />
      </button>
      <!-- Task Title -->
      <h1 class="text-dark-green text-2xl font-bold">{selectedChallenge.title}</h1>
    </div>

    <!-- Description and Impact -->
    <div class="mb-5">
      <p class="text-dark-green text-lg">{selectedChallenge.description}</p>
      <p class="text-sm text-gray-600 mt-2">{selectedChallenge.impact}</p>
    </div>

    <!-- Difficulty and CO2 Reduced -->
    <div class="flex justify-between items-start mb-5">
      <!-- Difficulty Section -->
      <div class="text-center">
        <p class="text-lg font-bold">Difficulty</p>
        <p class="text-lg">{selectedChallenge.difficulty}</p>
      </div>
      <!-- CO2 Reduced Section -->
      <div class="text-center">
        <p class="text-lg font-bold">CO2 Reduced</p>
        <p class="text-lg">{selectedChallenge.CO2_reduction_kg} kg</p>
      </div>
    </div>

    <!-- Reward Section -->
<div class="mt-5 flex items-center justify-center">
  <!-- Complete Button -->
  <button
    class="flex items-center px-4 py-2 rounded-lg text-lg font-bold bg-green shadow-md"
    on:click={() => {
      console.log(`${selectedChallenge.title} completed!`);
      closeModal();
    }}
  >
    <!-- Complete Text -->
    <span class="mr-3">Complete</span>
    <!-- Coin Image and Reward -->
    <img src="/coins.png" alt="coins" class="h-6 w-6 mr-2" />
    <span>{selectedChallenge.coins}</span>
  </button>
</div>

    <!-- Button Section -->
    <div class="mt-5 flex flex-col items-center">

      
    </div>
  </div>

  <!-- Image Section -->
  <img
  src="../assets\images/garden1.png"
  alt="Green Landscape"
  class="rounded-lg shadow-md w-128 h-fit"
/>
</div>

  <!-- Footer -->
  <footer class="flex justify-between items-center p-3 w-full" style="background-color: rgb(141 137 43 / var(--tw-bg-opacity, 1));">
    <button id="shop">
      <a href="/shop">
        <img src="/shop.png" alt="shop" class="w-12 h-fit" />
      </a>
    </button>
    <button id="leaderboard">
      <h2 class="text-3xl p-2 bg-orange-red rounded-3xl">Leaderboard</h2>
    </button>
    <a id="info" href="/info">
      <img src="/info.png" alt="information" class="w-10 h-fit bg-orange-red rounded-3xl" />
    </a>
  </footer>
</div>
{/if}
  
  <style>
    /* General Colors */
    .bg-light-beige {
      background-color: #f5e6c8;
    }

    .bg-beige {
      background-color: #e4d9b9;
    }
    .text-dark-green {
      color: #3d6b35;
    }
  
    /* Modal Specific Colors */
    .bg-orange-500 {
      background-color: #f97316;
    }
    .bg-blue-500 {
      background-color: #3b82f6;
    }
    .bg-red-500 {
      background-color: #ef4444;
    }
    .bg-light-green {
      background-color: #a8d5a2;
    }
    .hover\:bg-dark-green:hover {
      background-color: #3d6b35;
    }
    .hover\:text-beige:hover {
      color: #f5e6c8;
    }
  
    /* Ensure proper alignment */
    header img,
    footer img {
      display: inline-block;
    }
  </style>
  