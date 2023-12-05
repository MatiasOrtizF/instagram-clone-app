import { createContext, ReactNode, useEffect, useState } from "react";
import { AxiosRequestConfig } from "axios";
import { Post } from "../types/index";
import { post } from "../service/PostService";
import { save } from "../service/SaveService";

export const PostContext = createContext({
    posts: [] as Post[],
    getAllPosts: ()=> {},
    getAllSave: ()=> {}
});

interface Props {
    children: ReactNode;
}

export function PostProvider({children}: Props) {
    const [loading, setLoading] = useState<boolean>(true);
    const [posts, setPosts] = useState([]);
    const [config, setConfig] = useState<AxiosRequestConfig>({
        headers: {
            'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxNCIsImlhdCI6MTcwMTc0MTg4OSwic3ViIjoiZW56b19mZXJuYW5kZXpAZW1haWwuY29tIiwiaXNzIjoiTWFpbiIsImV4cCI6MTcwMjM0NjY4OX0.XOMuGzNkEUNZJc-GG9SpdfPDDrvDhptzEK_nVZlovD8',
            'Content-Type': 'application/json'
        }
    })

    useEffect(()=> {
        getAllSave();
        getAllPosts();
    }, [])

    const getAllPosts = () => {
        post.getAllPosts(config).then(response=> {
            setPosts(response.data);
        }).catch(error=> {
            if(error.response.status === 401) {
                alert("Your session has expired. Please log in again.");
                //logOut();
            }
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

    const getAllSave = () => {
        save.getAllSave(config).then(response=> {
            
        }).catch(error=> {
            console.log(error);
        })
    }

    return(
        <PostContext.Provider value={{
            posts,
            getAllPosts,
            getAllSave
        }}>
            {children}
        </PostContext.Provider>
    )
}
