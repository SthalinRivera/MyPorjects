<template>
    <div class=" m-2 mb-6">
        <h1
            class="text-slate-900 dark:text-white font-bold text-3xl mb-6 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-20 after:bg-pink-500 after:rounded-full pb-2">
            Productos en Oferta
        </h1>

        <div v-if="!pending && products.length === 0"
            class="relative overflow-hidden rounded-xl shadow-lg my-8 min-h-[400px] flex items-center justify-center group border-2 border-dashed border-gray-200 dark:border-slate-700">

            <!-- Fondo sutil con textura -->
            <div
                class="absolute inset-0 bg-[url('/images/empty-promo-pattern.svg')] bg-[length:200px] opacity-5 dark:opacity-[0.02]">
            </div>

            <!-- Contenido principal -->
            <div class="relative z-10 text-center p-8 max-w-2xl mx-auto">
                <!-- Icono de oferta vacía -->
                <div
                    class="mb-6 inline-flex p-5 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 dark:from-slate-800 dark:to-slate-700 shadow-inner">
                    <UIcon name="i-heroicons-tag" class="w-12 h-12 text-gray-400 dark:text-slate-500" />
                </div>

                <!-- Texto principal -->
                <h3 class="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-3">
                    ¡Sin promociones activas!
                </h3>

                <!-- Descripción -->
                <p class="text-lg text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                    Actualmente no tenemos descuentos disponibles, pero regresa pronto para no perderte nuestras ofertas
                    especiales.
                </p>

                <!-- Llamada a la acción -->
                <div class="flex flex-col sm:flex-row justify-center gap-3">
                    <UButton to="/product" size="lg" color="pink" variant="solid" class="shadow-sm hover:shadow-md   ">
                        <UIcon name="i-heroicons-shopping-bag" class="mr-2 w-5 h-5" />
                        Ver productos
                    </UButton>

                    <UButton to="#subscribe" size="lg" variant="outline"
                        class="border-slate-100  dark:border-slate-600">
                        <UIcon name="i-heroicons-envelope" class="mr-2 w-5 h-5" />
                        Notificarme
                    </UButton>
                </div>

                <!-- Elementos decorativos sutiles -->
                <div
                    class="absolute -bottom-20 -right-20 w-40 h-40 bg-pink-500/5 rounded-full blur-xl group-hover:bg-pink-500/10 transition-all duration-500">
                </div>
                <div
                    class="absolute -top-20 -left-20 w-60 h-60 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/10 transition-all duration-700">
                </div>
            </div>
        </div>


        <div v-else-if="error" class="text-red-500">
            Error al cargar las ofertas
        </div>

        <!-- Contenido principal -->
        <div v-else>


            <!-- Grid de productos -->
            <div class="grid gap-1 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <a v-for="product in products" :key="product.id" :href="`/product/${product.id}`"
                    class="flex bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md">

                    <!-- Contenido del producto... -->
                    <!-- Imagen del producto -->
                    <div class="relative">
                        <img class="object-cover w-28  rounded-t-lg  h-32 md:h-38 md:w-38 md:rounded-none md:rounded-s-lg"
                            :src="product.imageUrl || 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&auto=format&fit=crop&w=765&q=80'"
                            :alt="product.name">

                        <!-- Botón de favoritos -->
                        <button @click.stop="toggleFavorite(product)"
                            class="absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-all" :class="{
                                'bg-pink-500 text-white': isFavorite(product.id),
                                'bg-white/80 dark:bg-slate-900/80 text-gray-700 dark:text-gray-300 hover:bg-pink-500 hover:text-white': !isFavorite(product.id)
                            }">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" :stroke-width="isFavorite(product.id) ? 2 : 1">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                    </div>

                    <!-- Contenido del producto -->
                    <div class="flex flex-col justify-between p-4 leading-normal w-full">

                        <!-- Promoción encima de la imagen -->
                        <div v-if="product.currentPromotion"
                            class="absolute top-1 right-2 bg-gradient-to-r text-gray-900 dark:text-white px-2 py-1 sm:px-3 sm:py-2 rounded-lg inline-block z-10  text-xs sm:text-sm">

                            <!-- Vista móvil (resumido) -->
                            <p class="sm:hidden font-bold text-gray-900 dark:text-white text-xl leading-none">
                                {{ product.currentPromotion.isPercentage
                                    ? `-${product.currentPromotion.discount}%`
                                    : `-S/ ${product.currentPromotion.discount}` }}
                            </p>
                            <span class=" sm:hidden text-gray-900 dark:text-white font-medium text-xs">
                                de dto.
                            </span>

                            <!-- Vista normal (pantallas medianas en adelante) -->
                            <div class="hidden sm:block">
                                <p class="font-semibold leading-tight">
                                    {{ product.currentPromotion.title }}
                                </p>

                                <p class="text-gray-900 dark:text-white font-bold leading-none">
                                    <span class="text-xl">
                                        {{ product.currentPromotion.isPercentage
                                            ? `${product.currentPromotion.discount}%`
                                            : `S/ ${product.currentPromotion.discount}` }}
                                    </span>
                                    <span class="text-gray-900 dark:text-white font-medium text-xs">
                                        de dto.
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div>
                            <h5 class="mb-1 text-md tracking-tight text-gray-900 dark:text-white">
                                {{ product.name || 'Producto sin nombre' }}
                            </h5>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                {{ truncateDescription(product.description || 'Descripción no disponible') }}
                            </p>
                        </div>

                        <!-- Precio y stock -->
                        <div class="mt-2 flex items-center justify-between">
                            <div class="flex items-center">
                                <span class=" flex  items-center text-lg font-bold text-gray-900 dark:text-white">
                                    <div class="mr-2">
                                        S/ {{ product.currentPrice.toFixed(2) || '0.00' }}
                                    </div>
                                    <div v-if="product.originalPrice > product.currentPrice"
                                        class="text-sm text-gray-500 line-through">
                                        S/ {{ product.originalPrice.toFixed(2) }}

                                    </div>
                                </span>

                            </div>

                            <span v-if="product.stock > 0"
                                class="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                                {{ product.stock }} disponibles
                            </span>
                            <span v-else
                                class="text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded-full animate-pulse">
                                AGOTADO
                            </span>
                        </div>
                    </div>
                    <!-- ... (mantén tu contenido de producto igual) ... -->
                </a>
            </div>


        </div>
    </div>
</template>

<script setup lang="ts">
import type { Product } from '~/interfaces/product';






const { data: products, error, pending } = useFetch('/api/v1/promotionactive');


// Resto de tus funciones (favoritos, etc.)
const productStore = useProductStore();
const { $toast } = useNuxtApp();

const isFavorite = (productId: number): boolean => {
    return productStore.favorites.some(item => item.id === productId);
};

const toggleFavorite = (product: Product) => {
    if (isFavorite(product.id)) {
        productStore.deleteFavorites(product.id);
        $toast.success("Eliminado de favoritos");
    } else {
        productStore.addToFavorites(product);
        $toast.success("Agregado a favoritos");
    }
};

const truncateDescription = (desc: string): string => {
    if (!desc) return '';
    return desc.length > 30 ? `${desc.substring(0, 30)}...` : desc;
};
</script>