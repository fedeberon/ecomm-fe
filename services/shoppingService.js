import axios from "axios";

export default async function getMyShopping(username) {
    const fetchUrl = `http://localhost:8888/eComm/shopping/mine/${username}`;
    try {
        let response = await axios.get(fetchUrl);
        return response.data;
    } catch (error) {
        console.log("error", error);
        throw new Error("Could not get my shopping!");
    }
}