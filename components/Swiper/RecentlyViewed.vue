<script lang="ts" setup>
import productsData from "~/data/product/products.json";
import { ProductDTO } from "~/types/Product/productTypes";

// import Swiper core and required modules
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

const recentlyProductCookie = useCookie("recently");
const recentlyViewedProducts = ref<ProductDTO[]>([]); // Zakładając, że masz odpowiedni typ dla ProductType

onMounted(() => {
  if (recentlyProductCookie.value) {
    // Usuwanie elementów o wartości undefined
    const filteredValues = recentlyProductCookie.value.filter(
      (item) => item !== undefined
    );

    filteredValues.map((item) => {
      var currentProduct = productsData.find(
        (product) => product.id === item.id
      );
      if (currentProduct) {
        recentlyViewedProducts.value.push(currentProduct);
      }
    });
  }
});
</script>
<template>
  <div
    v-if="recentlyViewedProducts.length > 0"
    class="bg-white p-4 border-[1.5px] shadow-lg rounded-xl"
  >
    <div class="flex pb-4">
      <span class="font-bold distinction__title">Zobacz ponownie...</span>
    </div>
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
      <SwiperSlide v-for="product in recentlyViewedProducts" :key="product.id">
        <div
          class="border-[1.5px] p-3 relative transform hover:scale-102 hover:shadow-2xl transition duration-400 ease-in-out rounded-lg"
        >
          <div class="block">
            <img
              :src="product.thumbnailImage.filePath"
              :alt="product.thumbnailImage.altAttribute"
              class="mx-auto w-[75px] h-[75px] object-contain"
            />
            <NuxtLink :to="'/' + product.slug">
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
      </SwiperSlide>
    </Swiper>
  </div>
</template>
