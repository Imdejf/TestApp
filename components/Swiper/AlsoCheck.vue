<script lang="ts" setup>
// import Swiper core and required modules
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

const props = defineProps({
  products: {
    type: Array,
    required: true,
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
    <SwiperSlide v-for="product in products" :key="product.id">
      <div
        class="max-w-2xl mx-auto relative transform hover:scale-102 hover:shadow-2xl transition duration-400 ease-in-out rounded-lg"
      >
        <div class="bg-white py-2 shadow-md rounded-lg max-w-sm">
          <a>
            <img
              :data-src="product.thumbnailImage.filePath"
              :alt="product.thumbnailImage.altAttribute"
              class="lazyload mx-auto w-[100px] h-[100px]"
            />
          </a>
          <div class="px-2 pb-5">
            <NuxtLink :to="product.slug">
              <h3
                class="content card-text mb-3 text-center text-blue-900 font-600 text-sm tracking-tight h-[60px]"
              >
                {{ product.name }}
              </h3>
            </NuxtLink>
            <div class="text-center h-10">
              <div
                class="h-full relative flex flex-col justify-center items-center"
              >
                <span
                  v-if="product.oldPrice"
                  class="text-xs text-red-500 font-semibold ml-7 line-through absolute -top-1"
                >
                  {{ product.oldPrice }} zł
                </span>
                <span class="text-xl font-bold text-blue-400 block">
                  {{ product.price.toFixed(2) }} zł
                </span>
              </div>
            </div>
            <div class="pt-3">
              <NuxtLink
                :to="'/' + product.slug"
                class="block w-full text-center text-white rounded-xl font-600 bg-emerald-500 hover:bg-emerald-400/90 py-4 text-sm md:text-14px font-medium"
              >
                Sprawdź produkt!
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
</template>
