<script lang="ts" setup>
import { ProductDetailDTO } from "~/types/Product/productDetailTypes";
import { ProductAvailability } from "~/types/Product/productTypes";
import { useCart } from "~/stores/cart";
import { useApplication } from "~/stores/application";
import axios from "axios";
import productsData from "~/data/product/products.json";

definePageMeta({
  layout: "page",
});

const route = useRoute();

if (route.path.includes(".html")) {
  throw createError({ statusCode: 410, statusMessage: "Gone" });
}

const config = useRuntimeConfig().public;
const languageId = ref(useCookie("dsLanguage"));
//route.path.includes(".html")
const { data: product, error } = await useAsyncData(
  route.params.slug.toString(),
  async () => {
    const getProduct = productsData.find(
      (item) => item.slug === route.params.slug.toString()
    );

    if (!getProduct) {
      throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
    }

    return getProduct;
  }
);

const htmlDescription = computed(() => {
  console.log(product);
  const decodedHTML = decodeHtmlEntities(product.value.description);
  return decodedHTML;
});

function decodeHtmlEntities(input) {
  const doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}
if (product.value != null) {
  const recentlyProductCookie = useCookie("recently");

  let recentlyProducts = recentlyProductCookie.value || [];

  const isProductAlreadyAdded = recentlyProducts.some(
    (item) => item.id === product.value.id
  );

  if (!isProductAlreadyAdded) {
    recentlyProducts.push({
      id: product.value.id,
      time: new Date().toISOString(),
    });

    if (recentlyProducts.length > 10) {
      let oldestIndex = 0;
      let oldestTime = recentlyProducts[0].time;
      for (let i = 1; i < recentlyProducts.length; i++) {
        if (recentlyProducts[i].time < oldestTime) {
          oldestTime = recentlyProducts[i].time;
          oldestIndex = i;
        }
      }
      recentlyProducts.splice(oldestIndex, 1);
    }

    recentlyProductCookie.value = recentlyProducts;
  }
}

const materialValue = () => {
  const materialAttribute = product.value?.attributes.find(
    (attribute) => attribute.name === "Materiał"
  );
  return materialAttribute ? materialAttribute.value : null;
};

const weightValue = () => {
  const materialAttribute = product.value?.attributes.find(
    (attribute) => attribute.name === "Waga"
  );
  return materialAttribute ? materialAttribute.value : null;
};

useJsonld(() => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.value?.name,
  headline: product.value?.name,
  url: config.hostURL + product.value?.slug,
  description: product.value?.description,
  brand: "Olmag.pl",
  image: product.value?.thumbnailImage.filePath,
  offers: {
    "@type": "Offer",
    priceCurrency: "PLN",
    price: product.value?.price,
  },
  weight: weightValue(),
  material: materialValue(),
  productID: product.value?.sku,
}));

if (error.value) {
  throw createError({ message: "Page not found", statusCode: 404 });
}

const productImages = computed(() => {
  const filteredMediaViewsLangs = [];

  product.value.images.forEach((image) => {
    const mediaViewsLangs = image.mediaViewsLangs.filter(
      (mediaView) => mediaView.languageId === languageId.value
    );
    filteredMediaViewsLangs.push(...mediaViewsLangs);
  });

  return filteredMediaViewsLangs;
});

const productCategories = computed(() => {
  const categories = product.value.categories
    .map((category) => ({
      text: category.name,
      slug: "/category/" + category.slug,
    }))
    .reverse();

  categories.push({
    text: product.value.name,
    slug: product.value.slug,
  });

  return categories;
});

const selectedValue = ref([]);
const cart = useCart();
const productQuantity = ref(1);
const application = useApplication();

