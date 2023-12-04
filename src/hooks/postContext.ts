import { useContext } from "react";
import { PostContext } from "../context/usePost";

export const usePost = () => {
    const context = useContext(PostContext)

    return context
}