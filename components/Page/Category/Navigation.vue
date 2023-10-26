<script lang="ts" setup>
import { Category } from "~/types/Category/categoryTypes";
import categoriesData from "~/data/category/categories.json";

const config = useRuntimeConfig().public;

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
</script>

<template>
  <div
    class="rounded-xl border border-gray-100 bg-white p-4 w-full shadow-xl md:sticky md:top-[115px]"
  >
    <div class="p-3 xl:p-5 font-600 text-blue-900">
      <ul>
        <li
          v-for="category in categories"
          :key="category.categoryId"
          class="mt-2 text-sm xl:text-base"
        >
          <NuxtLink
            :to="category.slug"
            class="flex gap-4 items-center section_text"
          >
            <img
              class="w-[30px] h-[30px]"
              :src="category.thumbnailImage.filePath"
            />
            {{ category.name }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
