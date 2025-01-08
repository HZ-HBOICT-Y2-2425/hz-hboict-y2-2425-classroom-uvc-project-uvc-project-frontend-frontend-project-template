// @ts-ignore
export default async function fetchChallenges(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch challenges');
        }
        const allChallenges = await response.json();
        let challenges = allChallenges.slice(0, 3);
    } catch (error) {
        console.error(error);
    }
}