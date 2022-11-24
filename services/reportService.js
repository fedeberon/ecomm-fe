import axios from 'axios';

export async function findAll() {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/billing`;

    try {
        let response = await axios.get(fetchUrl);
        return response.data;
    } catch (error) {
        throw new Error("Could not get all reports !");
    }
}


export async function search(date) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/billing/search`;

    try {
        let response = await axios.post(fetchUrl ,date);
        return response.data;
    } catch (error) {
        throw new Error("Could not get report !");
    }
}