<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import "../app.css";
    import { page } from "$app/stores";
    import { co2saved } from "../co2saved";
    import { coins } from "../coins";

    // Check if the current route is either /login or /register
    $: isAuthRoute = ["/login", "/register"].includes($page.url.pathname);

    let profileData = []; // Store all items
    let users = []; 
    let isLoading = true;

    // Fetch the data only once when the component mounts
    onMount(async () => {
        isLoading = true;
        try {
            const response = await fetch("http://localhost:3010/users/profile");
            const data = await response.json();
            profileData = data.results || [];
            console.log(data);
        } catch (error) {
            console.error("Failed to fetch profile data:", error);
        } finally {
            isLoading = false;
        }
    });
</script>

<div class="flex flex-col justify-between">
    <!-- Header -->
    {#if !isAuthRoute}
        <header class="bg-green flex justify-between p-3 w-full h-full">
            {#if isLoading}
                <p>Loading...</p>
            {:else}
                {#each profileData as { coins, co2Saved }}
                <div class="flex flex-row">
                    <img src="/coins.png" alt="coins" class="w-12 h-fit" />
                    <h2 class="text-2xl mt-1">{coins}</h2>
                </div>
                <h2 class="text-3xl mt-2">CO2: {co2Saved} kg</h2>
                <a href="/profile">
                    <button id="profile">
                        <img
                            src="/profile_icon.png"
                            alt="profile"
                            class="w-12 h-fit"
                        />
                    </button>
                </a>
                {/each}
            {/if}
        </header>
    {/if}

    <!-- Main Content -->
    <main>
        <slot />
    </main>

    <!-- Footer -->
    {#if !isAuthRoute}
        <footer class="bg-green flex justify-between p-3 w-full h-full mt-5">
            <button id="shop">
                <a href="/shop">
                    <img src="/shop.png" alt="shop" class="w-12 h-fit" />
                </a>
            </button>
            <button id="leaderboard">
                <h2 class="text-3xl p-2 bg-orange-red rounded-3xl">
                    Leaderboard
                </h2>
            </button>
            <a id="info" href="/info">
                <img
                    src="/info.png"
                    alt="information"
                    class="w-10 h-fit mt-1 bg-orange-red rounded-3xl"
                />
            </a>
        </footer>
    {/if}
</div>
