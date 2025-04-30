<template>
    <div class="my-6">
        <!-- Título y descripción -->
        <h1
            class="text-slate-900 dark:text-white font-bold text-2xl mb-6 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-20 after:bg-pink-500 after:rounded-full pb-2">
            Productos Personalizados
        </h1>
        <p class="text-gray-500 dark:text-gray-400 mb-6">
            Descubre nuestros diseños exclusivos ya personalizados
        </p>

        <!-- Lista de productos -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <ProductCardReusable v-for="product in customProducts" :key="product.id" :product="product" />
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


// Obtener la categoría personalizada desde tu API
const { data: personalizedCategory } = await useFetch('/api/v1/personalizedCategory');
const { data: products, pending } = useFetch('/api/v1/product');


// Filtrar productos personalizados dinámicamente
const customProducts = computed(() => {
    if (!personalizedCategory.value || !products.value) return [];

    return products.value.filter(product =>
        product.category?.id === personalizedCategory.value.id
        // O usando slug si lo prefieres: product.category?.slug === personalizedCategory.value.slug
    );
});


</script>


<style scoped></style>