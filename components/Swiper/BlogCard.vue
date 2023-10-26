<script lang="ts" setup>
// import Swiper core and required modules
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

const props = defineProps({
  blogs: {
    type: Object,
    default: null,
  },
});
</script>
<template>
  <Swiper
    :modules="[Navigation, Pagination]"
    :breakpoints="{
      '640': {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      '1024': {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      '1640': {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    }"
    :pagination="{
      clickable: true,
    }"
    :navigation="true"
  >
    <SwiperSlide v-for="blog in blogs" :key="blog.id">
      <div class="mx-auto max-w-screen-xl">
        <div class="mt-8 h-sm">
          <article
            class="overflow-hidden rounded-lg border border-gray-100 shadow-sm"
          >
            <img
              :data-src="
                blog.thumbnailImage.mediaLangs[0].filePath
                  ? blog.thumbnailImage.mediaLangs[0].filePath
                  : blog.thumbnailImage.filePath
              "
              class="lazyload w-full h-[220px]"
              :alt="
                blog.thumbnailImage.mediaLangs[0].altAttribute
                  ? blog.thumbnailImage.mediaLangs[0].altAttribute
                  : blog.thumbnailImage.altAttribute
              "
            />

            <div class="md:p-4 p-6 bg-slate-300">
              <NuxtLink :to="'/blog/' + blog.slug" rel="next">
                <h3 class="text-lg font-medium text-gray-900">
                  {{ blog.name }}
                </h3>
              </NuxtLink>

              <div
                class="mt-2 card-text text-sm leading-relaxed text-gray-600 blog_truncate-text"
                v-html="blog.shortDescription"
              ></div>

              <NuxtLink
                :to="'/blog/' + blog.slug"
                class="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-900 text_line section_text"
              >
                Czytaj więcej...

                <span
                  aria-hidden="true"
                  class="block transition group-hover:translate-x-0.5"
                >
                  &rarr;
                </span>
              </NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<style>
.blog_truncate-text p:not(:nth-child(1)) {
  display: none;
}

.blog_truncate-text p:nth-child(1) {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
