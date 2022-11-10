import axios from "axios";

export async function findAll() {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/size`;
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
        throw new Error("Could not fetch sizes!");
    }
}

export async function save(size) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/size`;
    try {
        let response = await axios.post(fetchUrl, size);
        console.log(response)
        return response;
    } catch (error) {
        console.log(error);
        throw new Error("Could not create size!");
    }
}