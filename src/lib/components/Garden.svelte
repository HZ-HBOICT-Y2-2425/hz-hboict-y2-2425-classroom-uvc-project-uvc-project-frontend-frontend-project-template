<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { checkAuth } from "../../userAuth"; // Import the checkAuth function

    import "../../app.css";

    let items = [];
    let images = [];
    let isLoading = true; // Set loading flag initially to true

    onMount(async () => {
        checkAuth();
        const userId = sessionStorage.getItem("userId");

        try {
            const response = await fetch(
                `http://localhost:3010/users/userItems?userId=${userId}`,
                { method: "GET" },
            );
            const data = await response.json();
            items = data.purchases || [];
        } catch (error) {
            console.error("Failed to fetch shop data:", error);
        }

        try {
            const response = await fetch(`http://localhost:3010/items`, {
                method: "GET",
            });
            const data = await response.json();
            images = data.data || [];
            images = images[0];
        } catch (error) {
            console.error("Failed to fetch images data:", error);
        } finally {
            isLoading = false; // Set loading flag to false when data is fetched
        }
    });

    let width = 2000; // Background width
    let height = 1000; // Background height
    let viewWidth = 340; // Container width
    let viewHeight = 400; // Container height
    let offsetX = 0; // Center horizontally
    let offsetY = 0; // Center vertically
    let isPanning = false; // Flag to check if panning is active
    let startX = 0; // Initialize X position
    let startY = 0; // Initialize Y position

    const startPan = (event) => {
        isPanning = true;
        startX =
            event.type === "mousedown"
                ? event.clientX
                : event.touches[0].clientX;
    };

    const pan = (event) => {
        if (!isPanning) return;

        const currentX =
            event.type === "mousemove"
                ? event.clientX
                : event.touches[0].clientX;

        const deltaX = currentX - startX;

        let newOffsetX = offsetX + deltaX;

        offsetX = Math.min(0, Math.max(newOffsetX, -(width - viewWidth)));

        startX = currentX;
    };

    const endPan = () => {
        isPanning = false;
    };
</script>

<div
    class="relative w-[340px] h-[400px] overflow-hidden border border-gray-300 rounded-2xl touch-none"
    on:mousedown|preventDefault={startPan}
    on:mousemove={pan}
    on:mouseup={endPan}
    on:mouseleave={endPan}
    on:touchstart|preventDefault={startPan}
    on:touchmove={pan}
    on:touchend={endPan}
>
    <div
        class="absolute w-[2000px] h-[398px] bg-cover bg-repeat"
        style="background-image: url('/assets/images/garden.png'); transform: translate({offsetX}px, {offsetY}px);"
    >
        <!-- Ensure images are loaded before rendering -->
        {#if !isLoading}
            <!-- Items in the garden -->
            {#each items as item}
                <!-- Log itemID -->
                {#if images[item.itemID - 1]}
                    <img
                        src={images[item.itemID - 1].path}
                        alt="Garden Element"
                        class="absolute"
                        style="top: {item.posY}px; left: {item.posX}px; height: {item.height}px; width: {item.width}px"
                    />
                {:else}
                    <!-- Fallback or placeholder if image is not available -->
                    <p>Image not found for item {item.itemID}</p>
                {/if}
            {/each}
        {:else}
            <!-- Show loading indicator while data is being fetched -->
            <p>Loading...</p>
        {/if}
    </div>
</div>
