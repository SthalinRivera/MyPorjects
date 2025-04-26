<template>
    <div class="flex flex-col lg:flex-row gap-6">
        <!-- Sidebar de Filtros -->
        <div class="lg:w-72 xl:w-80 shrink-0">
            <div
                class="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 sm:p-6 sticky top-20">
                <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <i class="ri-filter-2-line"></i>
                    Filtros Avanzados
                </h2>

                <!-- Filtro por Categoría -->
                <div class="mb-6">
                    <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
                        Categorías</h3>
                    <div class="space-y-2">
                        <div v-for="category in categories" :key="category.id" class="flex items-center">
                            <input :id="`category-${category.id}`" v-model="selectedCategories" :value="category.id"
                                type="checkbox"
                                class="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500 dark:border-gray-600 dark:bg-gray-700">
                            <label :for="`category-${category.id}`"
                                class="ml-3 text-sm text-gray-700 dark:text-gray-300">
                                {{ category.name }} ({{ category.productCount }})
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Filtro por Precio -->
                <div class="mb-6">
                    <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
                        Rango de Precio</h3>
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-xs text-gray-500 dark:text-gray-400">S/. {{ minPrice }}</span>
                        <span class="text-xs text-gray-500 dark:text-gray-400">S/. {{ maxPrice }}</span>
                    </div>
                    <div class="px-2">
                        <Slider v-model="priceRange" :min="0" :max="1000" :step="10" range class="w-full" />
                    </div>
                </div>

                <!-- Filtro por Disponibilidad -->
                <div class="mb-6">
                    <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
                        Disponibilidad</h3>
                    <div class="space-y-2">
                        <div class="flex items-center">
                            <input id="in-stock" v-model="availabilityFilter" value="in-stock" type="checkbox"
                                class="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500 dark:border-gray-600 dark:bg-gray-700">
                            <label for="in-stock" class="ml-3 text-sm text-gray-700 dark:text-gray-300">
                                En stock
                            </label>
                        </div>
                        <div class="flex items-center">
                            <input id="out-of-stock" v-model="availabilityFilter" value="out-of-stock" type="checkbox"
                                class="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500 dark:border-gray-600 dark:bg-gray-700">
                            <label for="out-of-stock" class="ml-3 text-sm text-gray-700 dark:text-gray-300">
                                Agotados
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Botones de acción -->
                <div class="flex gap-3">
                    <UButton @click="applyFilters" class="flex-1 bg-pink-600 hover:bg-pink-700 text-white">
                        Aplicar
                    </UButton>
                    <UButton @click="resetFilters" variant="outline" class="flex-1 text-gray-700 dark:text-gray-300">
                        Limpiar
                    </UButton>
                </div>
            </div>
        </div>

        <!-- Contenido Principal -->
        <div class="flex-1">
            <!-- Encabezado y controles de ordenamiento -->
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1
                        class="text-slate-900 dark:text-white font-bold text-3xl mb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-20 after:bg-pink-500 after:rounded-full pb-2">
                        Todos los productos
                    </h1>
                    <p class="text-lg text-gray-700 dark:text-gray-200 mb-2">
                        {{ filteredProducts.length }} productos encontrados
                    </p>
                </div>

                <div class="flex items-center gap-3">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Ordenar por:</span>
                    <USelect v-model="sortOption" :options="sortOptions" option-attribute="label"
                        value-attribute="value" class="min-w-40" />
                </div>
            </div>

            <!-- Productos -->
            <div class="grid gap-3 sm:gap-4 md:gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 z-10">
                <div v-for="product in paginatedProducts" :key="product.id"
                    class="bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl overflow-hidden cursor-pointer shadow-sm sm:shadow-md hover:shadow-xl border border-gray-100 dark:border-slate-700 transition-all duration-300 flex flex-col">
                    <!-- ... (mantener tu código existente de la tarjeta de producto) ... -->
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

                        <h2
                            class="text-sm sm:text-xl font-bold text-gray-900 dark:text-white mt-2 sm:mt-3 line-clamp-1">
                            {{
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

            <!-- Paginación -->
            <div class="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div class="text-sm text-gray-600 dark:text-gray-400">
                    Mostrando {{ startItem }}-{{ endItem }} de {{ filteredProducts.length }} productos
                </div>

                <UPagination v-model="currentPage" :page-count="perPage" :total="filteredProducts.length" :ui="{
                    wrapper: 'flex items-center gap-1',
                    rounded: '!rounded-full min-w-8 w-8 h-8',
                    default: {
                        activeButton: {
                            variant: 'solid'
                        },
                        inactiveButton: {
                            color: 'gray'
                        }
                    }
                }">
                    <template #prev="{ onClick }">
                        <UButton icon="i-heroicons-chevron-left-20-solid" color="gray" variant="ghost"
                            :disabled="currentPage === 1" @click="onClick" class="w-8 h-8" />
                    </template>

                    <template #next="{ onClick }">
                        <UButton icon="i-heroicons-chevron-right-20-solid" color="gray" variant="ghost"
                            :disabled="currentPage === pageCount" @click="onClick" class="w-8 h-8" />
                    </template>
                </UPagination>
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
const productStore = useProductStore();

// Datos y estado inicial
const { data: allProducts, error } = await useFetch("/api/v1/product");
const { data: categories } = await useFetch('/api/v1/category', {
    transform: (data) => (data || []).map(cat => ({
        ...cat,
        productCount: cat._count?.products || 0
    })).filter(cat => cat.productCount > 0)
});

// Estado de los filtros
const selectedCategories = ref<number[]>([]);
const priceRange = ref([0, 1000]);
const availabilityFilter = ref<string[]>(['in-stock']);
const sortOption = ref('price-desc');
const currentPage = ref(1);
const perPage = ref(12);

// Opciones de ordenamiento
const sortOptions = [
    { label: 'Precio: Mayor a menor', value: 'price-desc' },
    { label: 'Precio: Menor a mayor', value: 'price-asc' },
    { label: 'Nombre: A-Z', value: 'name-asc' },
    { label: 'Nombre: Z-A', value: 'name-desc' },
    { label: 'Más recientes', value: 'newest' },
];

// Calcular valores mínimos y máximos de precio
const minPrice = computed(() => priceRange.value[0]);
const maxPrice = computed(() => priceRange.value[1]);

// Productos filtrados
const filteredProducts = computed(() => {
    if (!allProducts.value) return [];

    let products = [...allProducts.value];

    // Filtrar por categoría
    if (selectedCategories.value.length > 0) {
        products = products.filter(p =>
            p.category && selectedCategories.value.includes(p.category.id)
        )
    }
    // Filtrar por rango de precio
    products = products.filter(p =>
        p.price >= minPrice.value && p.price <= maxPrice.value
    );

    // Filtrar por disponibilidad
    if (availabilityFilter.value.length === 1) {
        if (availabilityFilter.value.includes('in-stock')) {
            products = products.filter(p => p.stock > 0);
        } else if (availabilityFilter.value.includes('out-of-stock')) {
            products = products.filter(p => p.stock <= 0);
        }
    }

    // Ordenar productos
    switch (sortOption.value) {
        case 'price-desc':
            products.sort((a, b) => b.price - a.price);
            break;
        case 'price-asc':
            products.sort((a, b) => a.price - b.price);
            break;
        case 'name-asc':
            products.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            products.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'newest':
            products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            break;
    }

    return products;
});

// Paginación
const pageCount = computed(() => Math.ceil(filteredProducts.value.length / perPage.value));
const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    const end = start + perPage.value;
    return filteredProducts.value.slice(start, end);
});
const startItem = computed(() => (currentPage.value - 1) * perPage.value + 1);
const endItem = computed(() => Math.min(currentPage.value * perPage.value, filteredProducts.value.length));

// Funciones para manejar favoritos (mantener tus funciones existentes)
const isFavorite = (productId: number) => {
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

// Funciones para filtros
const applyFilters = () => {
    currentPage.value = 1; // Resetear a la primera página al aplicar nuevos filtros
    $toast.success('Filtros aplicados');
};

const resetFilters = () => {
    selectedCategories.value = [];
    priceRange.value = [0, 1000];
    availabilityFilter.value = ['in-stock'];
    sortOption.value = 'price-desc';
    currentPage.value = 1;
    $toast.success('Filtros restablecidos');
};

// Resetear paginación cuando cambian los filtros
watch([selectedCategories, priceRange, availabilityFilter, sortOption], () => {
    currentPage.value = 1;
});

onMounted(() => {
    if (error.value) {
        $toast.error(error.value.statusMessage || "");
    }
});
</script>

<style scoped>
/* Estilos personalizados para el slider si es necesario */
</style>