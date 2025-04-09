<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>


<script setup lang="ts">
useHead({
  title: 'Stravi',
  meta: [
    { name: 'description', content: 'Donde  encontrarás lo que buscas.' }
  ],
  bodyAttrs: {
    class: 'test'
  },
  script: [{ innerHTML: 'console.log(\'Hello world\')' }]
})
</script>
