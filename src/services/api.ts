import axios from "axios";

const API = axios.create({
    baseURL: "http://10.230.27.76:9000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default API;