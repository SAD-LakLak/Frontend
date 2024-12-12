// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from 'vite-plugin-vuetify';

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},

    css: [
        '~/assets/css/main.css',
        'vuetify/styles',
        '@mdi/font/css/materialdesignicons.min.css',
    ],

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    vite: {
        plugins: [vuetify()],
    },

    build: {
        transpile: ['vuetify'],
    },

    runtimeConfig: {
        public: {
            theme: 'light',
        },
    },
});
