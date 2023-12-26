import { AxiosRequestConfig } from "axios";
import { instance } from "./base";

const endpoint = "history";

export const history = {
    getHistory: function(config: AxiosRequestConfig) {
        return instance.get(endpoint, config);
    }
}