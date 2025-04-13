<script setup lang="ts">
definePageMeta({
    middleware: ['auth'],

    layout: 'dashboard',
});

</script>

<template>
    <!-- Content -->
    <div>
        <div class="p-6 dark:bg-gray-900 min-h-screen">
            <!-- Header -->
            <div class="mb-8">
                <h1 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h1>
                <p class="text-gray-500 dark:text-gray-400 mt-2">Welcome back! Here's what's happening with your store
                    today.</p>
            </div>

            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <!-- Usuarios -->
                <div
                    class="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <p class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Total Users</p>
                            <div class="flex items-end mt-2">
                                <h3 class="text-3xl font-bold text-indigo-600 dark:text-indigo-400">2</h3>
                                <span class="text-green-500 text-sm font-medium ml-2 flex items-center">
                                    <i class="ri-arrow-up-line mr-1"></i> 5.2%
                                </span>
                            </div>
                        </div>
                        <div
                            class="p-3 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300">
                            <i class="ri-user-3-line text-2xl"></i>
                        </div>
                    </div>
                    <a href="/gebruikers"
                        class="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 font-medium text-sm transition-colors">
                        View all
                        <i class="ri-arrow-right-line ml-1"></i>
                    </a>
                </div>

                <!-- Productos -->
                <div
                    class="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <p class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Products</p>
                            <div class="flex items-end mt-2">
                                <h3 class="text-3xl font-bold text-green-600 dark:text-green-400">100</h3>
                                <span class="text-red-500 text-sm font-medium ml-2 flex items-center">
                                    <i class="ri-arrow-down-line mr-1"></i> 2.1%
                                </span>
                            </div>
                        </div>
                        <div
                            class="p-3 rounded-lg bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300">
                            <i class="ri-box-2-line text-2xl"></i>
                        </div>
                    </div>
                    <a href="/products"
                        class="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 font-medium text-sm transition-colors">
                        View all
                        <i class="ri-arrow-right-line ml-1"></i>
                    </a>
                </div>

                <!-- Ventas -->
                <div
                    class="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <p class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Total Sales</p>
                            <div class="flex items-end mt-2">
                                <h3 class="text-3xl font-bold text-yellow-600 dark:text-yellow-400">$1,240</h3>
                                <span class="text-green-500 text-sm font-medium ml-2 flex items-center">
                                    <i class="ri-arrow-up-line mr-1"></i> 12.7%
                                </span>
                            </div>
                        </div>
                        <div
                            class="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-300">
                            <i class="ri-shopping-bag-line text-2xl"></i>
                        </div>
                    </div>
                    <a href="/sales"
                        class="inline-flex items-center text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-200 font-medium text-sm transition-colors">
                        View report
                        <i class="ri-arrow-right-line ml-1"></i>
                    </a>
                </div>
            </div>

            <!-- Additional Content Section -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Recent Activity -->
                <div
                    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-xl font-semibold text-gray-800 dark:text-white">Recent Activity</h2>
                        <button class="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">View All</button>
                    </div>
                    <div class="space-y-4">
                        <div class="flex items-start">
                            <div class="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg mr-4">
                                <i class="ri-user-add-line text-indigo-600 dark:text-indigo-300 text-xl"></i>
                            </div>
                            <div>
                                <p class="text-gray-800 dark:text-gray-200 font-medium">New user registered</p>
                                <p class="text-gray-500 dark:text-gray-400 text-sm">John Doe joined 2 hours ago</p>
                            </div>
                            <span class="ml-auto text-xs text-gray-400">2h</span>
                        </div>
                        <div class="flex items-start">
                            <div class="p-2 bg-green-100 dark:bg-green-900 rounded-lg mr-4">
                                <i class="ri-shopping-cart-line text-green-600 dark:text-green-300 text-xl"></i>
                            </div>
                            <div>
                                <p class="text-gray-800 dark:text-gray-200 font-medium">New order received</p>
                                <p class="text-gray-500 dark:text-gray-400 text-sm">Order #1234 for $89.99</p>
                            </div>
                            <span class="ml-auto text-xs text-gray-400">4h</span>
                        </div>
                        <div class="flex items-start">
                            <div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
                                <i class="ri-star-line text-blue-600 dark:text-blue-300 text-xl"></i>
                            </div>
                            <div>
                                <p class="text-gray-800 dark:text-gray-200 font-medium">New product review</p>
                                <p class="text-gray-500 dark:text-gray-400 text-sm">4 stars for "Premium Headphones"</p>
                            </div>
                            <span class="ml-auto text-xs text-gray-400">1d</span>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div
                    class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg">
                    <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-6">Quick Actions</h2>
                    <div class="grid grid-cols-2 gap-4">
                        <a href="#"
                            class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-center">
                            <i class="ri-add-circle-line text-2xl text-indigo-600 dark:text-indigo-400 mb-2"></i>
                            <p class="font-medium text-gray-800 dark:text-gray-200">Add Product</p>
                        </a>
                        <a href="#"
                            class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-center">
                            <i class="ri-file-chart-line text-2xl text-green-600 dark:text-green-400 mb-2"></i>
                            <p class="font-medium text-gray-800 dark:text-gray-200">Generate Report</p>
                        </a>
                        <a href="#"
                            class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-center">
                            <i class="ri-notification-3-line text-2xl text-yellow-600 dark:text-yellow-400 mb-2"></i>
                            <p class="font-medium text-gray-800 dark:text-gray-200">View Alerts</p>
                        </a>
                        <a href="#"
                            class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-center">
                            <i class="ri-settings-3-line text-2xl text-purple-600 dark:text-purple-400 mb-2"></i>
                            <p class="font-medium text-gray-800 dark:text-gray-200">Settings</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>
/* Smooth transitions for interactive elements */
a,
button {
    transition: all 0.2s ease-in-out;
}

/* Custom shadow for cards */
.shadow-lg {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.hover\:shadow-xl:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>