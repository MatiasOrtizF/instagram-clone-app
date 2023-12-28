import { AxiosRequestConfig } from "axios";
import { instance } from "./base";

const endpoint = "comment";

export const comment = {
    getAllCommentByPost: function(config: AxiosRequestConfig, postId: number) {
        return instance.get(endpoint + "/" + postId, config);
    }
}