import axios from "axios"; 

export function $axios(endpoint:string, opts?) {
   const config = useRuntimeConfig().public
   const axiosInstance = axios.create({ 
      baseURL: config.apiBaseURL, 
      headers: { 
       dsstore: config.storeId,
       dslanguage: config.languageId,
      }, 
      withCredentials: true,
      ...opts
   });
   return axiosInstance.get(endpoint)
} 