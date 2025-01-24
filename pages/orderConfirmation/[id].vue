<template>
    <div class="max-w-4xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-6">Order Confirmation</h1>

        <div v-if="order" class="space-y-4">
            <p class="text-lg text-gray-600 dark:text-gray-400">
                Thank you for your order! Your order <span class="font-bold">#{{ order.id }}</span> has been placed and
                is currently <span class="font-bold text-yellow-500">{{ order.status }}</span>.
            </p>

            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-300">Order Details</h2>
                <ul class="mt-4 space-y-2">
                    <li v-for="item in order.orderItems" :key="item.id"
                        class="flex justify-between text-gray-700 dark:text-gray-300">
                        <span>{{ item.product.name }} (x{{ item.quantity }})</span>
                        <span>S/. {{ (item.price * item.quantity) }}</span>
                        {{ item.userId }}
                    </li>
                </ul>
                <div class="mt-4 text-right font-bold text-gray-900 dark:text-white">
                    Total: S/. {{ parseFloat(order.total).toFixed(2) }} <!-- Asegúrate de que total sea un número -->
                </div>
            </div>

            <NuxtLink :to="`/order-history/${order.userId}`"
                class="px-6 py-3 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition-colors">
                View Order History
            </NuxtLink>
        </div>

        <div v-else>
            <p>Loading order details...</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const order = ref(null);

onMounted(async () => {
    const id = route.params.id;
    console.log(id);

    try {
        const { data } = await useFetch(`/api/v1/orders/${id}`);
        if (data.value) {
            order.value = data.value.order; // Accede directamente a la propiedad 'order'

        }
    } catch (error) {
        console.error("Error fetching order:", error);
    }
});
</script>
