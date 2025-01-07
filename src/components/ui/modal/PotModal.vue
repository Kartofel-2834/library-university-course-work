<template>
    <transition name="backdrop">
        <div
            v-show="$props.isOpen"
            :class="[$style.PotModal, 'pot-modal', classList]"
            @click="onClose"
        >
            <transition name="fade">
                <slot
                    name="modal"
                    :is-open="$props.isOpen"
                >
                    <div
                        v-show="$props.isOpen"
                        :class="[$style.content, 'pot-modal__content']"
                        @click.stop
                    >
                        <slot />
                    </div>
                </slot>
            </transition>
        </div>
    </transition>
</template>

<script lang="ts" setup>
// Vue
import { computed } from 'vue';

// Copmosables
import { useClassList } from '@/composables/class-list';

interface IProps {
    isOpen?: boolean;
}

const $props = withDefaults(defineProps<IProps>(), {
    isOpen: false,
});

const $emit = defineEmits<{
    close: [];
}>();

// Computed
const classList = computed(() =>
    useClassList({
        opened: $props.isOpen,
    }),
);

// Methods
function onClose() {
    $emit('close');
}
</script>

<style lang="scss" module>
.PotModal {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.25);
}

.content {
    background-color: var(--base-0);
    border-radius: var(--radius-c);
    padding: var(--spacer-3);
}
</style>
