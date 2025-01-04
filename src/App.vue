<template>
    <main :class="$style.main">
        {{ value }}

        <div style="width: 50%">
            <PotInputPhone
                v-model="value"
                :size="[ESize.MEDIUM, ESize.LARGE]"
                :devices="[EDevice.DESKTOP, EDevice.MOBILE]"
                icon="pot"
            >
            </PotInputPhone>
        </div>
    </main>
</template>

<script lang="ts" setup>
// Vue
import { ref } from 'vue';

// Enums
import { ESize } from './enums/components';
import { EColorTheme, EDevice } from './enums/config';

// Components
import PotIcon from './components/icon/PotIcon.vue';
import PotInputBase from './components/input/PotInputBase.vue';
import PotInputPhone from './components/input/PotInputPhone.vue';

const value = ref<string>('');
const kamal = ref<number[]>([]);
const flag = ref<boolean>(false);
</script>

<style lang="scss" module>
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    min-height: 100vh;

    @include text(h0);
}
</style>
