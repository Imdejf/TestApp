<script lang="ts" setup>
const route = useRoute();

if (route.path == "/dwa") {
  showError({ message: "Gone", statusCode: 410, fatal: true });
}

const error404 = () => {
  throw createError({
    statusCode: 404,
    message: "not found",
    fatal: true,
  });
};
</script>
<template>
  <button @click="error404">Error404</button>
  <button @click="error410">Error410</button>
</template>
