<script>
    import InputField from "$lib/components/inputField.svelte";
    import { areFieldsFilled } from "$lib/formUtils";
    import { user } from "$lib/store";

    let passwordConfirm = true;
    let fields = {
        name: null,
        email: null,
        zipcode: null,
        password: null,
        passwordConfirm: null
    }

    async function editAccount() {
        fields.name = document.getElementById("name").value;
        fields.email = document.getElementById("email").value;
        fields.zipcode = document.getElementById("zipcode").value;
        fields.password = document.getElementById("password").value;
        fields.passwordConfirm = document.getElementById("passwordConfirm").value;
        if (fields.password === fields.passwordConfirm) {
            passwordConfirm = true;
            if (areFieldsFilled(fields)) {
                const url = `http://localhost:3010/user/${$user.id}?name=${fields.name}&email=${fields.email}&password=${fields.password}&zipcode=${fields.zipcode}`;
                try {
                    const res = await fetch(url, {method: "PUT"});
                    let data = await res.json();
                    user.set(data);
                    window.location.href = '/profile';
                } catch (err) {
                    throw new Error(err);
                }
            }
        } else {
            passwordConfirm = false;
        }
    }
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">Profiel</h1>

        <InputField id="name" defaultValue={$user.name} fieldValue={fields.name} type="text" placeholder="Gebruikersnaam" />

        <InputField id="email" defaultValue={$user.email} fieldValue={fields.email} type="text" placeholder="Email" />

        <InputField id="zipcode" defaultValue={$user.zipcode} fieldValue={fields.zipcode} type="text" placeholder="Postcode" />

        <InputField id="password" defaultValue={$user.password} fieldValue={fields.password} type="password" placeholder="Wachtwoord" />

        <InputField id="passwordConfirm" defaultValue={$user.password} fieldValue={fields.passwordConfirm} type="password" placeholder="Bevestig wachtwoord" />

        {#if !areFieldsFilled(fields)}
            <p class="text-sm text-red-500 mb-4">Vul alles in</p>
        {:else if !passwordConfirm}
            <p class="text-sm text-red-500 mb-4">Vul hetzelfde wachtwoord 2x in</p>
        {/if}
       
        <button 
            on:click={() => editAccount()} 
            class="mt-6 w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
            Update Profiel
        </button>
    </div>
</div>