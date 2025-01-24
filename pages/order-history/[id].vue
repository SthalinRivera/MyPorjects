<template>
    <div class="max-w-4xl mx-auto p-6">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            Order History
        </h1>

        <!-- Loading State -->
        <div v-if="loading" class="text-center text-gray-600 dark:text-gray-400">
            <p class="animate-pulse">Loading order history...</p>
        </div>

        <!-- Orders -->
        <div v-else-if="orders && orders.length > 0" class="space-y-6">
            <div v-for="order in orders" :key="order.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div class="flex justify-between items-center border-b pb-4 mb-4">
                    <h2 class="text-xl font-semibold text-gray-800 dark:text-white">
                        Order #{{ order.id }}
                    </h2>
                    <span class="px-3 py-1 text-sm rounded-full font-semibold" :class="{
                        'bg-yellow-100 text-yellow-800': order.status === 'PENDING',
                        'bg-green-100 text-green-800': order.status === 'COMPLETED',
                        'bg-red-100 text-red-800': order.status === 'CANCELLED',
                    }">
                        {{ order.status }}
                    </span>
                </div>

                <ul class="divide-y divide-gray-200 dark:divide-gray-700">
                    <li v-for="item in order.orderItems" :key="item.id"
                        class="flex justify-between py-3 text-gray-600 dark:text-gray-300">
                        <div>
                            <p class="font-medium text-gray-800 dark:text-gray-200">
                                {{ item.product.name }}
                            </p>
                            <p class="text-sm text-gray-500 dark:text-gray-400">
                                Quantity: {{ item.quantity }}
                            </p>
                        </div>
                        <span>S/. {{ (item.price * item.quantity).toFixed(2) }}</span>
                    </li>
                </ul>

                <div class="mt-4 text-right font-bold text-lg text-gray-800 dark:text-white">
                    Total: S/. {{ parseFloat(order.total).toFixed(2) }}
                </div>
            </div>
        </div>

        <!-- No Orders -->
        <div v-else class="text-center text-gray-600 dark:text-gray-400">
            <p>No orders found for this user.</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const orders = ref([]);
const loading = ref(true);
const { user, clear } = useUserSession();

onMounted(async () => {
    const id = route.params.id;
    // const id = user.value.usuarioId;
    console.log('User id: ', id);
    try {
        const { data } = await useFetch(`/api/v1/ordersByUser/${id}`);
        console.log("Response from API:", data.value); // Verifica la estructura de la respuesta
        orders.value = data.value.orders; // Accede a la propiedad 'orders'

    } catch (error) {
        console.error("Error fetching orders:", error);
    } finally {
        loading.value = false;
    }
});
</script>

<style>
/* Tailwind Customizations */
.order-status {
    @apply px-3 py-1 text-sm rounded-full font-semibold;
}
</style>