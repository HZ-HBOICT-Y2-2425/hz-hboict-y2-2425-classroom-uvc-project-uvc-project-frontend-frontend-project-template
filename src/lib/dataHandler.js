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

export async function reserve(product, user) {
    await putData(`http://localhost:3010/products/reserve/${product.id}/${product.userID}/${user.id}`);
    window.location.reload();
}

export async function unreserve(product) {
    await putData(`http://localhost:3010/products/unreserve/${product.id}/${product.userID}`);
    window.location.reload();
}