<template>
    <PotPanel
        :class="[$style.ReaderAddForm, 'reader-add-form']"
        :is-open="isOpen"
        @close="onClose"
    >
        <div :class="$style.content">
            <div :class="$style.title">Добавление читателя</div>

            <div :class="$style.fieldsList">
                <!-- Имя -->
                <div :class="$style.field">
                    <div :class="$style.label">Имя</div>
                    <PotInputBase
                        :value="values.name"
                        :size="ESize.SMALL"
                        @input="form.changeField('name', String($event))"
                    />
                </div>

                <!-- Фамилия -->
                <div :class="$style.field">
                    <div :class="$style.label">Фамилия</div>
                    <PotInputBase
                        :value="values.surname"
                        :size="ESize.SMALL"
                        @input="form.changeField('surname', String($event))"
                    />
                </div>

                <!-- Отчество -->
                <div :class="$style.field">
                    <div :class="$style.label">Отчество</div>
                    <PotInputBase
                        :value="values.fathername"
                        :size="ESize.SMALL"
                        @input="form.changeField('fathername', String($event))"
                    />
                </div>

                <!-- Номер студ. билета -->
                <div :class="$style.field">
                    <div :class="$style.label">Номер студ. билета</div>
                    <PotInputBase
                        :value="values.studentId"
                        :size="ESize.SMALL"
                        type="number"
                        @input="form.changeField('studentId', String($event))"
                    />
                </div>

                <!-- Логин -->
                <div :class="$style.field">
                    <div :class="$style.label">Логин</div>
                    <PotInputBase
                        :value="values.login"
                        :size="ESize.SMALL"
                        @input="form.changeField('login', String($event))"
                    />
                </div>

                <!-- Пароль -->
                <div :class="$style.field">
                    <div :class="$style.label">Пароль</div>
                    <PotInputBase
                        :value="values.password"
                        :size="ESize.SMALL"
                        @input="form.changeField('password', String($event))"
                    />
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
import type { IReader } from '@/types/entities';

// Enums
import { ESize } from '@/enums/components';
import { EUserType } from '@/enums/entities/EUserType';
import { EColorTheme } from '@/enums/config';

// Vue
import { computed, watch } from 'vue';

// Composables
import { useValidators } from '@/composables/validators';
import { useForm } from '@/composables/form';

// UI Components
import PotInputBase from '@/components/ui/input/PotInputBase.vue';
import PotPanel from '@/components/ui/panel/PotPanel.vue';
import PotButton from '@/components/ui/button/PotButton.vue';

interface IReaderForm {
    login: string;
    password: string;
    name: string;
    surname: string;
    fathername: string;
    studentId: string;
}

interface IProps {
    isOpen: boolean;
}

const $props = withDefaults(defineProps<IProps>(), {
    isOpen: false,
});

const $emit = defineEmits<{
    close: [];
    submit: [reader: IReader];
}>();

const Validators = useValidators<IReaderForm>();
const form = useForm<IReaderForm>({
    login: [Validators.REQUIRED()],
    password: [Validators.REQUIRED()],
    name: [Validators.REQUIRED()],
    surname: [Validators.REQUIRED()],
    fathername: [Validators.REQUIRED()],
    studentId: [Validators.REQUIRED()],
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

    $emit('submit', mapToReader(form.values.value));
}

function mapToReader(form: Partial<IReaderForm>): IReader {
    return {
        id: Math.floor(Math.random() * 1000000),
        type: EUserType.READER,
        login: form.login ?? '',
        password: form.password ?? '',
        name: form.name ?? '',
        surname: form.surname ?? '',
        fathername: form.fathername ?? '',
        studentId: Number(form.studentId),
    };
}
</script>

<style lang="scss" module>
.ReaderAddForm {
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
    grid-auto-columns: 1fr;
    gap: var(--spacer);
    flex-shrink: 0;
    margin: auto var(--spacer-3) 0 var(--spacer-3);
}
</style>
