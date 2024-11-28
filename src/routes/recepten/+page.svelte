<script>
  export let dishes = ["Spaghetti", "Sushi", "Tacos"];

  // State for each dropdown
	let dropdownStates = {
		vegetables: false,
		allergies: false,
		season: false,
		likes: false
	};

  // Define dropdown content for each key
	const dropdownContent = {
		vegetables: ['Carrot', 'Broccoli', 'Spinach'],
		allergies: ['Peanuts', 'Shellfish', 'Dairy'],
		season: ['Apple', 'Banana', 'Cherry'],
		likes: ['Water', 'Juice', 'Soda']
	};

	// Function to toggle a specific dropdown
	function toggleDropdown(key) {
		dropdownStates[key] = !dropdownStates[key];
	}

	// Function to get the text for a specific dropdown
	function getDropdownToggleText(key) {
		return dropdownStates[key] ? `${key}` : `${key}`;
	}
</script>

<h1 class="text-8xl text-green-600 text-center">Dishes</h1>

<!-- Dropdowns arranged in a 2x2 grid -->
<div class="grid grid-cols-2 gap-1">

	{#each Object.keys(dropdownStates) as key (key)}
		<div class="flex flex-col items-center">
			<div class="dropdown" on:focusout={() => toggleDropdown(key)}>
				<button class="btn m-1" on:click={() => toggleDropdown(key)}>
					<span>{getDropdownToggleText(key)}</span>
				</button>
				<ul class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52" style:visibility={dropdownStates[key] ? 'visible' : 'hidden'}>
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
