<template>
    <div class=" my-2  px-4 sm:px-6 lg:px-8">
        <!-- Encabezado -->
        <h3
            class="text-center text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-8">
            <span class="inline-block animate-float">🚀</span> {{ $t("details_product") }}
        </h3>
        <!-- Contenedor principal -->
        <div class="max-w-6xl mx-auto overflow-hidden rounded-2xl shadow-xl dark:shadow-pink-900/30">
            <div class="flex flex-col lg:flex-row bg-white dark:bg-gray-800">
                <!-- Galería de imágenes -->
                <div class="lg:w-1/2 p-2 md:p-6 bg-gray-50 dark:bg-gray-700">
                    <div class="relative h-96 rounded-lg overflow-hidden">
                        <img class="w-full h-full object-cover transition-all duration-300 hover:scale-105 cursor-zoom-in"
                            :src="currentDisplayImage" :alt="product.title"
                            @click="openImageModal(currentDisplayImage)" />
                        <span v-if="product.stock < 10"
                            class="absolute top-4 right-4 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                            ¡Últimas unidades!
                        </span>
                    </div>
                    <div class="flex mt-0 md:mt-4 space-x-2 overflow-x-auto py-1 md:py-2">
                        <div v-for="(img, index) in productImages" :key="index"
                            class="w-16 h-16 rounded-lg border-2 overflow-hidden cursor-pointer flex-shrink-0"
                            :class="{ 'border-pink-400': currentImageIndex === index, 'border-transparent': currentImageIndex !== index }"
                            @click="changeImage(index)">
                            <img class="w-full h-full object-cover" :src="img" :alt="`Vista previa ${index + 1}`" />
                        </div>
                    </div>
                </div>

                <!-- Detalles del proyecto -->
                <!-- Detalles del proyecto -->
                <div class="lg:w-1/2 p-2 md:p-8 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center mb-2">
                            <span class="text-pink-500 dark:text-pink-400 text-sm font-medium">
                                {{ product.Category ? product.Category.name : 'Sin categoría' }}
                            </span>
                        </div>

                        <h2 class="text-lg md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                            {{ product.title }}
                        </h2>

                        <div class="mb-6">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Descripción</h3>
                            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {{ product.description }}
                            </p>
                        </div>

                        <div class="mb-6">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tecnologías utilizadas
                            </h3>
                            <ul class="flex flex-wrap gap-2">
                                <li v-for="tech in product.technologies" :key="tech"
                                    class="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200 px-3 py-1 rounded-full text-sm">
                                    {{ tech }}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <a :href="product.project_url" target="_blank" rel="noopener"
                            class="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-pink-500/20 flex items-center justify-center">
                            <UIcon name="i-heroicons-play-circle" class="w-5 h-5 mr-2" />
                            Ver Demo
                        </a>

                        <a :href="product.code_url" target="_blank" rel="noopener"
                            class="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-gray-500/20 flex items-center justify-center">
                            <UIcon name="i-heroicons-code-bracket" class="w-5 h-5 mr-2" />
                            Código Fuente
                        </a>

                        <button @click="toggleFavorite(product)"
                            class="w-full border border-pink-500 text-pink-500 dark:text-pink-400 dark:border-pink-400 py-3 px-6 rounded-lg font-medium transition-all duration-300 hover:bg-pink-50 dark:hover:bg-pink-900/30 flex items-center justify-center">
                            <UIcon :name="isFavorite(product.id) ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'"
                                class="w-5 h-5 mr-2" :class="{
                                    'text-pink-500 dark:text-pink-400': !isFavorite(product.id),
                                    'text-red-500 dark:text-red-500': isFavorite(product.id)
                                }" />
                            {{ isFavorite(product.id) ? 'En favoritos' : 'Añadir a favoritos' }}
                        </button>
                    </div>
                </div>

            </div>
        </div>

        <!-- Modal de imagen -->
        <Transition name="fade">
            <div v-if="isImageModalOpen"
                class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
                @click.self="closeImageModal">
                <div class="relative max-w-6xl w-full max-h-screen flex items-center">
                    <button @click.stop="prevImage"
                        class="absolute left-4 z-10 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-colors">
                        <UIcon name="i-heroicons-chevron-left" class="w-8 h-8" />
                    </button>

                    <div class="w-full flex justify-center">
                        <img class="max-h-[90vh] max-w-full object-contain" :src="currentImage" :alt="product.title" />
                    </div>

                    <button @click.stop="nextImage"
                        class="absolute right-4 z-10 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-colors">
                        <UIcon name="i-heroicons-chevron-right" class="w-8 h-8" />
                    </button>

                    <button @click="closeImageModal"
                        class="absolute top-4 right-4 text-white hover:text-pink-400 transition-colors">
                        <UIcon name="i-heroicons-x-mark" class="w-8 h-8" />
                    </button>

                    <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                        <span v-for="(img, index) in productImages" :key="index"
                            class="w-2 h-2 rounded-full transition-colors"
                            :class="{ 'bg-pink-500': currentImageIndex === index, 'bg-white/50': currentImageIndex !== index }">
                        </span>
                    </div>
                </div>
            </div>
        </Transition>


        <!-- Productos relacionados -->
        <div class="max-w-6xl mx-auto mt-16">
            <div class="flex items-center justify-between mb-8">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Proyectos relacionados</h2>
                <NuxtLink to="/product" class="text-pink-500 dark:text-pink-400 hover:underline flex items-center">
                    Ver todos
                    <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 ml-1" />
                </NuxtLink>
            </div>
            <div class="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <ProductCardReusable v-for="product in relatedProducts" :key="product.id" :product="product" />
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import type { Product } from '~/interfaces/product';
import type { Project } from '~/interfaces/project';
import { useProductShoppingCartStore } from '~/stores/productShoppingCart';
const productStore = useProductStore();
const { $toast } = useNuxtApp();
const route = useRoute();
const { id } = route.params;
const { addToFavorites } = useProductStore();
// Verificar si un producto está en favoritos
const isFavorite = (productId: number) => {
    return productStore.favorites.some(item => item.id === productId);
};

