// Enums
import { EUserType } from "@/enums/entities/EUserType";

export interface IUser {
    id: number;
    login: string;
    password: string;
    type: EUserType;
}