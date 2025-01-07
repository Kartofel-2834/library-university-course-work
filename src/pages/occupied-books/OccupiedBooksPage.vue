<template>
    <div :class="$style.OccupiedBooksPage">
        <BaseHeader>
            <template #title> {{ $usersStore.isAdmin ? 'Выданные книги' : 'Мои книги' }} </template>
        </BaseHeader>

        <main
            v-if="$usersStore.isAdmin"
            :class="$style.main"
        >
            <div class="container">
                <h1 :class="$style.title">Выданные книги</h1>

                <div :class="$style.list">
                    <BookCard
                        v-for="book of $booksStore.occupiedBooks"
                        :key="book.id"
                        :book="book"
                        delete-label="Вернуть"
                        @details="detailsBook = $event"
                        @delete="returningBook = $event"
                    />
                </div>
            </div>
        </main>

        <main
            v-if="$usersStore.isReader"
            :class="$style.main"
        >
            <div class="container">
                <h1 :class="$style.title">Мои книги</h1>

                <div :class="$style.list">
                    <BookCard
                        v-for="book of myBooks"
                        :key="book.id"
                        :book="book"
                        :can-book="false"
                        :can-delete="false"
                        @details="detailsBook = $event"
                    />
                </div>
            </div>
        </main>

        <BookDetail
            :book="detailsBook"
            @close="detailsBook = null"
        />

        <ConfirmationModal
            :is-open="returningBook !== null"
            @accept="onBookReturn"
            @reject="returningBook = null"
        >
            Вы уверены, что хотите вернуть книгу в библиотеку?
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
import type { IBook } from '@/types/entities';

// Vue
import { ref, computed } from 'vue';

// Store
import { useUsersStore } from '@/store/users';
import { useBooksStore } from '@/store/books';

// Components
import ConfirmationModal from '@/components/common/ConfirmationModal.vue';
import BaseHeader from '@/components/common/BaseHeader.vue';
import BookCard from '@/components/pages/home/BookCard.vue';
import BookDetail from '@/components/pages/home/BookDetail.vue';

const $usersStore = useUsersStore();
const $booksStore = useBooksStore();

const message = ref<string>('');
const isMessageOpen = ref<boolean>(false);

const detailsBook = ref<IBook | null>(null);
const returningBook = ref<IBook | null>(null);

const myBooks = computed<IBook[]>(() => {
    if ($usersStore.isAdmin) {
        return [];
    }

    return $booksStore.occupiedBooks.filter(
        book => book.reader?.id && book.reader?.id === $usersStore.target?.id,
    );
});

// Methods
function onBookReturn() {
    if (!returningBook.value) {
        return;
    }

    try {
        $booksStore.returnBook(returningBook.value);
    } catch (err: any) {
        showMessage(err.message);
    } finally {
        returningBook.value = null;
    }
}

function showMessage(newMessage: string) {
    message.value = newMessage;
    isMessageOpen.value = true;
}
</script>

<style lang="scss" module>
.OccupiedBooksPage {
    //
}

.main {
    padding-top: calc(var(--spacer) * 12);
}

.title {
    @include text(h0);

    margin-bottom: var(--spacer-4);
    user-select: none;

    @include respond-to(tablet) {
        @include text(h1);
    }

    @include respond-to(mobile) {
        @include text(h2);
    }
}

.list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: var(--spacer-2);
    width: 100%;

    @include respond-to(tablet) {
        grid-template-columns: 1fr 1fr;
    }

    @include respond-to(mobile) {
        grid-template-columns: 1fr;
    }
}
</style>
