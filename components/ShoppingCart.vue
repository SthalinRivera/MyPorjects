<template>
    <transition name="slide-fade">
        <!-- Contenedor principal con overlay integrado -->
        <div v-if="isOpen" class="fixed inset-0 z-50 flex justify-end bg-black/30 dark:bg-black/50"
            @click.self="closeModal" aria-modal="true">
            <!-- Panel del carrito -->
            <div
                class="relative w-full sm:max-w-md max-w-xs h-full overflow-y-auto bg-white dark:bg-gray-800 shadow-xl  content-between">
                <!-- Encabezado -->
                <div
                    class="sticky top-0 flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 z-10">
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Carrito de compras
                    </h2>
                    <button @click="closeModal"
                        class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Cerrar carrito">
                        <svg class="h-6 w-6 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <!-- Contenido -->
                <div class="flex-1 p-6">
                    <!-- Carrito vacío -->
                    <div v-if="isEmptyCart"
                        class="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 dark:text-gray-500 mb-4"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-200 mb-2">
                            Tu carrito está vacío
                        </h3>
                        <p class="text-gray-500 dark:text-gray-400 mb-6">
                            Agrega algunos productos para continuar comprando
                        </p>
                        <NuxtLink to="/product" @click="closeModal"
                            class="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-md transition-all">
                            Seguir comprando
                        </NuxtLink>
                    </div>

                    <!-- Productos en el carrito -->
                    <ul v-else role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                        <li v-for="product in productShoppingCart" :key="product.id" class="py-6 flex">
                            <div
                                class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-600">
                                <img :src="product.imageUrl" :alt="product.name"
                                    class="h-full w-full object-cover object-center" loading="lazy">
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
                                        {{ product.description }}
                                    </p>
                                </div>

                                <div class="flex flex-1 items-end justify-between">
                                    <div class="flex items-center space-x-2">
                                        <button @click="decreaseQuantity(product)" :disabled="product.quantity <= 1"
                                            class="p-1 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
                                            aria-label="Reducir cantidad">
                                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M20 12H4" />
                                            </svg>
                                        </button>
                                        <span class="px-2">{{ product.quantity }}</span>
                                        <button @click="increaseQuantity(product)"
                                            :disabled="product.quantity >= product.stock"
                                            class="p-1 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
                                            aria-label="Aumentar cantidad">
                                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                    </div>

                                    <button @click="removeProductShoppingCart(product.id)"
                                        class="p-2 text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                        aria-label="Eliminar producto">
                                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                <div v-if="!isEmptyCart"
                    class="sticky bottom-0 border-t border-gray-200 dark:border-gray-700 px-6 py-6 bg-white dark:bg-gray-800">
                    <div class="flex justify-between text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        <p>Subtotal</p>
                        <p>S/. {{ totalPrice }}</p>
                    </div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
                        Envíos e impuestos calculados al momento de la compra.
                    </p>

                    <div class="space-y-3">
                        <button @click="initiateWhatsAppOrder"
                            class="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-6 py-3 text-white font-medium shadow-lg transition-all w-full">
                            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.515 5.392 1.521 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                            </svg>
                            Pedir por WhatsApp
                        </button>

                        <NuxtLink :to="checkoutRoute" @click="handleCheckout"
                            class="flex items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 px-6 py-3 text-white font-medium shadow-lg transition-all">
                            Finalizar compra
                        </NuxtLink>

                        <NuxtLink to="/product" @click="closeModal"
                            class="flex items-center justify-center rounded-lg border border-transparent px-6 py-3 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors">
                            Seguir comprando
                            <svg class="ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </NuxtLink>
                    </div>
                </div>

            </div>
        </div>
    </transition>


    <!-- Modal para datos del cliente (cuando no está logueado) -->
    <transition name="fade">
        <div v-if="showCustomerModal" class="fixed inset-0 z-50 overflow-y-auto">
            <div class="fixed inset-0 bg-black/50 transition-opacity" @click="showCustomerModal = false"></div>

            <div class="flex min-h-full items-center justify-center p-4">
                <div class="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
                    <button @click="showCustomerModal = false"
                        class="absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Complete sus datos</h3>

                    <form @submit.prevent="sendWhatsAppOrder" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre
                                completo</label>
                            <input v-model="customerData.name" type="text" required
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                        </div>

                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Teléfono</label>
                            <input v-model="customerData.phone" type="tel" required
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                        </div>

                        <div class="flex justify-end gap-3 pt-2">
                            <button type="button" @click="showCustomerModal = false"
                                class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                                Cancelar
                            </button>
                            <button type="submit"
                                class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center gap-2 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24"
                                    fill="currentColor">
                                    <path
                                        d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.515 5.392 1.521 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                </svg>
                                Enviar pedido
                            </button>
                        </div>
                    </form>
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

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true
    }
});

