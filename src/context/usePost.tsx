import { createContext, ReactNode, useEffect, useState } from "react";
import { AxiosRequestConfig } from "axios";
import { Post } from "../types/index";
import { post } from "../service/PostService";

export const PostContext = createContext({
    posts: [] as Post[],
    getAllPosts: ()=> {},
});

interface Props {
    children: ReactNode;
}

export function PostProvider({children}: Props) {
    const [loading, setLoading] = useState<boolean>(true);
    const [posts, setPosts] = useState<Array<Post>>([]);
    const [config, setConfig] = useState<AxiosRequestConfig>({
        headers: {
            'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxNCIsImlhdCI6MTcwMTY1MjYwMSwic3ViIjoiZW56b19mZXJuYW5kZXpAZW1haWwuY29tIiwiaXNzIjoiTWFpbiIsImV4cCI6MTcwMjI1NzQwMX0.w49szH616PI8N59Vfd16_Qx4rNRXJA1yWn727CEbF1E',
            'Content-Type': 'application/json'
        }
    })

    useEffect(()=> {
        getAllPosts();
    }, [])

    const getAllPosts = () => {
        setLoading(true);
        post.getAllPosts(config).then(response=> {
            setPosts(response.data);
            setLoading(false);
            console.log(response);
        }).catch(error=> {
            console.log(error);
        })
    }

    // const getAllPosts = () => {
    //     console.log("fetch")
    //     fetch("http://192.168.0.4:8081/api/post").then(response=> {
    //         console.log(response.json());
    //     }).then(data=> {
    //         console.log(data);
    //     }).catch(error=> {
    //         console.log(error);
    //     })
    // }

    return(
        <PostContext.Provider value={{
            posts,
            getAllPosts
        }}>
            {children}
        </PostContext.Provider>
    )
}
