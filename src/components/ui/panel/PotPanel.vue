<template>
    <transition name="backdrop">
        <div
            v-show="$props.isOpen"
            :class="[$style.PotPanel, 'pot-panel', classList]"
            @click="onClose"
        >
            <transition :name="contentTransition">
                <slot
                    name="panel"
                    :is-open="$props.isOpen"
                >
                    <div
                        v-show="$props.isOpen"
                        :class="[$style.content, 'pot-panel__content']"
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
    position?: 'left' | 'right';
}

const $props = withDefaults(defineProps<IProps>(), {
    isOpen: false,
    position: 'right',
});

const $emit = defineEmits<{
    close: [];
}>();

// Computed
const classList = computed(() =>
    useClassList({
        position: $props.position,
    }),
);

const contentTransition = computed(() => {
    if ($props.position === 'right') {
        return 'roll-right-left';
    }

    if ($props.position === 'left') {
        return 'roll-left-right';
    }

    return 'fade';
});

// Methods
function onClose() {
    $emit('close');
}
</script>

<style lang="scss" module>
.PotPanel {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.25);

    /* --- Position --- */
    @include modificator(position, right) {
        justify-content: flex-end;
    }
}

.content {
    overflow: auto;
    height: 100%;
    min-width: calc(var(--spacer) * 32);
    background-color: var(--base-0);

    @include pretty-scrollbar();
}
</style>
