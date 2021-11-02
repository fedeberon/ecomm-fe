import axios from 'axios';

export async function getProducts() {
    const fetchUrl = `http://localhost:8888/eComm/product`;

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
        throw new Error("Could not fetch products!");
    }
}

export async function getProduct(id) {
    const fetchUrl = `http://localhost:8888/eComm/product/${id}`;

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
        throw new Error("Could not fetch product!");
    }
}

export async function createCheckout(id, quantity) {
    const fetchUrl = `http://localhost:8888/eComm/checkout`;
    let checkout = {
        productId: id,
        quantity: quantity
    };

    try {
        let response = await axios.post(fetchUrl, checkout);
        return response;
    } catch (error) {
        throw new Error("Could not create checkout!");
    }
}

export async function save(product) {
    const fetchUrl = `http://localhost:8888/eComm/product`;
    try {
        let response = await axios.post(fetchUrl, product);
        return response;
    } catch (error) {
        throw new Error("Could not create product!");
    }
}

export async function getPreference(checkoutId) {
    const fetchUrl = `http://localhost:8888/eComm/payment/checkout?checkoutId=${checkoutId}` ;
    try {
        let response = await axios.get(fetchUrl);
        return response;
    } catch (error) {
        throw new Error("Could not create preference!");
    }
}

export async function callbackPayment(result) {
    const fetchUrl = `http://localhost:8888/eComm/payment/callback` ;
    try {
        let response = await axios.post(fetchUrl, result);
        return response.data;
    } catch (error) {
        console.log("error", error);
        throw new Error("Could not create preference!");
    }
}

export async function getCallback(id) {
    const fetchUrl = `http://localhost:8888/eComm/callback/${id}` ;
    try {
        let response = await axios.get(fetchUrl);
        return response.data;
    } catch (error) {
        console.log("error", error);
        throw new Error("Could not get the callback!");
    }
}