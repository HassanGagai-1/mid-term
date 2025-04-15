import axios from "axios";

const Base_API_URL = `http://localhost:4000`;

export const api = axios.create({
    baseURL: Base_API_URL,
})