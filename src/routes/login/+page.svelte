<script>
    import { user } from "$lib/store";
    import { loadCart } from "../../stores/cart";  // Zorg ervoor dat we de winkelwagen opnieuw laden

    let passwordIncorrect = false;
    let data;

    // Loginfunctie
    async function login() {
        const name = document.getElementById("name").value;
        const password = document.getElementById("password").value;
        
        if (name && password) {
            const url = `http://localhost:3010/user/login?user=${name}&password=${password}`;
            
            try {
                const res = await fetch(url, { method: "GET" });
                data = await res.json();
                
                // Bewaar de gebruikersdata in de store
                user.set(data);
                
                // Sla de gebruikersinformatie op in localStorage
                localStorage.setItem('userId', data.id);  // Bewaar de gebruikers-ID in localStorage
                
                // Laad de winkelwagen voor de ingelogde gebruiker en update de store onmiddellijk
                loadCart();  // Laad de winkelwagen opnieuw, dit zou de store moeten bijwerken
            } catch (err) {
                passwordIncorrect = true;
            }
        }
    }

    // Uitlogfunctie
    function logout() {
        user.set(null);  // Reset de user store naar null (uitloggen)
        localStorage.removeItem('userId');  // Verwijder de opgeslagen gebruikers-ID uit localStorage
        sessionStorage.removeItem('userId');  // Verwijder de gebruikers-ID uit sessionStorage (indien gebruikt)

        // Leeg de winkelwagen
        localStorage.setItem('cart', JSON.stringify([]));  // Reset de winkelwagen in localStorage
    }
</script>

<div>
    <a href="/">terug</a>

    {#if $user}
        <h1>Hello {$user.name}!</h1>
        <button on:click={logout}>Uitloggen</button> <!-- Uitlogknop -->
    {:else}
        <h1>Inloggen:</h1>
        <input id="name" placeholder="gebruikersnaam of email" />
        <input id="password" placeholder="wachtwoord" type="password" />
        
        {#if passwordIncorrect}
            <p>wachtwoord of gebruikersnaam incorrect</p>
        {/if}

        <button on:click={login}>Inloggen</button> <!-- Login knop -->
    {/if}
</div>
