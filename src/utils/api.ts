export async function getGender(word: string): Promise<string | null> {
    try {
        const response = await fetch(`https://www.qmez.de:8444/v1/scanner/es/s?w=${word}`);
        const data = await response.json();

        return data.gender || null;
    } catch (error) {
        console.error(`Error fetching gender: `, error);
        return null;
    }
}