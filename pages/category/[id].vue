<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
    <!-- Breadcrumb -->
    <nav class="flex mb-6" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-2">
        <li class="inline-flex items-center">
          <NuxtLink to="/"
            class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-pink-600 dark:text-gray-400 dark:hover:text-white">
            <UIcon name="i-heroicons-home" class="mr-2 w-4 h-4" />
            Inicio
          </NuxtLink>
        </li>
        <li>
          <div class="flex items-center">
            <UIcon name="i-heroicons-chevron-right" class="text-gray-400 w-4 h-4" />
            <NuxtLink to="/category"
              class="ml-2 text-sm font-medium text-gray-700 hover:text-pink-600 dark:text-gray-400 dark:hover:text-white">
              Categorías
            </NuxtLink>
          </div>
        </li>
        <li aria-current="page">
          <div class="flex items-center">
            <UIcon name="i-heroicons-chevron-right" class="text-gray-400 w-4 h-4" />
            <span class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              {{ categoryName || 'Cargando...' }}
            </span>
          </div>
        </li>
      </ol>
    </nav>

    <!-- Encabezado -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          {{ categoryName || 'Productos' }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          {{ products.length }} productos disponibles
        </p>
      </div>

      <!-- Filtros -->
      <div class="flex gap-3 w-full sm:w-auto">
        <select v-model="sortBy"
          class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-pink-500 focus:border-pink-500">
          <option value="name-asc">Nombre: A-Z</option>
          <option value="name-desc">Nombre: Z-A</option>
        </select>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-16">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      <p class="mt-4 text-gray-600 dark:text-gray-400">Cargando productos...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="products.length === 0"
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
      <div class="mx-auto w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
        <UIcon name="i-heroicons-exclamation-circle" class="text-3xl text-gray-400 dark:text-gray-500" />
      </div>
      <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-2">No hay productos en esta categoría</h3>
      <p class="text-gray-500 dark:text-gray-400 mb-4">Pronto tendremos nuevos productos disponibles</p>
      <NuxtLink to="/"
        class="inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
        <UIcon name="i-heroicons-arrow-left" class="mr-2 w-4 h-4" />
        Volver a categorías
      </NuxtLink>
    </div>

    <!-- Grid de Productos -->

    <div v-else class="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      <ProductCardReusable v-for="product in sortedProducts" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '~/interfaces/project';

const route = useRoute();
const { id } = route.params;
const { $toast } = useNuxtApp();
const productStore = useProductStore();

// Datos y estado
const products = ref<Project[]>([]);
const categoryName = ref('');
const loading = ref(true);
const sortBy = ref('name-asc');

// Obtener productos por categoría
const fetchProductsByCategory = async () => {
  try {
    loading.value = true;

    // Obtener productos
    const { data: productsData } = await useFetch<Project[]>(
      `/api/v1/productByCategoryId/${id}`,
      { default: () => [] }
    );

    // Obtener nombre de categoría
    if (productsData.value?.length > 0) {
      try {
        const { data: categoryData, error } = await useFetch(`/api/v1/categoryById/${id}`);

        if (error.value) {
          console.error("Error fetching category:", error.value);
          categoryName.value = ''; // Deja el nombre vacío si hay error
        } else {
          // Asegúrate de acceder a categoryData.value correctamente
          categoryName.value = categoryData?.value?.name || '';
          console.log("Category name:", categoryName.value);
        }
      } catch (err) {
        console.error("Error fetching category:", err);
        categoryName.value = ''; // Manejo de errores
      }
    }

    products.value = productsData.value || [];
  } catch (error) {
    console.error('Error fetching products by category:', error);
    $toast.error('Error al cargar los productos');
  } finally {
    loading.value = false;
  }
};



// Productos ordenados
const sortedProducts = computed(() => {
  return [...products.value].sort((a, b) => {
    const [key, order] = sortBy.value.split('-');

    if (key === 'name') {
      return order === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
    return 0;
  });
});

// Observar cambios en el ID de categoría
watch(() => route.params.id, fetchProductsByCategory, { immediate: true });
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>