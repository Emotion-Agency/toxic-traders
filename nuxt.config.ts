import { pageTransition } from './transitions/base'

export default defineNuxtConfig({
  css: ['@/assets/styles/index.scss'],

  app: {
    pageTransition,
  },

  typescript: {
    strict: false,
  },

  runtimeConfig: {
    public: {
      ENVIROMENT: process.env.NODE_ENV,
    },
  },

  build: {
    transpile: [
      process.env.NODE_ENV === 'production' ? '@emotionagency/utils' : null,
    ],
  },
})
