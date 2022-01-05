import axios from 'axios';

export async function getProducts() {
    const fetchUrl = `https://vps-2124680-x.dattaweb.com:8888/eComm/product`;

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

export async function getProductsByType(type) {
    const fetchUrl = `https://vps-2124680-x.dattaweb.com:8888/eComm/product/byType/${type}`;

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
    const fetchUrl = `https://vps-2124680-x.dattaweb.com:8888/eComm/product/${id}`;

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

export async function save(product) {
    const fetchUrl = `https://vps-2124680-x.dattaweb.com:8888/eComm/product`;
    try {
        let response = await axios.post(fetchUrl, product);
        return response;
    } catch (error) {
        throw new Error("Could not create product!");
    }
}

export async function getPreference(cart) {
    const fetchUrl = `https://vps-2124680-x.dattaweb.com:8888/eComm/payment/checkout`;
    let details = []
    cart.forEach(function(value, index, array) {
        let detail = {
            "id": value.id,
            "quantity" : value.quantity
        }
        details.push(detail);
    });
    try {
        let response = await axios.post(fetchUrl, details);
        return response;
    } catch (error) {
        throw new Error("Could not create preference!");
    }
}

export async function callbackPayment(result) {
    const fetchUrl = `https://vps-2124680-x.dattaweb.com:8888/eComm/payment/MP/callback` ;
    try {
        let response = await axios.post(fetchUrl, result);
        return response.data;
    } catch (error) {
        console.log("error", error);
        throw new Error("Could not create preference!");
    }
}

export async function getCallback(id) {
    const fetchUrl = `https://vps-2124680-x.dattaweb.com:8888/eComm/callback/${id}` ;
    try {
        let response = await axios.get(fetchUrl);
        return response.data;
    } catch (error) {
        console.log("error", error);
        throw new Error("Could not get the callback!");
    }
}


export async function createCheckout(cart){
    const fetchUrl = `https://vps-2124680-x.dattaweb.com:8888/eComm/checkout`;
    let details = []
    cart.forEach(function(value, index, array) {
        let detail = {
            "id": value.id,
            "quantity" : value.quantity
        }
        details.push(detail);
    });
    try {
        let response = await axios.post(fetchUrl, details);
        return response;
    } catch (error) {
        throw new Error("Could not create preference!");
    }
}

export async function search(value) {
    const fetchUrl = `https://vps-2124680-x.dattaweb.com:8888/eComm/product/search/${value}`;
    try {
        const response = await axios.get(fetchUrl);
        return response.data;
    } catch (error) {
        throw new Error("Could not search products!");
    }
}

export async function filterProductsByBrands(brands) {
    console.log("brands", brands);
    debugger
    const fetchUrl = `https://vps-2124680-x.dattaweb.com:8888/eComm/product/search/brands/`;
    try {
        const response = await axios.post(fetchUrl, brands);
        console.log("response", response);
        debugger
        return response.data;
    } catch (error) {
        throw new Error("Could not search products!");
    }
}

