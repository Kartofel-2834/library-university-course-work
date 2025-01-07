<template>
    <PotModal
        :class="[$style.ConfiramtionModal, 'confirmation-modal']"
        :is-open="isOpen"
        @close="onReject"
    >
        <div :class="[$style.question, 'confirmation-modal__question']">
            <slot>{{ label }}</slot>
        </div>

        <div :class="[$style.actions, 'confirmation-modal__actions']">
            <slot
                name="accept"
                :on-accept="onAccept"
            >
                <PotButton
                    v-if="acceptLabel"
                    :size="buttonSize"
                    :color="acceptColor"
                    @click="onAccept"
                >
                    {{ acceptLabel }}
                </PotButton>
            </slot>

            <slot
                name="reject"
                :on-reject="onReject"
            >
                <PotButton
                    v-if="rejectLabel"
                    :color="rejectColor"
                    :size="buttonSize"
                    @click="onReject"
                >
                    {{ rejectLabel }}
                </PotButton>
            </slot>
        </div>
    </PotModal>
</template>

<script setup lang="ts">
// Enums
import { EColorTheme } from '@/enums/config';
import { ESize } from '@/enums/components';

// Components
import PotModal from '@/components/ui/modal/PotModal.vue';
import PotButton from '../ui/button/PotButton.vue';

interface IProps {
    isOpen: boolean;
    label?: string;
    acceptLabel?: string | null;
    rejectLabel?: string | null;
    acceptColor?: EColorTheme;
    rejectColor?: EColorTheme;
    buttonSize?: ESize;
}

withDefaults(defineProps<IProps>(), {
    label: '',
    acceptLabel: 'Да',
    rejectLabel: 'Отмена',
    buttonSize: ESize.MEDIUM,
    acceptColor: EColorTheme.PRIMARY,
    rejectColor: EColorTheme.DANGER,
});

const $emit = defineEmits<{
    accept: [];
    reject: [];
}>();

// Methods
function onAccept() {
    $emit('accept');
}

function onReject() {
    $emit('reject');
}
</script>

<style lang="scss" module>
.ConfiramtionModal {
    :global(.pot-modal__content) {
        display: flex;
        flex-direction: column;
        gap: var(--spacer-4);
        min-width: calc(var(--spacer) * 32);
        max-width: calc(var(--spacer) * 56);
        padding: var(--spacer-3);
    }
}

.question {
    @include text(h3);

    text-align: center;
}

.actions {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    gap: var(--spacer-2);
}
</style>
