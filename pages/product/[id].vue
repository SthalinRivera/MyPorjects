<template>
    <div class="my-8 px-4 sm:px-6 lg:px-8">
        <!-- Encabezado -->
        <div class="text-center mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Detalles del Producto</h1>
            <div class="w-24 h-1 bg-pink-500 mx-auto rounded-full"></div>
        </div>

        <!-- Contenedor principal -->
        <div class="max-w-6xl mx-auto overflow-hidden rounded-2xl shadow-xl dark:shadow-pink-900/30">
            <div class="flex flex-col lg:flex-row bg-white dark:bg-gray-800">
                <!-- Galería de imágenes -->
                <div class="lg:w-1/2 p-6 bg-gray-50 dark:bg-gray-700">
                    <div class="relative h-96 rounded-xl overflow-hidden">
                        <img class="w-full h-full object-contain transition-all duration-300 hover:scale-105 cursor-zoom-in"
                            :src="currentDisplayImage" :alt="product.name"
                            @click="openImageModal(currentDisplayImage)" />
                        <span v-if="product.stock < 10"
                            class="absolute top-4 right-4 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                            ¡Últimas unidades!
                        </span>
                    </div>
                    <div class="flex mt-4 space-x-2 overflow-x-auto py-2">
                        <div v-for="(img, index) in productImages" :key="index"
                            class="w-16 h-16 rounded-lg border-2 overflow-hidden cursor-pointer flex-shrink-0"
                            :class="{ 'border-pink-400': currentImageIndex === index, 'border-transparent': currentImageIndex !== index }"
                            @click="changeImage(index)">
                            <img class="w-full h-full object-cover" :src="img" :alt="`Vista previa ${index + 1}`" />
                        </div>
                    </div>
                </div>

                <!-- Detalles del producto -->
                <div class="lg:w-1/2 p-8 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center mb-2">
                            <span class="text-pink-500 dark:text-pink-400 text-sm font-medium">
                                {{ product.category ? product.category.name : 'Sin categoría' }}
                            </span>
                        </div>
                        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-3">{{ product.name }}</h2>

                        <div class="flex items-center justify-between mb-6">
                            <div>
                                <p class="text-2xl font-bold text-pink-500 dark:text-pink-400">
                                    S/ {{ product.price }}
                                </p>
                                <p v-if="product.originalPrice"
                                    class="text-sm text-gray-500 dark:text-gray-400 line-through">
                                    S/ {{ product.originalPrice }}
                                </p>
                            </div>
                            <div class="flex items-center">
                                <div class="flex text-yellow-400">
                                    <UIcon v-for="i in 5" :key="i"
                                        :name="i <= 4 ? 'i-heroicons-star-solid' : 'i-heroicons-star-half-solid'"
                                        class="w-5 h-5" />
                                </div>
                                <span class="ml-1 text-sm text-gray-600 dark:text-gray-300">(24 reviews)</span>
                            </div>
                        </div>

                        <div class="mb-6">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Descripción</h3>
                            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {{ product.description }}
                            </p>
                        </div>

                        <div class="mb-6">
                            <label
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cantidad</label>
                            <div class="flex items-center">
                                <button
                                    class="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white px-3 py-1 rounded-l-lg"
                                    @click="quantity > 1 ? quantity-- : null">
                                    -
                                </button>
                                <span class="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-1">
                                    {{ quantity }}
                                </span>
                                <button
                                    class="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white px-3 py-1 rounded-r-lg"
                                    @click="quantity++">
                                    +
                                </button>
                                <span class="ml-4 text-sm text-gray-500 dark:text-gray-400">
                                    {{ product.stock }} disponibles
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <button @click="addToCart(product); isOpen = true"
                            class="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-pink-500/20 flex items-center justify-center">
                            <UIcon name="i-heroicons-shopping-cart-solid" class="w-5 h-5 mr-2" />
                            Añadir al carrito - S/ {{ (product.price * quantity) }}
                        </button>

                        <button @click="addToFavorites(product)"
                            class="w-full border border-pink-500 text-pink-500 dark:text-pink-400 dark:border-pink-400 py-3 px-6 rounded-lg font-medium transition-all duration-300 hover:bg-pink-50 dark:hover:bg-pink-900/30 flex items-center justify-center">
                            <UIcon name="i-heroicons-heart-solid" class="w-5 h-5 mr-2" />
                            Añadir a favoritos
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
                        <img class="max-h-[90vh] max-w-full object-contain" :src="currentImage" :alt="product.name" />
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

        <!-- Beneficios -->
        <div class="max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm dark:shadow-gray-700/30 flex items-start">
                <div class="bg-pink-100 dark:bg-pink-900/50 p-3 rounded-full mr-4">
                    <UIcon name="i-heroicons-truck" class="w-6 h-6 text-pink-500 dark:text-pink-400" />
                </div>
                <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-1">Envío rápido</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Recibe tu pedido en 24-48 horas</p>
                </div>
            </div>

            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm dark:shadow-gray-700/30 flex items-start">
                <div class="bg-pink-100 dark:bg-pink-900/50 p-3 rounded-full mr-4">
                    <UIcon name="i-heroicons-arrow-path" class="w-6 h-6 text-pink-500 dark:text-pink-400" />
                </div>
                <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-1">Devoluciones</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">30 días para devoluciones gratuitas</p>
                </div>
            </div>

            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm dark:shadow-gray-700/30 flex items-start">
                <div class="bg-pink-100 dark:bg-pink-900/50 p-3 rounded-full mr-4">
                    <UIcon name="i-heroicons-shield-check" class="w-6 h-6 text-pink-500 dark:text-pink-400" />
                </div>
                <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-1">Pago seguro</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Protegido con encriptación SSL</p>
                </div>
            </div>
        </div>

        <!-- Productos relacionados -->
        <div class="max-w-6xl mx-auto mt-16">
            <div class="flex items-center justify-between mb-8">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Productos relacionados</h2>
                <NuxtLink to="/products" class="text-pink-500 dark:text-pink-400 hover:underline flex items-center">
                    Ver todos
                    <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 ml-1" />
                </NuxtLink>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div v-for="relatedProduct in relatedProducts" :key="relatedProduct.id"
                    class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
                    <div class="relative">
                        <NuxtLink :to="`/product/${relatedProduct.id}`">
                            <img class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                                :src="relatedProduct.imageUrl" :alt="relatedProduct.name" />
                        </NuxtLink>
                        <button @click="addToFavorites(relatedProduct)"
                            class="absolute top-3 right-3 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm p-2 rounded-full hover:bg-pink-500 dark:hover:bg-pink-500 transition-colors duration-300">
                            <UIcon name="i-heroicons-heart"
                                class="w-5 h-5 text-pink-500 dark:text-pink-400 group-hover:text-white" />
                        </button>
                        <span v-if="relatedProduct.stock < 5"
                            class="absolute top-3 left-3 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded">
                            ¡Últimas unidades!
                        </span>
                    </div>

                    <div class="p-4">
                        <div class="flex justify-between items-start mb-2">
                            <NuxtLink :to="`/product/${relatedProduct.id}`"
                                class="font-medium text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400">
                                {{ relatedProduct.category?.name || 'General' }}
                            </NuxtLink>
                            <div class="flex items-center text-yellow-400 text-sm">
                                <UIcon name="i-heroicons-star-solid" class="w-4 h-4" />
                                <span class="ml-1 text-gray-600 dark:text-gray-400">4.8</span>
                            </div>
                        </div>

                        <NuxtLink :to="`/product/${relatedProduct.id}`">
                            <h3 class="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-1">
                                {{ relatedProduct.name }}
                            </h3>
                        </NuxtLink>

                        <p class="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                            {{ relatedProduct.description }}
                        </p>

                        <div class="flex justify-between items-center">
                            <span class="font-bold text-pink-500 dark:text-pink-400">
                                S/ {{ relatedProduct.price }}
                            </span>
                            <button @click="addToCart(relatedProduct)"
                                class="text-sm bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded-full transition-colors duration-300">
                                <UIcon name="i-heroicons-plus" class="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal del carrito -->
        <ShoppingCart :isOpen="isOpen" @update:isOpen="isOpen = $event" />
    </div>
