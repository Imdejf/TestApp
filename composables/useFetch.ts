import { UseFetchOptions } from '#app'
import { NitroFetchRequest } from 'nitropack'
import { KeyOfRes } from 'nuxt/dist/app/composables/asyncData'
import axios from "axios"; 

export function Fetch<T>(
  request: NitroFetchRequest,
  opts?:
    | UseFetchOptions<
        T extends void ? unknown : T,
        (res: T extends void ? unknown : T) => T extends void ? unknown : T,
       //@ts-ignore
        KeyOfRes<
          (res: T extends void ? unknown : T) => T extends void ? unknown : T
        >
      >
    | undefined,
    checkSession: boolean = true
){
  const config = useRuntimeConfig().public

  const dsStore = useCookie('dsStore', {
    sameSite: 'none',
    path: '/',
    secure: true,
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 7
  })

  const dsLanguage = useCookie('dsLanguage', {
    sameSite: 'none',
    path: '/',
    secure: true,
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 7
  })

  if(!dsStore.value) {
    dsStore.value = config.storeId
  }

  if(!dsLanguage.value) {
    dsLanguage.value = config.languageId
  }
 
  if(process.client && checkSession) {
      $axios('checkSession', {
        headers: {
          dsstore: config.storeId,
          dslanguage: config.languageId,
          dsCustomer: useCookie('dsCustomer').value,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
      }).then((response => {
      if(response.data && response.data != 'exist') {
        const customer = useCookie('dsCustomer', { maxAge: 182 * 24 * 60 * 12 * 2 })
        customer.value = response.data
      }
    }))
  }
  //@ts-ignore
  return useFetch<T>(request, {
    baseURL: config.apiBaseURL,
    headers: {
      dsstore: config.storeId,
      dslanguage: config.languageId,
      'Access-Control-Allow-Origin': '*', 
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    ...opts,
  })
}