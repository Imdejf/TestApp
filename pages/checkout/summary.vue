<script lang="ts" setup>
import { Fetch } from "~~/composables/useFetch";
import { ref } from "vue";

// compiler macro
definePageMeta({
  layout: "page",
});

const order = ref(null);
const urlToPayment = ref("");

if (process.client) {
  const code = new URLSearchParams(window.location.search).get("orderId");

  // const test = await Fetch("/v1/PaymentPrzelewy/GetTransactionByUserId", {
  //   method: "get",
  //   params: {
  //     userId: useCookie("dsCustomer").value,
  //     orderId: code,
  //   },
  // });
  // const xxx = await test;
  // console.log(xxx.data.value);
}

onMounted(async () => {
  const code = new URLSearchParams(window.location.search).get("orderId");
  if (!code) {
    navigateTo("/");
  }

  $axios("/v1/PaymentPrzelewy/GetTransactionByUserId", {
    method: "GET",
    params: {
      userId: useCookie("dsCustomer").value,
      orderId: code,
    },
  }).then((response) => {
    urlToPayment.value = response.data.data;
  });

  $axios("/product/order/" + code, {
    method: "GET",
    params: {
      userId: useCookie("dsCustomer").value,
      orderId: code,
    },
  }).then((response) => {
    order.value = response.data.data;
  });
});
</script>

<template>
  <PageWrapper>
    <PageHeader class="container mx-auto block">
      <BannerSteps :value="3" />
    </PageHeader>
    <div class="bg-white">
      <PageBody>
        <PageSection>
          <FormCheckoutOrderConfirmationPaymentOnline
            :orderNumber="order?.number"
            :paymentMethod="order?.payment"
            :urlToPayment="urlToPayment"
            v-show="order?.payment == 0 || order?.payment == 2"
          ></FormCheckoutOrderConfirmationPaymentOnline>
          <FormCheckoutOrderConfirmationOnDelivery v-show="order?.payment == 1">
          </FormCheckoutOrderConfirmationOnDelivery>
        </PageSection>
      </PageBody>
    </div>
  </PageWrapper>
</template>
