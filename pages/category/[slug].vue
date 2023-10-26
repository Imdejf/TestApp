<script lang="ts" setup>
import axios from "axios";
import { useCart } from "~/stores/cart";
import categoriesData from "~/data/category/categories.json";
import { useRoute, useRouter } from "vue-router";

// compiler macro
definePageMeta({
  layout: "page",
});

const route = useRoute();
const router = useRouter();

const cart = useCart();
const config = useRuntimeConfig().public;

const productWithSelectedVariation = ref(null);
const variantInsideProductId = ref("");
const selectedValue = ref([]);
const unselectedOptions = ref([]);

const productResult = ref([]);
const allProductResult = ref(0);
const productsPerPage = 30;
const isSales = ref(route.query.isSales ? route.query.isSales : false);
const isNew = ref(route.query.isNew ? route.query.isNew : false);
const totalProducts = computed(() => allProductResult.value.length);
const query = ref("");
const pathWithoutDomain = computed(() => {
  return route.fullPath.replace(/^https?:\/\/[^/]+/, "");
});
const activePage = ref(route.query.page ? route.query.page : 1);
const selectedSort = ref("");
const pageCount = computed(() =>
  Math.ceil(totalProducts.value / productsPerPage)
);

const { data: categoryDetail, error } = await useAsyncData(
  route.params.slug.toString(),
  async () => {
    const category = categoriesData.find(
      (item) => item.slug === route.params.slug.toString()
    );
    if (!category) {
      showError({ message: "Page not found", statusCode: 404 });
    }
    return category;
  }
);

const setUpdateValue = (value, product) => {
  variantInsideProductId.value = product.productId;
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
    product.availableOptions != null &&
    product.availableOptions.length != 0
  ) {
    const selectedOptionIds = selectedValue.value.map(
      (option) => option.optionId
    );
    const availableOptionIds = product.availableOptions.map(
      (option) => option.optionId
    );
    const isOptionSelected = availableOptionIds.every((id) =>
      selectedOptionIds.includes(id)
    );

    if (isOptionSelected) {
      productWithSelectedVariation.value = findVariant(product);
      // product.value.price = currentProduct.value.price;
      // product.value.oldPrice = currentProduct.value.oldPrice;
      // product.value.productAvailability =
      //   currentProduct.value.productAvailability;
      // product.value.priceGross = currentProduct.value.priceGross;
    }
  }
};

function findVariant(product) {
  return product.variations.find((variant) => {
    const matchingOptions = selectedValue.value.every((selectedOption) => {
      const option = variant.options.find(
        (option) => option.optionId === selectedOption.optionId
      );

      return option && option.value === selectedOption.value;
    });
    return matchingOptions;
  });
}

useJsonld(() => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `${categoryDetail?.value.name}`,
  description: `${categoryDetail?.value.description}`,
  url: `${config.hostURL + categoryDetail?.value.slug}`,
  image: `${categoryDetail?.value.thumbnailImage.filePath}`,
  itemListElement: categoryDetail?.value.products.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Product",
      name: product.name,
      description: product.description,
      url: config.hostURL + product.slug,
      image: product.thumbnailImage.filePath,
      offers: {
        "@type": "Offer",
        priceCurrency: "PLN",
        price: product.price.toString(),
      },
    },
  })),
}));

if (error.value) {
  throw createError({ message: "Page not found", statusCode: 404 });
}

const addToCart = (product, parentId) => {
  cart.addToCart({
    parentProductId: parentId,
    id: product.productId,
    name: product.name,
    price: product.price,
    filePath: product.thumbnailImage.filePath,
    quantity: product.stockQuantity > 0 ? product.stockQuantity : 1,
  });
};

const addToCartVariation = (product, stockQuantity, parentId) => {
  cart.addToCart({
    parentProductId: parentId,
    id: product.id,
    name: product.name,
    price: product.price,
    filePath: product.thumbnailImage,
    quantity: stockQuantity > 0 ? stockQuantity : 1,
  });
};

const findKeyByValue = (
  key: string,
  displayValues: { [key: string]: { value: string } }
) => {
  for (const displayKey in displayValues) {
    if (
      displayValues.hasOwnProperty(displayKey) &&
      displayValues[displayKey].value === key
    ) {
      return displayKey;
    }
  }
  return null;
};

