<template>
  <UCard>
    <template #header>
      <h1 class="text-2xl text-center">Faça login para acessar a plataforma</h1>
      <a href="/auth/google" class="block">
        <UButton block label="Login con Google" color="primary" size="lg">
          <template #leading>
            <!-- <IconGoogle /> -->
          </template>
        </UButton>
      </a>
 
    </template>
  </UCard>
</template>

<script setup>
definePageMeta({
  layout: "auth",
});
</script>

<style lang="scss" scoped></style>
