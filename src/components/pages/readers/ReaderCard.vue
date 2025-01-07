<template>
    <div :class="[$style.ReaderCard, 'reader-card']">
        <div :class="$style.content">
            <div :class="$style.studentId">
                {{ reader.studentId }}
            </div>

            <div :class="$style.fullname">{{ fullname }}</div>
        </div>

        <div :class="$style.actions">
            <PotButton
                :color="EColorTheme.DANGER"
                icon="delete"
                square
                title="Удалить"
                @click="onDelete"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
// Types
import type { IReader } from '@/types/entities';

// Enums
import { EColorTheme } from '@/enums/config';

// Vue
import { computed } from 'vue';

// UI Components
import PotButton from '@/components/ui/button/PotButton.vue';

interface IProps {
    reader: IReader;
}

const $props = defineProps<IProps>();

const $emit = defineEmits<{
    delete: [reader: IReader];
}>();

// Computed
const fullname = computed<string>(() =>
    [$props.reader.surname, $props.reader.name, $props.reader.fathername].join(' '),
);

// Methods
function onDelete() {
    $emit('delete', $props.reader);
}
</script>

<style lang="scss" module>
.ReaderCard {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacer-2);
    background-color: var(--base-100);
    border-radius: var(--radius-c);
}

.content {
    display: flex;
    align-items: center;
    gap: var(--spacer-2);
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

    @include respond-to(mobile) {
        @include text(l2);
    }
}
</style>
