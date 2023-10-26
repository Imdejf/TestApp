import axios from "axios"
import { Fetch } from '~/composables/useFetch'

export default defineNuxtPlugin(() => {
    addRouteMiddleware('global-middleware',async (to, from) => {
      const cookieStore = useCookie('dsStore', {
        sameSite: 'none',
        path: '/',
        secure: true,
        httpOnly: false,
        maxAge: 60 * 60 * 24 * 7
      })

      const cookieLanguage = useCookie('dsLanguage', {
        sameSite: 'none',
        path: '/',
        secure: true,
        httpOnly: false,
        maxAge: 60 * 60 * 24 * 7
      })

      const cookieUser = useCookie('dsCustomer')

      const config = useRuntimeConfig().public

      //@ts-ignore
      if(cookieStore !== config.storeId) {
        cookieStore.value = config.storeId
      }

      //@ts-ignore
      if(cookieLanguage !== config.languageId) {
        cookieLanguage.value = config.languageId
      }
      //@ts-ignore
      if(!cookieUser.value && process.client) {
        $axios('checkSession', {
          headers: {
            dsstore: config.storeId,
            dslanguage: config.languageId,
            dsCustomer: useCookie('dsCustomer').value,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
        }).then((response => {
          const customer = useCookie('dsCustomer', { maxAge: 182 * 24 * 60 * 12 * 2 })
          customer.value = response.data
        }))
      }
      },
      { global: true }
    )
  })