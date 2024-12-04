<script>
    import { user } from "$lib/store";

    const inputClasses = "w-full px-4 py-2 mb-4 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border border-gray-300";
    let userFound = true;
    let fieldsFilledBool = true;
    let fields = {
        user: "",
        password: ""
    }
    let data;

    async function login() {
        fields.user = document.getElementById("user").value;
        fields.password = document.getElementById("password").value;
        fieldsFilledBool = areFieldsFilled(fields);
        if (fieldsFilledBool) {
            handleGetRequest(`http://localhost:3010/user/login?user=${fields.user}&password=${fields.password}`);
        } else {
            toggleBorders(fields)
        }
    }

    function toggleBorders(object) {
        Object.keys(object).forEach(field => {
            let htmlField = document.getElementById(field);
            if (htmlField.value === "") {
                if (htmlField.classList.contains("border-gray-300")) {
                    htmlField.classList.remove("border-gray-300");
                    htmlField.classList.add("border-red-500");
                }
            } else {
                if (htmlField.classList.contains("border-red-500")) {
                    htmlField.classList.remove("border-red-500");
                    htmlField.classList.add("border-gray-300");
                }
            }
        })
    }

    async function handleGetRequest(url) {
        try {
            const res = await fetch(url, {method: "GET"});
            data = await res.json();
            user.set(data);
            window.location.href = '/';
        } catch (err) {
            userFound = false;
        }
    }

    function areFieldsFilled(object) {
        const values = Object.values(object);
        const index = values.findIndex(value => value === "");
        console.log("index: ", index);
        if (index === -1) {
            return true;
        }
        return false;
    }
</script>

<div class="flex flex-row items-center justify-center min-h-screen bg-gray-100">
    <section class="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
        <h1 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Inloggen</h1>
        
        <input id="user" placeholder="Gebruikersnaam of email" class={inputClasses}/>
        
        <input id="password" type="password" placeholder="Wachtwoord" class={inputClasses}/>

        {#if !fieldsFilledBool}
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