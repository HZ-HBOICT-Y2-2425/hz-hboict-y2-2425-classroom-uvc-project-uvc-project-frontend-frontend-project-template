// @ts-ignore
export const load = async ({ fetch }) => {
    try {
        const response = await fetch('http://localhost:3010/challenges');

        // Check if the response is okay
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
        }

        const items = await response.json();
        return { items: Array.isArray(items) ? items : [] }; // Ensure items is always an array
    } catch (error) {
        console.error('Failed to fetch challenges:', error);

        // Return an empty array and an error message
        return error;
    }
};