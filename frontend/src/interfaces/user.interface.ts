export interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;

    age?: number;
    address?: string;
    avatarURL?: string;

    // password?: string;
    ["string"]?: string;
}