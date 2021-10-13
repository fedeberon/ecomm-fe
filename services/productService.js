import axios from 'axios';

export async function getProducts() {
    const fetchUrl = `${process.env.BACKEND_SERVICE}/product`;

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
    const fetchUrl = `${process.env.BACKEND_SERVICE}/product/${id}`;

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