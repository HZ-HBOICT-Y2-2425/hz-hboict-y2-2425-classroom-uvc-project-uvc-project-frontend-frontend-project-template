<script>
  export let dishes = ["Spaghetti", "Sushi", "Tacos"];

  // State for each dropdown
  let dropdownStates = {
    Vegetables: false,
    Allergies: false,
    Season: false,
    Likes: false,
  };

  // Define dropdown content for each key
  const dropdownContent = {
    vegetables: ["Carrot", "Broccoli", "Spinach"],
    allergies: ["Peanuts", "Shellfish", "Dairy"],
    season: ["Apple", "Banana", "Cherry"],
    likes: ["Water", "Juice", "Soda"],
  };

  // Function to toggle a specific dropdown
  function toggleDropdown(key) {
    dropdownStates[key] = !dropdownStates[key];
  }

  // Function to get the text for a specific dropdown
  function getDropdownToggleText(key) {
    return dropdownStates[key] ? `${key}` : `${key}`;
  }

  let query = ""; // Holds the search input value

  function handleSearch() {
    console.log("Search query:", query);
    // Perform search logic here
  }
</script>

<h1 class="text-8xl text-green-600 text-center">Dishes</h1>

<div class="flex items-center max-w-[30%] mx-auto margin-top-20px mt-10">
  <input
    type="text"
    bind:value={query}
    placeholder="Search..."
    class="border border-black px-4 py-2 rounded-l w-full focus:border-black focus:outline-none outline-none border-2 border-l-2 border-r-0 border-t-2 border-b-2"
  />
  <button
    on:click={handleSearch}
    class="px-4 py-2 bg-zinc-200 text-black rounded-r border-2 border-black"
  >
    Search
  </button>
</div>

<div
  class="grid grid-cols-2 mx-auto flex justify-center gap-6 max-w-[50%] mt-20"
>
  {#each Object.keys(dropdownStates) as key (key)}
    <div class="flex item-center justify-center text-center">
      <div class="dropdown" on:focusout={() => toggleDropdown(key)}>
        <button
          class="btn m-1 px-2 border-2 border-black bg-zinc-200 min-w-[10vw] rounded"
          on:click={() => toggleDropdown(key)}
        >
          <span>{getDropdownToggleText(key)}</span>
        </button>
        <ul
          class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          style:visibility={dropdownStates[key] ? "visible" : "hidden"}
        >
          {#each dropdownContent[key] as item}
            <li><button class="btn text-slate-300">{item}</button></li>
          {/each}
        </ul>
      </div>
    </div>
  {/each}
</div>

<!-- Dishes List -->
<ul>
  {#each dishes as dish}
    <li>
      <a href={`/recepten/${dish}`}>{dish}</a>
    </li>
  {/each}
</ul>
