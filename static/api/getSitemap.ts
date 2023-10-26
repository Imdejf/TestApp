import fs from 'fs';
import axios from 'axios';
import { SitemapDTO } from '~/types/Sitemap/SitemapDTO';

export async function fetchSitemapProducts(storeId: string, apiBaseURL: string) {
  try {
    const data = await axios.get(apiBaseURL + "sitemap/GetAllProductToSiteMap",
        {
        method: "GET",
        params: { storeId: storeId },
        }
    )
    const productsJSON = JSON.stringify(data.data);
    fs.writeFile('data/sitemap/sitemapProduct.json', productsJSON, (err) => {
      if (err) {
        console.error('Błąd zapisu produktów do pliku sitemap:', err);
      } else {
        console.log('Sitemapa produtków została zapisana do pliku SitemapProduct.json');
      }
    });
  } catch (error) {
    console.error('Błąd pobierania produktów do sitemap:', error);
  }
}

export async function fetchSitemapCategories(storeId: string, apiBaseURL: string) {
    try {
      const data = await axios.get(apiBaseURL + "sitemap/GetAllCategoryToSiteMap",
          {
          method: "GET",
          params: { storeId: storeId },
          }
      )

      const mappedCategory = data.data.map(item => ({
        ...item,
        slug: `/category/${item.slug}`
      }));

      const productsJSON = JSON.stringify(mappedCategory);
      fs.writeFile('data/sitemap/sitemapCategory.json', productsJSON, (err) => {
        if (err) {
          console.error('Błąd zapisu kategorii do pliku sitemap:', err);
        } else {
          console.log('Sitemapa kategorii została zapisana do pliku SitemapCategory.json');
        }
      });
    } catch (error) {
      console.error('Błąd pobierania kategorii do sitemap:', error);
    }
}

export async function fetchSitemapBlogs(storeId: string, apiBaseURL: string) {
    try {
      const data = await axios.get(apiBaseURL + "sitemap/GetAllBlogCategoryToSiteMap",
          {
          method: "GET",
          params: { storeId: storeId },
          }
      )

      const mappedBlog = data.data.map(item => ({
        ...item,
        slug: `/blog/${item.slug}`
      }));

      const productsJSON = JSON.stringify(mappedBlog);
      fs.writeFile('data/sitemap/sitemapBlog.json', productsJSON, (err) => {
        if (err) {
          console.error('Błąd zapisu blogów do pliku sitemap:', err);
        } else {
          console.log('Sitemapa blogów została zapisana do pliku SitemapBlog.json');
        }
      });
    } catch (error) {
      console.error('Błąd pobierania blogów do sitemap:', error);
    }
}

export async function fetchSitemapPost(storeId: string, apiBaseURL: string) {
    try {
      const data = await axios.get(apiBaseURL + "sitemap/GetAllBlogItemToSiteMap",
          {
          method: "GET",
          params: { storeId: storeId },
          }
      )

      const mappedPost = data.data.map(item => ({
        ...item,
        slug: `/post/${item.slug}`
      }));

      const productsJSON = JSON.stringify(mappedPost);
      fs.writeFile('data/sitemap/sitemapPost.json', productsJSON, (err) => {
        if (err) {
          console.error('Błąd zapisu postów do pliku sitemap:', err);
        } else {
          console.log('Sitemapa postów została zapisana do pliku SitemapPost.json');
        }
      });
      } catch (error) {
        console.error('Błąd pobierania postów do sitemap:', error);
      }
}