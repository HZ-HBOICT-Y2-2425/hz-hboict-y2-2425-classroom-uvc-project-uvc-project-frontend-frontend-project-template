<script>
    import { putData } from "$lib/dataHandler";
    import IndividualProductBtn from "./individualProductBtn.svelte";
    export let products;

    async function approveReservation() {
        // TODO vraag wat hier gedaan moet worden met het product
        window.location.reload();
    }

    async function removeReservation(product) {
        await putData(`http://localhost:3010/products/unreserve/${product.id}/${product.userID}`);
        window.location.reload();
    }
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
    {#each products as product}
        <div class="grid border border-black rounded-lg gap-4 p-1">
            <IndividualProductBtn product={product} />
            <div class="grid grid-cols-2 gap-4">
                <button 
                    on:click={() => approveReservation()} 
                    class="bg-green-500 rounded-lg transition-transform transform hover:translate-y-[-5px] hover:shadow-lg cursor-pointer text-center text-white font-bold p-1"
                >
                    Product is Opgehaald
                </button>
                <button 
                    on:click={() => removeReservation(product)} 
                    class="bg-red-500 rounded-lg transition-transform transform hover:translate-y-[-2px] hover:shadow-lg cursor-pointer text-center text-white font-bold p-1"
                >
                    Reservatie Verwijderen
                </button>
            </div>
        </div>
    {/each}
</div>