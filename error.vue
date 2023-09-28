<template>
  {{ error.statusCode }}
  <button @click="handleError">Clear errors</button>
</template>

<script setup>
const props = defineProps({
  error: Object,
});

// if (props.error.statusCode == 410) {
//   showError({ message: "Gone", statusCode: 410 });
//   throw createError({ message: "Gone", statusCode: 410 });
// }

// if (props.error.statusCode == 404) {
//   showError({ message: "Page not found", statusCode: 404 });
// }

const handleError = () => clearError({ redirect: "/" });
</script>
