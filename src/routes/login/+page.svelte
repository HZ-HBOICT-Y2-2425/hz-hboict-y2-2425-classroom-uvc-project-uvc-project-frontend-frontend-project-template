<script>
    import { onMount } from "svelte";
    let passwordIncorrect = false;

    const getData = async (url) => {
        try {
            const res = await fetch(url, {method: "GET"});
            const data = await res.json();
            return data;
        } catch (err) {
            throw new Error(err);
        }
    }

    onMount(async () => {
        const data = await getData("http://localhost:3010/user");
        console.log(data);
    });

    async function writeToConsole() {
        const een = document.getElementById("1").value;
        const twee = document.getElementById("2").value;
        console.log("een:", een, "twee:", twee);
        const url = `http://localhost:3010/user/login?user=${een}&password=${twee}`;
        let data;
        try {
            const res = await fetch(url, {method: "GET"});
            data = await res.json();
            console.log("data:", data);
        } catch (err) {
            passwordIncorrect = true;
        }
    }
</script>

<div>
    <h1>Inloggen:</h1>
    <input id=1 value="naam">
    <input id=2 value="wachtwoord">
    {#if passwordIncorrect}
    <p>wachwoord incorrect of gebruiker incorrect</p>
    {/if}
    <button on:click={writeToConsole}>write to console</button>
</div>