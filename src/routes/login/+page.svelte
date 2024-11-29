<script>
    import { user } from "$lib/store.js";
    let passwordIncorrect = false;

    async function login() {
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
    <a href="/">trug</a>
    <h1>Inloggen:</h1>
    <input id="name" placeholder="naam" autofocus>
    <input id="password" placeholder="wachtwoord">
    {#if passwordIncorrect}
    <p>wachwoord incorrect of gebruiker incorrect</p>
    {/if}
    <button on:click={login}>write to console</button>
</div>