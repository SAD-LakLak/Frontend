// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from "vite-plugin-vuetify";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  css: [
    "@mdi/font/css/materialdesignicons.min.css",
    "@/assets/css/main.css",
    "~/assets/css/fonts.css",
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
    transpile: ["vuetify"],
    sourcemap: false,
  },

  runtimeConfig: {
    public: {
      theme: "light",
    },
  },
  buildModules: ["vuetify/nuxt"],
  vuetify: {
    icons: {
      defaultSet: "mdi",
    },
  },
});
