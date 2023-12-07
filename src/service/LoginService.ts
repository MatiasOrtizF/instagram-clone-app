import { instance } from "./base";
import { UserLoginData } from "../types";

const endpoint = "login";

export const login = {
    validationCredentials: function(userLoginData: UserLoginData) {
        return instance.post(endpoint, userLoginData);
    }
}