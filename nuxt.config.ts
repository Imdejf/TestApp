import { GlobalSettings } from "./environmentsettings"
import { defineNuxtConfig } from 'nuxt/config'
import axios from "axios";
import { fetchCategories, fetchBlogs, fetchProducts } from "./static/api/getData"
import { fetchSitemapProducts, fetchSitemapCategories, fetchSitemapBlogs, fetchSitemapPost } from "./static/api/getSitemap";

const appEnv = process.env.ENV || 'development'

export default defineNuxtConfig({
  site: {
    url: GlobalSettings[appEnv].hostURL
  },
  nitro: {
      routeRules: {
        'olmag.blob.core.windows.net/olmag/**/*.webp': { headers: { 'cache-control': 's-maxage=31536000' } },
        "/public/assets/**": { headers: { 'cache-control': `public,max-age=${31536000},s-maxage=${31536000}` } },
        "/_nuxt/**": { headers: { 'cache-control': `public,max-age=${31536000},s-maxage=${31536000}` } },
        'www.czater.pl/**/*': { headers: { 'cache-control': 'public,max-age=31536000,s-maxage=31536000' } },
      },
      prerender: {
          crawlLinks:true
      },
  },
  experimental: {
    payloadExtraction: false
  },

  hooks: {
    async 'nitro:config'(nitroConfig) {
        if (nitroConfig.dev) {
            return
        }
        await siteMapGeneration();
        await saveDataToFile();
        const blogSlugs = await getBlogRoutes();
        const postSlugs = await getPostRoutes();
        const categorySlugs = await getCategory();
        const productSlugs = await getProduct();
        nitroConfig.prerender.routes.push(...blogSlugs, ...postSlugs, ...categorySlugs, ...productSlugs)
        return
    }
},

sitemap: {
  xsl: false,
  cacheTtl: 1000 * 60 * 60 * 24, // 1 day
  inferStaticPagesAsRoutes: false,
},
routeRules: {
  '/': { sitemap: { 
    changefreq: 'daily', 
    priority: 1.0.toFixed(1)
  },
},
'/checkout/**': { index: false },
'/search/**': { index: false },
'/account/**': { index: false },
'/about-us': { sitemap: {
  changefreq: 'daily', 
  priority: 0.9
  }     
},
'/About-Cookies' : { index: false },
'/about-cookies': { sitemap: {
  changefreq: 'daily',
  priority: 0.9
  }     
},
'/blog': { sitemap: {
  changefreq: 'daily', 
  priority: 0.9
  }     
},
'/contact': { sitemap: {
  changefreq: 'daily', 
  priority: 0.9
  }     
},
'/login': { sitemap: {
  changefreq: 'daily', 
  priority: 0.9
  }     
},
'/payment': { sitemap: {
  changefreq: 'daily', 
  priority: 0.9
  }     
},
'/category': { sitemap: {
  changefreq: 'daily', 
  priority: 0.9
  }     
},
'/privacy-policy': { sitemap: {
  changefreq: 'daily', 
  priority: 0.9
  }     
},
'/register': { sitemap: {
  changefreq: 'daily', 
  priority: 0.9
  }     
},
'/terms-of-use': { sitemap: {
  changefreq: 'daily', 
  priority: 0.9
  }     
},
},
robots: {
  sitemap: '/sitemap.xml'
},


  css: [
    '@/assets/css/main.css',
  ],

  build: {
    transpile: ['@headlessui/vue', '@vee-validate/rules'],
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  app: {
    head: {
      title: "Wyposażenie magazynów - Najlepsze rozwiązania, niske ceny | Olmag.pl",
      meta: [
        {
          name: "description",
          content: "Olmag.pl to sklep oferujący wyposażenie magazynowe od najlepszych producentów - 📦 pojemniki magazynowe, 📦 drabiny aluminiowe, 📦 regały magazynowe oraz inne."
        },
        {
          name: "format-detection",
          content: "telephone=no"
        }
      ],
      link: [
        {
          rel: "dns-prefetch",
          href: "https://www.googletagmanager.com",
          crossorigin: "anonymous"
        },
        {
          rel: "dns-prefetch",
          href: "https://www.czater.pl",
          crossorigin: "anonymous"
        }
      ],
    }
  },

  runtimeConfig: {
    public: {
      siteEnvironment: GlobalSettings[appEnv].siteEnvironment,
      baseURL: GlobalSettings[appEnv].baseURL,
      apiBaseURL: GlobalSettings[appEnv].apiBaseURL,
      hostURL: GlobalSettings[appEnv].hostURL,
      gtm_id: GlobalSettings[appEnv].googleTagManagerKey,
      gtm_enabled: GlobalSettings[appEnv].googleTagManagerEnabled,
      gtm_debug: GlobalSettings[appEnv].googleTagManagerDebug,
      storeId: GlobalSettings[appEnv].storeId,
      languageId: GlobalSettings[appEnv].languageId,
    }
  },

  modules: [
    'nuxt-jsonld',
    '@pinia/nuxt',
    'nuxt-simple-sitemap',
    'nuxt-simple-robots',
    ['nuxt-gtag', {
      id: GlobalSettings[appEnv].google_analytics_id,
      initialConsent: false,
    }],
  ],
})

const getBlogRoutes = async () => {
  const blogsList = await axios.get(GlobalSettings[appEnv].apiBaseURL + 'product/blogCategory/slugs', {
    params: {
      storeId: GlobalSettings[appEnv].storeId,
      build: true
    }
  })

  return blogsList.data.map((category) => `/blog/${category}`);
};

const getPostRoutes = async () => {
  const postList = await axios.get(GlobalSettings[appEnv].apiBaseURL + 'product/blogItem/slugs', {
    params: {
      storeId: GlobalSettings[appEnv].storeId,
      build: true
    }
  })
  return postList.data.map((post) => `/post/${post}`);
};

const getCategory = async () => {
  const categoryList = await axios.get(GlobalSettings[appEnv].apiBaseURL + 'product/category/slugs', {
    params: {
      storeId: GlobalSettings[appEnv].storeId,
      build: true
    }
  })
  return categoryList.data.map((category) => `/category/${category}`);
};

const getProduct = async () => {
  const productList = await axios.get(GlobalSettings[appEnv].apiBaseURL + 'product/slugs', {
    params: {
      storeId: GlobalSettings[appEnv].storeId,
      build: true
    }
  })

  return productList.data.map((product) => `/${product}`);
};


const saveDataToFile = async () => {
  await fetchCategories(GlobalSettings[appEnv].storeId, GlobalSettings[appEnv].languageId, GlobalSettings[appEnv].apiBaseURL);
  await fetchBlogs(GlobalSettings[appEnv].storeId, GlobalSettings[appEnv].languageId, GlobalSettings[appEnv].apiBaseURL);
  await fetchProducts(GlobalSettings[appEnv].storeId, GlobalSettings[appEnv].languageId, GlobalSettings[appEnv].baseURL);
}

const siteMapGeneration = async () => {
  await fetchSitemapProducts(GlobalSettings[appEnv].storeId, GlobalSettings[appEnv].apiBaseURL)
  await fetchSitemapCategories(GlobalSettings[appEnv].storeId, GlobalSettings[appEnv].apiBaseURL)
  await fetchSitemapBlogs(GlobalSettings[appEnv].storeId, GlobalSettings[appEnv].apiBaseURL)
  await fetchSitemapPost(GlobalSettings[appEnv].storeId, GlobalSettings[appEnv].apiBaseURL)
}

//https://github.com/Smef/nuxt-ssg-issue-demo/tree/main