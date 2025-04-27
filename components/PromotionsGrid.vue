<template>
    <div class="my-6">
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

        <div v-else class="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 z-10">
            <div v-for="product in products" :key="product.id"
                class="bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl overflow-hidden cursor-pointer shadow-sm sm:shadow-md hover:shadow-xl border border-gray-100 dark:border-slate-700 transition-all duration-300 flex flex-col">

                <div class="p-3 sm:p-4 flex-grow">
                    <div class="relative overflow-hidden rounded-lg sm:rounded-xl mb-3 sm:mb-4 group">

                        <!-- Promoción encima de la imagen -->
                        <div v-if="product.currentPromotion"
                            class="absolute top-2 left-2 bg-gradient-to-r from-pink-500 to-pink-600 dark:from-pink-700 dark:to-pink-800 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-lg inline-block z-10 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-xs sm:text-sm">

                            <!-- Vista móvil (resumido) -->
                            <p class="sm:hidden font-bold text-yellow-300 text-xl leading-none">
                                {{ product.currentPromotion.isPercentage
                                    ? `-${product.currentPromotion.discount}%`
                                    : `-S/ ${product.currentPromotion.discount}` }}
                            </p>
                            <span class=" sm:hidden text-white dark:text-white font-medium text-xs">
                                de dto.
                            </span>

                            <!-- Vista normal (pantallas medianas en adelante) -->
                            <div class="hidden sm:block">
                                <p class="font-semibold leading-tight">
                                    {{ product.currentPromotion.title }}
                                </p>

                                <p class="text-yellow-300 font-bold leading-none">
                                    <span class="text-xl">
                                        {{ product.currentPromotion.isPercentage
                                            ? `${product.currentPromotion.discount}%`
                                            : `S/ ${product.currentPromotion.discount}` }}
                                    </span>
                                    <span class="text-white dark:text-white font-medium text-xs">
                                        de dto.
                                    </span>
                                </p>
                            </div>
                        </div>



                        <!-- Imagen del producto -->
                        <img class="w-full h-40 sm:h-60 object-cover rounded-lg sm:rounded-xl transition-transform duration-500 group-hover:scale-110"
                            :src="product.imageUrl || '/placeholder.jpg'" :alt="product.name" />

                        <!-- Corazón para favoritos -->
                        <div class="absolute top-2 right-2">
                            <UButton @click="toggleFavorite(product)" :class="[
                                'absolute top-2 right-2 backdrop-blur-sm rounded-full p-1 sm:p-2 transition-all duration-300 shadow-sm sm:shadow-md',
                                isFavorite(product.id) ? 'bg-pink-500 hover:bg-pink-600 text-white' : 'bg-white/80 dark:bg-slate-900/80 hover:bg-pink-500 dark:hover:bg-pink-500'
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

                    <h2 class="text-sm sm:text-xl font-bold text-gray-900 dark:text-white mt-2 sm:mt-3 line-clamp-1">
                        {{ product.name }}
                    </h2>
                    <p class="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mt-1 sm:mt-2 line-clamp-2">
                        {{ product.description }}
                    </p>

                    <div class="mt-2 sm:mt-4">
                        <div class="text-base sm:text-xl font-bold text-rose-600 dark:text-rose-400">
                            S/ {{ product.currentPrice.toFixed(2) }}
                        </div>
                        <div v-if="product.originalPrice > product.currentPrice"
                            class="text-sm text-gray-500 line-through">
                            S/ {{ product.originalPrice.toFixed(2) }}
                        </div>
                    </div>
                </div>

                <div class="p-3 sm:p-4 pt-0 sm:pt-2 mt-auto">
                    <NuxtLink :to="{ name: 'product-id', params: { id: product.id.toString() } }">
                        <UButton
                            class="w-full bg-gradient-to-r from-pink-500 to-pink-600 dark:from-pink-600 dark:to-pink-700 dark:text-white border-none py-2 sm:py-3 rounded-lg sm:rounded-xl hover:from-pink-600 hover:to-pink-700 dark:hover:from-pink-500 dark:hover:to-pink-600 transition-all duration-300 shadow-sm sm:shadow-md hover:shadow-lg">
                            <span class="text-xs sm:text-base">Ver producto</span>
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
import type { Product } from '~/interfaces/product';
const { data: products, error, pending } = useFetch('/api/v1/promotionactive');

const productStore = useProductStore();
const id = 1;

const { $toast } = useNuxtApp();
const { addToFavorites } = useProductStore();
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
</script>

<style scoped>
.parallax-bg {
    will-change: transform;
    transition: transform 0.4s ease-out;
}

@media (min-width: 1024px) {
    .parallax-bg {
        transform: translateY(calc(var(--scroll-y) * -0.15));
    }
}

/* Animación para el badge de descuento */
@keyframes pulse {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.05);
    }
}

.animate-bounce {
    animation: pulse 2s infinite, bounce 1s infinite alternate;
}
</style>