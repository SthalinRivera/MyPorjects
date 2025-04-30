<!-- components/ProductCard.vue -->
<template>
    <NuxtLink :to="{ name: 'product-id', params: { id: product.id.toString() } }"
        class="group bg-white dark:bg-slate-800 rounded-lg overflow-hidden hover:shadow-lg transition-transform duration-300 flex flex-col relative transform hover:-translate-y-1">
        <div class="flex-grow flex flex-col">
            <div class="relative w-full overflow-hidden rounded-lg">
                <div
                    class="w-full h-60 md:h-96 lg:h-[20rem] xl:h-[24rem] bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
                    <img :src="product.imageUrl" :alt="product.name" class="object-cover w-full h-full" />
                </div>
            </div>
            <div class="m-2">
                <div class="flex justify-between items-center mt-3 mb-2">
                    <span
                        class="text-xs font-medium bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-300 py-0.5 px-2 rounded-full">
                        {{ product.category ? product.category.name : 'No category' }}
                    </span>
                    <div v-if="product.stock > 0"
                        class="text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-slate-700 rounded-full px-2 py-0.5 text-xs font-medium">
                        {{ product.stock }} disponibles
                    </div>
                    <div v-else
                        class="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full px-2 py-0.5 text-xs font-medium animate-pulse">
                        AGOTADO
                    </div>
                </div>

                <h2 class="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">
                    {{ product.name }}
                </h2>
                <p class="text-gray-600 dark:text-gray-300 text-xs mt-1 line-clamp-1">
                    {{ product.description }}
                </p>

                <div class="mt-auto pt-2">
                    <div class="text-base font-bold text-gray-900 dark:text-white">
                        S/. {{ product.price }}
                    </div>
                </div>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
    product: {
        id: number
        name: string
        description: string
        price: number
        imageUrl: string
        stock: number
        category?: {
            name: string
        }
    }
}>();
</script>