export const getData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) { throw new Error('Gefaald om URL te laden'); }
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Error bij het laden:', error);
    }
}

export const putData = async (url) => {
    try {
        const response = await fetch(url, { method: 'PUT'});
        if (!response.ok) { throw new Error('Gefaald om URL te laden'); }
    } catch (error) {
        console.error('Error bij het laden:', error);
    }
}

export const getDataUrls = async (urls) => {
    return await Promise.all(
        urls.map(async (url) => {
            return await getData(`http://localhost:3010/${url}`)
        })
    );
}