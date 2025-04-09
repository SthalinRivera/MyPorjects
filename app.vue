<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>


<script setup lang="ts">
useHead({
  title: '𝗦𝘂𝗻𝘀𝗵𝗶𝗻𝗲 | 𝗔𝗰𝗰𝗲𝘀𝗼𝗿𝗶𝗼𝘀, 𝗝𝗼𝘆𝗮𝘀 𝘆 𝗺𝗮́𝘀',
  meta: [
    { name: 'description', content: '𝗦𝘂𝗻𝘀𝗵𝗶𝗻𝗲 | 𝗔𝗰𝗰𝗲𝘀𝗼𝗿𝗶𝗼𝘀, 𝗝𝗼𝘆𝗮𝘀 𝘆 𝗺𝗮́𝘀' }
  ],
  bodyAttrs: {
    class: 'test'
  },
  script: [{ innerHTML: 'console.log(\'Si has llegado hasta aqui no eres normal jajaj xd:\')' }]
})
</script>
