<script>
    import { onMount } from "svelte";
    import { user } from "$lib/store.js";
    let passwordIncorrect = false;

    // const getData = async (url) => {
    //     try {
    //         const res = await fetch(url, {method: "GET"});
    //         const data = await res.json();
    //         return data;
    //     } catch (err) {
    //         throw new Error(err);
    //     }
    // }

    onMount(async () => {
        console.log("user", $user);
    })

    async function writeToConsole() {
        const name = document.getElementById("name").value;
        const password = document.getElementById("password").value;
        const url = `http://localhost:3010/user/login?user=${name}&password=${password}`;
        let data;
        try {
            const res = await fetch(url, {method: "GET"});
            data = await res.json();
            user.set(data);
            console.log("user:", $user);
            
        } catch (err) {
            passwordIncorrect = true;
        }
    }
</script>

<div>
    <h1>Inloggen:</h1>
    <input id="name" value="naam">
    <input id="password" value="wachtwoord">
    {#if passwordIncorrect}
    <p>wachwoord incorrect of gebruiker incorrect</p>
    {/if}
    <button on:click={writeToConsole}>write to console</button>
</div>