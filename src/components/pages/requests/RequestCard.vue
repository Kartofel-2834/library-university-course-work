<template>
    <div :class="[$style.RequestCard, 'request-card']">
        <div :class="$style.content">
            <div
                v-if="request.book.imageUrl"
                :class="$style.image"
            >
                <img
                    :class="$style.imageTarget"
                    :src="request.book.imageUrl"
                />
            </div>

            <div :class="$style.info">
                <div :class="$style.bookName">
                    {{ request.book.name }}
                </div>

                <div :class="$style.bookAuthor">
                    {{ request.book.author }}
                </div>

                <div
                    v-if="$usersStore.isAdmin"
                    :class="$style.creator"
                >
                    <span>Запросил:</span>
                    {{ readerFullName }}, {{ request.reader.studentId }}
                </div>
            </div>
        </div>

        <div :class="$style.actions">
            <PotButton
                v-if="$usersStore.isAdmin"
                :size="ESize.SMALL"
                @click="onAccept"
            >
                Выдать
            </PotButton>

            <PotButton
                v-if="$usersStore.isAdmin"
                :size="ESize.SMALL"
                :color="EColorTheme.DANGER"
                @click="onReject"
            >
                Отклонить
            </PotButton>

            <PotButton
                v-if="$usersStore.isReader"
                :size="ESize.SMALL"
                :color="EColorTheme.DANGER"
                @click="onDelete"
            >
                Отозвать
            </PotButton>
        </div>
    </div>
</template>

<script lang="ts" setup>
// Types
import type { IBookRequest } from '@/types/entities';

// Store
import { useUsersStore } from '@/store/users';
import { computed } from 'vue';
import PotButton from '@/components/ui/button/PotButton.vue';
import { EColorTheme } from '@/enums/config';
import { ESize } from '@/enums/components';

interface IProps {
    request: IBookRequest;
}

const $props = defineProps<IProps>();

const $emit = defineEmits<{
    accept: [request: IBookRequest];
    reject: [request: IBookRequest];
    delete: [request: IBookRequest];
}>();

const $usersStore = useUsersStore();

// Computed
const readerFullName = computed<string>(() =>
    [
        $props.request.reader.surname,
        $props.request.reader.name,
        $props.request.reader.fathername,
    ].join(' '),
);

// Methods
function onAccept() {
    $emit('accept', $props.request);
}

function onReject() {
    $emit('reject', $props.request);
}

function onDelete() {
    $emit('delete', $props.request);
}
</script>

<style lang="scss" module>
.RequestCard {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacer-2);
    background-color: var(--base-100);
    border-radius: var(--radius-c);
}

.actions {
    display: grid;
    grid-auto-flow: row;
    grid-auto-rows: 1fr;
    gap: var(--spacer);
}

.content {
    display: flex;
    align-items: center;
    gap: var(--spacer-2);
}

.image {
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--radius-c);
    width: calc(var(--spacer) * 10);
    height: calc(var(--spacer) * 10);
    border-radius: var(--radius-c);
}

.imageTarget {
    user-select: none;
    pointer-events: none;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.info {
    display: flex;
    flex-direction: column;
    gap: var(--unit);
}

.bookAuthor {
    @include text(l2);

    color: var(--base-500);
}

.bookName {
    @include text(h4);
}

.creator {
    @include text(t1);

    margin-top: var(--spacer-2);

    span {
        font-weight: 500;
        user-select: none;
    }
}

.studentId {
    @include text(l2);

    display: flex;
    justify-content: center;
    align-items: center;
    min-width: var(--spacer-6);
    height: var(--spacer-6);
    background-color: var(--primary);
    border-radius: var(--radius-c);
    color: var(--base-0);
    pointer-events: none;
    user-select: none;
}

.fullname {
    @include text(l1);
}
</style>
