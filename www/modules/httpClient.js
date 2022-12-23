const API_URL = 'https://watermonitoringdb-8aca.restdb.io/';
const API_KEY = '63a35e7ff43a573dae095695';

async function httpGet(uri) {
    try {
        const response = await fetch(`${API_URL}${uri}`, {
            headers: {
                'x-api-key': API_KEY,
            },
        });
        if (response.status !== 200) return null;
        const data = await response.json();
        return data;
    } catch (e) {
        return null;
    }
}

export { httpGet };
