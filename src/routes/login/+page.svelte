<script>
// @ts-nocheck

    import { goto } from "$app/navigation";

    let username = "";
    let password = "";
    let errors = {};

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const queryParams = new URLSearchParams({
                username: username, // Inputted username
                password: password, // Inputted password
            });

            

            const response = await fetch(
                `http://localhost:3010/users/login?${queryParams.toString()}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                },
            );

            if (response.ok) {
                const data = await response.json();
                sessionStorage.setItem("userId", data.userId);
                console.log(sessionStorage.getItem('userId'));
                alert("Login successful!");
                goto("/"); // Redirect to main page
            } else {
                const error = await response.json();
                errors.general =
                    error.message || "Login failed. Please try again.";
            }
        } catch (error) {
            console.error("Error during login:", error);
            errors.general = "An error occurred. Please try again.";
        }
    }
</script>

<!-- HTML Form for Login -->
<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 class="text-2xl font-bold text-center mb-4">Login</h1>
        <form on:submit={handleSubmit} class="space-y-4">
            <!-- Username Field -->
            <div class="flex flex-col">
                <label for="username" class="font-bold">Username:</label>
                <input
                    id="username"
                    type="text"
                    bind:value={username}
                    placeholder="Enter your username"
                    class="p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>

            <!-- Password Field -->
            <div class="flex flex-col">
                <label for="password" class="font-bold">Password:</label>
                <input
                    id="password"
                    type="password"
                    bind:value={password}
                    placeholder="Enter your password"
                    class="p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>

            <!-- Error Message -->
            {#if errors.general}
                <p class="text-red-600 text-sm text-center">{errors.general}</p>
            {/if}

            <!-- Submit Button -->
            <button
                type="submit"
                class="w-full bg-blue-500 text-white p-2 rounded font-bold hover:bg-blue-700 transition-all"
            >
                Log In
            </button>
        </form>
    </div>
</div>
