import axios from 'axios';

export async function getProducts(page) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/product?page=${page}`;

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
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/product/byType/${type}`;

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
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/product/${id}`;

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
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/product`;
    try {
        let response = await axios.post(fetchUrl, product);
        return response;
    } catch (error) {
        throw new Error("Could not create product!");
    }
}


export async function update(product) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/product`;
    try {
        let response = await axios.put(fetchUrl, product);
        return response;
    } catch (error) {
        throw new Error("Could not create product!");
    }
}

export async function updateAsAPromotion(product) { 
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/product/promotion`;
    try {
        let response = await axios.post(fetchUrl, product);
        return response;
    } catch (error) {
        throw new Error("Could not save  promotion of a product!");
    }
}

export async function getPreference(cart) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/payment/checkout`;
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
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/payment/MP/callback` ;
    try {
        let response = await axios.post(fetchUrl, result);
        return response.data;
    } catch (error) {
        console.log("error", error);
        throw new Error("Could not create preference!");
    }
}

export async function getCallback(id) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/callback/${id}` ;
    try {
        let response = await axios.get(fetchUrl);
        return response.data;
    } catch (error) {
        console.log("error", error);
        throw new Error("Could not get the callback!");
    }
}


export async function createCheckout(cart){
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/checkout`;
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


export async function buyWithPoints(walletDiscount){
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/wallet`;
    try {
        let response = await axios.post(fetchUrl, walletDiscount);
        return response;
    } catch (error) {
        throw new Error("Could not process purchased with points!");
    }
}

export async function search(value) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/product/search/${value}`;
    try {
        const response = await axios.get(fetchUrl);
        return response.data;
    } catch (error) {
        throw new Error("Could not search products!");
    }
}

export async function filterProductsByBrands(brands) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/product/search/brands`;
    try {
        const response = await axios.post(fetchUrl, brands);
        debugger
        return response.data;
    } catch (error) {
        throw new Error("Could not search products by brands!");
    }
}

export async function filterProductsByCategories(categories) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/product/search/categories`;
    try {
        const response = await axios.post(fetchUrl, categories);
        debugger
        return response.data;
    } catch (error) {
        throw new Error("Could not search products by categories!");
    }
}


export async function updateTwinsCard(user) {             
    debugger                             
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/Mellizos`;       
    try {                                                                                        
        let response = await axios.post(fetchUrl, user);                                         
        return response;                                                                               
    } catch (error) {                                                                                       
        throw new Error("Could not update twings of user !" , user.username , ". Error:" , error);                                     
    }                                                                                               
}
