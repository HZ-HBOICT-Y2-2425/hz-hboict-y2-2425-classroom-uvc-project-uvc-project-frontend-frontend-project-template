<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { checkAuth } from "../../userAuth";

    export let selectedCategory = "trees";

    let shopData = [];
    let items = [];
    let isLoading = true;

    let showModal = false; // Controls modal visibility
    let selectedItem = null; // Stores the selected item to buy

    onMount(async () => {
        checkAuth();
        isLoading = true;
        try {
            const response = await fetch("http://localhost:3010/items");
            const data = await response.json();
            shopData = data.data || [];
            shopData = shopData[0];
            filterItems();
        } catch (error) {
            console.error("Failed to fetch shop data:", error);
        } finally {
            isLoading = false;
        }
    });

    const filterItems = () => {
        items = shopData.filter(
            (item) =>
                item.category.toLowerCase() === selectedCategory.toLowerCase(),
        );
    };

    const confirmBuy = (item) => {
        selectedItem = item;
        showModal = true;
    };

    async function buyItem() {
        try {
            const userId = sessionStorage.getItem("userId");

            const response = await fetch(
                `http://localhost:3010/users/purchase?userId=${userId}&itemId=${selectedItem.itemID}`,
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
        } finally {
            showModal = false;
        }
    }

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
                class="flex flex-col items-center justify-between  p-1"
                key={itemID}
            >
                <img
                    src={path}
                    alt={name}
                    class="h-24 w-fit bg-beige rounded-full p-2 shadow-md"
                />
                <div class="bg-orange-red w-fit p-2 mt-2 rounded-lg">
                    <p class="text-center text-base">{name}</p>
                    <button
                        class="flex gap-1"
                        on:click={() => confirmBuy({ itemID, name, price })}
                    >
                        <img src="/coins.png" alt="coins" class="h-4 w-4" />
                        <span class="text-center text-base">{price}</span>
                    </button>
                </div>
            </div>
        {/each}
    {/if}

    {#if showModal}
        <!-- Modal Backdrop -->
        <div class="fixed bottom-10 left-0 w-full rounded-full p-6">
            <!-- Modal Content -->
            <div class="bg-green rounded-xl  p-6 w-full">
                <h2 class="text-2xl font-bold mb-4">Confirm Purchase</h2>
                <p class="text-gray-700">
                    Are you sure you want to buy <b>{selectedItem.name}</b> for <b>{selectedItem.price} coins</b>?
                </p>
                <div class="flex justify-end gap-4 mt-6">
                    <button
                        class="px-4 py-2"
                        on:click={() => (showModal = false)}
                    >
                        Cancel
                    </button>
                    <button
                        class="px-4 py-2 border-4 border-darker-green rounded-full"
                        on:click={buyItem}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    {/if}
</div>
