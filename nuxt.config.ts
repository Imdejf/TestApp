// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr:false,
  nitro: {
      preset: 'azure',
      prerender: {
        ignore: ["/index.html"],
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
