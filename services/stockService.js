import axios from "axios";

export async function findAll() {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/stock`;

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
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/stock/list`;

    console.log(stock)

    try {
        let response = await axios.post(fetchUrl, stock);
        return response;
    } catch (error) {
        throw new Error("Could not create stock. " + error);
    }
}


export async function findAllById(id) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/stock/${id}`;

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
        throw new Error("Could not get stock!");
    }
}