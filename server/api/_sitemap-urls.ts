import sitemapProduct from "../../data/sitemap/sitemapProduct.json";
import siteMapCategory from "../../data/sitemap/sitemapCategory.json";
import sitemapBlog from "../../data/sitemap/sitemapBlog.json";
import sitemapPost from "../../data/sitemap/sitemapPost.json";

//server/api/_sitemap-urls.ts
export default cachedEventHandler(
  async (e) => {
    const products = await sitemapProduct;
    const category = await siteMapCategory;
    const blog = await sitemapBlog;
    const post = await sitemapPost;
  
    const combinedArray = ([] as { slug: string; lastModify: string; }[])
      .concat(products, category, blog, post);
  
    const mappedArray = combinedArray.map((p) => {
      return {
        loc: p.slug,
        lastmod: p.lastModify,
        changefreq: 'daily', 
        priority: 0.9
      };
    });
  
    return mappedArray;
  },
  {
    name: 'sitemap-dynamic-url',
    maxAge: 60 * 10, // cache URLs for 10 minutes
  }
);
