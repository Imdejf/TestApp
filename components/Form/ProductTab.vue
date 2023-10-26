<script lang="ts" setup>
const props = defineProps({
  products: {
    type: Array,
    default: 1,
  },
});
</script>
<template>
  <div class="section__category__items container mx-auto block sm:px-2 md:pr-0">
    <div v-for="product in products" :key="product.id" class="mb-7">
      <div class="bg-white w-full rounded-lg border border-gray-300 shadow-md">
        <div
          class="border-b-2 md:flex border-emerald-100 border-solid <lg:border-b-2"
        >
          <div class="flex md:hidden gap-3 w-full justify-end">
            <BannerRibbonNew v-show="product.isNew" />
            <BannerRibbonSales v-show="product.isSales" />
            <BannerRibbonBestseller
              v-show="!product.isNew && product.isBestseller"
            />
            <div class="h-8 w-auto flex">
              <strong
                class="inline-flex float-right items-center gap-1 rounded-tl-xl rounded-bl-xl bg-[#00309a] py-1.5 px-3 text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-[10px] h-[10px] text-[#ffd700]"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="m256 46.305l-9.404 19.054l-21.03 3.056l15.217 14.832l-3.592 20.945L256 94.305l18.81 9.888l-3.593-20.945l15.217-14.832l-21.03-3.057L256 46.304zM167.566 72.63l-9.404 19.056l-21.03 3.056l15.218 14.832l-3.592 20.946l18.808-9.89l18.81 9.89l-3.593-20.946L198 94.742l-21.03-3.056l-9.404-19.055zm176.868 0l-9.405 19.056L314 94.742l15.217 14.832l-3.592 20.946l18.81-9.89l18.807 9.89l-3.592-20.946l15.217-14.832l-21.03-3.056l-9.403-19.055zm-243.868 67.425l-9.404 19.054l-21.03 3.056l15.218 14.832l-3.592 20.945l18.808-9.888l18.81 9.888l-3.593-20.945L131 162.166l-21.03-3.057l-9.404-19.055zm310.868 0l-9.405 19.054l-21.03 3.056l15.217 14.832l-3.592 20.945l18.81-9.888l18.807 9.888l-3.592-20.945l15.217-14.832l-21.03-3.057l-9.403-19.055zM76.566 228.55l-9.404 19.054l-21.03 3.056l15.218 14.832l-3.592 20.945l18.808-9.888l18.81 9.887l-3.593-20.945L107 250.66l-21.03-3.056l-9.404-19.055zm358.868 0l-9.405 19.054L405 250.66l15.217 14.832l-3.592 20.945l18.81-9.888l18.807 9.887l-3.592-20.945l15.217-14.832l-21.03-3.056l-9.403-19.055zm-334.868 89.897l-9.404 19.055l-21.03 3.057l15.218 14.83l-3.592 20.946l18.808-9.89l18.81 9.89l-3.593-20.945L131 340.56l-21.03-3.058l-9.404-19.055zm310.868 0l-9.405 19.055L381 340.56l15.217 14.83l-3.592 20.946l18.81-9.89l18.807 9.89l-3.592-20.945l15.217-14.83l-21.03-3.058l-9.403-19.055zm-243.868 65.746l-9.404 19.055l-21.03 3.057l15.218 14.832l-3.592 20.945l18.808-9.89l18.81 9.89l-3.593-20.945L198 406.305l-21.03-3.057l-9.404-19.055zm176.868 0l-9.405 19.055l-21.03 3.057l15.217 14.832l-3.592 20.945l18.81-9.89l18.807 9.89l-3.592-20.945l15.217-14.832l-21.03-3.057l-9.403-19.055zm-88.61 23.614l-9.404 19.056l-21.03 3.055l15.217 14.834l-3.59 20.943l.385-.203l-.035.203L256 455.898l18.633 9.797l-.035-.203l.386.203l-3.59-20.943l15.215-14.834l-21.03-3.055l-9.404-19.056l-.176.355l-.176-.355z"
                  />
                </svg>

                <span class="text-[7.5px] w-max font-medium sm:text-9px"
                  >Produkcja UE</span
                >
              </strong>
            </div>
          </div>
          <NuxtLink :to="'/' + product.slug" rel="next" class="flex w-full">
            <h2
              class="py-4 mx-8 w-full float-left font-bold text-blue-900 leading-none text-xl hover:cursor-pointer hover:text-green-400"
            >
              {{ product.name }}
            </h2>
          </NuxtLink>
          <div class="hidden md:flex gap-3 w-fit justify-end">
            <BannerRibbonNew v-show="product.isNew" />
            <BannerRibbonSales v-show="product.isSales" />
            <BannerRibbonBestseller v-show="product.isBestseller" />
            <div class="h-8 w-auto flex">
              <strong
                class="inline-flex float-right items-center gap-1 rounded-tl-xl rounded-bl-xl bg-[#00309a] py-1.5 px-3 text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-[20px] h-[20px] text-[#ffd700]"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="m256 46.305l-9.404 19.054l-21.03 3.056l15.217 14.832l-3.592 20.945L256 94.305l18.81 9.888l-3.593-20.945l15.217-14.832l-21.03-3.057L256 46.304zM167.566 72.63l-9.404 19.056l-21.03 3.056l15.218 14.832l-3.592 20.946l18.808-9.89l18.81 9.89l-3.593-20.946L198 94.742l-21.03-3.056l-9.404-19.055zm176.868 0l-9.405 19.056L314 94.742l15.217 14.832l-3.592 20.946l18.81-9.89l18.807 9.89l-3.592-20.946l15.217-14.832l-21.03-3.056l-9.403-19.055zm-243.868 67.425l-9.404 19.054l-21.03 3.056l15.218 14.832l-3.592 20.945l18.808-9.888l18.81 9.888l-3.593-20.945L131 162.166l-21.03-3.057l-9.404-19.055zm310.868 0l-9.405 19.054l-21.03 3.056l15.217 14.832l-3.592 20.945l18.81-9.888l18.807 9.888l-3.592-20.945l15.217-14.832l-21.03-3.057l-9.403-19.055zM76.566 228.55l-9.404 19.054l-21.03 3.056l15.218 14.832l-3.592 20.945l18.808-9.888l18.81 9.887l-3.593-20.945L107 250.66l-21.03-3.056l-9.404-19.055zm358.868 0l-9.405 19.054L405 250.66l15.217 14.832l-3.592 20.945l18.81-9.888l18.807 9.887l-3.592-20.945l15.217-14.832l-21.03-3.056l-9.403-19.055zm-334.868 89.897l-9.404 19.055l-21.03 3.057l15.218 14.83l-3.592 20.946l18.808-9.89l18.81 9.89l-3.593-20.945L131 340.56l-21.03-3.058l-9.404-19.055zm310.868 0l-9.405 19.055L381 340.56l15.217 14.83l-3.592 20.946l18.81-9.89l18.807 9.89l-3.592-20.945l15.217-14.83l-21.03-3.058l-9.403-19.055zm-243.868 65.746l-9.404 19.055l-21.03 3.057l15.218 14.832l-3.592 20.945l18.808-9.89l18.81 9.89l-3.593-20.945L198 406.305l-21.03-3.057l-9.404-19.055zm176.868 0l-9.405 19.055l-21.03 3.057l15.217 14.832l-3.592 20.945l18.81-9.89l18.807 9.89l-3.592-20.945l15.217-14.832l-21.03-3.057l-9.403-19.055zm-88.61 23.614l-9.404 19.056l-21.03 3.055l15.217 14.834l-3.59 20.943l.385-.203l-.035.203L256 455.898l18.633 9.797l-.035-.203l.386.203l-3.59-20.943l15.215-14.834l-21.03-3.055l-9.404-19.056l-.176.355l-.176-.355z"
                  />
                </svg>

                <span class="text-[10px] w-max font-medium sm:text-9px"
                  >Produkcja UE</span
                >
              </strong>
            </div>
          </div>
        </div>
        <div class="block md:flex">
          <NuxtLink :to="'/' + product.slug" class="block md:flex w-full">
            <div class="block md:flex w-full hover:cursor-pointer">
              <div
                class="md:py-7 w-1/5 py-3 pl-4 mx-auto w-60 md:mx-0 self-center"
              >
                <img
                  :data-src="
                    product.thumbnailImage?.mediaLangs[0].filePath
                      ? product.thumbnailImage?.mediaLangs[0].filePath
                      : product.thumbnailImage
                  "
                  :alt="
                    product.thumbnailImage?.mediaLangs[0].altAttribute
                      ? product.thumbnailImage?.mediaLangs[0].altAttribute
                      : product.thumbnailImage.altAttribute
                  "
                  class="lazyload md:w-[120px] md:h-[120px] w-[120px] h-[120px] mx-auto"
                />
              </div>
              <div
                class="md:py-7 w-full text-center md:text-left mx-auto md:w-4/5 mx-auto md:mx-0 py-3 text-sm px-3 md:self-center"
              >
                <p
                  class="product_content h-[200px] product-visible-text !flex"
                  v-html="
                    product.productLang[0]?.shortDescription
                      ? product.productLang[0]?.shortDescription
                      : product.shortDescription
                  "
                ></p>
              </div>
            </div>
          </NuxtLink>
          <div
            class="md:py-4 py-3 md:px-4 border-t-2 md:border-l-2 md:border-t-0 border-solid border-emerald-100 text-center md:text-left px-2.5 w-full md:w-5/12 xl:w-4/12 pr-4"
          >
            <div class="rounded">
              <div class="text-sm">
                <div class="flex justify-center md:justify-start">
                  <div class="">
                    <span
                      v-show="product.oldPrice"
                      class="ml-[50%] table line-through decoration-red-400 font-bold text-lg text-red-500"
                    >
                      {{ product?.oldPrice?.toFixed(2) }}zł
                    </span>
                    <strong
                      class="font-600 md:text-3xl text-xl text-emerald-500"
                    >
                      {{ product?.price?.toFixed(2) }} zł
                    </strong>
                  </div>
                </div>
                <span
                  class="font-600 whitespace-md:nowrap text-md text-[11px] text-gray-400"
                >
                  {{ (product?.price * (1 + 0.23)).toFixed(2) }}
                  (brutto)
                </span>
                <div class="flex items-center justify-center md:justify-start">
                  <span class="text-12px block">Cena z 30 dni:</span>
                  <span class="ml-1 font-600">3999,99 zł</span>
                </div>
              </div>
            </div>

            <div class="mt-3 w-full flex justify-center">
              <FormQuantityInput
                class="w-1/5 md:w-1/3"
                @update:value="product.stockQuantity = $event"
              />
              <div
                class="w-1/2 md:w-full bg-green-400 rounded-r-xl rounded hover:bg-green-300 focus:outline-none focus:ring active:bg-green-600"
              >
                <button
                  class="h-full flex mx-auto items-center text-sm font-500 text-white"
                  @click="addToCart(product)"
                  v-if="!product.hasVariation"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M8.5 19a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 8.5 19ZM19 16H7a1 1 0 0 1 0-2h8.491a3.013 3.013 0 0 0 2.885-2.176l1.585-5.55A1 1 0 0 0 19 5H6.74a3.007 3.007 0 0 0-2.82-2H3a1 1 0 0 0 0 2h.921a1.005 1.005 0 0 1 .962.725l.155.545v.005l1.641 5.742A3 3 0 0 0 7 18h12a1 1 0 0 0 0-2Zm-1.326-9l-1.22 4.274a1.005 1.005 0 0 1-.963.726H8.754l-.255-.892L7.326 7ZM16.5 19a1.5 1.5 0 1 0 1.5 1.5a1.5 1.5 0 0 0-1.5-1.5Z"
                    />
                  </svg>
                  Dodaj do koszyka
                </button>
                <NuxtLink
                  v-if="product.hasVariation"
                  :to="'/' + product.slug"
                  class="h-full flex mx-auto items-center text-sm font-500 text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M8.5 19a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 8.5 19ZM19 16H7a1 1 0 0 1 0-2h8.491a3.013 3.013 0 0 0 2.885-2.176l1.585-5.55A1 1 0 0 0 19 5H6.74a3.007 3.007 0 0 0-2.82-2H3a1 1 0 0 0 0 2h.921a1.005 1.005 0 0 1 .962.725l.155.545v.005l1.641 5.742A3 3 0 0 0 7 18h12a1 1 0 0 0 0-2Zm-1.326-9l-1.22 4.274a1.005 1.005 0 0 1-.963.726H8.754l-.255-.892L7.326 7ZM16.5 19a1.5 1.5 0 1 0 1.5 1.5a1.5 1.5 0 0 0-1.5-1.5Z"
                    />
                  </svg>
                  <span class="w-full text-center"> Wybierz wariant </span>
                </NuxtLink>
              </div>
            </div>
            <div class="hidden md:flex mt-3 p-2">
              <div
                class="w-full items-center flex p-1 text-center rounded"
                style="border: 1px solid gainsboro"
              >
                <div class="w-1/8 ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1c-9.39 0-17-7.61-17-17c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02l-2.2 2.2z"
                    />
                  </svg>
                </div>
                <div class="w-7/8 mx-auto">
                  <span class="block"> lub zamów telefonicznie </span>
                  <a
                    href="tel:698 304 621"
                    class="text-blue-900 font-bold hover:underline hover:cursor-pointer"
                  >
                    698 304 621
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex md:hidden mx-16 mt-0 md:mt-3 p-2">
          <div
            class="w-full items-center flex p-1 text-center rounded"
            style="border: 1px solid gainsboro"
          >
            <div class="w-1/8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1c-9.39 0-17-7.61-17-17c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02l-2.2 2.2z"
                />
              </svg>
            </div>
            <div class="w-7/8 mx-auto">
              <span class="block"> lub zamów telefonicznie </span>
              <a
                href="tel:698 304 621"
                class="text-blue-900 font-bold hover:underline hover:cursor-pointer"
              >
                698 304 621
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.product_content p {
  margin: auto;
}
</style>
