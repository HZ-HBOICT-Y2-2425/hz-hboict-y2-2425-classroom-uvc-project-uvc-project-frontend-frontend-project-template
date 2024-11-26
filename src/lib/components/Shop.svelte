<script>
    // @ts-nocheck

    import { onMount } from "svelte";

    export let selectedCategory = "trees";

    let shopData = {};
    let items = [];
    let isLoading = true;

    onMount(async () => {
        try {
            const response = await fetch("http://localhost:3010/items");
            const data = await response.json();
            shopData = data.shop.sections || {};

            items = shopData[selectedCategory.toLowerCase()] || [];
        } catch (error) {
            console.error("Failed to fetch shop data:", error);
        } finally {
            isLoading = false;
        }
    });

    $: items = shopData[selectedCategory.toLowerCase()] || [];
</script>

<div class="grid grid-cols-2">
    {#if isLoading}
        <p>Loading...</p>
    {:else if items.length === 0}
        <p>No items found for this category.</p>
    {:else}
        {#each items as { id, name, path, price, level_required }}
            <div
                class="flex flex-col items-center justify-between shadow-md rounded-lg p-1"
                key={id}
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
                    <div class="flex gap-1">
                        <img src="/coins.png" alt="coins" class="h-4 w-4" />
                        <span class="text-center text-base">{price}</span>
                    </div>
                </div>
            </div>
        {/each}
    {/if}
</div>

<style>
</style>
