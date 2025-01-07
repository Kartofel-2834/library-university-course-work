// Types
import type { IBook, IReader, IBookRequest } from "@/types/entities";

// Enums
import { EBookRequestStatus, EBookStatus } from "@/enums/entities";
import { EUserType } from "@/enums/entities/EUserType";

// Libs
import moment from "moment";

// Mock
import { books as $books } from './books';
import { readers as $readers } from './users';

export const requests: IBookRequest[] = [
    {
        id: 1,
        reader: $readers.find(v => v.type === EUserType.READER) as IReader,
        book: $books.find(v => v.status === EBookStatus.REQUESTED) as IBook,
        status: EBookRequestStatus.PENDING,
        createdDate: moment(),
        comment: null,
    }
];