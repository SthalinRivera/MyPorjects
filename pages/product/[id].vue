<template>
    <div class="my-2 px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <h3
            class="text-center text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-8">
            <span class="">Detalles de Producto</span>
        </h3>

        <!-- Main Container -->
        <div class="max-w-6xl mx-auto overflow-hidden rounded-2xl shadow-xl dark:shadow-pink-900/30">
            <div class="flex flex-col lg:flex-row bg-white dark:bg-gray-800">
                <!-- Image Gallery -->
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
                            class="w-16 h-16 rounded-lg border-2 overflow-hidden cursor-pointer flex-shrink-0" :class="{
                                'border-pink-400': currentImageIndex === index,
                                'border-transparent': currentImageIndex !== index
                            }" @click="changeImage(index)">
                            <img class="w-full h-full object-cover" :src="img" :alt="`Vista previa ${index + 1}`" />
                        </div>
                    </div>
                </div>

                <!-- Project Details -->
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

        <!-- Image Modal -->
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
                            class="w-2 h-2 rounded-full transition-colors" :class="{
                                'bg-pink-500': currentImageIndex === index,
                                'bg-white/50': currentImageIndex !== index
                            }"></span>
                    </div>
                </div>
            </div>
        </Transition>

        <!-- Related Products -->
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

        <!-- Sección de Reseñas -->
        <div class="max-w-6xl mx-auto mt-16">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Reseñas de Clientes</h2>

            <!-- Calificación Promedio -->
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Calificación General</h3>
                        <div class="flex items-center mt-2">
                            <div class="flex">
                                <UIcon v-for="i in 5" :key="i"
                                    :name="i <= Math.round(averageRating) ? 'i-heroicons-star-solid' : 'i-heroicons-star'"
                                    class="w-6 h-6 text-yellow-400" />
                            </div>
                            <span class="ml-2 text-gray-600 dark:text-gray-300">
                                {{ averageRating.toFixed(1) }} de 5
                            </span>
                        </div>
                        <p class="text-gray-600 dark:text-gray-300 mt-1">
                            {{ totalReviews }} {{ totalReviews === 1 ? 'reseña' : 'reseñas' }}
                        </p>
                    </div>


                </div>
            </div>

            <!-- Formulario de Reseña (se muestra condicionalmente) -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Escribe tu Reseña</h3>
                <form @submit.prevent="submitReview">
                    <!-- Campos para usuarios no logueados -->
                    <div v-if="!loggedIn" class="mb-4 space-y-4">
                        <div>
                            <label class="block text-gray-700 dark:text-gray-300 mb-2" for="name">Nombre</label>
                            <input id="name" v-model="guestUser.name" type="text" placeholder="Ingresa tu nombre"
                                required
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white" />
                        </div>

                        <div>
                            <label class="block text-gray-700 dark:text-gray-300 mb-2" for="email">Email</label>
                            <input id="email" v-model="guestUser.email" type="email" placeholder="correo@ejemplo.com"
                                required
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white" />
                        </div>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 dark:text-gray-300 mb-2">Calificación</label>
                        <div class="flex">
                            <button type="button" v-for="i in 5" :key="i" @click="newReview.rating = i"
                                class="focus:outline-none">
                                <UIcon :name="i <= newReview.rating ? 'i-heroicons-star-solid' : 'i-heroicons-star'"
                                    class="w-8 h-8 text-yellow-400" />
                            </button>
                        </div>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 dark:text-gray-300 mb-2">Comentario</label>
                        <textarea v-model="newReview.comment" required
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white"
                            rows="4"></textarea>
                    </div>

                    <button type="submit"
                        class="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-colors">
                        Enviar Reseña
                    </button>
                </form>
            </div>

            <!-- Lista de Reseñas -->
            <div class="space-y-6">
                <div v-for="review in reviews" :key="review.id" class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div class="flex justify-between items-start">
                        <div>
                            <h4 class="font-semibold text-gray-900 dark:text-white">{{ review.user?.name || 'Anónimo' }}
                            </h4>
                            <div class="flex items-center mt-1">
                                <div class="flex">
                                    <UIcon v-for="i in 5" :key="i"
                                        :name="i <= review.rating ? 'i-heroicons-star-solid' : 'i-heroicons-star'"
                                        class="w-5 h-5 text-yellow-400" />
                                </div>
                                <span class="text-sm text-gray-500 dark:text-gray-400 ml-2">
                                    {{ formatDate(review.createdAt) }}
                                </span>
                            </div>
                        </div>

                        <!-- Botones de Editar/Eliminar (si el usuario es el autor) -->
                        <div v-if="user && user.id === review.userId" class="flex space-x-2">
                            <button @click="editReview(review)"
                                class="text-gray-500 hover:text-pink-500 transition-colors">
                                <UIcon name="i-heroicons-pencil-square" class="w-5 h-5" />
                            </button>
                            <button @click="deleteReview(review.id)"
                                class="text-gray-500 hover:text-red-500 transition-colors">
                                <UIcon name="i-heroicons-trash" class="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <p class="mt-3 text-gray-600 dark:text-gray-300">{{ review.comment }}</p>
                </div>

                <p v-if="reviews.length === 0" class="text-gray-500 dark:text-gray-400 text-center py-8">
                    Aún no hay reseñas. ¡Sé el primero en dejar una!
                </p>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns';
