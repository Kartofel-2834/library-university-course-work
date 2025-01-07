<template>
    <div :class="$style.BookCard">
        <div :class="$style.imageWrapper">
            <img
                v-if="book.imageUrl"
                :class="$style.image"
                :src="book.imageUrl"
            />
        </div>

        <div :class="$style.infoWrapper">
            <div :class="$style.info">
                <div
                    :class="$style.title"
                    :title="book.name"
                >
                    {{ book.name }}
                </div>

                <div
                    :class="$style.author"
                    :title="book.author"
                >
                    {{ book.author }}
                </div>
            </div>

            <div :class="$style.actions">
                <PotButton
                    v-if="$usersStore.isReader && canBook"
                    :size="ESize.SMALL"
                    @click="onBook"
                >
                    Подать заявку
                </PotButton>

                <PotButton
                    v-if="canReadDetails"
                    :color="detailsButtonColor"
                    :size="ESize.SMALL"
                    @click="onShowDetails"
                >
                    Подробнее
                </PotButton>

                <PotButton
                    v-if="$usersStore.isAdmin && canDelete"
                    :size="ESize.SMALL"
                    :color="EColorTheme.DANGER"
                    @click="onDelete"
                >
                    {{ deleteLabel }}
                </PotButton>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
// Types
import type { IBook } from '@/types/entities';

// Enums
import { EColorTheme } from '@/enums/config';
import { ESize } from '@/enums/components';

// Vue
import { computed } from 'vue';

// Store
import { useUsersStore } from '@/store/users';

// Components
import PotButton from '@/components/ui/button/PotButton.vue';

interface IProps {
    book: IBook;
    deleteLabel?: string;
    canDelete?: boolean;
    canBook?: boolean;
    canReadDetails?: boolean;
}

const $props = withDefaults(defineProps<IProps>(), {
    deleteLabel: 'Удалить',
    canDelete: true,
    canBook: true,
    canReadDetails: true,
});

const $emit = defineEmits<{
    details: [value: IBook];
    book: [value: IBook];
    delete: [value: IBook];
}>();

const $usersStore = useUsersStore();

// Computed
const detailsButtonColor = computed<EColorTheme>(() => {
    return $usersStore.isAdmin ? EColorTheme.PRIMARY : EColorTheme.SECONDARY;
});

// Methods
function onBook() {
    $emit('book', $props.book);
}

function onShowDetails() {
    $emit('details', $props.book);
}

function onDelete() {
    $emit('delete', $props.book);
}
</script>

<style lang="scss" module>
.BookCard {
    overflow: hidden;
    display: flex;
    flex-wrap: nowrap;
    gap: var(--spacer-2);
    width: 100%;
    max-width: 100%;
    height: calc(var(--spacer) * 20);
    padding: var(--spacer-2);
    background-color: var(--base-100);
    border-radius: var(--radius-c);

    @include respond-to(mobile) {
        align-items: center;
        flex-direction: column;
        height: auto;
    }
}

.imageWrapper {
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: calc(var(--spacer) * 12);
    height: 100%;
    border-radius: var(--radius-c);
    background-color: var(--base-600);

    @include respond-to(mobile) {
        height: calc(var(--spacer) * 12);
    }
}

.image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
    pointer-events: none;
}

.infoWrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-basis: 100%;
    gap: var(--spacer-2);
}

.title {
    @include text(h4);
    @include text-ellipsis(2);

    margin-bottom: var(--unit);

    @include respond-to(mobile) {
        text-align: center;
    }
}

.author {
    @include text(l2);
    @include text-ellipsis(2);

    color: var(--base-500);

    @include respond-to(mobile) {
        text-align: center;
    }
}

.actions {
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    gap: var(--spacer);
    width: 100%;
}
</style>
