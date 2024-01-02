import { AxiosRequestConfig } from "axios";
import { instance } from "./base";

const endpoint = "history";

export const history = {
    getHistory: function(config: AxiosRequestConfig) {
        return instance.get(endpoint, config);
    },
    postHistory: function(config: AxiosRequestConfig, userId: number) {
        return instance.post(endpoint + "/" + userId, null, config);
    },
    deleteHistory: function(config: AxiosRequestConfig, userId: number) {
        return instance.delete(endpoint + "/" + userId , config);
    }
}