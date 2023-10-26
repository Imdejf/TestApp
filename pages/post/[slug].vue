<script lang="ts" setup>
import axios from "axios";
import categoriesData from "~/data/blog/blogs.json";

definePageMeta({
  layout: "page",
});

const config = useRuntimeConfig().public;
const route = useRoute();

const { data: post, error } = await useAsyncData(
  route.params.slug.toString(),
  async () => {
    const categories = categoriesData;

    const searchPost = await findSlugInData(
      categories,
      route.params.slug.toString()
    );

    if (!searchPost) {
      showError({ message: "Page not found", statusCode: 404 });
    }

    return searchPost;
  }
);

useJsonld(() => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.value.name,
  url: config.hostURL + post.value.slug,
  description: post.value.description,
  articleSection: "Blog",
  publisher: {
    "@type": "Organization",
    name: "Olmag.pl",
    url: "https://olmag.pl",
    contactPoint: {
      "@type": "ContactPoint",
      email: "sklep@olmag.pl",
      telephone: "+48 698 304 621",
    },
  },
}));

function findSlugInData(data, slug) {
  let foundItem = null;
  data.forEach((item) => {
    if (Array.isArray(item.blogItems)) {
      for (let i = 0; i < item.blogItems.length; i++) {
        if (item.blogItems[i].slug === slug) {
          foundItem = item.blogItems[i];
          break;
        }
      }
    }
  });

  return foundItem;
}
</script>

<template>
  <Head>
    <Title>{{ post?.metaTitle }}</Title>
    <Meta name="description" :content="post?.metaDescription" />
  </Head>
  <PageHeader>
    <PageTitle
      :textNav="[
        { text: 'Blog', slug: '/blog' },
        {
          text: `${post?.name}`,
          slug: `${post?.slug}`,
        },
      ]"
    ></PageTitle>
  </PageHeader>
  <PageBody>
    <div class="container m-auto text-blue-900 my-10">
      <PageWrapper class="container mx-auto flex gap-15">
        <PageSection class="w-1/4">
          <PageBlogNavigation />
        </PageSection>
        <PageSection class="product__section__title w-3/4">
          <h1 class="font-800 text-34px">{{ post?.name }}</h1>
          <div class="mt-10" v-html="post?.description"></div>
        </PageSection>
      </PageWrapper>
    </div>
  </PageBody>
</template>
