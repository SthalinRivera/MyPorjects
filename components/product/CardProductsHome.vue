<template>
  <div class="my-6">
    <h1
      class="text-slate-900 dark:text-white font-bold text-2xl mb-4 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-16 after:bg-pink-500 after:rounded-full pb-1">
      Accesorios destacados
    </h1>

    <div class="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      <ProductCardReusable v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCardReusable from './ProductCardReusable.vue';





const { data: products } = await useFetch('/api/v1/product/');
</script>