<template>
    <div
        v-if="$usersStore.isAdmin"
        :class="$style.ReadersPage"
    >
        <BaseHeader>
            <template #title> Читатели </template>

            <PotButton
                :class="$style.addBookButton"
                :size="[ESize.MEDIUM, ESize.SMALL]"
                :devices="[EDevice.TABLET, EDevice.MOBILE]"
                :color="EColorTheme.PRIMARY_LIGHT"
                @click="isAddFormOpen = true"
            >
                Добавить читателя
            </PotButton>
        </BaseHeader>

        <main :class="$style.main">
            <section class="container">
                <h1 :class="$style.title">Читатели</h1>

                <div :class="$style.readersList">
                    <ReaderCard
                        v-for="reader of $usersStore.readers"
                        :key="reader.id"
                        :reader="reader"
                        @delete="deletionReader = $event"
                    />
                </div>
            </section>
        </main>

        <ReaderAddForm
            :is-open="isAddFormOpen"
            @close="isAddFormOpen = false"
            @submit="onAddReader"
        />

        <ConfirmationModal
            :is-open="deletionReader !== null"
            :accept-color="EColorTheme.DANGER"
            :reject-color="EColorTheme.SECONDARY"
            @accept="onDeleteReader"
            @reject="deletionReader = null"
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
import type { IReader } from '@/types/entities';

// Enums
import { EColorTheme, EDevice } from '@/enums/config';

// Vue
import { ref } from 'vue';

// Store
import { useUsersStore } from '@/store/users';

// Components
import BaseHeader from '@/components/common/BaseHeader.vue';
import ConfirmationModal from '@/components/common/ConfirmationModal.vue';
import ReaderCard from '@/components/pages/readers/ReaderCard.vue';
import ReaderAddForm from '@/components/pages/readers/ReaderAddForm.vue';

// UI Components
import PotButton from '@/components/ui/button/PotButton.vue';
import { ESize } from '@/enums/components';

const $usersStore = useUsersStore();

const message = ref<string>('');
const isMessageOpen = ref<boolean>(false);
const isAddFormOpen = ref<boolean>(false);

const deletionReader = ref<IReader | null>(null);

// Methods
function onDeleteReader() {
    if (!deletionReader.value) {
        return;
    }

    try {
        $usersStore.deleteReader(deletionReader.value);
    } catch (err: any) {
        showMessage(err.message);
    } finally {
        deletionReader.value = null;
    }
}

function onAddReader(reader: IReader) {
    try {
        $usersStore.addReader(reader);
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
.ReadersPage {
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

.readersList {
    display: flex;
    flex-direction: column;
    gap: var(--spacer-2);
}
</style>
