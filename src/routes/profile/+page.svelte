<script>
    // @ts-nocheck
    import { onMount } from "svelte";

    function goBack() {
        window.history.back();
    }
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

<div class="bg-light-beige flex flex-col justify-between p-5">
    <div class="flex flex-row justify-between relative">
        <a href="/" class="">
            <img
                onclick="{goBack()}"
                src="back.png"
                alt="Back"
                class="h-8 w-8 bg-orange-red rounded-full"
            />
        </a>
        <h1 class="ml-16 text-2xl font-bold">PROFILE</h1>
        <button class="flex flex-row">
            <img src="logout.png" alt="logout" class="h-4 w-4 ml-2 mt-1" />
            <h3 class="text-xl ml-2">Log out</h3>
        </button>
    </div>

    {#if isLoading}
    <p>Loading...</p>
{:else}
    {#each profileData as { username, co2Saved, habits }}
    <section class="flex flex-col items-center justify-center relative p-2">
        <img src="/profile_icon.png" alt="profile" class="w-64 h-fit" />
        <section class="flex flex-row ml-2">
            <h2 class="text-xl font-bold">Username:</h2>
            <h3 class="text-xl ml-2">{username}</h3>
        </section>
    </section>

    <section class="flex flex-row ml-2">
        <h2 class="text-xl font-bold">Challenges completed:</h2>
        <h3 class="text-xl ml-2">10</h3>
    </section>

    <section class="flex items-center justify-center relative p-2">
        <button id="allChallenges">
            <h2 class="bg-green rounded-full w-40 p-2">See challenges</h2>
        </button>
    </section>

    <section class="ml-2 p-2">
        <h2 class="font-bold">Your characteristics:</h2>
        <ol class="ml-6">
            <li class="list-disc">{habits}</li>
        </ol>
        <div class="flex items-center justify-center relative p-2 mt-2">
            <button id="characteristics">
                <h2 class="bg-green rounded-full w-50 p-2">Edit profile</h2>
            </button>
        </div>
    </section>

    <section class="flex flex-row justify-center">
        <div class="flex relative p-2">
            <button id="addFriends">
                <h2 class="bg-green rounded-full w-50 p-2">Add friends</h2>
            </button>
        </div>
        <div class="flex relative p-2">
            <button id="friendsList">
                <h2 class="bg-green rounded-full w-50 p-2">See friends list</h2>
            </button>
        </div>
    </section>
    {/each}
{/if}

    
</div>
