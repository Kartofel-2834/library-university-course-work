<template>
    <PotPanel
        :is-open="book !== null"
        @close="onClose"
    >
        <transition name="fade">
            <div
                v-if="book"
                :class="$style.BookDetail"
            >
                <div
                    v-if="book.imageUrl"
                    :class="$style.imageWrapper"
                >
                    <img
                        :class="$style.image"
                        :src="book.imageUrl"
                    />
                </div>

                <div :class="$style.info">
                    <!-- Название -->
                    <div :class="$style.field">
                        <div :class="$style.label">Название</div>

                        <div :class="$style.data">
                            {{ book.name }}
                        </div>
                    </div>

                    <!-- Автор -->
                    <div :class="$style.field">
                        <div :class="$style.label">Автор</div>

                        <div :class="$style.data">
                            {{ book.author }}
                        </div>
                    </div>

                    <!-- Год публикации -->
                    <div :class="$style.field">
                        <div :class="$style.label">Год публикации</div>

                        <div :class="$style.data">
                            {{ book.publicationDate?.format('YYYY г.') }}
                        </div>
                    </div>

                    <!-- Поля для просмотра только для админов -->
                    <template v-if="$usersStore.isAdmin">
                        <!-- Кому выдана -->
                        <div
                            v-if="book.reader"
                            :class="$style.field"
                        >
                            <div :class="$style.label">Кому выдана</div>

                            <div :class="$style.data">
                                {{ book.reader.surname }}
                                {{ book.reader.name }}
                                {{ book.reader.fathername }},
                                {{ book.reader.studentId }}
                            </div>
                        </div>

                        <!-- Дата выдачи читателю -->
                        <div
                            v-if="book.issueDate"
                            :class="$style.field"
                        >
                            <div :class="$style.label">Дата выдачи читателю</div>

                            <div :class="$style.data">
                                {{ book.issueDate.format('YYYY.MM.DD HH:SS') }}
                            </div>
                        </div>

                        <!-- Дата приемки -->
                        <div
                            v-if="book.receiptDate"
                            :class="$style.field"
                        >
                            <div :class="$style.label">Дата приемки</div>

                            <div :class="$style.data">
                                {{ book.receiptDate.format('YYYY.MM.DD HH:SS') }}
                            </div>
                        </div>

                        <!-- Доп. информация -->
                        <div
                            v-if="book.details"
                            :class="$style.field"
                        >
                            <div :class="$style.label">Доп. информация</div>

                            <div :class="$style.data">
                                {{ book.details }}
                            </div>
                        </div>
                    </template>

                    <!-- Описание -->
                    <div :class="$style.field">
                        <div :class="$style.label">Описание</div>

                        <div :class="$style.data">
                            {{ book.description }}
                        </div>
                    </div>
                </div>

                <PotButton
                    :class="$style.closeButton"
                    @click="onClose"
                >
                    Закрыть
                </PotButton>
            </div>
        </transition>
    </PotPanel>
</template>

<script lang="ts" setup>
// Types
import type { IBook } from '@/types/entities';

// Store
import { useUsersStore } from '@/store/users';

// Components
import PotPanel from '@/components/ui/panel/PotPanel.vue';
import PotButton from '@/components/ui/button/PotButton.vue';

interface IProps {
    book?: IBook | null;
}

withDefaults(defineProps<IProps>(), {
    book: null,
});

const $emit = defineEmits<{
    close: [];
}>();

const $usersStore = useUsersStore();

// Methods
function onClose() {
    $emit('close');
}
</script>

<style lang="scss" module>
.BookDetail {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: calc(var(--spacer) * 52);
    max-width: 100%;
    height: 100%;
    padding: var(--spacer-2) 0;
    gap: var(--spacer-4);
}

.imageWrapper,
.closeButton {
    flex-shrink: 0;
}

.imageWrapper {
    overflow: hidden;
    width: calc(var(--spacer) * 24);
    height: calc(var(--spacer) * 32);
    margin: 0 auto;
    border-radius: var(--radius-c);
    user-select: none;
    pointer-events: none;
}

.image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.info {
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: var(--spacer-2);
    flex-basis: 100%;
    padding: 0 var(--spacer-3);

    @include pretty-scrollbar();
}

.field {
    display: flex;
    flex-direction: column;
    gap: var(--unit);
}

.closeButton {
    margin: 0 var(--spacer-3);
}

.label {
    @include text(l2);

    color: var(--base-500);
}

.data {
    @include text(t1);
}
</style>
