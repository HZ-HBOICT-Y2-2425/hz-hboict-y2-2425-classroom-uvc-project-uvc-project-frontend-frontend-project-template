<script>
    let menuItems = [
        { id: 1, name: "Home", href: "/", icon: "fa-home" },
        { id: 2, name: "Producten", href: "/products", icon: "fa-leaf" },
        { id: 3, name: "Recepten", href: "/dishes", icon: "fa-cutlery" },
        { id: 4, name: "Mandje", href: "/cart", icon: "fa-shopping-basket" },
    ];
</script>

<!-- Bovenste balk (alleen voor mobiel) -->
<div class="sm:hidden fixed top-0 left-0 right-0 flex items-center justify-between" 
    style="background-color: rgb(100, 173, 108); padding: 8px 16px; z-index: 10;">
    <!-- Logo -->
    <div class="flex items-center space-x-2">
        <img src="./src/assets/logo.png" alt="Logo" class="h-6" />
        <span class="text-white text-sm font-semibold">FoodieFuse</span>
    </div>
    <!-- Profiel-icoon -->
    <a href="/profile" class="text-white flex flex-col items-center hover:bg-white hover:text-green-700 px-2 py-1 rounded">
        <i class="fa fa-user text-2xl" aria-hidden="true"></i>
        <span class="text-xs">Profiel</span>
    </a>
</div>

<!-- Navbar -->
<nav class="sm:flex sm:items-center sm:justify-between fixed bottom-0 w-full sm:static text-white flex justify-evenly items-center" 
    style="background-color: rgb(100, 173, 108); padding: 8px 16px;">
    
    <!-- Logo en titel (alleen zichtbaar op desktop) -->
    <div class="hidden sm:flex items-center space-x-2">
        <img src="./src/assets/logo.png" alt="Logo" class="h-6" />
        <span class="text-sm font-semibold">FoodieFuse</span>
    </div>

    <!-- Menu-items (zowel mobiel als desktop) -->
    <div class="flex justify-evenly w-full sm:w-auto text-xs sm:text-sm">
        {#each menuItems as item}
            <a href={item.href} class="flex flex-col items-center text-white text-xs sm:text-sm hover:bg-white hover:text-green-700 px-2 py-1 rounded">
                <i class={`fa ${item.icon} text-2xl`} aria-hidden="true"></i>
                <span class="text-xs sm:text-sm">{item.name}</span>
            </a>
        {/each}
    </div>

    <div class="flex space-x-3">
        <a href = "/login" class="bg-white text-green-700 text-sm px-3 py-1 rounded hover:shadow-sm">
            Inloggen
        </a>
        <a href="/register" class="bg-black text-white text-sm px-3 py-1 rounded hover:shadow-sm">
            Aanmelden
        </a>
    </div>
</nav>
