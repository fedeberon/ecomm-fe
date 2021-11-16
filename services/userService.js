import axios from "axios";

export async function save(user) {
    const fetchUrl = `http://localhost:8888/eComm/user`;

    try {
        let response = await axios.post(fetchUrl, user);
        return response;
    } catch (error) {
        throw new Error("Could not create user !");
    }
}


export async function login(credentials) {
    const fetchUrl = `http://localhost:8888/eComm/user/login`;

    try {
        let response = await axios.post(fetchUrl, credentials);
        return response;
    } catch (error) {
        throw new Error("Could not login !");
    }
}

export async function findAll() {
    const fetchUrl = `http://localhost:8888/eComm/user`;

    try {
        let response = await axios.get(fetchUrl);
        return response.data;
    } catch (error) {
        throw new Error("Could not get all users !");
    }
}
