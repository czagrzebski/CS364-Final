import axios from "axios"

const baseURL = "http://localhost:5000/"

const api = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;