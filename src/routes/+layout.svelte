<script>
    import "../app.css";
    import Navbar from "$lib/components/navbar.svelte";
</script>

<header>
    <Navbar />
</header>

<main>
    <slot></slot>
</main>

<footer>
    <p class="text-center text-sm text-gray-500 py-4">
        &copy; 2024 FoodieFuse. All rights reserved.
    </p>
</footer>
