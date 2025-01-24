<template>
  <div class="my-4">
    <h1 class="text-slate-900  dark:text-slate-200 font-bold  text-2xl mb-4">Los mejores ofertas
    </h1>
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 z-10">
      <div v-for="product in products" :key="product.id"
        class="max-w-md bg-white dark:bg-gray-800 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-500">
        <div class="p-4">
          <img class="rounded-xl" :src="`${product.imageUrl}`" :alt="product.name" />
          <div class="flex justify-between mt-3 items-center">
            <div class="items-center mt-2">
              <h1 class="text-lg text-gray-900 dark:text-gray-400 font-semibold"> {{ product.category ?
                product.category.name : 'No category' }}</h1>
            </div>
            <UButton @click="favorites(product)">
              <div class="flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </div>
            </UButton>
          </div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">{{ product.name }}</h2>
          <p class="text-gray-600 dark:text-gray-400 mt-2">{{ product.description.slice(0, 60) }}{{
            product.description.length > 20 ? '...' : '' }}</p>
          <div class="mt-4 flex justify-between items-center">
            <!-- Precio del Producto -->
            <div class="text-xl text-gray-900 dark:text-gray-100 font-semibold">S/. {{ product.price }}
            </div>
            <!-- Stock Disponible -->
            <div class="bg-gray-200 text-gray-800 rounded-full px-4 py-1 text-sm">{{ product.stock }} in
              stock</div>
          </div>
        </div>
        <div class="flex p-6  justify-center ">
          <div class="flex  justify-between">

            <NuxtLink :to="{
              name: 'product-id',
              params: { id: product.id.toString() }
            }">
              <UButton label="Ver producto" color="gray"
                class="relative inline-flex items-center w-full justify-center px-6 py-3 text-base font-medium text-white bg-gray-600 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-400 transition-all duration-300 ease-in-out">

                <template #trailing>
                  <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5 ml-3" />
                </template>
              </UButton>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/interfaces/product';
import type { Record } from '~/interfaces/Record';
const id = 1;
const { data: products, error } = await useFetch('/api/v1/product/')
const { $toast } = useNuxtApp();
const { addToFavorites } = useProductStore();
const favorites = (product: Product) => {
  addToFavorites(product);
  $toast.success("Added to favorites!");
};
</script>
