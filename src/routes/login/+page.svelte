<script>
    import { user } from "$lib/store";

    const inputClasses = "w-full px-4 py-2 mb-4 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none";
    let userFound = true;
    let emptyFields = [];
    let specificFields = {
        user: "",
        password: ""
    }
    let data;

    if ($user) {
        window.location.href = '/';
    }

    async function login() {
        specificFields.user = document.getElementById("user").value;
        specificFields.password = document.getElementById("password").value;
        emptyFields = returnEmptyFields(specificFields);
        if (emptyFields.length === 0) {
            emptyFields = [];
            const url = `http://localhost:3010/user/login?user=${specificFields.user}&password=${specificFields.password}`;
            try {
                const res = await fetch(url, {method: "GET"});
                data = await res.json();
                user.set(data);
                window.location.href = '/';
            } catch (err) {
                userFound = false;
            }
        }
    }

    function returnEmptyFields(object) {
        const check = [];
        const values = Object.values(object)
        for (let i = 0; i < values.length; i++) {
            if (values[i] === "") {
                check.push(Object.keys(object)[i]);
            }
        }
        return check;
    }
</script>

<div class="flex flex-row items-center justify-center min-h-screen bg-gray-100">
    <section class="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
        <h1 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Inloggen</h1>
        
        <input 
            id="user" 
            placeholder="Gebruikersnaam of email" 
            class={inputClasses}
        />
        
        <input 
            id="password" 
            type="password" 
            placeholder="Wachtwoord" 
            class={inputClasses}
        />

        {#if emptyFields.length > 0}
            <p class="text-sm text-red-500 mb-4">Vul alles in</p>
        {:else if !userFound}
            <p class="text-sm text-red-500 mb-4">Wachtwoord of gebruikersnaam incorrect</p>
        {/if}
        
        <button 
            on:click={() => login()} 
            class="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            Login
        </button>
    </section>
</div>