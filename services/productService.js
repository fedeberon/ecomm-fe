import axios from 'axios';

export async function getProducts(page) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/product?page=${page}&size=12&sortBy=sales`;

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

export async function all() {
    const fetchUrl = `${process.env.BACKEND_SERVICE}/product/all`;

    try {
        let response = await axios.get(fetchUrl);
        return response.data;
    } catch (error) {
        throw new Error("Could not get all users !");
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


export async function update(id, product) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/product/${id}`;
    try {
        let response = await axios.put(fetchUrl, product);
        return response.data;
    } catch (error) {
        throw new Error("Could not update product!");
    }
}

export async function deleteProduct(id) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/product/delete/${id}`;
    try {
        let response = await axios.put(fetchUrl);
        return response;
    } catch (error) {
        throw new Error("Could not delete product!");
    }
}

export async function activateProduct(id) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/product/activate/${id}`;
    try {
        let response = await axios.put(fetchUrl);
        return response;
    } catch (error) {
        throw new Error("Could not delete product!");
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
    debugger
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/checkout`;
    let details = []
    cart.forEach(function(value) {
        let detail = {
            "id": value.id,
            "quantity" : value.quantity,
            "size": value.size
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

export async function createBudget(cart){
    debugger
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/checkout/budget`;
    let details = []
    cart.forEach(function(value) {
        let detail = {
            "id": value.id,
            "quantity" : value.quantity,
            "size": value.size
        }
        details.push(detail);
    });
    let response = "";
    try {
        response = await axios.post(fetchUrl, details);
        return response;
    } catch (error) {
        console.error(response)
        throw new Error("Could not create preference!");
    }
}


export async function buyWithPoints(walletDiscount){
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/wallet/buyWithPoints`;
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
        return response.data;
    } catch (error) {
        throw new Error("Could not search products by brands!");
    }
}

export async function filterProductsByCategories(categories) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/product/search/categories`;
    try {
        const response = await axios.post(fetchUrl, categories);
        return response.data;
    } catch (error) {
        throw new Error("Could not search products by categories!");
    }
}


export async function updateTwinsCard(user) {             
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/user/twins`;       
    try {                                                                                        
        let response = await axios.post(fetchUrl, user);                                         
        return response;                                                                               
    } catch (error) {                                                                                       
        throw new Error("Could not update twings of user !" , user.username , ". Error:" , error);                                     
    }                                                                                               
}

export async function deletedImagen(productId, image) { 
    debugger            
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/product/delete/${productId}/${image}`;       
    try {                                                                                        
        let response = await axios.delete(fetchUrl);                                         
        return response;                                                                               
    } catch (error) {                                                                                       
        throw new Error("Could not delete image !", ". Error:" , error);                                     
    }                                                                                               
}
