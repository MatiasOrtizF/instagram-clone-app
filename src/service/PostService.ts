import { AxiosRequestConfig } from "axios";
import { instance } from "./base";

const endpoint = "post";

export const post = {
    getAllPosts: function(config: AxiosRequestConfig) {
        return instance.get(endpoint, config);
    }
}