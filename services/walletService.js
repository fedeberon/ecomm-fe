import axios from "axios";

export async function getWalletUser(username) {
    const fetchUrl = `${process.env.BACKEND_SERVICE}/user/wallet/${username}`
    const fetchOptions = {
        endpoint: fetchUrl,
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    }
    try {
        const data = await fetch(fetchUrl, fetchOptions)
            .then((response) => response.json())
            .catch(error => console.log(error));
        return data;
    } catch (error) {
        throw new Error("Could not fetch wallet!");
    }
}

export async function getPoints(username) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/user/wallet/points/${username}`

    const fetchOptions = {
        endpoint: fetchUrl,
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    }
    try {
        const data = await fetch(fetchUrl, fetchOptions)
            .then((response) => response.json())
            .catch(error => console.log(error));
        return data;
    } catch (error) {
        throw new Error("Could not fetch point of wallets!");
    }
}

export async function addPoints(points) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/wallet/add`;

    try {
        let response = await axios.post(fetchUrl, points);
        return response;
    } catch (error) {
        throw new Error("Could not add points !");
    }
}

