import axios from "axios";

const BASE_URL = "http://192.168.0.4:8080/api"

export const instance = axios.create({
    baseURL: BASE_URL
})