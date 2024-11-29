<script>
    let menuItems = [
        { id: 1, name: "Home", href: "/" },
        { id: 2, name: "Recepten", href: "/dishes" },
        { id: 3, name: "Mandje", href: "/cart" },
    ];
</script>

<!-- Navbar -->
<nav class="sm:flex sm:items-center sm:justify-between sm:relative text-white fixed bottom-0 w-full sm:w-auto sm:static" 
    style="background-color: rgb(100, 173, 108); padding: 8px 16px; z-index: 10;">
    <!-- Logo en titel (verborgen op mobiel) -->
    <div class="hidden sm:flex items-center space-x-2">
        <img src="./src/assets/logo.png" alt="Logo" class="h-6" />
        <span class="text-sm font-semibold">FoodieFuse</span>
    </div>

    <!-- Menu-items -->
    <div class="flex justify-evenly sm:space-x-4 w-full sm:w-auto">
        {#each menuItems as item}
            <a href={item.href} class="text-white text-sm hover:bg-white hover:text-green-700 px-2 py-1 rounded">
                {item.name}
            </a>
        {/each}
    </div>

    <!-- Actieknoppen -->
    <div class="hidden sm:flex space-x-3">
        <button class="bg-white text-green-700 text-sm px-3 py-1 rounded hover:shadow-sm">
            Inloggen
        </button>
        <button class="bg-black text-white text-sm px-3 py-1 rounded hover:shadow-sm">
            Aanmelden
        </button>
    </div>
</nav>
