export type UserType = {
    id: string;
    name: string;
    username: string;
    avatar: string;
    biography: string;
    website: string;
    followers: number;
    following: number;
    created_at: string;
    badges: string;
};
  
export type StatusType = {
    id: string;
    author: UserType;
    content: string;
    attachment: string;
    comments: number;
    likes: number;
    views: number;
    liked?: boolean;
    created_at: string;
    updated_at: string;
};