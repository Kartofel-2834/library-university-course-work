<template>
    <PotPanel
        :class="[$style.BookAddForm, 'book-add-form']"
        :is-open="isOpen"
        @close="onClose"
    >
        <div :class="[$style.content, 'book-add-form__content']">
            <div :class="$style.title">Добавление книги</div>

            <div :class="$style.fieldsList">
                <!-- Обложка -->
                <label :class="$style.image">
                    <div :class="$style.imageInner">
                        <PotIcon
                            v-if="!values.imageUrl"
                            icon="plus"
                            size="72"
                        />

                        <img
                            v-else
                            :class="$style.imagePreview"
                            :src="values.imageUrl"
                        />
                    </div>
                    <input
                        :class="$style.imageInput"
                        type="file"
                        accept=".jpeg,.jpg,.png"
                        @change="onImageLoad"
                    />
                </label>

                <!-- Название -->
                <div :class="$style.field">
                    <div :class="$style.label">Название</div>
                    <PotInputBase
                        :value="values.name"
                        :size="ESize.SMALL"
                        @input="form.changeField('name', String($event))"
                    />
                </div>

                <!-- Автор -->
                <div :class="$style.field">
                    <div :class="$style.label">Автор</div>
                    <PotInputBase
                        :value="values.author"
                        :size="ESize.SMALL"
                        @input="form.changeField('author', String($event))"
                    />
                </div>

                <!-- Дата публикации -->
                <div :class="$style.field">
                    <div :class="$style.label">Дата публикации</div>
                    <PotInputBase
                        :value="values.publicationDate"
                        :size="ESize.SMALL"
                        type="date"
                        @input="form.changeField('publicationDate', String($event))"
                    />
                </div>

                <!-- Дата поступления -->
                <div :class="$style.field">
                    <div :class="$style.label">Дата поступления</div>
                    <PotInputBase
                        :value="values.receiptDate"
                        :size="ESize.SMALL"
                        type="date"
                        @input="form.changeField('receiptDate', String($event))"
                    />
                </div>

                <!-- Описание -->
                <div :class="$style.field">
                    <div :class="$style.label">Описание</div>
                    <textarea
                        :value="values.description"
                        :class="$style.textarea"
                        @input="onTextareaInput('description', $event)"
                    ></textarea>
                </div>

                <!-- Доп. информация -->
                <div :class="$style.field">
                    <div :class="$style.label">Доп. информация</div>
                    <textarea
                        :value="values.details"
                        :class="$style.textarea"
                        @input="onTextareaInput('details', $event)"
                    ></textarea>
                </div>
            </div>

            <div :class="$style.actions">
                <PotButton
                    :class="$style.submitButton"
                    :disabled="!form.isValid.value"
                    @click="onSubmit"
                >
                    Сохранить
                </PotButton>

                <PotButton
                    :class="$style.submitButton"
                    :color="EColorTheme.SECONDARY"
                    @click="onClose"
                >
                    Закрыть
                </PotButton>
            </div>
        </div>
    </PotPanel>
</template>

<script setup lang="ts">
// Types
import type { IBook } from '@/types/entities';

// Enums
import { ESize } from '@/enums/components';
import { EBookStatus } from '@/enums/entities';
import { EColorTheme } from '@/enums/config';

// Vue
import { watch, computed } from 'vue';

// Libs
import moment from 'moment';

// Composables
import { useValidators } from '@/composables/validators';
import { useForm } from '@/composables/form';

// UI Components
import PotInputBase from '@/components/ui/input/PotInputBase.vue';
import PotPanel from '@/components/ui/panel/PotPanel.vue';
import PotButton from '@/components/ui/button/PotButton.vue';
import PotIcon from '@/components/ui/icon/PotIcon.vue';

interface IBookForm {
    imageUrl?: string;
    name: string;
    author: string;
    publicationDate: string;
    receiptDate: string;
    description: string;
    details: string;
}

interface IProps {
    isOpen: boolean;
}

const $props = withDefaults(defineProps<IProps>(), {
    isOpen: false,
});

