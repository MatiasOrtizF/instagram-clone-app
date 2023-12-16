export interface User {
    id: number,
    name: string,
    lastName: string,
    email: string,
    password: string,
    userName: string,
    verified: boolean,
    imageProfile: string,
    description: string,
    link: string,
    numberPost: number,
    numberFollowers: number,
    numberFollowing: number
}

export interface UserLoginData {
    userName: string,
    password: string
}

export interface UserData {
    id: number,
    description: string,
    email: string,
    name: string,
    lastName: string,
    password: string,
    userName: string,
    link: string,
    verified: boolean,
    numberFollowers: number,
    numberFollowing: number,
    numberPost: number,
    imageProfile: string
}

export interface Post {
    id: number,
    user: User,
    content: string,
    createdAt: Date,
    likes: number,
    image: string,
    liked: boolean,
    saved: boolean
}

export interface Message {
    name: string,
    content: string
}

export interface ChatMessage {
    message: string,
    user: string
}