function performSearch() {
  let filteredProducts = categoryDetail?.value.products;

  let sortedProducts = [...filteredProducts];

  if (route.query.orderby === "pr_asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (route.query.orderby === "pr_desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (route.query.orderby === "na_asc") {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (isSales.value) {
    sortedProducts = sortedProducts.filter((product) => product.isSales);
  }

  if (isNew.value) {
    sortedProducts = sortedProducts.filter((product) => product.isNew);
  }

  allProductResult.value = sortedProducts;
  const startIndex = (activePage.value - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  productResult.value = sortedProducts.slice(startIndex, endIndex);
}

async function updateIsSales() {
  const queryParameters = { ...route.query };
  delete queryParameters.page;
  activePage.value = 1;
  if (isSales.value) {
    queryParameters.isSales = isSales.value;
  } else {
    delete queryParameters.isSales;
  }
  router.push({ query: queryParameters });
  await new Promise((resolve) => setTimeout(resolve, 200));

  performSearch();
}

async function updateIsNew() {
  const queryParameters = { ...route.query };
  delete queryParameters.page;
  activePage.value = 1;
  if (isNew.value) {
    queryParameters.isNew = isNew.value;
  } else {
    delete queryParameters.isNew;
  }
  router.push({ query: queryParameters });
  await new Promise((resolve) => setTimeout(resolve, 200));

  performSearch();
}

async function updateSort() {
  const queryParameters = { ...route.query };
  if (selectedSort.value) {
    queryParameters.orderby = selectedSort.value;
  } else {
    delete queryParameters.orderby;
  }
  router.push({ query: queryParameters });
  await new Promise((resolve) => setTimeout(resolve, 200));

  performSearch();
}

onMounted(() => {
  query.value = route.query.query || "";

  if (route.query.orderby) {
    selectedSort.value = route.query.orderby;
  } else {
    selectedSort.value = "";
  }

  performSearch();
});
</script>
<template>
  <Head>
    <Title>{{
      activePage > 1
        ? categoryDetail?.metaTitle + " #" + activePage
        : categoryDetail?.metaTitle
    }}</Title>
    <Meta name="description" :content="categoryDetail?.metaDescription" />
  </Head>
  <PageWrapper>
    <PageHeader>
      <PageTitle
        :textNav="[
          { text: 'Kategorie', slug: '/category' },
          {
            text: `${categoryDetail?.name}`,
            slug: `${categoryDetail?.slug}`,
          },
        ]"
      ></PageTitle>
    </PageHeader>
    <PageBody>
      <PageSection class="mb-6">
        <div class="warehouse-background h-auto px-4 py-8 md:p-8 text-white">
          <h1 class="text-center text-xl md:text-3xl font-black">
            {{ categoryDetail?.name }}
          </h1>
          <div
            v-if="activePage > 1 ? false : true"
            class="text-sm container mx-auto md:text-base font-medium mt-3 category-visible-text"
            v-html="categoryDetail?.description"
          ></div>
        </div>
      </PageSection>
      <PageSection>
        <div
          v-if="categoryDetail.childCategories.length > 0"
          class="md:container my-4 mx-4 md:mx-auto"
        >
          <div class="font-semibold text-2xl mb-2 mx-auto">Podkategorie</div>
          <div
            class="bg-white w-full rounded-lg border-1 border-gray-300 shadow-md"
          >
            <div class="p-5">
              <ul
                class="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-7 my-8"
              >
                <li
                  v-for="detail in categoryDetail.childCategories"
                  :key="detail.categoryId"
                >
                  <NuxtLink
                    :to="detail.slug"
                    class="group relative block w-full md:w-56 h-[200px] md:h-[250px]"
                  >
                    <span
                      class="absolute inset-0 border-2 rounded-3xl border-dashed border-gray-400"
                    ></span>

                    <div
                      class="relative flex flex-col h-full transform border items-end rounded-3xl bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2"
                    >
                      <div
                        class="w-full items-center h-3/5 flex justify-center"
                      >
                        <img
                          :src="
                            detail.thumbnailImage.mediaLangs[0].filePath
                              ? detail.thumbnailImage.mediaLangs[0].filePath
                              : detail.thumbnailImage.filePath
                          "
                          :alt="
                            detail.thumbnailImage.mediaLangs[0].altAttribute
                              ? detail.thumbnailImage.mediaLangs[0].altAttribute
                              : detail.thumbnailImage.altAttribute
                          "
                          height="120"
                          width="120"
                          class="hidden md:block"
                        />
                        <img
                          :data-src="
                            detail.thumbnailImage.mediaLangs[0].filePath
                              ? detail.thumbnailImage.mediaLangs[0].filePath
                              : detail.thumbnailImage.filePath
                          "
                          :alt="
                            detail.thumbnailImage.mediaLangs[0].altAttribute
                              ? detail.thumbnailImage.mediaLangs[0].altAttribute
                              : detail.thumbnailImage.altAttribute
                          "
                          height="80"
                          width="80"
                          class="lazyload md:hidden"
                        />
                      </div>
                      <div class="px-2 pb-4 m-auto transition-opacity h-2/5">
                        <h3
                          class="mt-4 text-sm md:text-base font-600 text-center"
                        >
                          {{
                            detail.categoriesLang[0].name
                              ? detail.categoriesLang[0].name
                              : detail.name
                          }}
                        </h3>
                      </div>

                      <div
                        class="w-full h-1/5 bg-blue-900 text-emerald-300 text-center text-xs rounded-b-3xl"
                      >
                        <span class="my-3 inline-block"
                          >{{ detail.productCategoryCount }} produktów</span
                        >
                      </div>
                    </div>
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </PageSection>
      <div class="md:flex md:gap-15 md:container mx-auto mx-4">
        <PageSection class="w-[30%] hidden md:block">
          <PageCategoryNavigation />
        </PageSection>
        <PageSection class="flex-auto mx-4 md:mx-0 md:w-[70%]">
          <PageSection class="block sm:px-2 md:pr-0">
            <SwiperRecentlyViewed />
          </PageSection>
          <PageSection>
            <div
              class="section__category__filters container mx-auto block <md:px-2 text-md"
            >
              <div class="py-5 md:pb-5 block md:flex items-center justify-end">
                <div class="mr-5">
                  <select
                    name="SearchFilterProduct"
                    id="SearchFilterProduct"
                    class="w-full h-full rounded-lg border-[1.5px] p-1 border-gray-300 text-gray-700 sm:text-sm"
                    v-model="selectedSort"
                    @change="updateSort"
                  >
                    <option value="">Domyślne</option>
                    <option value="pr_asc">Cena od najniższej</option>
                    <option value="pr_desc">Cena od najwyższej</option>
                    <option value="na_asc">Nazwa od A do Z</option>
                  </select>
                </div>
                <div class="flex justify-end my-3 md:my-0">
                  <div
                    class="form-group form-check text-center flex items-center"
                  >
                    <input
                      type="checkbox"
                      class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-emerald-400 checked:bg-emerald-400 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                      v-model="isNew"
                      @change="updateIsNew"
                    />
                    <label
                      class="form-check-label mr-5 inline-block text-gray-800 cursor-pointer text-xs"
                      >Nowości</label
                    >
                  </div>
                  <div
                    class="form-group form-check text-center flex items-center"
                  >
                    <input
                      type="checkbox"
                      class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-emerald-400 checked:bg-emerald-400 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                      v-model="isSales"
                      @change="updateIsSales"
                    />
                    <label
                      class="form-check-label mr-5 inline-block text-gray-800 cursor-pointer text-xs"
                      >Promocje</label
                    >
                  </div>
                </div>
                <div class="mr-5">
                  <FormFilterCollectionFilter />
                </div>
                <FormPagination
                  :href="pathWithoutDomain"
                  :pageCount="pageCount"
                  :activePage="activePage"
                />
              </div>
            </div>
          </PageSection>
          <div
            class="section__category__items container mx-auto block sm:px-2 md:pr-0"
          >
            <div
              v-if="categoryDetail?.products.length != 0"
              v-for="product in productResult"
              :key="product.id"
              class="mb-7"
            >
              <div
                class="bg-white w-full rounded-lg border border-gray-300 shadow-md"
              >
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
                  <NuxtLink
                    :to="'/' + product.slug"
                    rel="next"
                    class="flex w-full"
                  >
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
                  <div>
                    <NuxtLink
                      :to="'/' + product.slug"
                      class="block md:flex w-full"
                    >
                      <div class="block md:flex w-full hover:cursor-pointer">
                        <div
                          class="md:py-7 w-1/5 py-3 pl-4 mx-auto w-60 md:mx-0 self-center"
                        >
                          <img
                            :src="
                              product.thumbnailImage?.mediaLangs[0].filePath
                                ? product.thumbnailImage?.mediaLangs[0].filePath
                                : product.thumbnailImage
                            "
                            :alt="
                              product.thumbnailImage?.mediaLangs[0].altAttribute
                                ? product.thumbnailImage?.mediaLangs[0]
                                    .altAttribute
                                : product.thumbnailImage.altAttribute
                            "
                            class="md:w-[120px] md:h-[120px] w-[120px] h-[120px] mx-auto object-contain"
                          />
                        </div>
                        <div
                          class="md:py-7 w-full text-center md:text-left mx-auto md:w-4/5 mx-auto md:mx-0 py-3 text-sm px-3 md:self-center"
                        >
                          <p
                            class="product_content h-[200px] product-visible-text"
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
                      class="border-t border-gray-300 mb-4"
                      :class="`${
                        product.variations.length > 0 &&
                        product.availableOptions.length > 0
                          ? ''
                          : 'hidden'
                      }`"
                    >
                      <div>
                        <div>
                          <p
                            class="block font-bold text-sm md:text-lg mt-3 ml-2"
                          >
                            Wybierz wariant i zamawiaj szybciej...
                          </p>
                        </div>
                        <div
                          v-for="(
                            values, optionName
                          ) in product.availableOptions"
                          :key="optionName"
                        >
                          <FormDropdownProductHorizontal
                            :optionId="values.optionId"
                            :name="values.optionName"
                            :values="values.values"
                            :product="product"
                            :variations="product.variations"
                            :displayValues="product.optionDisplayValues"
                            @updateValue="setUpdateValue"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="md:py-4 py-3 md:px-4 border-t-2 md:border-l-2 md:border-t-0 border-solid border-emerald-100 text-center md:text-left px-2.5 w-full md:min-w-[250px] xl:w-4/12 pr-4"
                  >
                    <div class="rounded flex mx-auto">
                      <div class="text-sm mx-auto">
                        <div class="flex justify-center md:justify-start">
                          <div class="">
                            <span
                              v-show="
                                variantInsideProductId !== product.productId &&
                                product.oldPrice &&
                                product.oldPrice !== product.price
                              "
                              class="ml-[50%] table line-through decoration-red-400 font-bold text-lg text-red-500"
                            >
                              {{ product?.oldPrice?.toFixed(2) }}zł
                            </span>
                            <span
                              v-show="
                                productWithSelectedVariation?.oldPrice &&
                                productWithSelectedVariation?.oldPrice !==
                                  productWithSelectedVariation?.price
                              "
                              class="ml-[50%] table line-through decoration-red-400 font-bold text-lg text-red-500"
                            >
                              {{
                                productWithSelectedVariation?.oldPrice?.toFixed(
                                  2
                                )
                              }}zł
                            </span>
                            <strong
                              v-if="
                                variantInsideProductId !== product.productId
                              "
                              class="font-600 md:text-3xl text-xl text-emerald-500"
                            >
                              {{ product?.price?.toFixed(2) }} zł
                            </strong>
                            <strong
                              v-else
                              class="font-600 md:text-3xl text-xl text-emerald-500"
                            >
                              {{
                                productWithSelectedVariation?.price?.toFixed(2)
                              }}
                              zł
                            </strong>
                          </div>
                        </div>
                        <span
                          v-if="variantInsideProductId !== product.productId"
                          class="font-semibold whitespace-md:nowrap text-md text-[11px] text-gray-400"
                        >
                          {{ (product?.price * (1 + 0.23)).toFixed(2) }}
                          (brutto)
                        </span>
                        <span
                          v-else
                          class="font-semibold whitespace-md:nowrap text-md text-[11px] text-gray-400"
                        >
                          {{
                            (
                              productWithSelectedVariation?.price *
                              (1 + 0.23)
                            ).toFixed(2)
                          }}
                          (brutto)
                        </span>
                        <div
                          v-if="
                            (product.lowestHistoricalPrice &&
                              product.lowestHistoricalPrice > 0 &&
                              product.lowestHistoricalPrice !==
                                product.price) ||
                            product.oldPrice
                          "
                          class="flex items-center justify-center md:justify-start"
                        >
                          <span class="text-xs block"
                            >Najniższa cena z 30 dni:</span
                          >
                          <span
                            class="ml-1 text-xs font-bold"
                            v-if="variantInsideProductId !== product.productId"
                            >{{
                              product.lowestHistoricalPrice
                                ? product.lowestHistoricalPrice.toFixed(2)
                                : product.price.toFixed(2)
                            }}
                            zł</span
                          >
                          <span class="ml-1 text-xs font-bold" v-else
                            >{{
                              variantInsideProductId.lowestHistoricalPrice
                                ? variantInsideProductId.lowestHistoricalPrice?.toFixed(
                                    2
                                  )
                                : variantInsideProductId.price?.toFixed(2)
                            }}
                            zł</span
                          >
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
                          class="h-full flex mx-auto items-center text-sm font-semibold text-white"
                          @click="
                            addToCartVariation(
                              productWithSelectedVariation,
                              product.stockQuantity,
                              product.productId
                            )
                          "
                          v-if="
                            product.hasVariation &&
                            product.productId === variantInsideProductId
                          "
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
                        <button
                          class="h-full flex mx-auto items-center text-sm font-semibold text-white"
                          @click="addToCart(product, product.productId)"
                          v-if="
                            !product.hasVariation &&
                            product.productId !== variantInsideProductId
                          "
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
                          class="h-full flex mx-auto items-center text-sm font-semibold text-white"
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
                          <span class="w-full text-center">
                            Wybierz wariant
                          </span>
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
        </PageSection>
      </div>
    </PageBody>
  </PageWrapper>
</template>

<style>
.warehouse-background {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(3, 3, 3, 0.5)),
    url("/assets/content/warehouse.webp");
  background-size: 100% 100%;
}

.category-visible-text
  p:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(3)) {
  display: none;
}

.category-visible-text p:nth-child(3) {
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-visible-text {
  display: -webkit-box;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
