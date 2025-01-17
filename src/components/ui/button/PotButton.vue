<template>
    <component
        :is="tag"
        :class="[$style.PotButton, 'pot-button', classList]"
        :style="colorThemeCssVars"
        :disabled="disabled"
    >
        <slot name="preicon">
            <PotIcon
                v-if="preicon"
                :class="[$style.icon, 'pot-button__icon', 'pot-button__icon_pre']"
                :icon="preicon"
            />
        </slot>

        <span
            v-if="$slots?.default"
            :class="[$style.label, 'pot-button__label']"
        >
            <slot />
        </span>

        <slot name="icon">
            <PotIcon
                v-if="icon"
                :class="[$style.icon, 'pot-button__icon', 'pot-button__icon_post']"
                :icon="icon"
            />
        </slot>
    </component>
</template>

<script lang="ts" setup>
// Types
import type { IPotButtonProps } from '@/types/components';

// Vue
import { defineAsyncComponent, computed } from 'vue';

// Composables
import { useClassList } from '@/composables/class-list';
import { useDeviceProperties } from '@/composables/device-properties';
import { useColorTheme } from '@/composables/color-theme';

// Enums
import { EColorTheme } from '@/enums/config';

// Constants
import { ALL_DEVICES_REVERSED } from '@/composables/device-is';
import { ERadius, ESize } from '@/enums/components';

// Components
const PotIcon = defineAsyncComponent(() => import('@/components/ui/icon/PotIcon.vue'));

const $props = withDefaults(defineProps<IPotButtonProps>(), {
    tag: 'button',
    radius: ERadius.ROUNDED_B,
    size: ESize.MEDIUM,
    color: EColorTheme.PRIMARY,
    devices: () => ALL_DEVICES_REVERSED,
    icon: '',
    preicon: '',
    square: false,
    disabled: false,
});

/**
 * Вычисляет и возвращает свойства компонента на основе
 * брейкпоинтов и текущего размера экрана
 */
const properties = computed(() => {
    return useDeviceProperties(
        {
            color: $props.color,
            size: $props.size,
            radius: $props.radius,
        },
        $props.devices,
    );
});

/** Цветовая тема */
const colorThemeCssVars = computed(() => useColorTheme(properties.value.value.color));

/** Классы модификаторы компонента */
const classList = computed(() =>
    useClassList({
        ...properties.value.value,
        color: Boolean($props.color),
        square: $props.square,
    }),
);
</script>

<style lang="scss" module>
.PotButton {
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    cursor: pointer;
    user-select: none;
    transition: background-color var(--transition);

    /* --- Sizes --- */
    @include modificator(size, tiny) {
        @include text(t4);

        height: var(--tiny-size);
        padding: 0 var(--spacer);
        gap: var(--spacer-0-750);

        @include modificator(square) {
            padding: 0;
        }
    }

    @include modificator(size, small) {
        @include text(t2);

        height: var(--small-size);
        padding: 0 var(--spacer-1-500);
        gap: var(--spacer);

        @include modificator(square) {
            padding: 0;
        }
    }

    @include modificator(size, medium) {
        @include text(t1);

        height: var(--medium-size);
        padding: 0 var(--spacer-2-500);
        gap: var(--spacer);

        @include modificator(square) {
            padding: 0;
        }
    }

    @include modificator(size, large) {
        @include text(t0);

        height: var(--large-size);
        padding: 0 var(--spacer-2-500);
        gap: var(--spacer-1-500);

        @include modificator(square) {
            padding: 0;
        }
    }

    /* --- Colors --- */
    @include modificator(color) {
        background-color: var(--color);
        color: var(--color-text);

        &:active:not(:disabled) {
            background-color: var(--color-active);
        }

        &:not(:active, :disabled) {
            &:hover {
                background-color: var(--color-hover);
            }
        }

        &:disabled {
            background-color: var(--disabled-200);
            color: var(--base-0);
        }
    }

    /* --- Radius --- */
    @include radius();

    /* --- Flags --- */
    @include modificator(square) {
        aspect-ratio: 1 / 1;
    }

    &:disabled {
        cursor: not-allowed;
    }

    .icon {
        flex-shrink: 0;
        width: 1.4em;
        height: 1.4em;
    }
}
</style>
