<script lang="ts" setup>
import { useCart } from "~/stores/cart";
import productsData from "~/data/product/products.json";

const cart = useCart();

// const lastItem = ref<CartItem | null>(null)

const product = ref(null);

const lastItem = computed((): CartItem => {
  product.value = productsData.find(
    (item) => item.id === cart.lastAddedItem.parentProductId
  );
  return cart.lastAddedItem;
});

const closeCartResult = () => {
  cart.addCartResult = false;
};
</script>

<template>
  <div class="fixed z-150 h-full w-full">
    <div
      class="w-full duration-500 ease-out fixed transition-all inset-0 bg-gray-900 opacity-80"
    ></div>
    <div class="flex w-full m-auto w-500 w-auto h-full">
      <div
        class="relative m-auto md:mx-auto xl:m-auto bg-white rounded-2xl shadow w-[100%] md:max-w-4xl"
      >
        <div class="flex items-start justify-between p-2 border-b rounded-t">
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            @click="closeCartResult()"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div class="modal_header mt-5 text-emerald-400">
          <div class="m-auto text-center">
            <Icon
              class="color-green-400 w-10 h-10"
              name="icon-park-outline:shopping-bag"
            />
            <span class="ml-2 align-middle font-black text-2xl"
              >Produkt został dodany do koszyka</span
            >
          </div>
        </div>
        <div class="modal__body block xl:pt-10 space-y-6">
          <div class="px-5 md:px-10 py-5">
            <div>
              <div class="flex">
                <div class="relative m-auto w-1/4">
                  <img
                    class="m-auto w-[120px] h-[120px] object-contain"
                    :src="lastItem?.filePath"
                    alt="zdjęcie produktu"
                  />
                </div>
                <div class="w-3/4 m-auto ml-10">
                  <div class="font-semibold text-18px">
                    {{ lastItem?.name }}
                  </div>
                  <div class="flex mt-3">
                    <span class="text-blue-900">{{ lastItem?.price }}zł</span>

                    <span class="ml-5 text-gray-400"
                      >Ilość: {{ lastItem?.quantity }} szt.</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <div class="flex justify-between mt-5 xl:mt-10">
              <div
                class="bg-[#eff0f2] hover:bg-blue-900 hover:text-emerald-400 text-gray-900 py-4 px-4 text-16px font-semibold rounded-full"
                @click="closeCartResult()"
              >
                <span class="p-4 text-xs md:text-lg">Kontynuuj zakupy</span>
              </div>
              <NuxtLink
                @click="closeCartResult()"
                href="/checkout/cart"
                class="bg-emerald-400 hover:bg-blue-900 hover:text-emerald-400 text-gray-900 py-4 px-4 text-16px font-extrabold rounded-full"
                ><span class="p-4 text-xs md:text-lg">Przejdź do koszyka</span>
              </NuxtLink>
            </div>
          </div>
          <div
            v-if="product?.relatedProducts.length > 0"
            class="modal__footer w-full block bg-[#eff0f2] items-center p-3 xl:p-6 space-x-2 border-t border-gray-200 rounded-2xl h-auto !mt-0"
          >
            <div class="mb-5 font-bold text-18px text-center">
              <span> Zobacz również:</span>
            </div>
            <SwiperAlsoCheck :products="product?.relatedProducts" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
