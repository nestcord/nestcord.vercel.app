export type UserType = {
    id: string;
    name: string;
    username: string;
    avatar: string;
    biography: string;
    website: string;
    location: string;
    category: string;
    followers: number;
    following: number;
    created_at: string;
    badges: string;
    banner: string;
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

export type Database = {
    public: {
        Tables: {
            status: {
                Row: {
                    id: string;
                    author: {
                        id: string;
                        name: string;
                        username: string;
                        avatar: string;
                        biography: string;
                        created_at: string;
                    };
                    content: string;
                    attachment: string;
                    comments: number;
                    likes: number;
                    views: number;
                    created_at: string;
                    updated_at: string;
                };
            };
        };
    };
};
