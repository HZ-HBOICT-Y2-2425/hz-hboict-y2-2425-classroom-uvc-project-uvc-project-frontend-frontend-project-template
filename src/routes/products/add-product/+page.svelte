<script>
    import { goto } from '$app/navigation';

    let title = '';
    let consumables = '';
    let allergies = '';
    let price = '';
    let amount = '';
    let unit = '';
    // let co2Contribution = '';
    let description = '';
    let expirationDate = '';

    const userID = 1; // Dummy userID
    let showPopup = false;

    async function addProduct() {
        if (!title || !price || !amount || !unit || !description || !expirationDate) {
            alert('Alle velden zijn verplicht!');
            return;
        }

        try {
            // Bouw de query-parameters
            const params = new URLSearchParams({
                userID: userID.toString(),
                title,
                consumables,
                allergies,
                price: price.toString(),
                amount: amount.toString(),
                unit,
                description,
                // co2Contribution: co2Contribution.toString(),
                expirationDate,
            });

            const url = `http://localhost:3013/create?${params.toString()}`;

            // Stuur een POST-request naar de backend
            const res = await fetch(url, { method: 'POST' });

            if (res.ok) {
                showPopup = true; // Toon pop-up melding
                setTimeout(() => {
                    goto('/products'); // Navigeer terug naar de productenpagina
                }, 2000);
            } else {
                alert('Fout bij het toevoegen van het product.');
            }
        } catch (error) {
            console.error('Er is een fout opgetreden:', error);
        }
    }
</script>

<div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Nieuw product toevoegen</h1>
    <form on:submit|preventDefault={addProduct} class="space-y-4">
        <div>
            <label class="block mb-1 font-medium">Titel:</label>
            <input bind:value={title} class="border p-2 w-full" type="text" placeholder="Titel" required />
        </div>
        <div>
            <label class="block mb-1 font-medium">Consumables (IDs, komma-gescheiden):</label>
            <input bind:value={consumables} class="border p-2 w-full" type="text" placeholder="Bijv. 4,5,6" />
        </div>
        <div>
            <label class="block mb-1 font-medium">Allergieën (komma-gescheiden):</label>
            <input bind:value={allergies} class="border p-2 w-full" type="text" placeholder="Bijv. gluten,noten" />
        </div>
        <div>
            <label class="block mb-1 font-medium">Prijs (€):</label>
            <input bind:value={price} class="border p-2 w-full" type="number" step="0.01" placeholder="Prijs" required />
        </div>
        <div>
            <label class="block mb-1 font-medium">Hoeveelheid:</label>
            <input bind:value={amount} class="border p-2 w-full" type="number" placeholder="Hoeveelheid" required />
        </div>
        <div>
            <label class="block mb-1 font-medium">Eenheid (bijv. kg, stuks):</label>
            <input bind:value={unit} class="border p-2 w-full" type="text" placeholder="Eenheid" required />
        </div>
        <!-- <div>
            <label class="block mb-1 font-medium">CO2-bijdrage (kg):</label>
            <input bind:value={co2Contribution} class="border p-2 w-full" type="number" step="0.001" placeholder="CO2-bijdrage" required />
        </div> -->
        <div>
            <label class="block mb-1 font-medium">Beschrijving:</label>
            <textarea bind:value={description} class="border p-2 w-full" placeholder="Beschrijving" required></textarea>
        </div>
        <div>
            <label class="block mb-1 font-medium">Vervaldatum:</label>
            <input bind:value={expirationDate} class="border p-2 w-full" type="date" required />
        </div>
        <button class="bg-blue-500 text-white p-2 rounded mt-4">Toevoegen</button>
    </form>

    {#if showPopup}
    <div class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-4 rounded shadow-md text-center">
            <p class="text-lg font-semibold">Product toegevoegd!</p>
        </div>
    </div>
    {/if}
</div>

<style>
.container {
    max-width: 600px;
}
.fixed {
    position: fixed;
}
</style>
