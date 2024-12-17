export interface IGroup {
    name: string;
    usersList?: string[];
    isPrivate: boolean;
    img?: string;
    password?: string;
    owner: string; // Assuming owner is a string representing the user ID
    quantity: number;
}
