<template>
    <div class="container mx-auto mt-10">
        <div class="sm:flex shadow-md my-10">
            <!-- Shopping Cart -->
            <div class="w-full sm:w-3/4 bg-white dark:bg-gray-800 px-10 py-10 rounded-lg shadow-lg">
                <div class="flex justify-between border-b pb-8 border-gray-300 dark:border-gray-600">
                    <h1 class="font-semibold text-2xl text-gray-900 dark:text-white">Shopping Cart</h1>
                    <h2 class="font-semibold text-2xl text-gray-700 dark:text-gray-300">{{ totalItems }} Items</h2>
                </div>
                <div class="mt-8">
                    <ul role="list" class="divide-y divide-gray-300 dark:divide-gray-600">
                        <li v-for="product in productShoppingCart" :key="product.id" class="flex py-6">
                            <div
                                class="size-24 shrink-0 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                                <img :src="product.imageUrl" :alt="product.name" class="w-24 h-24 object-cover">
                            </div>
                            <div class="ml-4 flex-1 flex flex-col">
                                <div class="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                    <h3>{{ product.name }}</h3>
                                    <p>S/. {{ product.price }}</p>
                                </div>
                                <div class="flex items-end justify-between text-sm mt-4">
                                    <p class="text-gray-500 dark:text-gray-400">Qty: 1</p>
                                    <div class="inline-flex items-center mt-2">
                                        <button @click="decreaseQuantity(product)" :disabled="product.quantity <= 1"
                                            class="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-4" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M20 12H4" />
                                            </svg>
                                        </button>
                                        <div
                                            class="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none">
                                            {{ product.quantity }}
                                        </div>
                                        <button @click="increaseQuantity(product)"
                                            :disabled="product.quantity >= product.stock"
                                            class="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-4" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                    </div>

                                    <button type="button" @click="removeProductShoppingCart(product.id)"
                                        class=" p-2 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg shadow-md transition-all duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-5">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>

                                    </button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <!-- Promo Code -->
                <label for="promo"
                    class="block text-sm font-semibold uppercase mb-2 text-gray-700 dark:text-gray-300">Promo
                    Code</label>
                <div class="flex items-center gap-1">
                    <input id="promo" type="text" placeholder="Enter your code"
                        class="p-3 text-sm w-auto rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white">
                    <button
                        class="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg shadow-md transition-all duration-300">Apply</button>
                </div>

                <a href="#" class="flex items-center text-indigo-600 dark:text-indigo-400 text-sm mt-8 hover:underline">
                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 448 512">
                        <path
                            d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                    </svg>
                    Continue Shopping
                </a>

                <CheckoutForm />
            </div>

            <!-- Order Summary -->
            <div id="summary" class="w-full sm:w-1/4 bg-white dark:bg-gray-800 px-8 py-10 rounded-lg shadow-lg">
                <h1 class="font-semibold text-2xl border-b pb-8 border-gray-300 text-gray-900 dark:text-white">Order
                    Summary</h1>
                <div class="mt-6">
                    <div class="flex justify-between items-center py-2">
                        <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Subtotal</span>
                        <span class="text-sm font-semibold text-gray-900 dark:text-white">S/. {{ totalPrice }}</span>
                    </div>
                    <div class="flex justify-between items-center py-2">
                        <span class="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                        <span class="text-lg font-bold text-green-600 dark:text-green-400">S/. {{ totalPrice }}</span>
                    </div>
                </div>

                <div class="bg-white dark:bg-gray-800 border-t pt-4 mt-4 border-gray-300">
                    <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">Payment Methods</h2>
                    <div class="mb-6">
                        <label class="flex items-start space-x-3">
                            <input type="radio" name="paymentMethod" value="transfer" v-model="selectedPaymentMethod"
                                class="h-5 w-5 text-blue-600 border-gray-300 rounded-full focus:ring-blue-500">
                            <span class="text-sm text-gray-700 dark:text-gray-300">
                                <strong>Bank Transfer</strong><br>
                                Pay with a bank transfer or deposit to our business account.
                                <span class="text-red-500">🚨 Beware of scams, do not deposit to personal
                                    accounts.</span>
                            </span>
                        </label>
                    </div>

                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Your personal data will be used to process your order, improve your experience on this website,
                        and other purposes described in our
                        <a href="#" class="text-blue-500 hover:underline">Privacy Policy</a>.
                    </p>

                    <label class="flex items-center mb-6">
                        <input type="checkbox" v-model="acceptedTerms"
                            class="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                        <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            I have read and agree to the <a href="#" class="text-blue-500 hover:underline">Terms and
                                Conditions</a>.
                        </span>
                    </label>

                    <button :disabled="!acceptedTerms" @click="placeOrder"
                        class="w-full py-3 text-white font-semibold rounded-lg transition-all duration-300 shadow-md uppercase bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed">
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useProductShoppingCartStore } from '~/stores/productShoppingCart';
import type { Order } from '~/interfaces/order';
import type { Product } from '~/interfaces/product';
const router = useRouter()

const productStore = useProductShoppingCartStore();
const { productShoppingCart, totalPrice, totalItems, } = storeToRefs(productStore);
const { user } = useUserSession();
const { $toast } = useNuxtApp();
console.log(user.value);

const acceptedTerms = ref(false);
const selectedPaymentMethod = ref('transfer');

const removeProductShoppingCart = (id: number) => {
    productStore.deleteProductShoppingCart(id);
    $toast.error('Product removed!');
};


const placeOrder = async () => {
    if (acceptedTerms.value) {
        const order: Order = {
            userId: user.value?.usuarioId,
            total: totalPrice.value,
            status: 'PENDING',
            couponId: 1,
            orderItems: productShoppingCart.value.map(product => ({
                productId: product.id,
                quantity: product.quantity, // Reemplaza con la cantidad real si es necesario
                price: product.price,
            })),
            createdAt: new Date(),
        };

        try {
            const { orderId } = await $fetch("/api/v1/addOrder", {
                method: "POST",  // Especifica el método correcto
                body: JSON.stringify(order),  // Serializa el cuerpo
                headers: {
                    "Content-Type": "application/json",  // Indica que el contenido es JSON
                },
            });
            productStore.clearShoppingCart();

            // Redirigir al usuario a la página de confirmación con el ID de la orden
            router.push(`/orderConfirmation/${orderId}`);
        } catch (error) {
            console.error('Error placing order:', error);

        }
    } else {
        alert('Please agree to the terms and conditions.');
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