</template>

<script setup lang="ts">
import type { Product } from '~/interfaces/product';
import { useProductShoppingCartStore } from '~/stores/productShoppingCart';

const { $toast } = useNuxtApp();
const route = useRoute();
const { id } = route.params;
const { addToFavorites } = useProductStore();

// Estado reactivo
const isOpen = ref(false);
const quantity = ref(1);
const { addProductShoppingCart } = useProductShoppingCartStore();

// Estado para la galería de imágenes
const productImages = ref<string[]>([]);
const currentImageIndex = ref(0);
const isImageModalOpen = ref(false);
const currentImage = ref('');

// Obtener datos del producto
const { data: productData, error } = await useFetch<Product>(`/api/v1/product/${id}`);
console.log("viendo el producudo unico por el id",productData)

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
    price: 0,
    stock: 0,
    imageUrl: '',
    category: null,
    originalPrice: null
});

// Inicializar imágenes del producto
productImages.value = [
    product.value.imageUrl,
];

const currentDisplayImage = computed(() => productImages.value[currentImageIndex.value]);

// Obtener productos relacionados
const { data: relatedProductsData } = await useFetch<Product[]>( `/api/v1/productByCategoryId/${product.value.categoryId}`,
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

// Función para añadir al carrito
const addToCart = (productItem: Product) => {
    const productWithQuantity = { ...productItem, quantity: quantity.value };
    addProductShoppingCart(productWithQuantity);
    isOpen.value = true;
    $toast.success("¡Producto añadido al carrito!");
    quantity.value = 1;
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

.transition-transform {
    transition-property: transform;
}

.group:hover .group-hover\:scale-105 {
    transform: scale(1.05);
}

/* Animación para el modal */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Cursor que indica que se puede hacer zoom */
.cursor-zoom-in {
    cursor: zoom-in;
}

/* Personalización del scroll para las miniaturas */
::-webkit-scrollbar {
    height: 4px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: #555;
}

.dark ::-webkit-scrollbar-track {
    background: #374151;
}

.dark ::-webkit-scrollbar-thumb {
    background: #6b7280;
}

.dark ::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
}
</style>