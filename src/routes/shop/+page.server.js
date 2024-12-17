// @ts-nocheck
export const load = async (/** @type {{ fetch: any; }} */ serverLoadEvent) => {
    try {
        const { fetch } = serverLoadEvent;
        const res = await fetch(`http://localhost:3010/items`);

        if (!res.ok) {
            throw new Error(`Failed to fetch items. Status: ${res.status}`);
        }

        const items = await res.json();
        return { items };
    } catch (error) {
        return {
            error: {
                message: error.message,
                name: error.name,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined, // Include stack trace in development
            },
        };
    }
};
