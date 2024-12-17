<script>
    // @ts-nocheck
    import { onMount } from "svelte";

    export let selectedCategory = "trees";

    let shopData = []; // Store all items
    let items = []; // Filtered items
    let isLoading = true;

    // Fetch the data only once when the component mounts
    onMount(async () => {
        isLoading = true;
        try {
            const response = await fetch("http://localhost:3010/items");
            const data = await response.json();
            shopData = data.data || [];
            shopData = shopData[0];
            filterItems(); // Filter items after fetching
        } catch (error) {
            console.error("Failed to fetch shop data:", error);
        } finally {
            isLoading = false;
        }
    });

    // Function to filter items based on selectedCategory
    const filterItems = () => {
        items = shopData.filter(
            (item) =>
                item.category.toLowerCase() === selectedCategory.toLowerCase(),
        );
    };

    async function buyItem(id) {
        try {
            const userId = 1; // retrieve the real user here
    
            const response = await fetch(
                `http://localhost:3010/users/purchase?userId=${userId}&itemId=${id}`,
                {
                    method: "POST",
                },
            );

            if (!response.ok) {
                throw new Error("Failed to purchase item");
            }

            const result = await response.json();
            console.log(result);
            window.location.href = "/"; // Redirect to the main page
        } catch (error) {
            console.error("Error purchasing item:", error);
            alert("Your coins are insufficient.");
        }
    }

    // Reactively call filterItems when selectedCategory changes
    $: if (shopData.length > 0 && selectedCategory) {
        filterItems();
    }
</script>

<div class="grid grid-cols-2">
    {#if isLoading}
        <p>Loading...</p>
    {:else if items.length === 0}
        <p>No items found for this category.</p>
    {:else}
        {#each items as { itemID, name, path, price, level_required }}
            <div
                class="flex flex-col items-center justify-between shadow-md rounded-lg p-1"
                key={itemID}
            >
                <!-- Image -->
                <img
                    src={path}
                    alt={name}
                    class="h-24 w-fit bg-beige rounded-full p-2 shadow-md"
                />
                <div class="bg-orange-red w-fit p-2 mt-2 rounded-lg">
                    <p class="text-center text-base">{name}</p>
                    <!-- Coins -->
                    <button class="flex gap-1" on:click={() => buyItem(itemID)}>
                        <img src="/coins.png" alt="coins" class="h-4 w-4" />
                        <span class="text-center text-base">{price}</span>
                    </button>
                </div>
            </div>
        {/each}
    {/if}
</div>

<style>
</style>
