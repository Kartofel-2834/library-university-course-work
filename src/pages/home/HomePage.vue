<template>
    <div :class="$style.HomePage">
        <BaseHeader>
            <template #title>
                {{ title }}
            </template>

            <div :class="$style.headerActions">
                <PotInputBase
                    v-model="search"
                    placeholder="Поиск"
                />

                <PotButton
                    v-if="$usersStore.isAdmin"
                    :class="$style.addBookButton"
                    :color="EColorTheme.PRIMARY_LIGHT"
                    @click="isAddFormOpen = true"
                >
                    Добавить книгу
                </PotButton>
            </div>
        </BaseHeader>

        <main :class="$style.main">
            <section :class="[$style.HomePage, 'container']">
                <h1 :class="$style.title">{{ title }}</h1>

                <div :class="$style.wrapper">
                    <div :class="$style.books">
                        <BookCard
                            v-for="book in currentBooks"
                            :key="`Book_${book.id}`"
                            :book="book"
                            @details="detailsBook = $event"
                            @book="requestedBook = $event"
                            @delete="deletionBook = $event"
                        />
                    </div>
                </div>
            </section>
        </main>

        <BookDetail
            :book="detailsBook"
            @close="detailsBook = null"
        />

        <BookAddForm
            :is-open="isAddFormOpen"
            @close="isAddFormOpen = false"
            @submit="onAddBook"
        />

        <ConfirmationModal
            :is-open="requestedBook !== null"
            @accept="onRequestBook"
            @reject="requestedBook = null"
        >
            Вы уверены, что хотите подать заявку для получения книги?
        </ConfirmationModal>

        <ConfirmationModal
            :is-open="deletionBook !== null"
            :accept-color="EColorTheme.DANGER"
            :reject-color="EColorTheme.SECONDARY"
            @accept="onDeleteBook"
            @reject="deletionBook = null"
        >
            Вы уверены, что хотите удалить книгу из базы?
        </ConfirmationModal>

        <ConfirmationModal
            :is-open="isMessageOpen"
            :reject-label="null"
            accept-label="Ок"
            @accept="isMessageOpen = false"
        >
            {{ message }}
        </ConfirmationModal>
    </div>
</template>

<script lang="ts" setup>
// Types
import type { IBook, IReader } from '@/types/entities';

// Enums
import { EColorTheme } from '@/enums/config';
import { EBookRequestStatus, EBookStatus } from '@/enums/entities';

// Vue
import { ref, computed } from 'vue';

// Store
import { useBooksStore } from '@/store/books';
import { useUsersStore } from '@/store/users';
import { useRequestsStore } from '@/store/requests';

// Libs
import moment from 'moment';

// Components
import ConfirmationModal from '@/components/common/ConfirmationModal.vue';
import BookCard from '@/components/pages/home/BookCard.vue';
import BookDetail from '@/components/pages/home/BookDetail.vue';
import BookAddForm from '@/components/pages/home/BookAddForm.vue';
import BaseHeader from '@/components/common/BaseHeader.vue';

// UI Components
import PotInputBase from '@/components/ui/input/PotInputBase.vue';
import PotButton from '@/components/ui/button/PotButton.vue';

const $booksStore = useBooksStore();
const $usersStore = useUsersStore();
const $requestsStore = useRequestsStore();

const search = ref<string>('');

const message = ref<string>('');
const isMessageOpen = ref<boolean>(false);
const isAddFormOpen = ref<boolean>(false);

const detailsBook = ref<IBook | null>(null);
const requestedBook = ref<IBook | null>(null);
const deletionBook = ref<IBook | null>(null);

// Computed
const title = computed(() => {
    return $usersStore.isAdmin ? 'Книги' : 'Электронный каталог';
});

const currentBooks = computed<IBook[]>(() => {
    const query = search.value.toLowerCase();

    const kamal = $usersStore.isAdmin
        ? $booksStore.books.filter(book => book.status !== EBookStatus.OCCUPIED)
        : $booksStore.availableBooks;

    return kamal.filter(book => {
        return (
            book.name?.toLowerCase()?.includes?.(query) ||
            book.author?.toLowerCase()?.includes?.(query) ||
            book.publicationDate?.format('YYYY')?.includes?.(query)
        );
    });
});

// Methods
function onRequestBook() {
    if (!requestedBook.value || !$usersStore.isReader) {
        return;
    }

    try {
        $requestsStore.addRequest({
            id: Math.floor(Math.random() * 1000000),
            book: requestedBook.value,
            reader: $usersStore.target as IReader,
            status: EBookRequestStatus.PENDING,
            createdDate: moment(),
            comment: null,
        });
    } catch (err: any) {
        showMessage(err.message);
    } finally {
        requestedBook.value = null;
    }
}

function onDeleteBook() {
    if (!deletionBook.value) {
        return;
    }

    try {
        $booksStore.deleteBook(deletionBook.value);
    } catch (err: any) {
        showMessage(err.message);
    } finally {
        deletionBook.value = null;
    }
}

function onAddBook(book: IBook) {
    try {
        $booksStore.addBook(book);
    } catch (err: any) {
        showMessage(err.message);
    } finally {
        isAddFormOpen.value = false;
    }
}

function showMessage(newMessage: string) {
    message.value = newMessage;
    isMessageOpen.value = true;
}
</script>

<style lang="scss" module>
.HomePage {
    //
}

.headerActions {
    display: flex;
    flex-shrink: 0;
    gap: 2rem;
}

.addBookButton {
    flex-shrink: 0;
}

.main {
    padding-top: calc(var(--spacer) * 12);
}

.title {
    @include text(h0);

    margin-bottom: var(--spacer-4);
    user-select: none;
}

.books {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: var(--spacer-2);
    width: 100%;
}

.actions {
    display: flex;
    margin-top: var(--spacer-4);
    width: 100%;
}

.loadButton {
    width: 100%;
}
</style>
