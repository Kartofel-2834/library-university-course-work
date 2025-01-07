<template>
    <div :class="$style.RequestsPage">
        <BaseHeader>
            <template #title> Запросы книг на выдачу </template>
        </BaseHeader>

        <main
            v-if="$usersStore.isAdmin"
            :class="$style.main"
        >
            <div class="container">
                <h1 :class="$style.title">Запросы книг на выдачу</h1>

                <div :class="$style.list">
                    <RequestCard
                        v-for="request of $requestsStore.pendingRequests"
                        :key="request.id"
                        :request="request"
                        @accept="acceptionRequest = $event"
                        @reject="rejectionRequest = $event"
                    />
                </div>
            </div>
        </main>

        <main
            v-if="$usersStore.isReader"
            :class="$style.main"
        >
            <div class="container">
                <h1 :class="$style.title">Мои запросы</h1>

                <div :class="$style.list">
                    <RequestCard
                        v-for="request of selfRequests"
                        :key="request.id"
                        :request="request"
                        @delete="deletionRequest = $event"
                    />
                </div>
            </div>
        </main>

        <ConfirmationModal
            :is-open="deletionRequest !== null"
            :accept-color="EColorTheme.DANGER"
            :reject-color="EColorTheme.SECONDARY"
            @accept="onDeleteRequest"
            @reject="deletionRequest = null"
        >
            Вы уверены, что хотите отозвать свою заявку?
        </ConfirmationModal>

        <ConfirmationModal
            :is-open="acceptionRequest !== null"
            :accept-color="EColorTheme.PRIMARY"
            :reject-color="EColorTheme.DANGER"
            @accept="onAcceptRequest"
            @reject="acceptionRequest = null"
        >
            Вы уверены, что хотите одобрить выдачу книги?
        </ConfirmationModal>

        <ConfirmationModal
            :is-open="rejectionRequest !== null"
            :accept-color="EColorTheme.DANGER"
            :reject-color="EColorTheme.SECONDARY"
            @accept="onRejectRequest"
            @reject="rejectionRequest = null"
        >
            Вы уверены, что хотите отклонить запрос?
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
import type { IBookRequest } from '@/types/entities';

// Enums
import { EColorTheme } from '@/enums/config';

// Vue
import { ref, computed } from 'vue';

// Store
import { useUsersStore } from '@/store/users';
import { useRequestsStore } from '@/store/requests';

// Components
import BaseHeader from '@/components/common/BaseHeader.vue';
import ConfirmationModal from '@/components/common/ConfirmationModal.vue';
import RequestCard from '@/components/pages/requests/RequestCard.vue';

const $usersStore = useUsersStore();
const $requestsStore = useRequestsStore();

const message = ref<string>('');
const isMessageOpen = ref<boolean>(false);

const deletionRequest = ref<IBookRequest | null>(null);
const rejectionRequest = ref<IBookRequest | null>(null);
const acceptionRequest = ref<IBookRequest | null>(null);

const selfRequests = computed<IBookRequest[]>(() => {
    if ($usersStore.isAdmin) {
        return [];
    }

    return $requestsStore.pendingRequests.filter(v => v.reader.id === $usersStore.target?.id);
});

// Methods
function onDeleteRequest() {
    if (!deletionRequest.value) {
        return;
    }

    try {
        $requestsStore.deleteRequest(deletionRequest.value);
    } catch (err: any) {
        showMessage(err.message);
    } finally {
        deletionRequest.value = null;
    }
}

function onAcceptRequest() {
    if (!acceptionRequest.value) {
        return;
    }

    try {
        $requestsStore.acceptRequest(acceptionRequest.value);
    } catch (err: any) {
        showMessage(err.message);
    } finally {
        acceptionRequest.value = null;
    }
}

function onRejectRequest() {
    if (!rejectionRequest.value) {
        return;
    }

    try {
        $requestsStore.rejectRequest(rejectionRequest.value);
    } catch (err: any) {
        showMessage(err.message);
    } finally {
        rejectionRequest.value = null;
    }
}

function showMessage(newMessage: string) {
    message.value = newMessage;
    isMessageOpen.value = true;
}
</script>

<style lang="scss" module>
.RequestsPage {
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
    display: flex;
    flex-direction: column;
    gap: var(--spacer-2);
}
</style>
