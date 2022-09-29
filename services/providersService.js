import axios from 'axios';

export async function all() {
    const fetchUrl = `${process.env.BACKEND_SERVICE}/provider/all`;

    try {
        let response = await axios.get(fetchUrl);
        return response.data;
    } catch (error) {
        throw new Error("Could not get all provider !");
    }
}

export async function getProvider(id) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/provider/${id}`;

    const fetchOptions = {
        endpoint: fetchUrl,
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    };

    try {
        const data = await fetch(fetchUrl, fetchOptions)
            .then((response) => response.json())
            .catch(error => console.log(error));
        return data;
    } catch (error) {
        throw new Error("Could not fetch provider!");
    }
}

export async function save(provider) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/provider`;
    try {
        let response = await axios.post(fetchUrl, provider);
        return response;
    } catch (error) {
        throw new Error("Could not create provider!");
    }
}