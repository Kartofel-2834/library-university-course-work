<template>
    <main :class="[$style.LoginPage, classList]">
        <div :class="$style.form">
            <h1 :class="$style.title">Авторизация</h1>

            <div :class="$style.fields">
                <PotInputBase
                    :value="values.login"
                    spellcheck="false"
                    placeholder="Логин"
                    @input="onFieldChange('login', $event)"
                />

                <PotInputBase
                    :value="values.password"
                    :type="isPasswordHidden ? 'password' : 'text'"
                    placeholder="Пароль"
                    @input="onFieldChange('password', $event)"
                >
                    <template #append>
                        <PotIcon
                            :class="$style.passwordIcon"
                            icon="eye"
                            size="32"
                            @click="isPasswordHidden = !isPasswordHidden"
                        />
                    </template>
                </PotInputBase>
            </div>

            <PotButton
                :disabled="!form.isValid.value"
                @click="onSubmit"
            >
                Вход
            </PotButton>
        </div>
    </main>
</template>

<script lang="ts" setup>
// Enums
import { EAppPages } from '@/enums/plugins/EAppPages';

// Vue
import { ref, computed } from 'vue';
import $router from '@/plugins/router';

// Store
import { useUsersStore } from '@/store/users';

// Composables
import { useForm } from '@/composables/form';
import { useClassList } from '@/composables/class-list';
import { useValidators } from '@/composables/validators';

// Constants
import { users } from '@/mock/users';

// UI Components
import PotButton from '@/components/ui/button/PotButton.vue';
import PotIcon from '@/components/ui/icon/PotIcon.vue';
import PotInputBase from '@/components/ui/input/PotInputBase.vue';

interface ILoginForm {
    login: string;
    password: string;
}

const Validators = useValidators<ILoginForm>();

const $usersStore = useUsersStore();

const isPasswordHidden = ref<boolean>(true);

const form = useForm<ILoginForm>({
    login: [Validators.REQUIRED()],
    password: [Validators.REQUIRED()],
});

// Computed
const values = computed(() => form.values.value);

const classList = computed(() =>
    useClassList({
        'password-hidden': isPasswordHidden.value,
    }),
);

// Methods
function onFieldChange(field: keyof ILoginForm, newValue: unknown) {
    form.changeField(field, String(newValue));
    form.validateField(field);
}

function onSubmit() {
    if (!form.validate()) {
        return;
    }

    const currentUser = users.find(
        user => user.login === values.value.login && user.password === values.value.password,
    );

    if (!currentUser) {
        alert('Неверный логин или пароль');
        return;
    }

    $usersStore.setUser(currentUser);
    $router.push({ name: EAppPages.HOME });
    console.log('test');
}
</script>

<style lang="scss" module>
.LoginPage {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100dvh;
    background-color: var(--base-100);

    /* --- Flags --- */
    @include modificator('password-hidden') {
        .passwordIcon {
            color: var(--color-border-200);
        }
    }
}

.title {
    @include text(h2);

    text-align: center;
    user-select: none;
}

.form {
    display: flex;
    flex-direction: column;
    gap: var(--spacer-6);
    width: calc(var(--spacer) * 56);
    max-width: calc(100% - var(--spacer-4));
    padding: var(--spacer-3);
    border-radius: var(--radius-c);
    background-color: var(--base-0);
}

.fields {
    display: flex;
    flex-direction: column;
    gap: var(--spacer-2);
}

.passwordIcon {
    color: var(--primary);
    cursor: pointer;
    transition: color var(--transition);
}
</style>
