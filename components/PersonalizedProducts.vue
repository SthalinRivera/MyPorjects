<template>
    <div class="my-6">
        <!-- Título y descripción -->
        <h1
            class="text-slate-900 dark:text-white font-bold text-3xl mb-6 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-20 after:bg-pink-500 after:rounded-full pb-2">
            Productos Personalizados
        </h1>
        <p class="text-gray-500 dark:text-gray-400 mb-6">
            Descubre nuestros diseños exclusivos ya personalizados
        </p>

        <!-- Lista de productos -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div v-for="product in customProducts" :key="product.id"
                class="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-all flex flex-col">
                <!-- Imagen con badge -->
                <div class="relative">
                    <img :src="product.imageUrl" :alt="product.name" class="w-full h-48 object-cover">
                    <span class="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                        EXCLUSIVO
                    </span>
                    <UButton @click="toggleFavorite(product)" :class="[
                        'absolute top-2 right-2 backdrop-blur-sm rounded-full p-1 sm:p-2 transition-all duration-300 shadow-sm sm:shadow-md',
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

                <!-- Detalles del producto -->
                <div class="p-4 flex-grow">
                    <h3 class="font-bold text-gray-900 dark:text-white line-clamp-1">
                        {{ product.name }}
                    </h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        {{ product.description || 'Diseño personalizado único' }}
                    </p>
                    <div class="mt-3 font-bold text-pink-600 dark:text-pink-400">
                        S/ {{ product.price }}
                    </div>
                </div>

                <!-- Botón Ver Producto - Ahora dentro de cada tarjeta -->
                <div class="p-3 sm:p-4 pt-0 sm:pt-2 mt-auto">
                    <NuxtLink :to="{
                        name: 'product-id',
                        params: { id: product.id.toString() }
                    }">
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

        <!-- Estado vacío -->
        <div v-if="!pending && customProducts.length === 0"
            class="relative overflow-hidden rounded-xl shadow-lg my-8 min-h-[400px] flex items-center justify-center group border-2 border-dashed border-gray-200 dark:border-slate-700">

            <!-- Fondo parallax (diferente por tema) -->
            <div
                class="absolute inset-0 bg-[url('/images/empty-promo-pattern.svg')] bg-[length:200px] opacity-5 dark:opacity-[0.02]">
            </div>

            <!-- Contenido principal -->
            <div class="relative z-10 text-center p-8 max-w-2xl mx-auto">
                <!-- Icono decorativo (cambia color con el tema) -->
                <div
                    class="mb-6 inline-flex p-4 rounded-full bg-white/20 dark:bg-slate-800/50 backdrop-blur-md border border-white/20 dark:border-slate-700/50">
                    <UIcon name="i-heroicons-sparkles"
                        class="w-12 h-12 text-yellow-500 dark:text-yellow-300 animate-pulse" />
                </div>
                <!-- Texto principal (contraste garantizado) -->
                <h3 class="text-4xl font-bold text-gray-900 dark:text-white mb-4 drop-shadow-lg">
                    Diseños Exclusivos en Camino
                </h3>
                <!-- Descripción -->
                <p class="text-xl text-gray-800 dark:text-gray-200 mb-8 drop-shadow-md">
                    Nuestros artistas están creando piezas únicas especialmente para ti
                </p>
                <!-- Botón CTA (adaptable) -->
                <UButton to="#subscribe" size="lg" variant="outline" class="border-gray-300 dark:border-slate-600">
                    <UIcon name="i-heroicons-envelope" class="mr-2 w-5 h-5" />
                    Notificarme
                </UButton>
                <!-- Elementos decorativos sutiles -->
                <div
                    class="absolute -bottom-20 -right-20 w-40 h-40 bg-pink-500/5 rounded-full blur-xl group-hover:bg-pink-500/10 transition-all duration-500">
                </div>
                <div
                    class="absolute -top-20 -left-20 w-60 h-60 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/10 transition-all duration-700">
                </div>
            </div>
        </div>


    </div>
</template>

<script setup lang="ts">
import type { Product } from '~/interfaces/product';

// Obtener la categoría personalizada desde tu API
const { data: personalizedCategory } = await useFetch('/api/v2/personalizedCategory');
const { data: products, pending } = useFetch('/api/v1/product');
const productStore = useProductStore();
const { $toast } = useNuxtApp();

// Filtrar productos personalizados dinámicamente
const customProducts = computed(() => {
    if (!personalizedCategory.value || !products.value) return [];

    return products.value.filter(product =>
        product.category?.id === personalizedCategory.value.id
        // O usando slug si lo prefieres: product.category?.slug === personalizedCategory.value.slug
    );
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
</script>


<style scoped>
.parallax-bg {
    will-change: transform;
    transition: transform 0.3s ease-out;
}

@media (min-width: 1024px) {
    .parallax-bg {
        transform: translateY(calc(var(--scroll-y) * -0.1));
    }
}
</style>