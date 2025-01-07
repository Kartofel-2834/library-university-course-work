<template>
    <header :class="[$style.BaseHeader, 'base-header']">
        <div :class="[$style.content, 'base-header__content', 'container']">
            <div :class="$style.leftSide">
                <PotButton
                    :color="EColorTheme.PRIMARY_LIGHT"
                    :devices="[EDevice.TABLET, EDevice.MOBILE]"
                    :size="[ESize.MEDIUM, ESize.SMALL]"
                    icon="menu"
                    title="Меню"
                    square
                    @click="onOpenMenu"
                />

                <div
                    v-if="$slots.title"
                    :class="[$style.title, 'base-header__content__title']"
                >
                    <slot name="title"></slot>
                </div>
            </div>

            <slot></slot>
        </div>

        <PotPanel
            :class="$style.menu"
            :is-open="isMenuOpen"
            position="left"
            @close="onCloseMenu"
        >
            <div
                :class="$style.menuHeader"
                @click="onCloseMenu"
            >
                <div :class="$style.menuTitle">Меню</div>

                <PotIcon
                    icon="cross"
                    size="32"
                />
            </div>

            <nav :class="$style.menuLinks">
                <PotLink
                    :class="$style.link"
                    :active="$route.name === EAppPages.HOME"
                    link="/library-university-course-work"
                    underline
                >
                    Книги
                </PotLink>

                <PotLink
                    :class="$style.link"
                    :active="$route.name === EAppPages.OCCUPIED_BOOKS"
                    link="/library-university-course-work/occupied-books"
                    underline
                >
                    {{ $usersStore.isAdmin ? 'Выданные книги' : 'Мои книги' }}
                </PotLink>

                <PotLink
                    v-if="$usersStore.isAdmin"
                    :class="$style.link"
                    :active="$route.name === EAppPages.USERS"
                    link="/library-university-course-work/readers"
                    underline
                >
                    Читатели
                </PotLink>

                <PotLink
                    :class="$style.link"
                    :active="$route.name === EAppPages.REQUESTS"
                    link="/library-university-course-work/requests"
                    underline
                >
                    Запросы на получение книг
                </PotLink>
            </nav>

            <PotButton
                :class="$style.exitButton"
                :color="EColorTheme.SECONDARY"
                preicon="exit"
                @click="$usersStore.logout"
            >
                Выход
            </PotButton>
        </PotPanel>
    </header>
</template>

<script setup lang="ts">
// Enums
import { EColorTheme, EDevice } from '@/enums/config';
import { EAppPages } from '@/enums/plugins/EAppPages';
import { ESize } from '@/enums/components';

// Vue
import { ref } from 'vue';
import { useRoute } from 'vue-router';

// Store
import { useUsersStore } from '@/store/users';

// UI Components
import PotButton from '@/components/ui/button/PotButton.vue';
import PotPanel from '@/components/ui/panel/PotPanel.vue';
import PotIcon from '@/components/ui/icon/PotIcon.vue';
import PotLink from '../ui/link/PotLink.vue';

const $usersStore = useUsersStore();
const $route = useRoute();

const isMenuOpen = ref<boolean>(false);

// Methods
function onOpenMenu() {
    isMenuOpen.value = true;
}

function onCloseMenu() {
    isMenuOpen.value = false;
}
</script>

<style lang="scss" module>
.BaseHeader {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    background-color: var(--primary);
    color: var(--base-0);
}

.leftSide {
    display: flex;
    align-items: center;
    gap: var(--spacer-2);
}

.menu {
    :global(.pot-panel__content) {
        display: flex;
        flex-direction: column;
        width: calc(var(--spacer) * 40);
    }
}

.menuHeader {
    @include text(h3);

    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacer-2) var(--spacer-3);
    background-color: var(--primary);
    cursor: pointer;
    transition: background-color var(--transition);

    &:not(:active):hover {
        background-color: var(--primary-hover);
    }
}

.menuLinks {
    @include text(l1);

    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    gap: var(--spacer-2);
    padding: var(--spacer-3);
    color: var(--base-600);

    @include pretty-scrollbar();
}

.link {
    width: fit-content;
}

.exitButton {
    flex-shrink: 0;
    width: calc(100% - (var(--spacer-3) * 2));
    margin: auto var(--spacer-3) var(--spacer-2) var(--spacer-3);
}

.content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--spacer-8);
}

.title {
    @include text(h2);

    cursor: default;
    user-select: none;

    @include respond-to(tablet) {
        @include text(h3);
    }

    @include respond-to(mobile) {
        @include text(h4);
    }
}
</style>
