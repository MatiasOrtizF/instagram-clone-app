import { createContext, ReactNode, useEffect, useState } from "react";
import { AxiosRequestConfig } from "axios";
import { Post, UserData } from "../types/index";
import { post } from "../service/PostService";
import { save } from "../service/SaveService";

export const PostContext = createContext({
    isSinged: true,
    setIsSinged: (value: boolean)=> {},
    userData: {} as UserData,
    setUserData: (value: UserData)=> {},
    posts: [] as Post[],
    setConfig: (config: AxiosRequestConfig)=> {},
    getAllPosts: ()=> {},
    getAllSave: ()=> {}
});

interface Props {
    children: ReactNode;
}

export function PostProvider({children}: Props) {
    const [loading, setLoading] = useState<boolean>(true);
    const [isSinged, setIsSinged] = useState<boolean>(true);
    const [userData, setUserData] = useState<UserData>({
        id: 0,
        description: '',
        email: '',
        name: '',
        lastName: '',
        password: '',
        userName: '',
        verified: false,
        numberFollowers: 0,
        numberFollowing: 0,
        numberPost: 0,
        imageProfile: '',
        link: ''
    })
    const [posts, setPosts] = useState([]);
    const [config, setConfig] = useState<AxiosRequestConfig>({
        headers: {
            'Authorization': '',
            'Content-Type': 'application/json'
        }
    })

    useEffect(()=> {
        getAllSave();
        getAllPosts();
    }, [])

    const logOut = () => {
        setIsSinged(false);
    }

    const getAllPosts = () => {
        post.getAllPosts(config).then(response=> {
            setPosts(response.data);
        }).catch(error=> {
            if(error.response.status === 401) {
                alert("Your session has expired. Please log in again.");
                logOut();
            }
            console.log(error);
        })
    }

    const getAllSave = () => {
        save.getAllSave(config).then(response=> {
            
        }).catch(error=> {
            console.log(error);
        })
    }

    return(
        <PostContext.Provider value={{
            isSinged,
            setIsSinged,
            userData,
            setUserData,
            posts,
            setConfig,
            getAllPosts,
            getAllSave
        }}>
            {children}
        </PostContext.Provider>
    )
}
