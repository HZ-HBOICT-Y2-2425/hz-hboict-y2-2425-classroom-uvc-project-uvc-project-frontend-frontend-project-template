<script>
    // @ts-nocheck

    import "../../app.css";

    // Test items for the garden
    let items = [
        { id: 1, src: "/assets/images/tree.png", x: 100, y: 205 , category: "tree", height: "80", width: "70" },
        { id: 2, src: "/assets/images/flower.png", x: 200, y: 290, category: "flower", height: "51", width: "70"  },
    ];

    let width = 2000; // Background width
    let height = 1000; // Background height
    let viewWidth = 340; // Container width
    let viewHeight = 400; // Container height
    let offsetX = 0; // Center horizontally
    let offsetY = 0; // Center vertically
    let isPanning = false; // Flag to check if panning is active
    let startX = 0; // Initialize X position
    let startY = 0; // Initialize Y position

    // Handle mouse down or touch start
    const startPan = (event) => {
        isPanning = true;
        startX =
            event.type === "mousedown"
                ? event.clientX
                : event.touches[0].clientX;
    };

    // Handle mouse move or touch move for panning
    const pan = (event) => {
        if (!isPanning) return;

        const currentX =
            event.type === "mousemove"
                ? event.clientX
                : event.touches[0].clientX;

        const deltaX = currentX - startX;

        // Calculate new horizontal offset
        let newOffsetX = offsetX + deltaX;

        // Restrict horizontal offset within the background boundaries
        offsetX = Math.min(0, Math.max(newOffsetX, -(width - viewWidth)));

        // Update the start position for the next move
        startX = currentX;

        // No need to update offsetY since vertical movement is ignored
    };

    // Stop panning
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
        <!-- Items in the garden -->
        {#each items as item (item.id)}
            <img
                src={item.src}
                alt="Garden Element"
                class="absolute"
                style="top: {item.y}px; left: {item.x}px; height: {item.height}px; width: {item.width}px"
            />
        {/each}
    </div>
</div>
