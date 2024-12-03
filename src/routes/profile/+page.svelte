<script>
    import { user } from "$lib/store";

    function logOut() {
        user.set(null);
        window.location.href = '/';
    }
</script>

<div>
    {#if $user}
        <p>Name: {$user.name}</p>
        <p>Email: {$user.email}</p>
        <p>Zipcode: {$user.zipcode}</p>
        <p>CO2 Bijdrage: {$user.co2Contribution}</p>
        <!-- <a href="/profile/update" class="bg-black text-white text-sm px-3 py-1">Update</a> -->
    {/if}
    <button class="bg-black text-white text-sm px-2.5 py-1"
    on:click={logOut}>Uitloggen</button>
</div>