// Manejar favoritos
const toggleFavorite = (product: Project) => {
    if (isFavorite(product.id)) {
        productStore.deleteFavorites(product.id);
        $toast.success("Eliminado de favoritos");
    } else {
        productStore.addToFavorites(product);
        $toast.success("Agregado a favoritos");
    }
};


const { addProductShoppingCart } = useProductShoppingCartStore();

// Estado para la galería de imágenes
const productImages = ref<string[]>([]);
const currentImageIndex = ref(0);
const isImageModalOpen = ref(false);
const currentImage = ref('');

// Obtener datos del producto
const { data: productData, error } = await useFetch<Project>(`/api/v1/product/${id}`);


if (error.value) {
    throw createError({
        status: 404,
        statusText: "Producto no encontrado"
    });
}


// Producto reactivo
const product = computed(() => productData.value || {
    id: '',
    name: 'Cargando...',
    description: '',
    image_url: '',
    project_url: '',
    tags: [],
    code_url: '',
    technologies: [],
    Category: {
        name: ''
    },

});

// Inicializar imágenes del producto
productImages.value = [
    product.value.image_url,
];

const currentDisplayImage = computed(() => productImages.value[currentImageIndex.value]);

// Obtener productos relacionados
const { data: relatedProductsData } = await useFetch<Project[]>(`/api/v1/productByCategoryId/${product.value.categoryId}`,
    { default: () => [] }
);

const relatedProducts = computed(() => relatedProductsData.value || []);

// Funciones de la galería
const changeImage = (index: number) => {
    currentImageIndex.value = index;
};

const openImageModal = (imageUrl: string) => {
    currentImage.value = imageUrl;
    currentImageIndex.value = productImages.value.indexOf(imageUrl);
    isImageModalOpen.value = true;
    document.body.style.overflow = 'hidden';
};

const closeImageModal = () => {
    isImageModalOpen.value = false;
    document.body.style.overflow = '';
};

const nextImage = () => {
    currentImageIndex.value = (currentImageIndex.value + 1) % productImages.value.length;
    currentImage.value = productImages.value[currentImageIndex.value];
};

const prevImage = () => {
    currentImageIndex.value = (currentImageIndex.value - 1 + productImages.value.length) % productImages.value.length;
    currentImage.value = productImages.value[currentImageIndex.value];
};


// Manejar teclado para navegación
const handleKeyDown = (e: KeyboardEvent) => {
    if (!isImageModalOpen.value) return;

    if (e.key === 'Escape') {
        closeImageModal();
    } else if (e.key === 'ArrowRight') {
        nextImage();
    } else if (e.key === 'ArrowLeft') {
        prevImage();
    }
};




onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyDown);
    document.body.style.overflow = '';
});

const shoppingCartStore = useProductShoppingCartStore();



</script>
