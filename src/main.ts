// Types
import type { App as Application } from 'vue';

// Vue
import { createApp } from 'vue';

// Plugins
import { createPinia } from 'pinia';
import routerPlugin from './plugins/router';
import deviceIsPlugin from './plugins/device-is';

// Components
import App from '@/App.vue';

const app: Application = createApp(App);

app.use(deviceIsPlugin);
app.use(routerPlugin);
app.use(createPinia());

app.mount('#app');
