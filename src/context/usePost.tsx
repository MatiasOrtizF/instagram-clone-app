import { createContext, ReactNode, useEffect, useState } from "react";
import { AxiosRequestConfig } from "axios";
import { Comment, CommentData, Post, UserData, UserDataSearch } from "../types/index";
import { post } from "../service/PostService";
import { save } from "../service/SaveService";
import { like } from "../service/LikeService";
import { history } from "../service/HistoryService";
import { comment } from "../service/CommentService";
import { user } from "../service/UserService";

export const PostContext = createContext({
    loading: true,
    isSinged: false, //chage to false
    setIsSinged: (value: boolean)=> {},
    userData: {} as UserData,
    setUserData: (value: UserData)=> {},
    allMyPosts: [] as Post[],
    AllPostsByUserName: [] as Post[],
    posts: [] as Post[],
    config: {} as AxiosRequestConfig,
    historyUserSearch: [] as UserDataSearch[],
    usersSearch: [] as UserDataSearch[],
    comments: [] as Comment[],
    userNameProfile: "",
    setUserNameProfile: (value: string)=> {},
    setConfig: (config: AxiosRequestConfig)=> {},
    logOut: ()=> {},
    getAllPosts: ()=> {},
    getAllMyPosts: ()=> {},
    getAllPostsByUserName: (userName: string)=> {},
    getAllSave: ()=> {},
    getAllHistorySearch: ()=> {},
    addHistorySearch: (userId: number) => {},
    deleteHistorySearch: (userId: number)=> {},
    getAllComments: (postId: any)=> {},
    postComment: (commentData: CommentData, postId: any)=> {},
    searchUser: (word: string)=> {}
});

interface Props {
    children: ReactNode;
}

export function PostProvider({children}: Props) {
    const [loading, setLoading] = useState<boolean>(true);
    const [isSinged, setIsSinged] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserData>({
        id: 0, //change this
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
        link: '',
    })
    const [allMyPosts, setAllMyPosts] = useState([]);
    const [AllPostsByUserName, setAllPostsByUserName] = useState([]);
    const [posts, setPosts] = useState([]);
    const [config, setConfig] = useState<AxiosRequestConfig>({
        headers: {
            'Authorization': '',
            'Content-Type': 'application/json'
        }
    })
    // History
    const [historyUserSearch, setHistoryUserSearch] = useState<UserDataSearch[]>([]);
    const [usersSearch, setUsersSearch] = useState<UserDataSearch[]>([]);
    // Comment
    const [comments, setComments] = useState([]);
    const [userNameProfile, setUserNameProfile] = useState<string>("");

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
            // const postData = response.data.map((item: any) => item.id)
            // const booleanLiked = likedPost(postData)
            // console.log(postData);
        }).catch(error=> {
            if(error.response.status === 401) {
                alert("Your session has expired. Please log in again.");
                logOut();
            }
            console.log(error);
        })
    }

    const getAllMyPosts = () => {
        post.getAllPostByUsername(config, userData.userName).then(response=> {
            setAllMyPosts(response.data);
            console.log(response.data);
        }).catch(error=> {
            if(error.response.status === 401) {
                alert("Your session has expired. Please log in again.");
                logOut();
            } else if(error.response.status === 404) {
                alert(error.response.data); //User doest not exist
            } console.log(error);
        })
    }

    const getAllPostsByUserName = (userName: string) => {
        setLoading(true);
        post.getAllPostByUsername(config, userName).then(response=> {
            setAllPostsByUserName(response.data);
            setLoading(false);
        }).catch(error=> {
            if(error.response.status === 401) {
                alert("Your session has expired. Please log in again.");
                logOut();
            } else if (error.response.status === 404) {
                alert(error.response.data); //User doest not exist
            } console.log(error);
        })
    }

    const getAllSave = () => {
        save.getAllSave(config).then(response=> {
            
        }).catch(error=> {
            console.log(error);
        })
    }

    //likes
    const likedPost = (postId: number) => {
        like.likedPost(config, postId).then(response=> {
            console.log(response.data);
        }).catch(error=> {
            console.log(error);
        })
    }

    //history
    const getAllHistorySearch = () => {
        history.getHistory(config).then(response=> {
            const usersData = response.data.map((item: any)=> item.searchedUser)
            setHistoryUserSearch(usersData);
        }).catch(error=> {
            console.log(error);
        })
    }

    const addHistorySearch = (userId: number) => {
        history.postHistory(config, userId).then(response=> {
            console.log(response.data);
        }).catch(error=> {
            if(error.response.status === 400) {
                alert(error.response.data);
            } 
            console.log(error);
        })
    }

    const deleteHistorySearch = (userId: number) => {
        history.deleteHistory(config, userId).then(response=> {
            getAllHistorySearch();
        }).catch(error=> {
            console.log(error);
        })
    }

    //comments
    const getAllComments = (postId: any) => {
        comment.getAllCommentByPost(config, postId).then(response=> {
            setComments(response.data);
        }).catch(error=> {
            console.log(error);
        })
    }

    const postComment = (commentData: CommentData, postId: any) => {
        comment.postComment(config, commentData).then(response=> {
            getAllComments(postId);
        }).catch(error=> {
            console.log(error);
        })
    }

    //user
    const searchUser = (word: string) => {
        user.searchUserByUserName(config, word).then(response=> {
            setUsersSearch(response.data);
            console.log(usersSearch)
        }).catch(error=> {
            console.log(error);
        })
    }

    return(
        <PostContext.Provider value={{
            loading,
            isSinged,
            setIsSinged,
            userData,
            setUserData,
            allMyPosts,
            AllPostsByUserName,
            posts,
            config,
            historyUserSearch,
            usersSearch,
            comments,
            userNameProfile,
            setUserNameProfile,
            setConfig,
            logOut,
            getAllPosts,
            getAllMyPosts,
            getAllPostsByUserName,
            getAllSave,
            getAllHistorySearch,
            addHistorySearch,
            deleteHistorySearch,
            getAllComments,
            postComment,
            searchUser
        }}>
            {children}
        </PostContext.Provider>
    )
}
