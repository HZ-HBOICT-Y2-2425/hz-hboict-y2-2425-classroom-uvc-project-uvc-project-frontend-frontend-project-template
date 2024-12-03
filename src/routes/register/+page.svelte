<script>
    import { user } from "$lib/store";

    let data;

    if ($user) {
        window.location.href = '/';
    }

    async function createAccount() {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const zipcode = document.getElementById("zipcode").value;
        if (name && email && password && zipcode) {
            const url = `http://localhost:3010/user?name=${name}&email=${email}&password=${password}&zipcode=${zipcode}`;
            try {
                const res = await fetch(url, {method: "POST"});
                data = await res.json();
                user.set(data);
            } catch (err) {
                throw new Error(err);
            }
        }
    }
</script>

<div>
    <h1>Inloggen:</h1>
    <input id="name" placeholder="gebruikersnaam">
    <input id="email" placeholder="email">
    <input id="password" placeholder="wachtwoord">
    <input id="zipcode" placeholder="postcode">
    <button on:click={createAccount}>create account</button>
</div>