<template>
    <div>

        <div>
            <h1
                class="text-slate-900 dark:text-white font-bold text-3xl mb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-20 after:bg-pink-500 after:rounded-full pb-2">
                Todos los productos
            </h1>
            <p class="text-lg text-gray-700 dark:text-gray-200 mb-2">
                Descubre productos únicos hechos especialmente para ti.
            </p>
        </div>


        <div class="mt-6">
            <!-- Encabezado -->
            <div class="">
                <h1
                    class="text-slate-900 dark:text-white font-bold text-3xl mb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-20 after:bg-pink-500 after:rounded-full pb-2">
                    Nuestras Categorías</h1>
                <p class="text-sm sm:text-base text-gray-500 dark:text-gray-400 my-4">
                    Explora nuestros productos por categoría
                </p>
            </div>

            <!-- Loading State -->
            <div v-if="pending" class="flex flex-col items-center justify-center py-16">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p class="text-gray-600 dark:text-gray-400">Cargando categorías...</p>
            </div>

            <!-- Empty State -->
            <div v-else-if="!data || data.length === 0"
                class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
                <div
                    class="mx-auto w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <i class="ri-folder-line text-3xl text-gray-400 dark:text-gray-500"></i>
                </div>
                <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-2">No hay categorías disponibles</h3>
                <p class="text-gray-500 dark:text-gray-400 mb-4">Pronto tendremos nuevas categorías para ti</p>
            </div>

            <!-- Categories Grid -->
            <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                <NuxtLink v-for="category in data" :key="category.id" :to="`/category/${category.id}`"
                    class="category-card bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-all duration-300 group">

                    <div class="p-5 flex flex-col items-center text-center h-full">
                        <!-- Icono/Imagen de categoría -->
                        <div
                            class="w-16 h-16 mb-4 rounded-full bg-pink-50 dark:bg-slate-700 flex items-center justify-center text-3xl text-pink-600 dark:text-pink-400 group-hover:bg-pink-100 dark:group-hover:bg-slate-600 transition-colors">
                            <i class="ri-folder-line"></i>
                        </div>

                        <!-- Nombre de categoría -->
                        <h3
                            class="font-semibold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                            {{ category.name }}
                        </h3>

                        <!-- Contador de productos -->
                        <span class="text-sm text-gray-600 dark:text-gray-300 mt-auto">
                            {{ category.productCount || 0 }} productos
                        </span>
                    </div>
                </NuxtLink>
            </div>
        </div>
        <div class="grid gap-3 sm:gap-4 md:gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 z-10">
            <div v-for="product in products" :key="product.id"
                class="bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl overflow-hidden cursor-pointer shadow-sm sm:shadow-md hover:shadow-xl border border-gray-100 dark:border-slate-700 transition-all duration-300 flex flex-col">
                <div class="p-3 sm:p-4 flex-grow">
                    <div class="relative overflow-hidden rounded-lg sm:rounded-xl mb-3 sm:mb-4 group">
                        <img class="w-full h-40 sm:h-60 object-cover rounded-lg sm:rounded-xl transition-transform duration-500 group-hover:scale-110"
                            :src="`${product.imageUrl}`" :alt="product.name" />
                        <div class="absolute top-2 right-2">
                            <UButton @click="toggleFavorite(product)" :class="[
                                'absolute top-2 right-2 backdrop-blur-sm rounded-full p-1.5 sm:p-2 transition-all duration-300 shadow-sm sm:shadow-md',
                                isFavorite(product.id)
                                    ? 'bg-pink-500 hover:bg-pink-600 text-white'
                                    : 'bg-white/80 dark:bg-slate-900/80 hover:bg-pink-500 dark:hover:bg-pink-500'
                            ]">
                                <UIcon name="i-heroicons-heart" class="w-4 h-4 sm:w-5 sm:h-5" :class="{
                                    'text-pink-500 dark:text-pink-400 hover:text-white dark:hover:text-white': !isFavorite(product.id),
                                    'text-slate-100': isFavorite(product.id)
                                }" dynamic />
                            </UButton>
                        </div>
                    </div>

                    <div class="flex justify-between items-center">
                        <span
                            class="text-xs sm:text-sm font-medium bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-300 py-0.5 sm:py-1 px-2 sm:px-3 rounded-full">
                            {{ product.category ? product.category.name : 'No category' }}
                        </span>
                        <div v-if="product.stock > 0"
                            class="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium">
                            {{ product.stock }} in stock
                        </div>
                        <div v-else
                            class="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium animate-pulse">
                            AGOTADO
                        </div>
                    </div>

                    <h2 class="text-sm sm:text-xl font-bold text-gray-900 dark:text-white mt-2 sm:mt-3 line-clamp-1">{{
                        product.name }}
                    </h2>
                    <p class="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mt-1 sm:mt-2 line-clamp-2">{{
                        product.description.slice(0, 60) }}{{ product.description.length > 20 ? '...' : '' }}</p>

                    <div class="mt-2 sm:mt-4">
                        <div class="text-base sm:text-xl font-bold text-pink-600 dark:text-pink-400">S/. {{
                            product.price }}</div>
                    </div>
                </div>

                <div class="p-3 sm:p-4 pt-0 mt-auto">
                    <NuxtLink :to="{
                        name: 'product-id',
                        params: { id: product.id.toString() }
                    }">
                        <UButton
                            class="w-full bg-gradient-to-r from-pink-500 to-pink-600 dark:from-pink-600 dark:to-pink-700 dark:text-white border-none py-2 sm:py-3 rounded-lg sm:rounded-xl hover:from-pink-600 hover:to-pink-700 dark:hover:from-pink-500 dark:hover:to-pink-600 transition-all duration-300 shadow-sm sm:shadow-md hover:shadow-lg">
                            <span class="text-xs sm:text-sm">Ver producto</span>
                            <template #trailing>
                                <UIcon name="i-heroicons-arrow-right-20-solid"
                                    class="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
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
definePageMeta({
    middleware: ['visit']
});
const { $toast } = useNuxtApp();
const { addToFavorites } = useProductStore();
const { data: products, error } = await useFetch("/api/v1/product");
const productStore = useProductStore();
onMounted(() => {
    if (error.value) {
        $toast.error(error.value.statusMessage || "");
    }
});

// Verificar si un producto está en favoritos
const isFavorite = (productId: number) => {
    return productStore.favorites.some(item => item.id === productId);
};

// Manejar favoritos
const toggleFavorite = (product: Product) => {
    if (isFavorite(product.id)) {
        productStore.deleteFavorites(product.id);
        $toast.success("Eliminado de favoritos");
    } else {
        productStore.addToFavorites(product);
        $toast.success("Agregado a favoritos");
    }
};



const { data, pending } = await useAsyncData(
    'categories',
    async () => {
        try {
            const { data: apiData } = await useFetch('/api/v1/category');

            return (apiData.value || [])
                .map((cat: any) => ({
                    ...cat,
                    productCount: cat._count?.products || 0
                }))
                .filter((cat: any) => cat.productCount > 0);
        } catch (error) {
            console.error("Error fetching categories:", error);
            return [];
        }
    },
    {
        // Opciones adicionales (opcional)
        server: true,  // Se ejecuta en el servidor
        lazy: false,   // No carga perezosamente (mejor para SEO)
        transform: (data) => data // Transformación adicional si es necesaria
    }
);
</script>

<style lang="css" scoped></style>