function getProductAvailabilityDescription(
  availability: ProductAvailability
): string {
  console.log(availability);
  switch (availability) {
    case ProductAvailability.Available:
      return "Dostępny";
    case ProductAvailability.TwentyFourToFourtyEight:
      return "24-48h";
    case ProductAvailability.UpToFiveBusinessDays:
      return "Do 5 dni roboczych";
    case ProductAvailability.SellerConfirmation:
      return "Potwierdzenie sprzedawcy";
    case ProductAvailability.ThreeToSevenDays:
      return "3-7 dni";
    case ProductAvailability.ThreeToTenDays:
      return "3-10 dni";
    case ProductAvailability.TwoWeeks:
      return "2 tygodnie";
    case ProductAvailability.ThreeWeeks:
      return "3 tygodnie";
    case ProductAvailability.ThreeToFiveWeeks:
      return "3-5 tygodni";
    case ProductAvailability.TemporarilyUnavailable:
      return "Tymczasowo niedostępny";
    case ProductAvailability.ToOrder:
      return "Do zamówienia";
    default:
      throw new Error(`Potwierdzenie sprzedawcy`);
  }
}

const productDescription = ref<string>(
  product.value?.productLang[0].description
);

const maxDescriptionLength = 600;
const showReadMoreButton = ref<boolean>(true);

const getDescriptionWithReadMore = computed(() => {
  productDescription.value = decodeHtmlEntities(
    product.value?.productLang[0].description
  );
  if (productDescription.value.length <= maxDescriptionLength) {
    showReadMoreButton.value = false;
    return productDescription.value;
  }
  if (showReadMoreButton.value === false) {
    return productDescription.value;
  } else {
    return productDescription.value.slice(0, maxDescriptionLength) + "...";
  }
});

const showMore = () => {
  showReadMoreButton.value = false;
  productDescription.value = "";
  productDescription.value = product.value.productLang[0].description;
};

const unselectedOptions = ref([]);

function findVariant() {
  return product.value.variations.find((variant) => {
    const matchingOptions = selectedValue.value.every((selectedOption) => {
      const option = variant.options.find(
        (option) => option.optionId === selectedOption.optionId
      );
      return option && option.value === selectedOption.value;
    });
    return matchingOptions;
  });
}

const currentProduct = ref(null);

const handleButtonClick = () => {
  if (
    product.value.availableOptions != null &&
    product.value.availableOptions.length != 0
  ) {
    const selectedOptionIds = selectedValue.value.map(
      (option) => option.optionId
    );
    const availableOptionIds = product.value.availableOptions.map(
      (option) => option.optionId
    );
    const isOptionSelected = availableOptionIds.every((id) =>
      selectedOptionIds.includes(id)
    );

    if (isOptionSelected) {
      currentProduct.value = findVariant();
      addToCart();
    } else {
      unselectedOptions.value = product.value.availableOptions.filter(
        (option) => {
          return !selectedValue.value.some(
            (selectedOption) => selectedOption.optionId === option.optionId
          );
        }
      );
    }
  } else {
    currentProduct.value = product.value;
    addToCart();
  }
};

const setUpdateValue = (value) => {
  const index = selectedValue.value.findIndex(
    (item) => item.optionId === value.optionId
  );

  if (index !== -1) {
    selectedValue.value[index] = value;
  } else {
    if (
      unselectedOptions.value.some(
        (unselectedOption) => unselectedOption.optionId === value.optionId
      )
    ) {
      unselectedOptions.value = unselectedOptions.value.filter(
        (unselectedOption) => unselectedOption.optionId !== value.optionId
      );
    }

    selectedValue.value.push(value);
  }

  if (
    product.value.availableOptions != null &&
    product.value.availableOptions.length != 0
  ) {
    const selectedOptionIds = selectedValue.value.map(
      (option) => option.optionId
    );
    const availableOptionIds = product.value.availableOptions.map(
      (option) => option.optionId
    );
    const isOptionSelected = availableOptionIds.every((id) =>
      selectedOptionIds.includes(id)
    );

    if (isOptionSelected) {
      currentProduct.value = findVariant();
      product.value.price = currentProduct.value.price;
      product.value.oldPrice = currentProduct.value.oldPrice;
      product.value.productAvailability =
        currentProduct.value.productAvailability;
      product.value.priceGross = currentProduct.value.priceGross;
    }
  }
};

