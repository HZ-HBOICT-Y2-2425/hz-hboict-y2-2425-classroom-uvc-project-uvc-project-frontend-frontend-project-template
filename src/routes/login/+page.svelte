<script>
    import { user } from "$lib/store";

    let passwordIncorrect = false;
    let emptyFields = false;
    let data;

    if ($user) {
        window.location.href = '/';
    }

    async function login() {
        const name = document.getElementById("name").value;
        const password = document.getElementById("password").value;
        if (name && password) {
            emptyFields = false;
            const url = `http://localhost:3010/user/login?user=${name}&password=${password}`;
            try {
                const res = await fetch(url, {method: "GET"});
                data = await res.json();
                user.set(data);
                window.location.href = '/';
            } catch (err) {
                passwordIncorrect = true;
            }
        } else {
            emptyFields = true;
        }
    }
</script>

<!-- <div>
    <h1>Inloggen:</h1>
    <input id="name" placeholder="gebruikersnaam of email">
    <input id="password" placeholder="wachtwoord">
    {#if passwordIncorrect}
        <p>wachwoord incorrect of gebruikersnaam incorrect</p>
    {/if}
    <button on:click={login}>login</button>
</div> -->

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
        <h1 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Inloggen</h1>
        
        <input 
            id="name" 
            placeholder="Gebruikersnaam of email" 
            class="w-full px-4 py-2 mb-4 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
        />
        
        <input 
            id="password" 
            type="password" 
            placeholder="Wachtwoord" 
            class="w-full px-4 py-2 mb-4 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
        />
        
        {#if passwordIncorrect}
            <p class="text-sm text-red-500 mb-4">Wachtwoord of gebruikersnaam incorrect</p>
        {/if}

        {#if emptyFields}
            <p class="text-sm text-red-500 mb-4">Vul alles in</p>
        {/if}
        
        <button 
            on:click={login} 
            class="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            Login
        </button>
    </div>
</div>