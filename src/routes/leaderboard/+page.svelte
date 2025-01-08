<script>
  let selectedTab = "global";

  const selectTab = (tab) => {
    selectedTab = tab;
  };

  import { onMount } from "svelte";

  let globalUsers = [];

  // Fetch users on component mount
  onMount(async () => {
    try {
      const response = await fetch("http://localhost:3010/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      globalUsers = await response.json();

      // Sort users by co2Saved in descending order
      globalUsers = globalUsers.sort((a, b) => b.co2Saved - a.co2Saved);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  });
</script>

<div class="flex flex-col h-screen bg-beige">
  <!-- Header -->
  <div class="flex flex-col justify-between p-5">
    <div class="flex items-center justify-center relative">
      <a href="/" class="absolute left-4">
        <img src="/back.png" alt="Back" class="h-8 w-8 bg-orange-red rounded-full" />
      </a>
      <h1 class="text-black text-center text-2xl font-bold">LEADERBOARD</h1>
    </div>
  </div>

  <!-- Main Content -->
  <div class="mt-2 px-4">
    <div class="bg-darker-green rounded-xl w-full max-w-md p-4 mx-auto flex">
      <!-- Tabs Section -->
      <div class="w-1/3 flex flex-col gap-4 pr-4">
        <button
          class={`p-2 rounded-full text-sm font-bold border-2 ${
            selectedTab === "global"
              ? "bg-green text-black border-orange-red"
              : "bg-green text-black border-darker-green"
          }`}
          on:click={() => selectTab("global")}
        >
          GLOBAL
        </button>
      </div>
      <!-- Divider -->
      <div class="border-l-2 border-black"></div>

      <!-- Leaderboard Content -->
      <div class="flex-grow ml-4 bg-darker-green p-3 rounded-xl">
        {#if selectedTab === "global"}
          <ul class="text-black text-sm leading-6">
            {#each globalUsers as user, index}
              <li class="flex justify-between py-1">
                <span>{index + 1}. {user.username}</span>
                <span>CO2: {user.co2Saved} KG</span>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    </div>
  </div>
</div>
