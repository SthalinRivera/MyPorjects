<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>


<script setup lang="ts">
useHead({
  title: 'FlorBelle | Productos de belleza, floreria y más',
  meta: [
    { name: 'description', content: 'FlorBelle | Productos de belleza, floreria y más' }
  ],
  bodyAttrs: {
    class: 'test'
  },
  script: [{ innerHTML: 'console.log(\'Si has llegado hasta aqui no eres normal jajaj xd:\')' }]
})
</script>
