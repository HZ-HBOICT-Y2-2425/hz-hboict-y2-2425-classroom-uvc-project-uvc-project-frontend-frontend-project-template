<script>
    import "../app.css";
</script>

<div class="flex flex-col justify-between">
    <header class="bg-green flex justify-between p-3 w-full h-full">
        <div class="flex flex-row">
            <img src="/coins.png" alt="coins" class="w-12 h-fit" />
            <h2 class="text-2xl mt-1">2</h2>
        </div>
        <h2 class="text-3xl mt-2">CO2: 55</h2>
        <button id="profile">
            <img src="/profile_icon.png" alt="profile" class="w-12 h-fit" />
        </button>
    </header>

    <main>
        <slot />
    </main>

    <footer class="bg-green flex justify-between p-3 w-full h-full mt-5">
        <button id="shop">
            <a href="/shop">
            <img src="/shop.png" alt="shop" class="w-12 h-fit" />
        </a>
        </button>
        <button id="leaderboard">
            <h2 class="text-3xl p-2 bg-orange-red rounded-3xl">Leaderboard</h2>
        </button>
         <a id="info" href="/info">
        <img src="/info.png" alt="information" class="w-10 h-fit mt-1 bg-orange-red rounded-3xl" />
    </a>
    </footer>
</div>
