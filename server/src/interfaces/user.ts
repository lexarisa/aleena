export interface IUser {
    id: number;
    email: string;
    username: string;
    name: string;
    profile_pic: string;
    status: string;
    created_at: Date;
    updated_at: Date;
}

export interface INewUser {
    id: number;
    email: string;
    username: string;
    name: string;
    profile_pic: string;
}