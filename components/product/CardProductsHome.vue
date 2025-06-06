<template>
  <div class="my-6 p-2">
    <h1
      class="text-center text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-8">
      {{ $t("our_projects") }}
    </h1>

    <!-- Controles de búsqueda y ordenamiento -->
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
      <!-- Campo de búsqueda -->
      <UInput v-model="searchQuery" placeholder="Buscar proyectos..." icon="i-heroicons-magnifying-glass"
        class="w-full sm:w-64" />

      <!-- Selector de ordenamiento -->
      <div class="flex items-center gap-3 w-full sm:w-auto">
        <span class="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">Ordenar por:</span>
        <USelect v-model="sortOption" :options="sortOptions" option-attribute="label" value-attribute="value"
          class="min-w-40 w-full" />
      </div>
    </div>

    <!-- Contador de resultados -->
    <p class="text-lg text-gray-700 dark:text-gray-200 mb-4">
      {{ filteredProducts.length }} proyectos encontrados
    </p>

    <!-- Lista de productos -->
    <div class="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-6">
      <ProductCardReusable v-for="product in paginatedProducts" :key="product.id" :product="product" />
    </div>

    <!-- Paginación -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
      <div class="text-sm text-gray-600 dark:text-gray-400">
        Mostrando {{ startItem }}-{{ endItem }} de {{ filteredProducts.length }} proyectos
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
          <UButton icon="i-heroicons-chevron-left-20-solid" color="gray" variant="ghost" :disabled="currentPage === 1"
            @click="onClick" class="w-8 h-8" />
        </template>

        <template #next="{ onClick }">
          <UButton icon="i-heroicons-chevron-right-20-solid" color="gray" variant="ghost"
            :disabled="currentPage === pageCount" @click="onClick" class="w-8 h-8" />
        </template>
      </UPagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCardReusable from './ProductCardReusable.vue';

const { data: products } = await useFetch('/api/v1/product/');

// Variables reactivas
const searchQuery = ref('');
const sortOption = ref('name-asc');
const currentPage = ref(1);
const perPage = ref(12);

// Opciones de ordenamiento
const sortOptions = [
  { label: 'Nombre: A-Z', value: 'name-asc' },
  { label: 'Nombre: Z-A', value: 'name-desc' },
];

// Productos filtrados
const filteredProducts = computed(() => {
  let filtered = [...products.value];

  // Filtrar por búsqueda
  if (searchQuery.value) {
    const searchTerm = searchQuery.value.toLowerCase();
    filtered = filtered.filter(product =>
      product.title.toLowerCase().includes(searchTerm)
    );
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

// Cálculos para la paginación
const pageCount = computed(() => Math.ceil(filteredProducts.value.length / perPage.value));
const startItem = computed(() => (currentPage.value - 1) * perPage.value + 1);
const endItem = computed(() => Math.min(currentPage.value * perPage.value, filteredProducts.value.length));

// Resetear página cuando cambian los filtros
watch([searchQuery, sortOption], () => {
  currentPage.value = 1;
});
</script>