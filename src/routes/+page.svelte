<script>
    import Garden from "$lib/components/Garden.svelte";
    import Challenge from "$lib/components/Challenge.svelte";
    import "../app.css";
</script>

<h1>Green Quest</h1>

<div class="flex justify-center items-center bg-gray-100 my-10" id="garden">
    <Garden />
</div>

<div id="challenge">
    <Challenge />
</div>
