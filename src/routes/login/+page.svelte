<script>
    import { onMount } from "svelte";
    import { user, initializeUserStore } from "$lib/store";

    let passwordIncorrect = false;
    let data;

    onMount(() => {
        initializeUserStore();
    });

    async function login() {
        const name = document.getElementById("name").value;
        const password = document.getElementById("password").value;
        const url = `http://localhost:3010/user/login?user=${name}&password=${password}`;
        try {
            const res = await fetch(url, {method: "GET"});
            data = await res.json();
            user.set(data);
        } catch (err) {
            passwordIncorrect = true;
        }
    }
</script>

<div>
    <a href="/">trug</a>
    {#if $user}
        <h1>Hello {$user.name}!</h1>
    {/if}
    <h1>Inloggen:</h1>
    <input id="name" placeholder="gebruikersnaam of email">
    <input id="password" placeholder="wachtwoord">
    {#if passwordIncorrect}
        <p>wachwoord incorrect of gebruikersnaam incorrect</p>
    {/if}
    <button on:click={login}>login</button>
</div>