const addToCart = () => {
  if (product.value.variations.length > 0) {
    cart.addToCart({
      parentProductId: product.value.id,
      id: currentProduct.value.id,
      name: currentProduct.value.name,
      price: currentProduct.value.price,
      quantity: productQuantity.value,
      filePath: currentProduct.value.thumbnailImage,
    });
  } else {
    cart.addToCart({
      parentProductId: product.value.id,
      id: currentProduct.value.id,
      name: currentProduct.value.name,
      price: currentProduct.value.price,
      quantity: productQuantity.value,
      filePath: currentProduct.value.thumbnailImage.filePath,
    });
  }
};
</script>

<template>
  <Head>
    <Title>{{ product?.productLang[0]?.metaTitle }}</Title>
    <Meta
      name="description"
      :content="product?.productLang[0]?.metaDescription"
    />
  </Head>
  <PageHeader>
    <PageTitle :textNav="productCategories"></PageTitle>
  </PageHeader>
  <PageBody>
    <PageWrapper class="flex flex-col">
      <PageSection class="product__section__title mx-5">
        <div v-if="product">
          <div
            class="2xl:container mx-auto shadow-base border-2 border-gray-100 w-full h-full block mb-2 rounded-md px-2 md:px-0 self-center h-full bg-white"
          >
            <div class="lg:border-b-2 border-dashed border-b-2">
              <BannerUS />
              <h1 class="text-xl py-4 mx-8 font-bold leading-none sm:text-2xl">
                {{ product?.name }}
              </h1>
            </div>
            <div class="mx-auto">
              <div class="md:flex md:flex-wrap block">
                <div class="py-4 px-5 md:w-4/6 flex">
                  <SwiperProductImages :images="productImages" />
                </div>
                <div
                  class="md:sticky top-[105px] block p-2 border-l-2 mt-13 md:mt-0 border-t-2 md:border-t-0 border-b-2 md:border-b-0 border-r-2 md:border-r-0 flex-1 md:w-2/6 border-dashed h-full"
                >
                  <div class="flex justify-end gap-2">
                    <BannerBestseller v-show="product.isBestseller" />
                    <BannerNew v-show="product.isNew" />
                    <BannerSales v-show="product.isSales" />
                  </div>
                  <form
                    class="space-y-2 border-2 rounded-xl p-3 shadow-lg mt-2"
                  >
                    <div class="rounded px-5 pb-6 border-b-3 border-dashed">
                      <p class="text-sm">
                        <span class="block font-semibold text-xl">
                          Cena produktu:
                        </span>
                      </p>
                      <p class="text-sm relative pt-4 w-65">
                        <span
                          v-if="product?.oldPrice"
                          class="absolute -top-1 ml-24 line-through decoration-red-700 font-semibold text-lg text-red-500"
                        >
                          {{ product?.oldPrice?.toFixed(2) }} zł
                        </span>
                        <strong class="font-semibold text-3xl text-blue-600">
                          {{ product?.price?.toFixed(2) }} zł
                        </strong>
                        <span class="font-semibold text-md text-gray-400">
                          {{ product?.priceGross?.toFixed(2) }} zł (brutto)
                        </span>
                      </p>
                      <p
                        v-if="
                          (product?.lowestHistoricalPrice &&
                            product?.lowestHistoricalPrice > 0 &&
                            product?.lowestHistoricalPrice !==
                              product?.price) ||
                          product?.oldPrice
                        "
                        class="flex mt-1"
                      >
                        <span class="text-xs">Najniższa cena z 30 dni:</span>
                        <span class="ml-1 text-xs font-bold">
                          {{ product?.lowestHistoricalPrice.toFixed(2) }} zł
                        </span>
                      </p>
                    </div>
                    <div
                      class="border-dashed border-[1px] border-[#e7e7e7] text-center padding-3"
                    >
                      <div class="flex justify-center my-4">
                        <p class="self-center">Kup i zapłać później</p>
                        <img
                          src="/assets/paypo.png"
                          class="max-h-[30px] w-auto"
                          width="273"
                          height="76"
                        />
                      </div>
                    </div>

                    <div class="px-5">
                      <div v-if="product.identificationCode" class="flex pt-3">
                        <p
                          class="text-sm md:text-md w-6/12 mr-7 font-semibold text-gray-400"
                        >
                          Kod produktu:
                        </p>
                        <p
                          class="text-sm md:text-md w-8/12 font-extrabold text-orange-500 self-center"
                        >
                          {{ product.identificationCode }}
                        </p>
                      </div>
                      <div class="flex">
                        <p
                          class="text-sm md:text-md w-6/12 font-semibold text-gray-400 mr-7"
                        >
                          Dostępność:
                        </p>
                        <p
                          class="text-sm md:text-md w-8/12 font-extrabold text-emerald-400 self-center"
                        >
                          {{
                            getProductAvailabilityDescription(
                              product?.productAvailability
                            )
                          }}
                        </p>
                      </div>
                      <div class="flex">
                        <p
                          class="text-sm md:text-md w-6/12 font-semibold text-gray-400 mr-7"
                        >
                          Jednostka:
                        </p>
                        <p
                          class="text-sm md:text-md w-8/12 self-center font-extrabold text-gray-600"
                        >
                          szt.
                        </p>
                      </div>
                      <div
                        v-if="
                          product.variations.length > 0 &&
                          product.availableOptions.length > 0
                        "
                      >
                        <p
                          class="font-semibold text-lg mt-8 w-full pb-4 border-b border-gray-300"
                        >
                          Wybierz wariant
                        </p>
                        <div
                          v-for="(
                            values, optionName
                          ) in product.availableOptions"
                          :key="optionName"
                        >
                          <FormDropdownProduct
                            :optionId="values.optionId"
                            :name="values.optionName"
                            :values="values.values"
                            :displayValues="product.optionDisplayValues"
                            @updateValue="setUpdateValue"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <span
                        class="block text-red-600"
                        v-for="unselectedOption in unselectedOptions"
                        :key="unselectedOption.optionId"
                      >
                        Musisz wybrać wariant: {{ unselectedOption.optionName }}
                      </span>
                    </div>
                    <div class="flex">
                      <FormQuantityInput
                        @update:value="productQuantity = $event"
                      />
                      <a
                        class="w-full block text-center rounded bg-emerald-400 hover:bg-emerald-500 px-6 py-3 text-xs md:text-sm font-bold uppercase tracking-wide text-white"
                        @click="handleButtonClick()"
                      >
                        Dodaj do koszyka
                      </a>
                    </div>
                    <div class="flex gap-2 text-orange-400">
                      <button
                        @click="application.changeQuestionProduct"
                        type="button"
                        class="w-full rounded border border-blue-900 bg-blue-900 py-3 text-[0.75rem] font-bold uppercase tracking-wide"
                      >
                        <Icon name="ic:round-question-mark" class="w-5 h-5" />
                        Zapytaj o produkt
                      </button>
                    </div>
                  </form>
                </div>
                <div class="md:w-4/6 relative">
                  <div class="pt-4">
                    <div class="mt-5 w-full px-4">
                      <div class="w-full">
                        <div>
                          <p
                            class="font-semibold text-lg border-b pb-3 border-gray-300"
                          >
                            Szczegóły produktu:
                          </p>
                          <ul class="list_details">
                            <li
                              class="details"
                              v-for="attribute in product.attributes"
                              :key="attribute.name"
                            >
                              <span class="justify-start">{{
                                attribute.name
                              }}</span>
                              <span class="justify-end">{{
                                attribute.value
                              }}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <!-- <div class="px-4 mt-5">
                      <p class="font-semibold text-lg">
                        Specyfikacja produktu:
                      </p>
                      <p
                        class="mt-4"
                        v-html="product.productLang[0].specification"
                      ></p>
                    </div> -->
                    <div class="px-4 mt-5 md:hidden">
                      <p class="font-semibold text-lg">Opis produktu:</p>
                      <p class="mt-4" v-html="htmlDescription"></p>
                      <!-- <button
                        class="text-blue-400"
                        v-if="showReadMoreButton"
                        @click="showMore"
                      >
                        Czytaj więcej...
                      </button> -->
                    </div>
                    <div class="px-4 mt-5 hidden md:block">
                      <p class="font-semibold text-lg">Opis produktu:</p>
                      <p
                        class="mt-4 section__description"
                        v-html="htmlDescription"
                      ></p>
                    </div>
                    <div v-if="product.relatedProducts.length > 0">
                      <p class="text-lg px-4 font-bold my-3">
                        Zobacz również...
                      </p>
                      <div class="bg-slate-300 p-5">
                        <SwiperProductRelated
                          :products="product.relatedProducts"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- <div class="h-90" v-if="product.relatedProducts.length > 0">
              <GridSwiperCheckAlos />
            </div> -->
            <!-- <div class="!-mb-10">
              <GridRecommendedForYou />
            </div> -->
          </div>
        </div>
      </PageSection>
      <PageSection class="section__entry mb-2">
        <div class="bg-slate-200">
          <div class="flex container mx-auto">
            <div
              class="hidden md:block md:p-3 md:w-1/4 text-blue-900 w-1/3 p-1"
            >
              <div class="p-4 px-0 flex">
                <div class="flex items-center mx-auto">
                  <div class="mr-1 md:mr-3 self-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="32"
                      viewBox="0 0 640 512"
                      class="w-6 md:w-7"
                    >
                      <path
                        fill="currentColor"
                        d="M112 0C85.5 0 64 21.5 64 48v48H16c-8.8 0-16 7.2-16 16s7.2 16 16 16h256c8.8 0 16 7.2 16 16s-7.2 16-16 16H48c-8.8 0-16 7.2-16 16s7.2 16 16 16h192c8.8 0 16 7.2 16 16s-7.2 16-16 16H16c-8.8 0-16 7.2-16 16s7.2 16 16 16h192c8.8 0 16 7.2 16 16s-7.2 16-16 16H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H112zm432 237.3V256H416v-96h50.7l77.3 77.3zM160 368a48 48 0 1 1 0 96a48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0a48 48 0 1 1-96 0z"
                      />
                    </svg>
                  </div>
                  <div class="block">
                    <span
                      class="self-center text-[9px] md:text-lg w-full md:font-semibold"
                      >Szybkie dostawy</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="md:p-3 md:w-1/4 text-blue-900 w-1/3 p-1">
              <div class="p-4 px-0 flex">
                <div class="flex mx-auto items-center">
                  <div class="mr-1 md:mr-3 self-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 256 256"
                      class="w-6 md:w-7"
                    >
                      <path
                        fill="currentColor"
                        d="M119.76 217.94A8 8 0 0 1 112 224a8.13 8.13 0 0 1-2-.24l-32-8a8 8 0 0 1-2.5-1.11l-24-16a8 8 0 1 1 8.88-13.31l22.84 15.23l30.66 7.67a8 8 0 0 1 5.88 9.7Zm132.69-96.46a15.89 15.89 0 0 1-8 9.25l-23.68 11.84l-15.08 15.09l-40 40a8 8 0 0 1-7.6 2.1l-64-16a8.06 8.06 0 0 1-2.71-1.25l-55.52-39.64l-24.28-12.14a16 16 0 0 1-7.16-21.46l24.85-49.69a16 16 0 0 1 21.46-7.16l22.06 11l53-15.14a8 8 0 0 1 4.4 0l53 15.14l22.06-11a16 16 0 0 1 21.46 7.16l24.85 49.69a15.9 15.9 0 0 1 .89 12.21ZM188 152.66l-27.71-22.19c-19.54 16-44.35 18.11-64.91 5a16 16 0 0 1-2.72-24.82a.6.6 0 0 1 .08-.08l44.86-43.51l-9.6-2.74l-50.42 14.41l-27.37 54.73l49.2 35.15l58.14 14.53Zm18.24-18.24L179.06 80h-31.82L104 122c12.66 8.09 32.51 10.32 50.32-7.63a8 8 0 0 1 10.68-.61l34.41 27.57Z"
                      />
                    </svg>
                  </div>
                  <div class="block">
                    <span
                      class="self-center text-[11px] md:text-lg w-full md:font-semibold"
                      >Negocjacje cen</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div
              class="md:p-3 md:w-1/4 text-blue-900 w-1/3 p-1 md:font-semibold"
            >
              <div class="p-4 px-0 flex">
                <div class="flex mx-auto items-center">
                  <div class="mr-1 md:mr-3 self-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      class="w-6 md:w-7"
                    >
                      <g fill="none" stroke="currentColor">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M6 9h4"
                          opacity=".5"
                        />
                        <path
                          stroke-width="1.5"
                          d="M20.833 10h-2.602C16.446 10 15 11.343 15 13s1.447 3 3.23 3h2.603c.084 0 .125 0 .16-.002c.54-.033.97-.432 1.005-.933c.002-.032.002-.071.002-.148v-3.834c0-.077 0-.116-.002-.148c-.036-.501-.465-.9-1.005-.933c-.035-.002-.076-.002-.16-.002Z"
                        />
                        <path
                          stroke-width="1.5"
                          d="M20.965 10c-.078-1.872-.328-3.02-1.137-3.828C18.657 5 16.771 5 13 5h-3C6.229 5 4.343 5 3.172 6.172C2 7.343 2 9.229 2 13c0 3.771 0 5.657 1.172 6.828C4.343 21 6.229 21 10 21h3c3.771 0 5.657 0 6.828-1.172c.809-.808 1.06-1.956 1.137-3.828"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-width="1.5"
                          d="m6 5l3.735-2.477a3.237 3.237 0 0 1 3.53 0L17 5"
                          opacity=".5"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17.991 13H18"
                          opacity=".5"
                        />
                      </g>
                    </svg>
                  </div>
                  <div class="block">
                    <span class="self-center text-[11px] md:text-lg w-full"
                      >Duże oszczędności</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div
              class="md:p-3 md:w-1/4 text-blue-900 w-1/3 p-1 md:font-semibold"
            >
              <div class="p-4 px-0 flex">
                <div class="flex mx-auto items-center">
                  <div class="mr-1 md:mr-3 self-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 14 14"
                      class="w-6 md:w-7"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          d="M6 10.08v2a.29.29 0 0 1-.29.28h-2.1a1.45 1.45 0 0 1-.88-.51"
                        />
                        <path
                          d="M2.73 11.86s-1.09-.95 1.44-3.48H5.3L3.61 5.59H.5l.85 1.09s-.57.1-.57.89a10 10 0 0 0 1.95 4.29Zm7.62-5.49l1.48-1a.26.26 0 0 1 .21 0a.26.26 0 0 1 .19.12l1.15 1.72a1 1 0 0 1 0 .89"
                        />
                        <path
                          d="M13.42 8s-.32 1.3-3.63 1v-.87l-1.94 2.54l1.84 2.83l.1-1.33s.37.45 1 0A18.73 18.73 0 0 0 13.42 8ZM4.35 4.28L3 3.66a.3.3 0 0 1-.14-.38L4 1a1 1 0 0 1 .74-.5m0 0s1.23 0 2.79 3l-.81 1h3.36l1.19-3.14l-1.4.43a1.21 1.21 0 0 0-.73-1A5.87 5.87 0 0 0 7 .5Z"
                        />
                      </g>
                    </svg>
                  </div>
                  <div class="block">
                    <span class="self-center text-[11px] md:text-lg w-full"
                      >Łatwe zwroty</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageSection>
    </PageWrapper>
  </PageBody>
</template>

<style>
.list_details {
}

.list_details .details:nth-child(odd) {
  background-color: #f3f4f6;
}

.details {
  border-bottom: 1px solid #cbd5e1;
  padding: 8px;
  justify-content: space-between;
  display: flex;
  gap: 15px;
}

.characteristics {
  border-bottom: 1px solid #cbd5e1;
  padding: 8px;
}

.section__description img {
  margin: 20px auto;
  max-width: 500px;
  max-height: 500px;
  object-fit: cover;
}
</style>
