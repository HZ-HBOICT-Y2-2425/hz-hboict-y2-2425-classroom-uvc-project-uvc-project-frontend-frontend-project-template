export const load = async (/** @type {{ fetch: any; }} */ serverLoadEvent) => {
    try {
        const { fetch } = serverLoadEvent;
        const res = await fetch(`http://localhost:3010/items`);
        const items = await res.json();
        return { items };
    } catch (error) {
        return {
            error,
        };
    }
};