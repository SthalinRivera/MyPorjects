<template>
    <div class="max-w-4xl mx-auto p-6">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            Order History
        </h1>

        <!-- Estado de carga -->
        <div v-if="loading" class="text-center text-gray-600 dark:text-gray-400">
            <p class="animate-pulse">Loading order history...</p>
        </div>

        <!-- Órdenes -->
        <div v-else-if="orders.length > 0" class="space-y-6">
            <div v-for="order in orders" :key="order.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div class="flex justify-between items-center border-b pb-4 mb-4">
                    <h2 class="text-xl font-semibold text-gray-800 dark:text-white">
                        Order #{{ order.id }}
                    </h2>
                    <span class="px-3 py-1 text-sm rounded-full font-semibold" :class="statusClass(order.status)">
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
                    Total: S/. {{ parseFloat(order.total.toString()).toFixed(2) }}
                </div>
            </div>
        </div>

        <!-- Sin órdenes -->
        <div v-else class="text-center text-gray-600 dark:text-gray-400">
            <p>No orders found for this user.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, nextTick } from "vue";
import { useRoute } from "vue-router";


const route = useRoute();
const orders = ref<any[]>([]);
const loading = ref(true);
const { user } = useUserSession(); // Obtiene el usuario de la sesión

definePageMeta({
    layout: "dashboard",
});

/**
 * Obtiene la lista de órdenes del usuario
 */
const fetchOrders = async () => {
    if (!user.value?.usuarioId) return; // Asegura que el usuario está definido

    loading.value = true;
    try {
        const { data } = await useFetch(`/api/v1/ordersByUser/${user.value.usuarioId}`);
        console.log("Response from API:", data.value);
        orders.value = data.value?.orders || [];
    } catch (error) {
        console.error("Error fetching orders:", error);
    } finally {
        loading.value = false;
    }
};

/**
 * Devuelve la clase CSS según el estado de la orden
 */
const statusClass = (status: string): string => {
    const classes: Record<string, string> = {
        PENDING: "bg-yellow-100 text-yellow-800",
        COMPLETED: "bg-green-100 text-green-800",
        CANCELLED: "bg-red-100 text-red-800",
    };
    return classes[status] || "bg-gray-100 text-gray-800";
};

/**
 * Observa cambios en el usuario y actualiza las órdenes cuando sea necesario
 */
watchEffect(async () => {
    if (user.value?.usuarioId) {
        await nextTick(); // Asegura que el DOM se actualice antes de llamar a la API
        fetchOrders();
    }
});
</script>
