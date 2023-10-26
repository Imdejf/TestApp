<script lang="ts" setup>
import { ref } from "vue";
const propsInput = defineProps({
  optionId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  values: {
    type: Array,
    required: true,
  },
  displayValues: {
    type: Object,
    required: false,
    default: null,
  },
});
const currentSelect = ref<String | null>(null);
const variantActive = ref(false);
const emits = defineEmits(["updateValue"]);

const toggleVariant = () => {
  variantActive.value = !variantActive.value;
};

const selectOption = (value: string) => {
  currentSelect.value = value;
  const newValue = {
    optionId: propsInput.optionId,
    value: value,
  };
  emits("updateValue", newValue);
};

const isColor = () => {
  const allExist = propsInput.values.every((key) => {
    if (
      key in propsInput.displayValues &&
      propsInput.displayValues[key].displayType === 1
    ) {
      return true;
    }
    return false;
  });
  return allExist;
};

const currentColor = (key: string) => {
  const color = propsInput.displayValues[key];
  return color.value.toString();
};
</script>

<template>
  <div
    @click="toggleVariant()"
    class="py-4 border-b flex relative items-center justify-between"
  >
    <p class="text-md leading-4 text-gray-800">{{ name }}</p>
    <div class="flex items-center justify-center">
      <p class="text-sm leading-none text-gray-600">
        {{ currentSelect }}
      </p>
      <div
        v-if="isColor() && currentSelect !== null"
        class="w-6 h-6 ml-3 mr-4 cursor-pointer"
        :style="'background: ' + currentColor(currentSelect) + ''"
      ></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="text-gray-400 w-5 h-5"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.41z"
        />
      </svg>
    </div>

    <div
      class="absolute w-full z-10 mt-4 top-10 px-1 rounded-md border ease-in-out duration-300 bg-white shadow-lg"
      role="menu"
      :class="variantActive ? 'opacity-100' : 'opacity-0 invisible'"
    >
      <div class="flow-root py-2">
        <div class="-my-2 divide-y py-4 flex gap-1 flex-wrap justify-center">
          <a
            v-for="(value, index) in values"
            :key="index"
            @click="selectOption(value.toString())"
            :class="currentSelect === value ? 'bg-emerald-300' : ''"
            class="inline-block w-[45%] rounded-full p-[2px] hover:bg-emerald-200 focus:ring active:text-opacity-75"
            style="border: 2px solid gray"
          >
            <span
              class="block cursor-pointer rounded-full px-4 py-2 text-sm font-medium hover:bg-transparent"
            >
              <span
                v-if="isColor()"
                class="py-0.5 px-3 rounded-full mr-2"
                :style="'background: ' + currentColor(value) + ''"
              ></span>
              {{ value }}
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