// Estados reactivos
const showCustomerModal = ref(false);
const customerData = reactive({
    name: '',
    phone: ''
});

// Store y computed properties
const productStore = useProductShoppingCartStore();
const { productShoppingCart, totalPrice } = storeToRefs(productStore);

const isEmptyCart = computed(() => productShoppingCart.value.length === 0);
const checkoutRoute = computed(() => {
    if (isEmptyCart.value) return '#';
    return user.value ? '/orderSummary' : '/login';
});

// Métodos
const closeModal = () => {
    console.log('Cerrando modal'); // Para depuración
    emit("update:isOpen", false);
};

const handleCheckout = () => {
    if (isEmptyCart.value) {
        $toast.error('Tu carrito está vacío!');
        return;
    }
    closeModal();
};

const removeProductShoppingCart = (id: number) => {
    productStore.deleteProductShoppingCart(id);
    $toast.error('Producto eliminado!');
};


const increaseQuantity = (product: Product) => {
    const newQuantity = product.quantity + 1;
    const success = productStore.updateProductQuantity(product.id, newQuantity);
    if (!success) {
        $toast.error('No hay suficiente stock disponible');
    } else {
        // Forzar la reactividad actualizando el array
        productStore.productShoppingCart = [...productStore.productShoppingCart];
    }
};

const decreaseQuantity = (product: Product) => {
    const newQuantity = product.quantity - 1;
    const success = productStore.updateProductQuantity(product.id, newQuantity);
    if (!success) {
        $toast.error('La cantidad mínima es 1');
    } else {
        // Forzar la reactividad actualizando el array
        productStore.productShoppingCart = [...productStore.productShoppingCart];
    }
};


const initiateWhatsAppOrder = () => {
    if (isEmptyCart.value) {
        $toast.error('Tu carrito está vacío!');
        return;
    }

    if (user.value) {
        sendWhatsAppOrder();
    } else {
        showCustomerModal.value = true;
    }
};
const sendWhatsAppOrder = async () => {
    try {
        const phoneNumber = '51942269610';
        const whatsappBaseUrl = 'https://wa.me';

        const userId = user.value?.id || 2;
        const clientName = user.value?.name || customerData.name;
        const clientPhone = user.value?.phoneNumber || customerData.phone;

        const orderItems = productShoppingCart.value.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
            productName: item.name
        }));

        const total = productShoppingCart.value.reduce(
            (sum, product) => sum + Number(product.price) * product.quantity, 0
        );

        let message = `¡Hola! Quiero hacer un pedido:\n\n`;
        orderItems.forEach((item, index) => {
            message += `${index + 1}. ${item.productName} - ${item.quantity} x S/.${item.price}\n`;
        });
        message += `\n*Total: S/.${total.toFixed(2)}*\n\n`;
        message += `Mis datos:\nNombre: ${clientName}\nTeléfono: ${clientPhone}`;

        const requestData = {
            orderItems: orderItems,
            total,
            clientName,
            clientPhone,
            userId
        };

        console.log("Datos enviados a la API:", requestData);

        const { data, error } = await useFetch('/api/v1/addWhatsAppOrder', {
            method: 'POST',
            body: requestData
        });

        if (error.value) throw new Error(error.value.message);

        const orderId = data.value?.orderId || 'Por generar';
        message += `\n\nN° de Orden: ${orderId}`;

        window.open(`${whatsappBaseUrl}/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');

        productStore.clearShoppingCart();
        showCustomerModal.value = false;
        closeModal();
        $toast.success('Pedido enviado correctamente');
    } catch (error) {
        $toast.error('Ocurrió un error al enviar el pedido');
        $toast.error(`Detalle: ${error.message}`);
    }
};

</script>

<style scoped>
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}

.line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>