<script lang="ts" setup>
import { useApplication } from "~/stores/application";
import categoriesData from "~/data/category/categories.json";

const config = useRuntimeConfig().public;
const application = useApplication();

// const { data: categories } = await useAsyncData<Category | []>(
//   "categories",
//   () => $fetch(config.hostURL + "data/category/categories.json")
// );

const { data: categories, error } = await useAsyncData<Category | []>(
  "categoriesNavigation",
  async () => {
    const result = categoriesData.filter((item) => item.includeInMenu === true);
    return result;
  }
);

const hoverCategoryDropDown = () => {
  application.changeTopMenu();
};
</script>

<template>
  <div class="max-h-[90%] w-full">
    <div>
      <div
        class="md:p-10 grid grid-cols-1 text-[10px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
      >
        <div
          v-for="category in categories"
          :key="category.name"
          class="flex self-center h-20 border-b-2 border-solid border-emerald-100 transform hover:scale-101 hover:shadow-md transition duration-400 ease-in-out"
        >
          <NuxtLink
            @click="hoverCategoryDropDown"
            :to="'/category/' + category.slug"
            class="w-full h-full flex items-center hover:text-green-500"
          >
            <img
              :data-src="
                category.thumbnailImage.mediaLangs[0].filePath
                  ? category.thumbnailImage.mediaLangs[0].filePath
                  : category.thumbnailImage.filePath
              "
              :alt="
                category.thumbnailImage.mediaLangs[0].altAttribute
                  ? category.thumbnailImage.mediaLangs[0].altAttribute
                  : category.thumbnailImage.altAttribute
              "
              class="lazyload"
              width="55"
              height="55"
            />
            <p class="w-full md:text-sm font-base break-normal ml-5 w-full">
              {{
                category.categoriesLang[0].name
                  ? category.categoriesLang[0].name
                  : category.name
              }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
