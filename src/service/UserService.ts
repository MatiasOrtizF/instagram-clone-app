import { AxiosRequestConfig } from "axios";
import { instance } from "./base";

const endpoint = "user";

export const user = {
    searchUserByUserName: function(config: AxiosRequestConfig, word: string) {
        return instance.get(endpoint + "/search?word=" + word, config);
    }
}