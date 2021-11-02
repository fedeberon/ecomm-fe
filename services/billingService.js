import axios from "axios";

export async function getBilling(user, checkoutId) {

    const bill = {
        "id": 1,
        "cardId": "28564066",
        "cuit": user.cuit,
        "billType": "B",
        "ivaConditionType" : "O_POCIENTO",
        "puntoDeVenta" : 1,
        "comments" : "Comentarios ...",
        "checkoutId" : checkoutId
    }

    const fetchUrl = `http://localhost:8888/eComm/billing`;

    try {
        let response = await axios.post(fetchUrl, bill);
        return response;
    } catch (error) {
        throw new Error("Could not create checkout!");
    }
}