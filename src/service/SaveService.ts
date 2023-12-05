import { AxiosRequestConfig } from "axios";
import { instance } from "./base";

const endpoint = "save";

export const save = {
    getAllSave: function(config: AxiosRequestConfig) {
        return instance.get(endpoint, config);
    }
}