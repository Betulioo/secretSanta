export interface IUser {
    email: string;
    password: string;
    username: string;
    groups?: string[];
    secretSanta?: string[];
    role?: "admin" | "user";
}