import axios from "axios";


export async function getBilling(user, checkout, type, session, coupon, card) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': session.user.token
    }
    const bill = {
        "cardId": user.cuit,
        "cuit": user.cuit,
        "username": user.username,
        "billType": type,
        "puntoDeVenta" : 1,
        "comments" : "Comentarios ...",
        "checkoutId": checkout.id,
        "coupon": coupon,
        "creditCard": coupon ? card : null
    }
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/billing`;

    try {
        let response = await axios.post(fetchUrl, bill, {
            headers: headers
        });
        return response;
    } catch (error) {
        console.log("error", error.response.data);
        return error.response;
    }
}


export async function getBills() {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/billing`;
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
        throw new Error("Could not fetch bills!");
    }
}

export async function getBillsById(id) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/billing/` + id;
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
        throw new Error("Could not fetch a bill!");
    }
}


export async function findAllByUsername(username) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/billing/user/` + username;
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
        throw new Error("Could not fetch bills by username!");
    }
}

