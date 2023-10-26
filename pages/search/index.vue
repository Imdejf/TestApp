<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import productsData from "~/data/product/products.json";

definePageMeta({
  layout: "page",
});

const route = useRoute();
const router = useRouter();

const pathWithoutDomain = computed(() => {
  return route.fullPath.replace(/^https?:\/\/[^/]+/, "");
});

const query = ref("");
const productResult = ref([]);
const isSales = ref(route.query.isSales ? route.query.isSales : false);
const isNew = ref(route.query.isNew ? route.query.isNew : false);
const activePage = ref(route.query.page ? route.query.page : 1);
const productsPerPage = 30;
const allProductResult = ref(0);
const totalProducts = computed(() => allProductResult.value.length);
const pageCount = computed(() =>
  Math.ceil(totalProducts.value / productsPerPage)
);
const selectedSort = ref("");

async function updateSort() {
  const queryParameters = { ...route.query };
  if (selectedSort.value) {
    queryParameters.orderby = selectedSort.value;
  } else {
    delete queryParameters.orderby;
  }
  router.push({ query: queryParameters });
  await new Promise((resolve) => setTimeout(resolve, 100));

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

function performSearch() {
  let filteredProducts = productsData.filter((product) =>
    product.name.toLowerCase().includes(query.value.toLowerCase())
  );

  filteredProducts.sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    const queryLower = query.value.toLowerCase();

    const aIndex = aName.indexOf(queryLower);
    const bIndex = bName.indexOf(queryLower);

    if (aIndex < bIndex) return -1;
    if (aIndex > bIndex) return 1;

    if (aName < bName) return -1;
    if (aName > bName) return 1;

    return 0;
  });

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
</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle
        :textNav="[
          { text: 'Szukaj', slug: '/' },
          { text: query, slug: '/' },
        ]"
      >
      </PageTitle>
    </PageHeader>
    <PageBody>
      <PageSection class="container mx-auto block">
        <div class="pb-5 block md:flex items-center justify-end">
          <div class="flex justify-end mb-5 md:mb-0 mr-10 bg-slate-100">
            <div>
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
            <!-- <div class="form-group form-check text-center">
              <input
                type="checkbox"
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-emerald-400 checked:bg-emerald-400 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                v-model="isNew"
                @change="updateIsNew"
              />
              <label
                class="form-check-label mr-5 inline-block text-gray-800 cursor-pointer"
                >Nowości</label
              >
            </div>
            <div class="form-group form-check text-center">
              <input
                type="checkbox"
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-emerald-400 checked:bg-emerald-400 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                v-model="isSales"
                @change="updateIsSales"
              />
              <label
                class="form-check-label mr-5 inline-block text-gray-800 cursor-pointer"
                >Promocje</label
              >
            </div> -->
          </div>
          <div class="form-group form-check text-center">
            <FormPagination
              :href="pathWithoutDomain"
              :pageCount="pageCount"
              :activePage="activePage"
            />
          </div>
        </div>
      </PageSection>
      <PageSection>
        <div>
          <FormProductTab :products="productResult" />
        </div>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>

<style>
#SearchFilterProduct:focus {
  outline: none; /* Usuwa focus outline na wybranym elemencie */
  border: 1px solid #e5e7eb; /* Usuwa border na wybranym elemencie */
}
</style>
