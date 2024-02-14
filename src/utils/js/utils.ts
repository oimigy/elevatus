const cache = new Map();
export const paginationLimit = 12;
export const getJobs = async (query = "", page = 1, limit = paginationLimit) => {
    const url = `https://devapi-indexer.elevatustesting.xyz/api/v1/jobs?page=${page - 1}&limit=${limit}&language_profile_uuid=ee5d991c-cdc6՞4e83-b0b3-96f147208549&itemQuery=${query}`;
    if (cache.has(url)) return cache.get(url);

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'accept-account': '961c06eb-7e25-406c-87d5-d0742e09d96c',
            'accept-company': '900a776e-a060-422e-a5e3-979ef669f16b',
        }
    });
    const data = await response.json();
    cache.set(url, data);
    return data;
}

export const dateTimeFormatter = (date: string) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const cardinals = ["st", "nd", "rd", "th"];
    const d = new Date(date);
    return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}${cardinals[d.getDate() - 1] || cardinals[3]}, ${d.getFullYear()}`;
}