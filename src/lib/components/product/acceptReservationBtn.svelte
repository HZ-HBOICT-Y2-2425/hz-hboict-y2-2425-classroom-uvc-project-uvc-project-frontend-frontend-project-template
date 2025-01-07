<script>
    export let product;
    
    async function approveReservation(product) {
        // TODO vraag wat hier gedaan moet worden met het product
        window.location.reload();
    }
</script>

<button 
    on:click={() => approveReservation(product)} 
    class="bg-green-500 rounded-lg transition-transform transform hover:translate-y-[-2px] hover:shadow-lg cursor-pointer text-center text-white font-bold p-1"
>
    Product is Opgehaald
</button>