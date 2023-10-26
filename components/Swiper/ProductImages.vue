<script lang="ts" setup>
// import Swiper core and required modules
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

import { ref } from "vue";
import VueEasyLightbox from "vue-easy-lightbox";

const thumbsSwiper = ref(null);
const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
});

const setThumbsSwiper = (swiper: Swiper) => {
  thumbsSwiper.value = swiper;
};

const isVisible = ref(false);
const currentImgIndex = ref(0);

const showLightbox = (index) => {
  currentImgIndex.value = index;
  isVisible.value = true;
};

const hideLightbox = () => {
  isVisible.value = false;
};
</script>

<template>
  <div class="md:flex md:flex-row-reverse w-full">
    <Swiper
      :loop="true"
      :navigation="true"
      :thumbs="{ swiper: thumbsSwiper }"
      :centeredSlides="true"
      :slidesPerView="'auto'"
      :modules="[Navigation, Pagination, Thumbs, FreeMode]"
      class="h-[200px] md:h-[300px] w-4/5 m-auto"
    >
      <SwiperSlide v-for="(image, index) in images" :key="image">
        <img
          :src="image.thumbnailUrl"
          :alt="image.altAttribute"
          class="w-full h-full md:w-[80%] md:h-[300px] object-contain md:object-fit"
          @click="showLightbox(index)"
        />
      </SwiperSlide>
    </Swiper>
    <Swiper
      @swiper="setThumbsSwiper"
      :spaceBetween="10"
      :slidesPerView="4"
      :loop="images.length >= 4 ? true : false"
      :freeMode="false"
      :direction="'vertical'"
      :breakpoints="{
        '640': {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        '1024': {
          slidesPerView: 5,
          spaceBetween: 10,
        },
      }"
      :modules="[Navigation, Pagination, Thumbs, FreeMode]"
      class="swiper_image_vertical swiper_product h-[150px] md:h-[400px] w-1/5 !hidden md:!block !m-0"
    >
      <SwiperSlide v-for="image in images" :key="image">
        <img
          :src="image.thumbnailUrl"
          :alt="image.altAttribute"
          class="w-[60px] h-[60px]"
        />
      </SwiperSlide>
    </Swiper>
    <VueEasyLightbox
      :visible="isVisible"
      :imgs="images.map((img) => img.thumbnailUrl)"
      :index="currentImgIndex"
      @hide="hideLightbox"
    />
  </div>
</template>

<style>
.swiper_product {
}

.swiper_product .swiper-slide {
  width: 70px;
  height: 70px !important;
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 24px;
}

.swiper_image_vertical .swiper-slide {
  opacity: 0.5;
}

.swiper_image_vertical .swiper-slide-thumb-active {
  opacity: 1;
  border-radius: 10px;
  border: 2px solid #6ee7b7 !important;
}

.vel-img {
  background: white;
}
</style>
