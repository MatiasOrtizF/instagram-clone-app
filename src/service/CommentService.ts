import { AxiosRequestConfig } from "axios";
import { instance } from "./base";
import { CommentData } from "../types";

const endpoint = "comment";

export const comment = {
    getAllCommentByPost: function(config: AxiosRequestConfig, postId: number) {
        return instance.get(endpoint + "/" + postId, config);
    },  
    postComment: function(config: AxiosRequestConfig, commentData: CommentData ) {
        return instance.post(endpoint, commentData, config);
    }
}