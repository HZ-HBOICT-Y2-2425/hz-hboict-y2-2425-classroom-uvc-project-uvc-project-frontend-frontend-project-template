<script>
    let username = '';
    let password = '';
    let confirmPassword = '';
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
        } else if (!/[A-Z]/.test(password)) {
            errors.password = 'Password must include at least one uppercase letter.';
        } else if (!/[0-9]/.test(password)) {
            errors.password = 'Password must include at least one number.';
        }

        // Confirm password validation
        if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match.';
        }

        return Object.keys(errors).length === 0; // Returns true if no errors

    }

    async function handleSubmit(event) {
    event.preventDefault();

    if (validateForm()) {
        try {
            // Construct the query string with username and password
            const queryParams = new URLSearchParams({
                username: username, // Replace with your actual username variable
                password: password  // Replace with your actual password variable
            });

            // Make a GET or POST request to the backend with query parameters
            const response = await fetch(`http://localhost:3010/users/register?${queryParams.toString()}`, {
                method: 'POST', // Use POST if required by your backend, otherwise GET
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                alert('Registration successful!');
                console.log('Response from server:', data);
                window.location.href = '/';
            } else {
                const error = await response.json();
                console.error('Registration failed:', error);
                alert(`Error: ${error.message || 'Registration failed'}`);
            }
        } catch (error) {
            console.error('Error making the request:', error);
            alert('An error occurred while registering. Please try again.');
        }
    } else {
        console.error('Form errors:', errors);
    }
}
</script>

<div class="flex flex-col min-h-screen">
    <!-- Page Header -->
    <div class="flex items-center justify-center p-5">
        <h1 class="text-black text-center text-3xl font-bold">Register</h1>
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

            <!-- Confirm Password Field -->
            <div class="flex flex-col">
                <label for="confirm-password" class="text-lg font-bold mb-2">Confirm Password</label>
                <input type="password" id="confirm-password" name="confirm-password" bind:value={confirmPassword}
                    placeholder="Confirm your password"
                    class="p-3 rounded-lg border-2 border-dark-green text-dark-green focus:outline-none focus:border-green" />
                {#if errors.confirmPassword}
                    <p class="text-red-600 text-sm mt-2">{errors.confirmPassword}</p>
                {/if}
            </div>

            <!-- Submit Button -->
            <button type="submit"
                class="bg-orange-red w-full p-4 mt-6 rounded-2xl text-white font-bold shadow-md hover:bg-dark-green transition-all duration-300">
                Sign Up
            </button>
        </form>
    </main>
</div>
