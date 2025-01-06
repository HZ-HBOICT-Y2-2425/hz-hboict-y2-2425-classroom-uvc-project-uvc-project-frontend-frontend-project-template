export const getData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) { throw new Error('Gefaald om URL te laden'); }
        return await response.json();
    } catch (error) {
        console.error('Error bij het laden van producten:', err);
        error = 'Producten konden niet worden geladen. Probeer het later opnieuw.';
    }
}

export const getDataUrls = async (urls) => {
    return await Promise.all(
        urls.map(async (url) => {
            return await getData(`http://localhost:3010/${url}`)
        })
    );
}