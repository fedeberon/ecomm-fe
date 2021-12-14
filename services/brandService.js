import axios from "axios";

export async function findAll() {
    const fetchUrl = `http://localhost:8888/eComm/brand`;
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
        throw new Error("Could not fetch brands!");
    }
}


export async function save(brand) {
    const fetchUrl = `http://localhost:8888/eComm/brand`;
    try {
        let response = await axios.post(fetchUrl, brand);
        return response;
    } catch (error) {
        console.log(error);
        throw new Error("Could not create brand!");
    }
}