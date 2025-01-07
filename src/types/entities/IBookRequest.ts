// Types
import type { Moment } from "moment";
import type { IReader } from "./IReader";
import type { IBook } from "./IBook";

// Enums
import { EBookRequestStatus } from "@/enums/entities";

export interface IBookRequest {
    id: number;
    reader: IReader;
    book: IBook;
    status: EBookRequestStatus;
    createdDate: Moment;
    comment: string | null;
}