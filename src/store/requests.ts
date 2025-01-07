// Types
import type { IBookRequest } from '@/types/entities';

// Enums
import { EBookRequestStatus, EBookStatus } from '@/enums/entities';

// Vue
import { ref, computed } from 'vue';

// Libs
import moment from 'moment';

// Store
import { defineStore } from 'pinia';
import { useUsersStore } from './users';
import { useBooksStore } from './books';

// Mock
import { requests as $requests } from '@/mock/request';

export const useRequestsStore = defineStore('requests', () => {
    const $usersStore = useUsersStore();
    const $booksStore = useBooksStore();

    const requests = ref<IBookRequest[]>([...$requests]);

    const acceptedRequests = computed<IBookRequest[]>(() => {
        return requests.value.filter(v => v.status === EBookRequestStatus.ACCEPTED);
    });

    const pendingRequests = computed<IBookRequest[]>(() => {
        return requests.value.filter(v => v.status === EBookRequestStatus.PENDING);
    });

    const rejectedBooks = computed<IBookRequest[]>(() => {
        return requests.value.filter(v => v.status === EBookRequestStatus.REJECTED);
    });

    // Methods
    function addRequest(request: IBookRequest) {
        if (!$usersStore.isReader) {
            throw new Error('Только читатели могут запрашивать книги');
        }

        $booksStore.changeBookStatus(request.book, EBookStatus.REQUESTED);

        requests.value = [
            ...requests.value.filter(v => v.id !== request.id),
            request
        ];
    }

    function rejectRequest(request: IBookRequest) {
        if (!$usersStore.isAdmin) {
            throw new Error('Только админы могут отклонять выдачу книги');
        }

        $booksStore.changeBookStatus(request.book, EBookStatus.AVAILABLE);

        request.status = EBookRequestStatus.REJECTED;

        requests.value = [
            ...requests.value.filter(v => v.id !== request.id),
            request
        ];
    }

    function acceptRequest(request: IBookRequest) {
        if (!$usersStore.isAdmin) {
            throw new Error('Только админы могут принимать выдачу книги');
        }

        request.book.status = EBookStatus.OCCUPIED;
        request.book.issueDate = moment();
        request.book.reader = request.reader;
        $booksStore.addBook(request.book);

        request.status = EBookRequestStatus.ACCEPTED;

        requests.value = [
            ...requests.value.filter(v => v.id !== request.id),
            request
        ];
    }

    function deleteRequest(request: IBookRequest) {
        $booksStore.changeBookStatus(request.book, EBookStatus.AVAILABLE);

        requests.value = requests.value.filter(v => v.id !== request.id);
    }

    return {
        requests,
        acceptedRequests,
        pendingRequests,
        rejectedBooks,

        addRequest,
        rejectRequest,
        acceptRequest,
        deleteRequest
    };
});