import type { Project } from '~/interfaces/project';
import { useProductShoppingCartStore } from '~/stores/productShoppingCart';
const { loggedIn, user } = useUserSession();
const productStore = useProductStore();
const { $toast } = useNuxtApp();
const route = useRoute();
const { id } = route.params;

// Check if a product is in favorites
const isFavorite = (productId: number) => {
    return productStore.favorites.some(item => item.id === productId);
};

// Handle favorites
const toggleFavorite = (product: Project) => {
    if (isFavorite(product.id)) {
        productStore.deleteFavorites(product.id);
        $toast.success("Eliminado de favoritos");
    } else {
        productStore.addToFavorites(product);
        $toast.success("Agregado a favoritos");
    }
};


// State for image gallery
const productImages = ref<string[]>([]);
const currentImageIndex = ref(0);
const isImageModalOpen = ref(false);
const currentImage = ref('');

// Get product data
const { data: productData, error } = await useFetch<Project>(`/api/v1/product/${id}`);

if (error.value) {
    throw createError({
        status: 404,
        statusText: "Producto no encontrado"
    });
}

// Reactive product
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

// Initialize product images
productImages.value = [
    product.value.image_url,
];

const currentDisplayImage = computed(() => productImages.value[currentImageIndex.value]);

// Get related products
const { data: relatedProductsData } = await useFetch<Project[]>(`/api/v1/productByCategoryId/${product.value.categoryId}`,
    { default: () => [] }
);

const relatedProducts = computed(() => relatedProductsData.value || []);

// Gallery functions
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


const showReviewForm = ref(false);
const reviews = ref([]);
const averageRating = ref(0);
const totalReviews = ref(0);
const editingReviewId = ref(null);


const newReview = reactive({
    rating: 0,
    comment: '',
    projectId: Number(id),
    userId: user.value?.id || null
});

// Fetch reviews
const fetchReviews = async () => {
    try {
        const { data } = await useFetch(`/api/v1/getReviewByProductId/${id}`);
        if (data.value) {
            reviews.value = data.value.reviews;
            averageRating.value = data.value.averageRating;
            totalReviews.value = data.value.totalReviews;
        }
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
};

// Format date
const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
};
const guestUser = reactive({
    name: '',
    email: ''
});
// Submit review
const submitReview = async () => {
    if (!newReview.rating) {
        $toast.error('Por favor selecciona un rating');
        return;
    }

    try {
        let userId = user.value?.id;

        // Si el usuario no está logueado, creamos un usuario temporal
        if (!loggedIn.value) {
            if (!guestUser.name || !guestUser.email) {
                $toast.error('Por favor completa tu nombre y email');
                return;
            }

            // Crear usuario invitado (roleId 2 para usuarios guest)
            const { data: userData, error: userError } = await useFetch('/api/v1/addUser', {
                method: 'POST',
                body: {
                    name: guestUser.name,
                    email: guestUser.email,
                    roleId: 2, // ID para usuarios guest/invitados
                    password: 'temppassword' // Contraseña temporal
                }
            });

            if (userError.value) {
                throw userError.value;
            }

            if (userData.value?.userId) {
                userId = userData.value.userId;
            } else {
                throw new Error('No se pudo crear el usuario temporal');
            }
        }

        // Ahora procedemos con la creación de la reseña
        if (editingReviewId.value) {
            const res = await $fetch(`/api/v1/updateReviews/${editingReviewId.value}`, {
                method: 'PUT',
                body: {
                    rating: newReview.rating,
                    comment: newReview.comment,
                    userId: userId
                }
            });
            $toast.success(res.message);
        } else {
            const res = await $fetch('/api/v1/addReviews', {
                method: 'POST',
                body: {
                    ...newReview,
                    userId: userId,
                    projectId: Number(id)
                }
            });
            if (res?.message) {
                $toast.success(res.message);
            }
        }

        resetReviewForm();
        await fetchReviews();

    } catch (error: any) {
        const msg = error?.data?.statusMessage || error?.data?.message || error.message;
        $toast.error(msg || 'Ocurrió un error inesperado');
        console.error('Review error:', error);
    }
};

// Edit review
const editReview = (review: any) => {
    editingReviewId.value = review.id;
    newReview.rating = review.rating;
    newReview.comment = review.comment;
    showReviewForm.value = true;
};

// Delete review
const deleteReview = async (reviewId: number) => {
    if (!confirm('¿Estás seguro de eliminar esta reseña?')) return;
    try {
        const res = await $fetch(`/api/v1/deleteReviews/${reviewId}`, {
            method: 'DELETE'
        });

        const message = res?.message;
        $toast.success(message);
        await fetchReviews();

    } catch (error: any) {
        const msg = error?.data?.message || error?.message;
        $toast.error(msg);
        console.error('Delete review error:', error);
    }
};
// Reset review form
const resetReviewForm = () => {
    editingReviewId.value = null;
    newReview.rating = 0;
    newReview.comment = '';
    guestUser.name = '';
    guestUser.email = '';
    showReviewForm.value = false;
};

// Handle keyboard for navigation
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

onMounted(async () => {
    await fetchReviews();
    window.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyDown);
    document.body.style.overflow = '';
});

const shoppingCartStore = useProductShoppingCartStore();
</script>
