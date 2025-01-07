// Node
import { fileURLToPath, URL } from 'node:url';

// Config
import { defineConfig } from 'vite';

// Plugins
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import potKit from './vite-pot-kit-plugin';

const isProd: boolean = process?.env?.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
    base: isProd ? '/library-university-course-work/' : '/',

    plugins: [
        vue(),
        svgLoader(),
        potKit({
            colorThemes: {
                primary: {
                    color: '#5e9dec',
                    hover: '#408be9',
                    active: '#1762c0',
                    text: 'var(--base-0)',
                },

                'primary-light': {
                    color: 'var(--base-0)',
                    hover: 'var(--base-100)',
                    active: 'var(--base-0)',
                    text: 'var(--color-blue-400)',
                },

                secondary: {
                    color: '#d5e6fa',
                    hover: 'var(--color-blue-100)',
                    active: '#d5e6fa',
                    text: 'var(--color-blue-400)',
                },

                danger: {
                    color: 'var(--color-red-300)',
                    hover: 'var(--color-red-200)',
                    active: 'var(--color-red-300)',
                    text: 'var(--base-0)',
                },
            },
        })
    ],

    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @import "@/assets/scss/bundle";
                    @import "@/assets/scss/config";
                    @import "@/assets/scss/default";
                    @import "@/assets/scss/reset";
                `,
            },
        },
    },

    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});



