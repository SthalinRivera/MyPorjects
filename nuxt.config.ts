import { vueI18nConfigs } from "#build/i18n.options.mjs";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  alias: {
    css: "/<rootDir>/assets/css"
  },
  components: [{ path: "~/shared/icons", prefix: "Icon" }, "~/components"],
  css: [
    '@/assets/css/main.css',
    'remixicon/fonts/remixicon.css' // Añadido aquí
  ],
  modules: [// ...
    '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', "nuxt-charts", ["@nuxtjs/i18n", {
      vueI18n: "./i18n"
    }], "@nuxt/ui", "nuxt-auth-utils", 'nuxt-file-storage', "nuxt-icon"],
  pinia: {
    storesDirs: ['./stores/**']
  },

  runtimeConfig: {
    oauth: {
      Google: {
        clientId: process.env.NUXT_OAUTH_GOOGLE_CLIENT_ID,
        clientSecret: process.env.NUXT_OAUTH_GOOGLE_CLIENT_SECRET,
      },
    },

    public: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    },
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [

        { rel: 'icon', href: '/favicon.png' }
      ]
    },
  },
  plugins: [
    '~/plugins/firebase.ts'
  ],

})