<template>
    <div class="flex flex-col lg:flex-row gap-6">
        <!-- Contenido Principal -->
        <div class="flex-1">
            <!-- Encabezado y controles de ordenamiento -->
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1
                        class="text-slate-900 dark:text-white font-bold text-3xl mb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-20 after:bg-pink-500 after:rounded-full pb-2">
                        Todos los proyectos
                    </h1>
                    <p class="text-lg text-gray-700 dark:text-gray-200 mb-2">
                        {{ filteredProducts.length }} proyectos encontrados
                    </p>
                </div>

                <div class="flex flex-col sm:flex-row items-end sm:items-center gap-3 w-full sm:w-auto">
                    <!-- Campo de búsqueda -->
                    <UInput v-model="searchQuery" placeholder="Buscar por nombre..." icon="i-heroicons-magnifying-glass"
                        class="w-full sm:w-64" />

                    <div class="flex items-center gap-3">
                        <span class="text-sm text-gray-600 dark:text-gray-400">Ordenar por:</span>
                        <USelect v-model="sortOption" :options="sortOptions" option-attribute="label"
                            value-attribute="value" class="min-w-40" />
                    </div>
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
                        activeButton: { variant: 'solid' },
                        inactiveButton: { color: 'gray' }
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
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';

definePageMeta({
    middleware: ['visit']
});

const { $toast } = useNuxtApp();

const { data: products, error } = await useFetch("/api/v1/product");
console.log("products", products.value);


const selectedCategories = ref<number[]>([]);
const priceRange = ref([0, 1000]);
const availabilityFilter = ref<string[]>(['in-stock']);
const sortOption = ref('name-asc');
const currentPage = ref(1);
const perPage = ref(12);
const searchQuery = ref('');

const sortOptions = [
    { label: 'Nombre: A-Z', value: 'name-asc' },
    { label: 'Nombre: Z-A', value: 'name-desc' },
];

const filteredProducts = computed(() => {
    let filtered = [...products.value];

    // Filtrar por búsqueda de nombre
    if (searchQuery.value) {
        const searchTerm = searchQuery.value.toLowerCase();
        filtered = filtered.filter(product =>
            product.title.toLowerCase().includes(searchTerm)
        )
    }

    // Filtrar por categorías
    if (selectedCategories.value.length > 0) {
        filtered = filtered.filter(product => selectedCategories.value.includes(product.categoryId));
    }



    // Ordenar productos
    if (sortOption.value === 'name-asc') {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption.value === 'name-desc') {
        filtered.sort((a, b) => b.title.localeCompare(a.title));
    }

    return filtered;
});

// Productos paginados
const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    const end = start + perPage.value;
    return filteredProducts.value.slice(start, end);
});

// Información de paginación
const pageCount = computed(() => Math.ceil(filteredProducts.value.length / perPage.value));
const startItem = computed(() => (currentPage.value - 1) * perPage.value + 1);
const endItem = computed(() => Math.min(currentPage.value * perPage.value, filteredProducts.value.length));

// Resetear página al cambiar filtros o búsqueda
watch([selectedCategories, priceRange, availabilityFilter, sortOption, searchQuery], () => {
    currentPage.value = 1;
});

onMounted(() => {
    if (error.value) {
        $toast.error(error.value.statusMessage || "Error al cargar productos");
        console.error("Error fetching products:", error.value);
    }

    const route = useRoute();
    if (route.query.categories) {
        selectedCategories.value = route.query.categories.split(',').map(Number);
    }
});
</script>

<style scoped>
/* Estilos personalizados si los necesitas */
</style>