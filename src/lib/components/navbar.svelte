<script>
    let menuItems = [
        { id: 1, name: "Home", href: "/" },
        { id: 2, name: "Recepten", href: "/dishes" },
        { id: 3, name: "Mandje", href: "/cart" },
    ];
</script>

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

    <div class="flex space-x-3">
        <button class="bg-white text-green-700 text-sm px-3 py-1 rounded hover:shadow-sm">
            Inloggen
        </button>
        <button class="bg-black text-white text-sm px-3 py-1 rounded hover:shadow-sm">
            Aanmelden
        </button>
    </div>
</nav>
