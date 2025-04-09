<template>
    <div class="max-w-7xl mx-auto p-4 sm:p-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
                <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Order History</h1>
                <p class="text-gray-500 dark:text-gray-400 mt-1">Review your past purchases and order status</p>
            </div>
            <div class="relative">
                <select v-model="filterStatus" @change="fetchOrders" 
                    class="pl-4 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                    <option value="ALL">All Orders</option>
                    <option value="PENDING">Pending</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                </select>
                <i class="ri-arrow-down-s-line absolute right-3 top-2.5 text-gray-400 pointer-events-none"></i>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-16">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p class="text-gray-600 dark:text-gray-400">Loading your orders...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="orders.length === 0" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div class="mx-auto w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <i class="ri-shopping-bag-line text-3xl text-gray-400 dark:text-gray-500"></i>
            </div>
            <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-2">No orders found</h3>
            <p class="text-gray-500 dark:text-gray-400">You haven't placed any orders yet</p>
            <NuxtLink to="/products" class="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Browse Products
            </NuxtLink>
        </div>

        <!-- Orders List -->
        <div v-else class="space-y-4">
            <div v-for="order in orders" :key="order.id" 
                class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <!-- Order Header -->
                <div class="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between gap-4">
                    <div class="flex items-start gap-4">
                        <div class="p-2 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg">
                            <i class="ri-shopping-bag-2-line text-xl"></i>
                        </div>
                        <div>
                            <h2 class="text-lg font-semibold text-gray-800 dark:text-white">Order #{{ order.id }}</h2>
                            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Placed on {{ formatDate(order.createdAt) }}
                            </p>
                        </div>
                    </div>
                    <div class="flex flex-col items-end">
                        <span :class="statusClass(order.status)" class="px-3 py-1 text-xs rounded-full font-semibold">
                            {{ formatStatus(order.status) }}
                        </span>
                        <p class="text-lg font-bold text-gray-800 dark:text-white mt-2">
                            S/. {{ parseFloat(order.total.toString()) }}
                        </p>
                    </div>
                </div>

                <!-- Order Items -->
                <div class="divide-y divide-gray-200 dark:divide-gray-700">
                    <div v-for="(itemGroup, index) in groupItemsByProduct(order.orderItems)" :key="index" class="p-4 sm:p-6">
                        <div class="flex gap-4">
                            <div class="flex-shrink-0">
                                <img :src="itemGroup[0].product.imageUrl || 'https://via.placeholder.com/80'" 
                                    class="h-16 w-16 rounded-lg object-cover border border-gray-200 dark:border-gray-700">
                            </div>
                            <div class="flex-1 min-w-0">
                                <h3 class="text-base font-medium text-gray-800 dark:text-white truncate">
                                    {{ itemGroup[0].product.name }}
                                </h3>
                                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Quantity: {{ itemGroup.length }}
                                </p>
                            </div>
                            <div class="text-base font-medium text-gray-800 dark:text-white">
                                S/. {{ (itemGroup.reduce((total, item) => total + item.price * item.quantity, 0)) }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Order Footer -->
                <div class="p-4 sm:p-6 bg-gray-50 dark:bg-gray-700/50 flex justify-end">
                    <NuxtLink :to="`/orders/${order.id}`" 
                        class="flex items-center gap-2 px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                        <span>View Details</span>
                        <i class="ri-arrow-right-line"></i>
                    </NuxtLink>
                </div>
            </div>
        </div>

        <!-- Pagination -->
        <div v-if="orders.length > 0 && totalPages > 1" class="flex justify-center mt-8">
            <nav class="flex items-center gap-2">
                <button @click="prevPage" :disabled="currentPage === 1" 
                    class="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                    <i class="ri-arrow-left-line"></i>
                </button>
                
                <template v-for="page in visiblePages" :key="page">
                    <button @click="goToPage(page)" 
                        :class="{'bg-blue-600 text-white': currentPage === page, 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700': currentPage !== page}"
                        class="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 font-medium">
                        {{ page }}
                    </button>
                </template>
                
                <button @click="nextPage" :disabled="currentPage === totalPages" 
                    class="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                    <i class="ri-arrow-right-line"></i>
                </button>
            </nav>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { user } = useUserSession();
const orders = ref<any[]>([]);
const loading = ref(true);
const filterStatus = ref("ALL");
const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalOrders = ref(0);

definePageMeta({
    layout: "dashboard",
});

// Format date for display
const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

// Format status for display
const formatStatus = (status: string) => {
    const statusMap: Record<string, string> = {
        PENDING: "Pending",
        COMPLETED: "Completed",
        CANCELLED: "Cancelled"
    };
    return statusMap[status] || status;
};

// Status badge classes
const statusClass = (status: string): string => {
    const classes: Record<string, string> = {
        PENDING: "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200",
        COMPLETED: "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200",
        CANCELLED: "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200",
    };
    return classes[status] || "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200";
};

// Group order items by product
const groupItemsByProduct = (orderItems: any[]) => {
    const grouped: any[] = [];
    const map = new Map();

    orderItems.forEach((item) => {
        if (!map.has(item.product.id)) {
            map.set(item.product.id, []);
        }
        map.get(item.product.id).push(item);
    });

    map.forEach((value) => {
        grouped.push(value);
    });

    return grouped;
};

// Pagination
const totalPages = computed(() => Math.ceil(totalOrders.value / itemsPerPage.value));

const visiblePages = computed(() => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages.value, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return pages;
});

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        fetchOrders();
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        fetchOrders();
    }
};

const goToPage = (page: number) => {
    currentPage.value = page;
    fetchOrders();
};

// Fetch orders
const fetchOrders = async () => {
    if (!user.value?.usuarioId) return;

    loading.value = true;
    try {
        const { data } = await useFetch(`/api/v1/ordersByUser/${user.value.usuarioId}`, {
            query: {
                status: filterStatus.value === "ALL" ? undefined : filterStatus.value,
                page: currentPage.value,
                limit: itemsPerPage.value
            }
        });
        
        orders.value = data.value?.orders || [];
        totalOrders.value = data.value?.total || 0;
    } catch (error) {
        console.error("Error fetching orders:", error);
    } finally {
        loading.value = false;
    }
};

// Watch for user changes
watchEffect(() => {
    if (user.value?.usuarioId) {
        fetchOrders();
    }
});
</script>

<style scoped>
/* Animation for loading */
@keyframes spin {
    to { transform: rotate(360deg); }
}

.animate-spin {
    animation: spin 1s linear infinite;
}

/* Transition for hover effects */
.transition-shadow {
    transition: box-shadow 0.2s ease-in-out;
}

/* Custom styling for status badges */
.status-badge {
    @apply px-3 py-1 text-xs rounded-full font-semibold;
}
</style>