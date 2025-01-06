<script>
    import IndividualProductBtn from "./individualProductBtn.svelte";
    export let products;
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
    {#each products as product}
        <IndividualProductBtn product={product} />
    {/each}
</div>