const $emit = defineEmits<{
    close: [];
    submit: [book: IBook];
}>();

const Validators = useValidators<IBookForm>();
const form = useForm<IBookForm>({
    name: [Validators.REQUIRED()],
    author: [Validators.REQUIRED()],
    publicationDate: [Validators.REQUIRED(), Validators.DATE_VALID()],
    receiptDate: [Validators.REQUIRED(), Validators.DATE_VALID()],
    description: [Validators.REQUIRED()],
    details: [Validators.REQUIRED()],
});

// Computed
const values = computed(() => form.values.value);

// Watchers
watch(
    () => $props.isOpen,
    () => {
        if ($props.isOpen) {
            form.change({});
        }
    },
);

// Methods
function onClose() {
    $emit('close');
}

function onSubmit() {
    if (!form.validate()) {
        return;
    }

    $emit('submit', mapToBook(form.values.value));
}

function onTextareaInput(field: keyof IBookForm, event: Event) {
    const target = event.target as HTMLInputElement;
    form.changeField(field, target.value);
}

function onImageLoad(event: Event) {
    const target = event.target as HTMLInputElement;
    const newFiles: FileList | null = target?.files;

    if (!newFiles || !newFiles.length) return;

    const [currentFile] = newFiles;

    if (!/jpg|jpeg|png/.test(currentFile.type)) {
        return;
    }

    const filereader = new FileReader();

    filereader.onload = () => {
        if (typeof filereader.result !== 'string') return;

        form.changeField('imageUrl', filereader.result);
    };

    filereader.readAsDataURL(currentFile);
}

function mapToBook(form: Partial<IBookForm>): IBook {
    return {
        id: Math.floor(Math.random() * 1000000),
        name: form.name ?? '',
        author: form.author ?? '',
        status: EBookStatus.AVAILABLE,
        description: form.description ?? '',
        details: form.details ?? '',
        imageUrl: form.imageUrl || null,
        receiptDate: moment(form.receiptDate),
        publicationDate: moment(form.publicationDate),
        issueDate: null,
        reader: null,
    };
}
</script>

<style lang="scss" module>
.BookAddForm {
    //
}

.title {
    @include text(h3);

    margin-bottom: var(--spacer);
    padding: 0 var(--spacer-3);
}

.content {
    display: flex;
    flex-direction: column;
    gap: var(--spacer-2);
    width: calc(var(--spacer) * 42);
    max-width: 100%;
    height: 100%;
    padding: var(--spacer-3) 0;
}

.fieldsList {
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: var(--spacer-2);
    flex-basis: 100%;
    padding: 0 var(--spacer-3);

    @include pretty-scrollbar();
}

.image {
    margin: 0 auto;
}

.imageInner {
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(var(--spacer) * 22);
    height: calc(var(--spacer) * 24);
    background-color: var(--base-200);
    border-radius: var(--radius-c);
    cursor: pointer;
}

.imagePreview {
    border: 2px solid var(--primary);
    border-radius: var(--radius-c);
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.imageInput {
    display: none;
}

.field {
    display: flex;
    flex-direction: column;
    gap: var(--spacer);
}

.label {
    @include text(l2);

    color: var(--base-500);
}

.textarea {
    @include text(t3);

    height: var(--spacer-8);
    padding: var(--spacer);
    gap: var(--spacer-0-750);
    border: 2px solid;
    border-radius: var(--radius-c);
    background-color: var(--base-0);
    color: var(--base-600);
    border-color: var(--color-border-100);
    transition: border-color var(--transition);

    &:not(:disabled) {
        &:focus {
            border-color: var(--primary);
        }
    }

    @include pretty-scrollbar();
}

.actions {
    display: grid;
    grid-auto-flow: column;
    grid-auto-rows: 1fr;
    grid-auto-columns: 1fr;
    gap: var(--spacer);
    flex-shrink: 0;
    margin: auto var(--spacer-3) 0 var(--spacer-3);

    @include respond-to(mobile) {
        grid-auto-flow: row;
    }
}
</style>
