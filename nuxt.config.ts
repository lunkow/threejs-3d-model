// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@tresjs/nuxt', '@nuxt/devtools'],
  tres: {
    devtools: true,
  },
  devServer: {
    port: 3001,
  },
})
