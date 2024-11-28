<script>
        import "../app.css";
    // Definieer menu-items direct in de Navbar component
    let menuItems = [
        { id: 1, name: "Home", href: "/" },
        { id: 2, name: "Recepten", href: "/dishes" },
        { id: 3, name: "Mandje", href: "/cart" },
    ];
</script>

<header>
<nav class="flex items-center justify-between" style="background-color: rgb(100, 173, 108); padding: 8px 16px;">
    <!-- Logo en titel -->
    <div class="flex items-center space-x-2">
        <img src="./src/assets/logo.png" alt="Logo" class="h-6" />
        <span class="text-white text-sm font-semibold">FoodieFuse</span>
    </div>

    <!-- Menu-items -->
    <div class="flex space-x-4">
        {#each menuItems as item}
            <a href={item.href} class="text-white text-sm hover:bg-white hover:text-green-700 px-2 py-1 rounded">
                {item.name}
            </a>
        {/each}
    </div>

    <!-- Actieknoppen -->
    <div class="flex space-x-3">
        <button class="bg-white text-green-700 text-sm px-3 py-1 rounded hover:shadow-sm">
            Sign in
        </button>
        <button class="bg-black text-white text-sm px-3 py-1 rounded hover:shadow-sm">
            Register
        </button>
    </div>
</nav>
</header>

<main>
    <slot></slot>
</main>

<footer>
    <p class="text-center text-sm text-gray-500 py-4">
        &copy; 2024 FoodieFuse. All rights reserved.
    </p>
</footer>

