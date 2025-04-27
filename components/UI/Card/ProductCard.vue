<template>
    <div class=" m-2 my-6">
        <h1
            class="text-slate-900 dark:text-white font-bold text-3xl mb-6 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-20 after:bg-pink-500 after:rounded-full pb-2">
            Productos Destacados
        </h1>

        <!-- Estado de carga -->
        <div v-if="pending" class="flex justify-center py-8">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
        </div>

        <!-- Mensaje de error -->
        <div v-else-if="error" class="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg">
            Error al cargar los productos: {{ error.message }}
        </div>

        <!-- Contenido principal -->
        <div v-else>
            <!-- Mostrar rango de productos -->
            <div class="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Mostrando {{ showingStart }}-{{ showingEnd }} de {{ pagination.totalItems }} productos
            </div>

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
                                <span class="text-lg font-bold text-gray-900 dark:text-white">
                                    S/. {{ product.price || '0.00' }}
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

            <!-- Paginación -->
            <div v-if="pagination.totalPages > 1" class="flex justify-center mt-8">
                <nav class="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button @click="prevPage" :disabled="currentPage === 1"
                        class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                        <span class="sr-only">Anterior</span>
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                            aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>

                    <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" :class="{
                        'bg-pink-500 text-white': currentPage === page,
                        'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700': currentPage !== page
                    }" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium">
                        {{ page }}
                    </button>

                    <button @click="nextPage" :disabled="currentPage === pagination.totalPages"
                        class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                        <span class="sr-only">Siguiente</span>
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                            aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>
                </nav>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Product } from '~/interfaces/product';

// Configuración de paginación
const currentPage = ref(1);
const itemsPerPage = 12;

// Estado inicial para evitar errores
const defaultPagination = {
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    itemsPerPage: 12
};

// Obtener productos con paginación
const { data: apiResponse, error, pending, refresh } = await useFetch('/api/v1/product/paginated', {
    query: {
        page: currentPage,
        limit: itemsPerPage
    }
});

// Datos reactivos con valores por defecto
const products = ref<Product[]>([]);
const pagination = ref({ ...defaultPagination });

// Actualizar los datos cuando cambia la respuesta
watchEffect(() => {
    if (apiResponse.value) {
        products.value = apiResponse.value.data || [];
        pagination.value = {
            totalItems: apiResponse.value.meta?.totalItems || 0,
            totalPages: apiResponse.value.meta?.totalPages || 0,
            currentPage: apiResponse.value.meta?.currentPage || 1,
            itemsPerPage: apiResponse.value.meta?.itemsPerPage || itemsPerPage
        };
    }
});

// Calcular rango de productos mostrados
const showingStart = computed(() => {
    return (currentPage.value - 1) * itemsPerPage + 1;
});

const showingEnd = computed(() => {
    return Math.min(currentPage.value * itemsPerPage, pagination.value.totalItems);
});

// Paginación avanzada (mostrar solo páginas cercanas)
const visiblePages = computed(() => {
    const total = pagination.value.totalPages;
    const current = currentPage.value;
    const range = 2; // Cuántas páginas mostrar alrededor de la actual

    let start = Math.max(1, current - range);
    let end = Math.min(total, current + range);

    // Ajustar si estamos cerca de los extremos
    if (current <= range + 1) {
        end = Math.min(2 * range + 1, total);
    }

    if (current >= total - range) {
        start = Math.max(total - 2 * range, 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return pages;
});

// Navegación entre páginas
const nextPage = async () => {
    if (currentPage.value < pagination.value.totalPages) {
        currentPage.value++;
        await refresh();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

const prevPage = async () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        await refresh();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

const goToPage = async (page: number) => {
    currentPage.value = page;
    await refresh();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

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