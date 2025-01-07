// Types
import type { IBook, IReader } from '@/types/entities';

// Enums
import { EBookStatus } from '@/enums/entities';

// Constants
import { books as $books } from '@/mock/books';

// Vue
import { ref, computed } from 'vue';

// Store
import { defineStore } from 'pinia';
import { useUsersStore } from './users';

export const useBooksStore = defineStore('books', () => {
    const $usersStore = useUsersStore();

    const books = ref<IBook[]>($books);

    const availableBooks = computed<IBook[]>(() => {
        return books.value.filter(v => v.status === EBookStatus.AVAILABLE);
    });

    const occupiedBooks = computed<IBook[]>(() => {
        return books.value.filter(v => v.status === EBookStatus.OCCUPIED);
    });

    const requestedBooks = computed<IBook[]>(() => {
        return books.value.filter(v => v.status === EBookStatus.REQUESTED);
    });

    const waitingBooks = computed<IBook[]>(() => {
        return books.value.filter(v => v.status === EBookStatus.WAITING);
    });

    // Methods
    function changeBookStatus(book: IBook, newStatus: EBookStatus) {
        if (!book) {
            throw new Error('Книга не найдена');
        }

        book.status = newStatus;

        books.value = [
            ...books.value.filter(v => v.id !== book.id),
            book
        ];
    }

    function changeBookReader(book: IBook, reader: IReader) {
        if (!book) {
            throw new Error('Книга не найдена');
        }

        book.reader = reader;

        books.value = [
            ...books.value.filter(v => v.id !== book.id),
            book
        ];
    }

    function deleteBook(book: IBook) {
        if (!$usersStore.isAdmin) {
            throw new Error('Только администраторы могут удалять книги из базы');
        }

        books.value = books.value.filter(v => v.id !== book.id);
    }

    function addBook(book: IBook) {
        if (!$usersStore.isAdmin) {
            throw new Error('Только администраторы могут добавлять новые книги в базу');
        }

        books.value = [
            ...books.value.filter(v => v.id !== book.id),
            book
        ];
    }

    function returnBook(book: IBook) {
        if (!$usersStore.isAdmin) {
            throw new Error('Только администраторы могут возвращать выданные книги в базу');
        }

        book.status = EBookStatus.AVAILABLE;
        book.reader = null;
        book.issueDate = null;

        books.value = [
            ...books.value.filter(v => v.id!== book.id),
            book
        ];
    }

    return {
        books,
        availableBooks,
        occupiedBooks,
        requestedBooks,
        waitingBooks,

        changeBookStatus,
        changeBookReader,
        deleteBook,
        addBook,
        returnBook,
    };
});