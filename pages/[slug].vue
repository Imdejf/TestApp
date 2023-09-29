<script lang="ts" setup>
const route = useRoute();

if (route.path == "/dwa") {
  //   showError({ message: "Gone", statusCode: 410 });
  navigateTo("/410", { redirectCode: 410 });

  // throw createError({
  //   statusCode: 410,
  //   message: "Gone",
  //   fatal: true,
  // });
}

showError({ message: "Page not found", statusCode: 404 });

// showError({ message: "Page not found", statusCode: 404 });

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
