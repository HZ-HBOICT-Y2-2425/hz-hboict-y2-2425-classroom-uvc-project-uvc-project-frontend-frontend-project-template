<script>
// @ts-nocheck

    import Garden from "$lib/components/Garden.svelte";
    import Challenge from "$lib/components/Challenge.svelte";
    import "../app.css";
</script>

<h1 class="text-2xl p-2 flex items-center justify-center">Garden</h1>
<div class="flex justify-center items-center bg-gray-100" id="garden">
    <Garden />

</div>

<h1 class="text-2xl p-2 mt-2 flex items-center justify-center">Challenges</h1>
<div id="challenge">
    <Challenge />
</div>
