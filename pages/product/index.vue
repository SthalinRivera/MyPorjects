<template>
    <div>

        <div class="text-center py-12 px-4">
            <h1 class="text-4xl font-extrabold text-pink-600 dark:text-pink-300 mb-3">
                🎁 Colección exclusiva
            </h1>
            <p class="text-lg text-gray-700 dark:text-gray-200">
                Descubre productos únicos hechos especialmente para ti.
            </p>
        </div>
        <div class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 z-10">
            <div v-for="product in products" :key="product.id"
                class="bg-white dark:bg-slate-800 rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl border border-gray-100 dark:border-slate-700 transition-all duration-300 flex flex-col">
                <div class="p-4 flex-grow">
                    <div class="relative overflow-hidden rounded-xl mb-4 group">
                        <img class="w-full h-60 object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
                            :src="`${product.imageUrl}`" :alt="product.name" />
                        <div class="absolute top-2 right-2">
                            <UButton @click="favorites(product)"
                                class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-full p-2 hover:bg-pink-500 dark:hover:bg-pink-500 transition-all duration-300 shadow-md">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor"
                                    class="size-5 text-pink-500 dark:text-pink-400 hover:text-white dark:hover:text-white">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </UButton>
                        </div>
                    </div>

                    <div class="flex justify-between items-center">
                        <span
                            class="text-sm font-medium bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-300 py-1 px-3 rounded-full">
                            {{ product.category ? product.category.name : 'No category' }}
                        </span>
                        <div
                            class="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 rounded-full px-3 py-1 text-xs font-medium">
                            {{ product.stock }} in stock
                        </div>
                    </div>

                    <h2 class="text-xl font-bold text-gray-900 dark:text-white mt-3 line-clamp-1">{{ product.name }}
                    </h2>
                    <p class="text-gray-600 dark:text-gray-300 text-sm mt-2 line-clamp-2">{{
                        product.description.slice(0, 60) }}{{ product.description.length > 20 ? '...' : '' }}</p>

                    <div class="mt-4">
                        <div class="text-xl font-bold text-pink-600 dark:text-pink-400">S/. {{ product.price }}</div>
                    </div>
                </div>

                <div class="p-4 pt-0 mt-auto">
                    <NuxtLink :to="{
                        name: 'product-id',
                        params: { id: product.id.toString() }
                    }">
                        <UButton
                            class="w-full bg-gradient-to-r from-pink-500 to-pink-600 dark:from-pink-600 dark:to-pink-700 dark:text-white border-none py-3 rounded-xl hover:from-pink-600 hover:to-pink-700 dark:hover:from-pink-500 dark:hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg">
                            <span>Ver producto</span>
                            <template #trailing>
                                <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5 ml-2" />
                            </template>
                        </UButton>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from '#app';
import type { Product } from '~/interfaces/product';

const { $toast } = useNuxtApp();
const { addToFavorites } = useProductStore();
const { data: products, error } = await useFetch("/api/v1/product");

onMounted(() => {
    if (error.value) {
        $toast.error(error.value.statusMessage || "");
    }
});

const favorites = (product: Product) => {
    addToFavorites(product);
    $toast.success("Added to favorites!");
};
</script>

<style lang="css" scoped></style>