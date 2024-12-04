<script>
    import InputField from "$lib/components/inputField.svelte";
    import { areFieldsFilled, baseInputClasses } from "$lib/formUtils";
    import { user } from "$lib/store";

    let userFound = true;
    let fields = {
        user: null,
        password: null
    }

    async function login() {
        fields.user = document.getElementById("user").value;
        fields.password = document.getElementById("password").value;
        if (areFieldsFilled(fields)) {
            let url = `http://localhost:3010/user/login?user=${fields.user}&password=${fields.password}`
            try {
                userFound = true;
                const res = await fetch(url, {method: "GET"});
                let data = await res.json();
                user.set(data);
                window.location.href = '/';
            } catch (err) {
                userFound = false;
            }
        }
    }

</script>

<div class="flex flex-row items-center justify-center min-h-screen bg-gray-100">
    <section class="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
        <h1 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Inloggen</h1>

        <InputField fieldName="user" fieldValue={fields.user} type="text" placeholder="Gebruikersnaam of email" />
        
        <InputField fieldName="password" fieldValue={fields.password} type="password" placeholder="Wachtwoord" />

        {#if !areFieldsFilled(fields)}
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