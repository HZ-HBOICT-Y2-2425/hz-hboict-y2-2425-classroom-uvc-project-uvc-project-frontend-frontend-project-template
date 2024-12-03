<script>
    import { user } from "$lib/store";

    let passwordIncorrect = false;
    let data;

    if ($user) {
        window.location.href = '/';
    }

    async function login() {
        const name = document.getElementById("name").value;
        const password = document.getElementById("password").value;
        if (name && password) {
            const url = `http://localhost:3010/user/login?user=${name}&password=${password}`;
            try {
                const res = await fetch(url, {method: "GET"});
                data = await res.json();
                user.set(data);
                window.location.href = '/';
            } catch (err) {
                passwordIncorrect = true;
            }
        }
    }
</script>

<div>
    <h1>Inloggen:</h1>
    <input id="name" placeholder="gebruikersnaam of email">
    <input id="password" placeholder="wachtwoord">
    {#if passwordIncorrect}
        <p>wachwoord incorrect of gebruikersnaam incorrect</p>
    {/if}
    <button on:click={login}>login</button>
</div>