<script>
    import { goto } from "$app/navigation";

    let menuItems = [
        { name: "Home", href: "/", icon: "fa-home" },
        { name: "Producten", href: "/products", icon: "fa-leaf" },
        { name: "Uw producten", href: "/your-products", icon: "fa-leaf" },
        { name: "Recepten", href: "/dishes", icon: "fa-cutlery" },
        { name: "Mandje", href: "/cart", icon: "fa-shopping-basket" },
    ];
</script>

<div class="flex justify-evenly w-full sm:w-auto text-xs sm:text-sm">
    {#each menuItems as item}
        <button on:click={() => goto(item.href)} class="flex flex-col items-center text-white text-xs sm:text-sm hover:bg-white hover:text-green-700 px-2 py-1 rounded">
            <i class={`fa ${item.icon} text-2xl`} aria-hidden="true"></i>
            <span class="text-xs sm:text-sm">{item.name}</span>
        </button>
    {/each}
</div>