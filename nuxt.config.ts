export default defineNuxtConfig({
  css: ['@/assets/styles/index.scss'],

  app: {
    layoutTransition: { name: 'fade', mode: 'out-in' },
  },

  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },

  typescript: {
    strict: false,
  },

  plugins: ['~/plugins/vue-datepicker.ts'],

  modules: ['@vueuse/nuxt'],
})
