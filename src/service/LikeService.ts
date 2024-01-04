import { AxiosRequestConfig } from "axios";
import { instance } from "./base";

const endpoint = "like";

export const like = {
    likedPost: function(config: AxiosRequestConfig, postId: number) {
        return instance.get(endpoint + "/" + postId, config);
    },
    getAllLikes: function(config: AxiosRequestConfig) {
        return instance.get(endpoint, config);
    } 
}