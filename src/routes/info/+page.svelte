<script>
    // Manage state for accordion sections
    let sections = [
        {
            title: "What is Green Quest?",
            content: "Green Quest is a fun and interactive app designed to help you reduce your carbon footprint. By completing small, daily challenges, you can make a real impact on the environment while earning coins to personalize your very own virtual garden.",
            isOpen: false,
        },
        {
            title: "How It Works?",
            content: `
                <ol class="list-decimal list-inside">
                    <li><strong>Create Your Profile:</strong> Sign up and set your sustainability goals.</li>
                    <li><strong>Receive Daily Challenges:</strong> Each day, you'll get challenges like saving water, using public transport, or reducing energy use.</li>
                    <li><strong>Complete Challenges:</strong> Earn coins for every challenge you complete. Watch your impact grow as you reduce your CO2 emissions!</li>
                    <li><strong>Upgrade Your Virtual Garden:</strong> Use your coins to upgrade and decorate your virtual garden, showing off your sustainability journey.</li>
                </ol>
            `,
            isOpen: false,
        },
        {
            title: "FAQ Section",
            content: `
                <dl class="space-y-4">
                    <dt class="font-bold text-lg">Q: How do I earn coins?</dt>
                    <dd class="ml-4 text-base leading-relaxed">A: You can earn coins by completing daily challenges. Each completed challenge rewards you with coins that you can use to upgrade your virtual garden.</dd>

                    <dt class="font-bold text-lg">Q: How do I add friends?</dt>
                    <dd class="ml-4 text-base leading-relaxed">A: Go to the Friends tab, enter your friend's username, and send them a request. Once they accept, you can compare scores and track their progress.</dd>

                    <dt class="font-bold text-lg">Q: What is a virtual garden?</dt>
                    <dd class="ml-4 text-base leading-relaxed">A: The virtual garden is your personal space in Green Quest. You can use the coins you earn from challenges to customize and upgrade your garden, representing your journey towards a sustainable lifestyle.</dd>
                </dl>
            `,
            isOpen: false,
        }
    ];

    function toggleSection(index) {
        sections[index].isOpen = !sections[index].isOpen;
    }
</script>

<h1 class="text-3xl text-center mt-4 text-dark-green">Info Page</h1>
<img src="/assets/images/info.png" class="w-full max-w-md mx-auto mt-4" alt="Information page illustration">




<!-- Accordion Container -->
<section class="bg-green p-6 mx-4 mt-6 rounded-3xl">
    {#each sections as section, index}
        <div 
            class="bg-beige p-4 mb-6 border-4 border-orange-red rounded-2xl cursor-pointer flex justify-between items-center shadow-md"
            on:click={() => toggleSection(index)}>
            <span class="text-xl font-bold">{section.title}</span>
            <span class="text-xl">{section.isOpen ? '▲' : '▼'}</span>
        </div>
        {#if section.isOpen}
            <div class="bg-beige p-6 mb-6 rounded-lg shadow-md text-base leading-relaxed text-black border-4 border-orange-red">
                {@html section.content}
            </div>
        {/if}
    {/each}
</section>
