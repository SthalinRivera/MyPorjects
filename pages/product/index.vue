<template>
    <div class="flex flex-col lg:flex-row gap-6">
        <!-- Sidebar de Filtros - Versión Mejorada -->
        <div class="lg:w-80 xl:w-96 shrink-0">
            <div
                class="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 sm:p-6 sticky top-20 shadow-sm">
                <!-- Encabezado desplegable para móvil -->
                <div class="lg:hidden mb-4">
                    <button @click="mobileFiltersOpen = !mobileFiltersOpen"
                        class="w-full flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg">
                        <h2 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <i class="ri-filter-3-fill text-pink-500"></i>
                            Filtros Avanzados
                        </h2>
                        <i class="ri-arrow-down-s-line text-xl transition-transform duration-200"
                            :class="{ 'transform rotate-180': mobileFiltersOpen }"></i>
                    </button>
                </div>

                <!-- Contenido de filtros -->
                <div :class="{ 'hidden lg:block': !mobileFiltersOpen, 'block': mobileFiltersOpen }">
                    <!-- Título para versión desktop -->
                    <div class="hidden lg:flex items-center mb-6 pb-4 border-b border-gray-100 dark:border-slate-700">
                        <i class="ri-filter-3-fill text-xl text-pink-500 mr-3"></i>
                        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Filtros Avanzados</h2>
                    </div>

                    <!-- Filtro por Categoría - Versión Mejorada -->
                    <div
                        class="mb-6 bg-gray-50 dark:bg-slate-700/30 p-3 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-slate-700/50">
                        <div class="flex justify-between items-center cursor-pointer group"
                            @click="categoryOpen = !categoryOpen">
                            <div class="flex items-center">
                                <i class="ri-price-tag-3-line mr-2 text-pink-500 text-lg"></i>
                                <h3
                                    class="text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                                    Categorías
                                </h3>
                            </div>
                            <i class="ri-arrow-down-s-line text-sm transition-transform duration-200"
                                :class="{ 'transform rotate-180': categoryOpen }"></i>
                        </div>
                        <transition name="slide-fade">
                            <div class="mt-3 space-y-2 pl-7" v-if="categoryOpen">
                                <div v-for="category in categories" :key="category.id" class="flex items-center group">
                                    <input :id="`category-${category.id}`" v-model="selectedCategories"
                                        :value="category.id" type="checkbox"
                                        class="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500 dark:border-gray-600 dark:bg-gray-700">
                                    <label :for="`category-${category.id}`"
                                        class="ml-3 text-sm text-gray-700 dark:text-gray-300 group-hover:text-pink-600 dark:group-hover:text-pink-400 flex items-center justify-between w-full">
                                        <span>{{ category.name }}</span>
                                        <span class="text-xs bg-gray-200 dark:bg-slate-600 px-2 py-0.5 rounded-full">{{
                                            category.productCount }}</span>
                                    </label>
                                </div>
                            </div>
                        </transition>
                    </div>

                    <!-- Filtro por Precio - Versión Mejorada -->
                    <div
                        class="mb-6 bg-gray-50 dark:bg-slate-700/30 p-3 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-slate-700/50">
                        <div class="flex justify-between items-center cursor-pointer group"
                            @click="priceOpen = !priceOpen">
                            <div class="flex items-center">
                                <i class="ri-money-dollar-circle-line mr-2 text-pink-500 text-lg"></i>
                                <h3
                                    class="text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                                    Rango de Precio
                                </h3>
                            </div>
                            <i class="ri-arrow-down-s-line text-sm transition-transform duration-200"
                                :class="{ 'transform rotate-180': priceOpen }"></i>
                        </div>
                        <transition name="slide-fade">
                            <div class="mt-3 pl-7" v-if="priceOpen">
                                <div class="flex items-center justify-between mb-3 text-sm">
                                    <span class="text-gray-500 dark:text-gray-400">S/. {{ minPrice }}</span>
                                    <span class="text-gray-500 dark:text-gray-400">S/. {{ maxPrice }}</span>
                                </div>
                                <Slider v-model="priceRange" :min="0" :max="1000" :step="10" range
                                    class="w-full px-1 mb-3" />
                                <div class="flex gap-2">
                                    <UInput v-model="priceRange[0]" size="xs" class="flex-1" placeholder="Mínimo">
                                        <template #leading>
                                            <span class="text-gray-400 text-xs">S/.</span>
                                        </template>
                                    </UInput>
                                    <span class="text-gray-400 flex items-center">-</span>
                                    <UInput v-model="priceRange[1]" size="xs" class="flex-1" placeholder="Máximo">
                                        <template #leading>
                                            <span class="text-gray-400 text-xs">S/.</span>
                                        </template>
                                    </UInput>
                                </div>
                            </div>
                        </transition>
                    </div>

                    <!-- Filtro por Disponibilidad - Versión Mejorada -->
                    <div
                        class="mb-6 bg-gray-50 dark:bg-slate-700/30 p-3 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-slate-700/50">
                        <div class="flex justify-between items-center cursor-pointer group"
                            @click="availabilityOpen = !availabilityOpen">
                            <div class="flex items-center">
                                <i class="ri-stack-line mr-2 text-pink-500 text-lg"></i>
                                <h3
                                    class="text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                                    Disponibilidad
                                </h3>
                            </div>
                            <i class="ri-arrow-down-s-line text-sm transition-transform duration-200"
                                :class="{ 'transform rotate-180': availabilityOpen }"></i>
                        </div>
                        <transition name="slide-fade">
                            <div class="mt-3 space-y-2 pl-7" v-if="availabilityOpen">
                                <div class="flex items-center group">
                                    <input id="in-stock" v-model="availabilityFilter" value="in-stock" type="checkbox"
                                        class="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500 dark:border-gray-600 dark:bg-gray-700">
                                    <label for="in-stock"
                                        class="ml-3 text-sm text-gray-700 dark:text-gray-300 group-hover:text-pink-600 dark:group-hover:text-pink-400 flex items-center">
                                        <i class="ri-checkbox-circle-line text-green-500 mr-2"></i>
                                        En stock <span class="text-xs text-gray-400 ml-2">(Disponible ahora)</span>
                                    </label>
                                </div>
                                <div class="flex items-center group">
                                    <input id="out-of-stock" v-model="availabilityFilter" value="out-of-stock"
                                        type="checkbox"
                                        class="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500 dark:border-gray-600 dark:bg-gray-700">
                                    <label for="out-of-stock"
                                        class="ml-3 text-sm text-gray-700 dark:text-gray-300 group-hover:text-pink-600 dark:group-hover:text-pink-400 flex items-center">
                                        <i class="ri-close-circle-line text-red-500 mr-2"></i>
                                        Agotados <span class="text-xs text-gray-400 ml-2">(Próximamente)</span>
                                    </label>
                                </div>
                            </div>
                        </transition>
                    </div>

                    <!-- Nuevo Filtro: Valoración -->
                    <div
                        class="mb-6 bg-gray-50 dark:bg-slate-700/30 p-3 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-slate-700/50">
                        <div class="flex justify-between items-center cursor-pointer group"
                            @click="ratingOpen = !ratingOpen">
                            <div class="flex items-center">
                                <i class="ri-star-line mr-2 text-pink-500 text-lg"></i>
                                <h3
                                    class="text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                                    Valoración
                                </h3>
                            </div>
                            <i class="ri-arrow-down-s-line text-sm transition-transform duration-200"
                                :class="{ 'transform rotate-180': ratingOpen }"></i>
                        </div>
                        <transition name="slide-fade">
                            <div class="mt-3 space-y-2 pl-7" v-if="ratingOpen">
                                <div v-for="star in 5" :key="star" class="flex items-center group"
                                    @click="selectedRating = 6 - star">
                                    <input :id="`rating-${6 - star}`" v-model="selectedRating" :value="6 - star"
                                        type="radio"
                                        class="h-4 w-4 border-gray-300 text-pink-600 focus:ring-pink-500 dark:border-gray-600 dark:bg-gray-700">
                                    <label :for="`rating-${6 - star}`"
                                        class="ml-3 text-sm text-gray-700 dark:text-gray-300 group-hover:text-pink-600 dark:group-hover:text-pink-400 flex items-center">
                                        <div class="flex text-yellow-400 mr-2">
                                            <i v-for="i in 5" :key="i"
                                                :class="i <= (6 - star) ? 'ri-star-fill' : 'ri-star-line'"></i>
                                        </div>
                                        <span v-if="star === 1" class="text-xs text-gray-400 ml-1">y más</span>
                                    </label>
                                </div>
                            </div>
                        </transition>
                    </div>

                    <!-- Botones de acción mejorados -->
                    <div class="flex gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-slate-700">
                        <UButton @click="applyFilters" size="sm"
                            class="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white shadow-sm flex items-center justify-center">
                            <i class="ri-check-line mr-2"></i> Aplicar Filtros
                        </UButton>
                        <UButton @click="resetFilters" size="sm" variant="outline"
                            class="flex-1 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center justify-center">
                            <i class="ri-close-line mr-2"></i> Limpiar
                        </UButton>
                    </div>

                    <!-- Contador de filtros activos -->
                    <div v-if="activeFilterCount > 0" class="mt-4 text-center">
                        <span
                            class="inline-block bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300 text-xs px-3 py-1 rounded-full">
                            {{ activeFilterCount }} filtro(s) activo(s)
                        </span>
                    </div>
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
                <ProductCardReusable v-for="product in paginatedProducts" :key="product.id" :product="product" />
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


// Añade esto en tu script setup
const mobileFiltersOpen = ref(false);
const categoryOpen = ref(true);
const priceOpen = ref(true);
const availabilityOpen = ref(true);



// Modifica tu onMounted para manejar mejor los errores
onMounted(() => {
    if (error.value) {
        $toast.error(error.value.statusMessage || "Error al cargar productos");
        console.error("Error fetching products:", error.value);
    }

    // Inicializa los filtros si hay parámetros en la URL
    const route = useRoute();
    if (route.query.categories) {
        selectedCategories.value = route.query.categories.split(',').map(Number);
    }
    // Puedes añadir más parámetros de URL aquí
});

</script>

<style scoped>
/* Estilos personalizados para el slider si es necesario */
</style>