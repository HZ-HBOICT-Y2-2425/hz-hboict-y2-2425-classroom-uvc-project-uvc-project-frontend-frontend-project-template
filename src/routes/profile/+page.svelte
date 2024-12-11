<script>
    function goBack() {
        window.history.back();
    }
</script>

<div class="h-screen bg-light-beige flex flex-col justify-between p-5">
    <div class="flex items-center justify-center relative">
        <a href="/" class="absolute left-4">
            <img
                on:click={goBack}
                src="back.png"
                alt="Back"
                class="h-8 w-8 bg-orange-red rounded-full"
            />
        </a>
        <h1 class="text-center text-2xl font-bold">PROFILE</h1>
    </div>

    <section class="flex items-center justify-center relative p-2">
        <img src="/profile_icon.png" alt="profile" class="w-64 h-fit" />
    </section>

    <section class="flex flex-row ml-2">
        <h2 class="text-xl font-bold">Username:</h2>
        <h3 class="text-xl ml-2">Name</h3>
    </section>

    <section class="flex flex-row ml-2">
        <h2 class="text-xl font-bold">Challenges completed:</h2>
        <h3 class="text-xl ml-2">20</h3>
    </section>

    <section class="flex items-center justify-center relative p-2">
        <button id="allChallenges">
            <h2 class="bg-green rounded-full w-40 p-2">See challenges</h2>
        </button>
    </section>

    <section class="ml-2 p-2">
        <h2 class="font-bold">Your characteristics:</h2>
        <ol class="ml-6">
            <li class="list-disc">Smoker</li>
            <li class="list-disc">Meat lover</li>
            <li class="list-disc">Takes long challenges</li>
        </ol>
        <div class="flex items-center justify-center relative p-2 mt-2">
            <button id="characteristics">
                <h2 class="bg-green rounded-full w-50 p-2">Change characteristics</h2>
            </button>
        </div>
    </section>

    <section class="flex flex-row">
        <div class="flex items-center justify-center relative p-2">
            <button id="addFriends">
                <h2 class="bg-green rounded-full w-50 p-2">Add friends</h2>
            </button>
        </div>
        <div class="flex items-center justify-center relative p-2">
            <button id="friendsList">
                <h2 class="bg-green rounded-full w-50 p-2">See friends list</h2>
            </button>
        </div>
    </section>
</div>
