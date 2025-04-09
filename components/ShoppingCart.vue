<template>

    <transition name="slide-fade">
        <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="slide-over-title" role="dialog"
            aria-modal="true">
            <!-- Fondo oscuro -->
            <div class="fixed inset-0 bg-gray-500/75 dark:bg-gray-900/80 transition-opacity" @click.self="closeModal">
            </div>

            <!-- Panel del carrito -->
            <div class="fixed inset-0 overflow-hidden">
                <div class="absolute inset-0 overflow-hidden">
                    <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 " @click.stop>
                        <div class="pointer-events-auto w-screen max-w-md">
                            <div class="flex h-full flex-col bg-white dark:bg-gray-800 shadow-xl">
                                <!-- Encabezado -->
                                <div
                                    class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Shopping Cart</h2>
                                    <button @click="closeModal"
                                        class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                        <svg class="h-6 w-6 text-gray-500 dark:text-gray-400" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        <span class="sr-only">Close panel</span>
                                    </button>
                                </div>

                                <!-- Contenido -->
                                <div class="flex-1 overflow-y-auto p-6">
                                    <!-- Carrito vacío -->
                                    <div v-if="productShoppingCart.length === 0"
                                        class="flex flex-col items-center justify-center h-full text-center py-12">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            class="h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-200 mb-2">Your cart
                                            is
                                            empty</h3>
                                        <p class="text-gray-500 dark:text-gray-400 mb-6">Add some products to continue
                                            shopping</p>
                                        <NuxtLink to="/product" @click.native="closeModal"
                                            class="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-md transition-all duration-300">
                                            Continue Shopping
                                        </NuxtLink>
                                    </div>

                                    <!-- Productos en el carrito -->
                                    <ul v-else role="list" class="-my-6 divide-y divide-gray-200 dark:divide-gray-700">
                                        <li v-for="product in productShoppingCart" :key="product.id" class="flex py-6">
                                            <div
                                                class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-600">
                                                <img :src="product.imageUrl" :alt="product.name"
                                                    class="h-full w-full object-cover object-center">
                                            </div>

                                            <div class="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div
                                                        class="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                                        <h3 class="line-clamp-1">{{ product.name }}</h3>
                                                        <p class="ml-4">S/. {{ product.price }}</p>
                                                    </div>
                                                    <p v-if="product.description"
                                                        class="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                                                        {{ product.description }}</p>
                                                </div>

                                                <div class="flex flex-1 items-end justify-between">
                                                    <div class="flex items-center space-x-2">
                                                        <button @click="decreaseQuantity(product)"
                                                            :disabled="product.quantity <= 1"
                                                            class="p-1 rounded-md border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    stroke-width="2" d="M20 12H4" />
                                                            </svg>
                                                        </button>
                                                        <span class="text-gray-800 dark:text-gray-200 px-2">{{
                                                            product.quantity }}</span>
                                                        <button @click="increaseQuantity(product)"
                                                            :disabled="product.quantity >= product.stock"
                                                            class="p-1 rounded-md border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    stroke-width="2" d="M12 4v16m8-8H4" />
                                                            </svg>
                                                        </button>
                                                    </div>

                                                    <button @click="removeProductShoppingCart(product.id)"
                                                        class="p-2 text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                            class="w-5 h-5">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <!-- Resumen y checkout -->
                                <div v-if="productShoppingCart.length > 0"
                                    class="border-t border-gray-200 dark:border-gray-700 px-6 py-6">
                                    <div
                                        class="flex justify-between text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        <p>Subtotal</p>
                                        <p>S/. {{ totalPrice }}</p>
                                    </div>
                                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">Shipping and taxes
                                        calculated
                                        at checkout.</p>

                                    <div class="space-y-3">
                                        <NuxtLink :to="checkoutRoute"
                                            @click.native="productShoppingCart.length === 0 ? $toast.error('Your cart is empty!') : closeModal()"
                                            class="flex items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 px-6 py-3 text-white font-medium shadow-lg transition-all duration-300 transform hover:scale-[1.01]">
                                            Checkout
                                        </NuxtLink>

                                        <NuxtLink to="/product" @click.native="closeModal"
                                            class="flex items-center justify-center rounded-lg border border-transparent px-6 py-3 text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors">
                                            Continue Shopping
                                            <svg xmlns="http://www.w3.org/2000/svg" class="ml-1 h-5 w-5" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </NuxtLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import type { Product } from '~/interfaces/product';
import { useProductShoppingCartStore } from '~/stores/productShoppingCart';

const { user } = useUserSession();
const { $toast } = useNuxtApp();
const emit = defineEmits(["update:isOpen"]);
const checkoutRoute = computed(() => {
    if (productShoppingCart.value.length === 0) {
        return '#';
    }
    return user.value ? '/orderSummary' : '/login';
});

defineProps({
    isOpen: {
        type: Boolean,
        required: true
    }
});



const closeModal = () => {
    emit("update:isOpen", false);
};

const productStore = useProductShoppingCartStore();
const { productShoppingCart, totalPrice } = storeToRefs(productStore);

const removeProductShoppingCart = (id: number) => {
    productStore.deleteProductShoppingCart(id);
    $toast.error('Product removed!');
};





const increaseQuantity = (product: Product) => {
    if (product.quantity < product.stock) {
        product.quantity += 1;
        productStore.updateProductQuantity(product.id, product.quantity);
    }
};

const decreaseQuantity = (product: Product) => {
    if (product.quantity > 1) {
        product.quantity -= 1;
        productStore.updateProductQuantity(product.id, product.quantity);
    }
};
</script>

<style scoped>
/* Transiciones suaves para el modo oscuro */
.bg-white {
    transition: background-color 0.3s ease;
}

.bg-gray-800 {
    transition: background-color 0.3s ease;
}

.text-gray-900 {
    transition: color 0.3s ease;
}

.text-white {
    transition: color 0.3s ease;
}

.border-gray-200 {
    transition: border-color 0.3s ease;
}

.border-gray-700 {
    transition: border-color 0.3s ease;
}

/* Efecto hover para los botones de cantidad */
button:not(:disabled):hover {
    transform: translateY(-1px);
}

/* Efecto de escala suave para el botón de checkout */
.hover\:scale-\[1\.01\]:hover {
    transform: scale(1.01);
}

/* Limitar texto a una línea con puntos suspensivos */
.line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateX(20px);
}
</style>