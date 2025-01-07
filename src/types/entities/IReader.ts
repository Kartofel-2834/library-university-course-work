// Types
import type { IUser } from "./IUser";

export interface IReader extends IUser {
    name: string;
    surname: string;
    fathername: string;
    studentId: number;
}