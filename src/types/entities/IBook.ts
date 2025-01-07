// Types
import type { IReader } from "./IReader";
import type { Moment } from "moment";

// Enums
import { EBookStatus } from "@/enums/entities/EBookStatus";

export interface IBook {
    id: number;
    name: string;
    author: string;
    status: EBookStatus;
    description: string;
    details: string;
    imageUrl: string | null;
    receiptDate: Moment;
    publicationDate: Moment | null;
    issueDate: Moment | null;
    reader: IReader | null;
}