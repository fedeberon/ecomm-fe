
export async function getPersonByCUIT(CUIT) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/billing/person/` + CUIT;
    const fetchOptions = {
        
        endpoint: fetchUrl,
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    };
    console.log(fetchUrl)


    try {
        const data = await fetch(fetchUrl, fetchOptions)
            .then((response) => response.json())
            .catch(error => console.log(error));
        return data;
    } catch (error) {
        throw new Error("Could not fetch products!");
    }
}