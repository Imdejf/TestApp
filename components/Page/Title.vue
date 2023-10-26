<script lang="ts" setup>
const props = defineProps({
  textNav: {
    type: Array as () => Array<{ text: string; slug: string }>,
    default: () => [],
  },
});

const checkSlug = computed(() => {
  const x = props.textNav.length;
  if (x - 2 < 0) {
    return {
      text: "Olmag.pl",
      slug: "/",
    };
  } else {
    return props.textNav[x - 2];
  }
  return x;
});
</script>

<template>
  <nav
    aria-label="breadcrumb"
    class="2xl:container mx-auto"
    style="display: flex"
  >
    <ol
      class="md:mx-10 2xl:mx-0 my-3 hidden md:flex relative w-full items-center gap-1 text-sm text-gray-600 overflow-x-auto"
    >
      <li>
        <NuxtLink to="/" rel="next" class="flex transition hover:text-gray-700">
          <span class="sr-only"> Home </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Olmag.pl
        </NuxtLink>
      </li>

      <li
        v-for="(text, index) in textNav"
        :key="text.slug"
        class="flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
        <NuxtLink
          :href="text.slug"
          class="block transition hover:text-gray-700 overflow-hidden whitespace-nowrap overflow-ellipsis"
        >
          {{ text.text }}
        </NuxtLink>
      </li>
    </ol>
    <NuxtLink :to="checkSlug.slug" rel="next" class="flex md:hidden p-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5 my-auto text-green-400"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M16 22L6 12L16 2l1.775 1.775L9.55 12l8.225 8.225L16 22Z"
        />
      </svg>
      <span class="text-base font-semibold text-green-400"
        >{{ checkSlug.text }}
      </span>
    </NuxtLink>
  </nav>
</template>

<style>
/*  WebKit (Chrome, Edge) */
ol.md\:mx-10::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

ol.md\:mx-10::-webkit-scrollbar-track {
  background: #f1f1f1;
}

ol.md\:mx-10::-webkit-scrollbar-thumb {
  background: #6ee7b7;
  border-radius: 5px;
}

ol.md\:mx-10::-webkit-scrollbar-thumb:hover {
  background: #34d399;
}

/* Firefox */
ol.md\:mx-10 {
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}
</style>
