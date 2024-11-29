<script>
    // import { user } from "$lib/store.js";
    import { writable } from "svelte/store";
    import { onMount } from "svelte";

    let passwordIncorrect = false;
    let data = null;
    let defaultData = null;

    let user = writable(defaultData);

    onMount(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            user.set(JSON.parse(storedUser));
        }

        user.subscribe((value) => {
            console.log("value:", value);
            
            sessionStorage.setItem("user", value ? JSON.stringify(value) : null);
        });
    });

    async function login() {
        const name = document.getElementById("name").value;
        const password = document.getElementById("password").value;
        const url = `http://localhost:3010/user/login?user=${name}&password=${password}`;
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
    <a href="/">trug</a>
    {#if $user}
        <h1>Hello {$user.name}!</h1>
    {/if}
    <h1>Inloggen:</h1>
    <input id="name" placeholder="naam" autofocus>
    <input id="password" placeholder="wachtwoord">
    {#if passwordIncorrect}
    <p>wachwoord incorrect of gebruiker incorrect</p>
    {/if}
    <button on:click={login}>login</button>
    <!-- <button on:click={}>printUser</button> -->
</div>