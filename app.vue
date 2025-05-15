<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>


<script setup lang="ts">
useHead({
  title: 'Sthalin Rivera | Portafolio y proyectos',
  meta: [
    { name: 'description', content: 'Sthalin Rivera | Portafolio y proyectos' }
  ],
  bodyAttrs: {
    class: 'test'
  },
  script: [{ innerHTML: 'console.log(\'Si has llegado hasta aqui no eres normal jajaj xd:\')' }]
})
</script>
