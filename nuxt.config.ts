// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  runtimeConfig: {
    public: {
      NUXT_EMAILJS_SERVICE_ID: process.env.NUXT_EMAILJS_SERVICE_ID,
      NUXT_EMAILJS_TEMPLATE_ID: process.env.NUXT_EMAILJS_TEMPLATE_ID,
      NUXT_EMAILJS_PUBLIC_KEY: process.env.NUXT_EMAILJS_PUBLIC_KEY
    }
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: [
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxt/scripts',
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxt/ui',
    'nuxt-icon'
  ],
  image: {
    // استفاده از public/ به عنوان مسیر محلی
    dir: 'public',
    provider: 'ipx'
  }
})