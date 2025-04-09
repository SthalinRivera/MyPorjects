<template>
    <div class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white relative">
            {{ $t("titulo_favoritos") }}
            <span
                class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-pink-500 rounded-full"></span>
        </h1>

        <div
            class="bg-white dark:bg-slate-800 shadow-lg rounded-xl overflow-hidden border border-gray-100 dark:border-slate-700">
            <ul class="divide-y divide-gray-100 dark:divide-slate-700">
                <li v-for="product in favorites" :key="product.id"
                    class="py-5 px-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors duration-200">

                    <!-- Imagen del producto con efecto hover -->
                    <div class="relative group w-full sm:w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img class="w-full h-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-110"
                            :src="`${product.imageUrl}`" :alt="product.name" />
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        </div>
                    </div>

                    <div class="flex-1 w-full sm:w-auto">
                        <!-- Nombre y categoría -->
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                            <h2 class="text-lg font-semibold text-slate-900 dark:text-white">{{ product.name }}</h2>
                            <span
                                class="inline-flex items-center mt-1 sm:mt-0 px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 dark:bg-pink-900/40 text-pink-800 dark:text-pink-300">
                                {{ product.category ? product.category.name : 'Sin categoría' }}
                            </span>
                        </div>

                        <!-- Descripción con truncamiento -->
                        <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">{{ product.description }}
                        </p>

                        <!-- Precio y acciones -->
                        <div class="flex flex-wrap items-center justify-between gap-2">
                            <span class="text-lg font-bold text-pink-600 dark:text-pink-400">S/. {{ product.price
                                }}</span>

                            <div class="flex items-center gap-3">
                                <!-- Botón para ver detalles -->
                                <NuxtLink :to="{ name: 'product-id', params: { id: product.id.toString() } }"
                                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-slate-800 dark:text-white bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg transition-colors duration-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    Ver
                                </NuxtLink>

                                <!-- Botón para eliminar de favoritos -->
                                <button type="button" @click="removeFavorite(product.id)"
                                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <div v-if="favorites.length === 0"
            class="mt-10 py-16 flex flex-col items-center justify-center text-center bg-white dark:bg-slate-800 rounded-xl shadow-md border border-gray-100 dark:border-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            <p class="text-xl font-medium text-gray-600 dark:text-gray-300">No tienes productos en favoritos.</p>
            <p class="text-gray-500 dark:text-gray-400 mt-2">Explora nuestra tienda y guarda tus productos favoritos
                aquí.</p>
            <NuxtLink to="/product"
                class="mt-6 bg-pink-500 dark:bg-pink-600 hover:bg-pink-600 dark:hover:bg-pink-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-md transition-all duration-200">
                Explorar productos
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
const { $toast } = useNuxtApp();
const productStore = useProductStore();
const { favorites } = storeToRefs(productStore);

const removeFavorite = (id: number) => {
    productStore.deleteFavorites(id);
    $toast.error('Producto eliminado de favoritos!');
};
</script>