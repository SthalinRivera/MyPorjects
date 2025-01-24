<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        @click="handleClickOutside">
        <div class="fixed inset-0 bg-gray-500/5 transition-opacity" aria-hidden="true"></div>
        <div class="fixed inset-0 overflow-hidden">
            <div class="absolute inset-0 overflow-hidden">
                <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                    <div class="pointer-events-auto w-screen max-w-md">
                        <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                            <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                <div class="flex items-start justify-between">
                                    <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">Shopping
                                        cart
                                    </h2>
                                    <div class="ml-3 flex h-7 items-center">
                                        <button type="button" @click="closeModal"
                                            class="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                                            <span class="absolute -inset-0.5"></span>
                                            <span class="sr-only">Close panel</span>
                                            <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                stroke="currentColor" aria-hidden="true" data-slot="icon">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <!-- Validar si hay productos -->
                                <div v-if="productShoppingCart.length === 0"
                                    class="text-center mt-8 justify-center items-center">
                                    <p class="text-gray-600 dark:text-gray-400">
                                        Your cart is empty. Add some products to continue!
                                    </p>


                                </div>

                                <!-- Mostrar productos si hay datos -->
                                <div v-else class="mt-8">
                                    <div class="flow-root">
                                        <ul role="list" class="-my-6 divide-y divide-gray-200"
                                            v-for="product in productShoppingCart" :key="product.id">
                                            <li class="flex py-6">
                                                <div
                                                    class="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img :src="product.imageUrl" :alt="product.name"
                                                        class="size-full object-cover">
                                                </div>

                                                <div class="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div
                                                            class="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                <a href="#">{{ product.name }}</a>
                                                            </h3>
                                                            <p class="ml-4"> S/. {{ product.price }}</p>
                                                        </div>
                                                        <p class="mt-1 text-sm text-gray-500">Salmon</p>
                                                    </div>
                                                    <div class="flex flex-1 items-end justify-between text-sm">
                                                        <p class="text-gray-500">Quantity</p>
                                                        <div class="inline-flex items-center mt-2">
                                                            <button @click="decreaseQuantity(product)"
                                                                :disabled="product.quantity <= 1"
                                                                class="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-4"
                                                                    fill="none" viewBox="0 0 24 24"
                                                                    stroke="currentColor">
                                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                                        stroke-width="2" d="M20 12H4" />
                                                                </svg>
                                                            </button>
                                                            <div
                                                                class="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none">
                                                                {{ product.quantity }}
                                                            </div>
                                                            <button @click="increaseQuantity(product)"
                                                                :disabled="product.quantity >= product.stock"
                                                                class="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-4"
                                                                    fill="none" viewBox="0 0 24 24"
                                                                    stroke="currentColor">
                                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                                        stroke-width="2" d="M12 4v16m8-8H4" />
                                                                </svg>
                                                            </button>
                                                        </div>

                                                        <div class="flex">
                                                            <button type="button"
                                                                @click="removeProductShoppingCart(product.id)"
                                                                class=" p-2 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg shadow-md transition-all duration-300">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                    viewBox="0 0 24 24" stroke-width="1.5"
                                                                    stroke="currentColor" class="w-5">
                                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                </svg>

                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>


                                            <!-- More products... -->
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div class="flex justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>S/. {{ totalPrice }}</p>
                                </div>
                                <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.
                                </p>
                                <div class="mt-6">
                                    <NuxtLink :to="productShoppingCart.length > 0 ? checkoutRoute : '#'"
                                        class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm"
                                        :class="{
                                            'hover:bg-indigo-700': productShoppingCart.length > 0,
                                            'cursor-not-allowed opacity-50': productShoppingCart.length === 0
                                        }" :disabled="productShoppingCart.length === 0">
                                        Checkout
                                    </NuxtLink>

                                </div>
                                <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <p>
                                        or
                                        <NuxtLink to="/product" type="button"
                                            class="font-medium text-indigo-600 hover:text-indigo-500">
                                            Continue Shopping
                                            <span aria-hidden="true"> &rarr;</span>
                                        </NuxtLink>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Product } from '~/interfaces/product';
import { useProductShoppingCartStore } from '~/stores/productShoppingCart';


const { user } = useUserSession();
const checkoutRoute = computed(() => {
    // Validar si el carrito tiene productos
    if (productShoppingCart.value.length === 0) {
        $toast.error('Your cart is empty! Add items before proceeding.');
        return ''; // No redirige a ninguna parte
    }

    // Redirigir al resumen de la orden si el carrito tiene productos
    const userData = user.value;
    return userData ? '/orderSummary' : '/login';
});
const { $toast } = useNuxtApp();
defineProps({
    isOpen: {
        type: Boolean,
        required: true
    }
});

const quantity = 1;
const productStore = useProductShoppingCartStore();
const { productShoppingCart, totalPrice } = storeToRefs(productStore)
console.log(productShoppingCart.value);
productShoppingCart.value.forEach(product => {
    console.log('Product:', product.name, 'Price:', product.price, 'Quantity:', product.quantity);
});
const removeProductShoppingCart = (id: number) => {
    productStore.deleteProductShoppingCart(id);
    $toast.error('Product removed!')
}
const emit = defineEmits(["update:isOpen"]);

const closeModal = () => {
    emit("update:isOpen", false);
};

// Detectar clic fuera del modal
const handleClickOutside = (event: MouseEvent) => {
    const modalContent = event.target as HTMLElement;
    if (!modalContent.closest('.flex-col')) {
        closeModal(); // Cierra el modal si el clic es fuera del contenido
    }
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
/* Estilos opcionales */
</style>