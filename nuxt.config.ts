// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr:true,
  nitro: {
      prerender: {
          crawlLinks:true
      },
  },
  hooks: {
    async 'nitro:config'(nitroConfig) {
        if (nitroConfig.dev) {
            return
        }
        return
    }
},
})
