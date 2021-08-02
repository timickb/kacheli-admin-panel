import {IUser} from "../IUser";

export interface AuthResponse {
    Token: string;
    User: IUser;
}