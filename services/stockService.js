import axios from "axios";

export async function findAll() {
    const fetchUrl = `http://localhost:8888/eComm/stock`;

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
        throw new Error("Could not fetch stock!");
    }
}

export async function save(stock){
    debugger
    const fetchUrl = `http://localhost:8888/eComm/stock/list`;
    try {
        let response = await axios.post(fetchUrl, stock);
        return response;
    } catch (error) {
        throw new Error("Could not create stock!");
    }
}