// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr:false,
  target: 'universal',
  nitro: {
      preset: 'azure',
      prerender: {
          crawlLinks:true,
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
