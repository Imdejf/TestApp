<script lang="ts" setup>
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import { useApplication } from "./stores/application";
import { useCart } from "./stores/cart";

const application = useApplication();
const cart = useCart();

useHead({
  script: [
    {
      src: "https://www.czater.pl/assets/modules/chat/js/chat.js",
      async: true,
      tagPosition: "bodyClose",
    },
    {
      innerHTML: `
          window.$czater = {
            tok: "5d4c696e9ee36d71ff6f20f8c5a2dc3ef0e3c4fe",
            domain: "https://www.czater.pl/",
            login: undefined,
            email: undefined,
          };
        `,
      tagPosition: "bodyClose",
    },
  ],
});
</script>

<template>
  <Html lang="pl">
    <Body
      class="text-blue-900 overflow-x-hidden font-nunito bg-gray-50"
      :class="`${
        application.topMenuIsOpen ? 'overflow-hidden wrapper-scroll' : ''
      } ${cart.addCartResult ? 'overflow-hidden wrapper-scroll' : ''}
      ${application.questionProduct ? 'overflow-hidden wrapper-scroll' : ''}`"
    >
      <div v-if="cart.addCartResult" class="relative" style="z-index: 9999">
        <ModalAddToCartResult />
      </div>
      <div
        v-if="application.questionProduct"
        class="absolute"
        style="z-index: 9999"
      >
        <ModalQuestionProduct />
      </div>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<style>
.wrapper-scroll {
  height: 100vh;
  padding-right: 17px;
}
</style>
