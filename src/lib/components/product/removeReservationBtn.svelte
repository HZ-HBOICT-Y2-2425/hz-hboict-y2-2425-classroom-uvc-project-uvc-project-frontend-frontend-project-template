<script>
    export let product;
    
    async function removeReservation(product) {
        await putData(`http://localhost:3010/products/unreserve/${product.id}/${product.userID}`);
        window.location.reload();
    }
</script>

<button 
    on:click={() => removeReservation(product)} 
    class="bg-red-500 rounded-lg transition-transform transform hover:translate-y-[-2px] hover:shadow-lg cursor-pointer text-center text-white font-bold p-1"
>
    Reservatie Verwijderen
</button>