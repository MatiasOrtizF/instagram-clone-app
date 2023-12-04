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

export interface Post {
    id: number,
    user: User,
    content: string,
    createdAt: Date,
    likes: number,
    image: string
}