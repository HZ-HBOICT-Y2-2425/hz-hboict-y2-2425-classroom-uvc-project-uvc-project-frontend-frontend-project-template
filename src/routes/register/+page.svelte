<script>
    import InputField from "$lib/components/inputField.svelte";
import { areFieldsFilled, baseInputClasses } from "$lib/formUtils";
    import { user } from "$lib/store";

    let passwordConfirm = true;
    let fields = {
        name: null,
        email: null,
        zipcode: null,
        password: null,
        passwordConfirm: null
    }

    async function createAccount() {
        fields.name = document.getElementById("name").value;
        fields.email = document.getElementById("email").value;
        fields.zipcode = document.getElementById("zipcode").value;
        fields.password = document.getElementById("password").value;
        fields.passwordConfirm = document.getElementById("passwordConfirm").value;
        if (fields.password === fields.passwordConfirm) {
            passwordConfirm = true;
            if (areFieldsFilled(fields)) {
                const url = `http://localhost:3010/user?name=${fields.name}&email=${fields.email}&password=${fields.password}&zipcode=${fields.zipcode}`;
                try {
                    const res = await fetch(url, {method: "POST"});
                    let data = await res.json();
                    user.set(data);
                    window.location.href = '/';
                } catch (err) {
                    throw new Error(err);
                }
            }
        } else {
            passwordConfirm = false;
        }
    }
</script>

<div class="flex flex-row items-center justify-center min-h-screen bg-gray-100">
    <section class="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
        <h1 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Aanmelden</h1>
        
        <InputField fieldName="name" fieldValue={fields.name} type="text" placeholder="Gebruikersnaam" />

        <InputField fieldName="email" fieldValue={fields.email} type="text" placeholder="Email" />

        <InputField fieldName="zipcode" fieldValue={fields.zipcode} type="text" placeholder="Postcode" />

        <InputField fieldName="password" fieldValue={fields.password} type="password" placeholder="Wachtwoord" />
        
        <InputField fieldName="passwordConfirm" fieldValue={fields.passwordConfirm} type="password" placeholder="Bevestig wachtwoord" />

        {#if !areFieldsFilled(fields)}
            <p class="text-sm text-red-500 mb-4">Vul alles in</p>
        {:else if !passwordConfirm}
            <p class="text-sm text-red-500 mb-4">Vul hetzelfde wachtwoord 2x in</p>
        {/if}
        
        <button 
            on:click={() => createAccount()} 
            class="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            Creeër Account
        </button>
    </section>
</div>