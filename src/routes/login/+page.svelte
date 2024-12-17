<script>
    let username = '';
    let password = '';
    let errors = {}; // Object to store error messages

    function validateForm() {
        errors = {};

        // Username validation
        if (!username.trim()) {
            errors.username = 'Username is required.';
        } else if (username.length < 4) {
            errors.username = 'Username must be at least 4 characters long.';
        }

        // Password validation
        if (!password.trim()) {
            errors.password = 'Password is required.';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters long.';
        }

        return Object.keys(errors).length === 0; // Returns true if no errors
    }

    async function handleSubmit(event) {
    event.preventDefault();

    if (validateForm()) {
        try {
            // Construct the query string for username and password
            const queryParams = new URLSearchParams({
                username: username, // Replace with the username variable
                password: password  // Replace with the password variable
            });

            // Make a POST request to the login endpoint with query parameters
            const response = await fetch(`http://localhost:3010/users/login?${queryParams.toString()}`, {
                method: 'POST', // Use POST for authentication
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                alert('Login successful!');
                console.log('Response from server:', data);

                // Redirect to the main page
                window.location.href = '/'; // Replace '/main' with your actual main page route
            } else {
                const error = await response.json();
                console.error('Login failed:', error);
                alert(`Error: ${error.message || 'Login failed'}`);
            }
        } catch (error) {
            console.error('Error making the request:', error);
            alert('An error occurred while logging in. Please try again.');
        }
    } else {
        console.error('Form errors:', errors);
    }
}
</script>

<div class="flex flex-col min-h-screen">
    <!-- Page Header -->
    <div class="flex items-center justify-center p-5">
        <h1 class="text-black text-center text-3xl font-bold">Login</h1>
    </div>

    <!-- Main Content -->
    <main class="bg-beige p-6 mx-4 mt-6 rounded-3xl shadow-lg text-dark-green flex-grow">
        <form on:submit={handleSubmit} class="space-y-4">
            <!-- Username Field -->
            <div class="flex flex-col">
                <label for="username" class="text-lg font-bold mb-2">Username</label>
                <input type="text" id="username" name="username" bind:value={username} placeholder="Enter your username"
                    class="p-3 rounded-lg border-2 border-dark-green text-dark-green focus:outline-none focus:border-green" />
                {#if errors.username}
                    <p class="text-red-600 text-sm mt-2">{errors.username}</p>
                {/if}
            </div>

            <!-- Password Field -->
            <div class="flex flex-col">
                <label for="password" class="text-lg font-bold mb-2">Password</label>
                <input type="password" id="password" name="password" bind:value={password} placeholder="Enter your password"
                    class="p-3 rounded-lg border-2 border-dark-green text-dark-green focus:outline-none focus:border-green" />
                {#if errors.password}
                    <p class="text-red-600 text-sm mt-2">{errors.password}</p>
                {/if}
            </div>

            <!-- Login Button -->
            <button type="submit"
                class="bg-orange-red w-full p-4 mt-6 rounded-2xl text-white font-bold shadow-md hover:bg-dark-green transition-all duration-300">
                Log In
            </button>
        </form>

        <!-- Register Link -->
        <div class="text-center mt-6">
            <p class="text-dark-green">Don't have an account?</p>
            <a href="/register">
                <button
                    class="bg-green w-full p-4 mt-2 rounded-2xl text-white font-bold shadow-md hover:bg-dark-green transition-all duration-300">
                    Register
                </button>
            </a>
        </div>
    </main>
</div>
