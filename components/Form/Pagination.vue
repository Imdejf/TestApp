<script lang="ts" setup>
const props = defineProps({
  pageCount: {
    type: Number,
    default: 1,
  },
  activePage: {
    type: Number,
    default: 1,
  },
  href: {
    type: String,
  },
});

const emits = defineEmits();

const pages = computed(() => {
  const pagesArray = [];
  for (let i = 1; i <= props.pageCount; i++) {
    pagesArray.push(i);
  }
  return pagesArray;
});

const goToPage = (page: number) => {
  props.activePage = page;
  emits("toPage", page);
};

const changeHref = (existHref: string, value: number) => {
  if (existHref.includes("page=")) {
    if (value === 1) {
      return existHref.replace(/&?page=\d+/, ""); // Usunięcie parametru "page" z uwzględnieniem '&' przed nim
    } else {
      return existHref.replace(/page=\d+/, `page=${value}`);
    }
  } else {
    if (value === 1) {
      return existHref;
    } else {
      const separator = existHref.includes("?") ? "&" : "?";
      return `${existHref}${separator}page=${value}`;
    }
  }
};

const changeHrefNext = (existHref: string) => {
  const { activePage, pageCount } = props;

  if (existHref.includes("page=")) {
    if (+activePage + 1 >= pageCount) {
      return existHref.replace(/page=\d+/, `page=${pageCount}`);
    } else {
      return existHref.replace(/page=\d+/, `page=${+activePage + 1}`);
    }
  } else {
    const separator = existHref.includes("?") ? "&" : "?";
    return `${existHref}${separator}page=${+activePage + 1}`;
  }
};

const changeHrefPrev = (existHref: string) => {
  const { activePage } = props;

  if (existHref.includes("page=")) {
    if (activePage - 1 <= 1) {
      return existHref.replace(/&?page=\d+/, "");
    } else {
      return existHref.replace(/page=\d+/, `page=${activePage - 1}`);
    }
  } else {
    if (activePage === 1) {
      return existHref;
    }
  }
};
</script>
<template>
  <ol
    v-if="pageCount > 0"
    class="flex justify-center gap-1 text-xs font-medium"
  >
    <li>
      <a
        :href="changeHrefPrev(href)"
        class="prev_button inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
        :class="activePage <= 1 ? 'disabled' : ''"
      >
        <span class="sr-only">Prev Page</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
    </li>

    <li v-for="page in pages" :key="page">
      <a
        :href="changeHref(href, page)"
        class="block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
        :class="`${
          page == activePage
            ? 'border-green-100 bg-green-100 text-green-200'
            : ''
        }`"
      >
        {{ page }}
      </a>
    </li>

    <li>
      <a
        :href="changeHrefNext(href)"
        class="next_button inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
        :class="activePage >= pageCount ? 'disabled' : ''"
      >
        <span class="sr-only">Next Page</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
    </li>
  </ol>
</template>

<style>
.prev_button.disabled,
.next_button.disabled {
  pointer-events: none; /* Wyłącz klikalność elementu */
  background-color: #e5e7eb; /* Kolor tła dla wyłączonego elementu */
  color: #666; /* Kolor tekstu dla wyłączonego elementu */
  cursor: not-allowed; /* Zmień kursor na "not-allowed" */
}
</style>
