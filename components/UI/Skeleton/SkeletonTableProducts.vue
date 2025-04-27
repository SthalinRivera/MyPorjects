<template>
    <!-- Skeleton Loader -->
    <div v-if="loading"
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <!-- Desktop Table Skeleton -->
        <div class=" overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            PRODUCTO</th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            CATEGORÍA</th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            PROMOCIÓN</th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            PRECIO</th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            STOCK</th>
                        <th scope="col"
                            class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            ACCIÓN</th>
                    </tr>
                </thead>
                <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <!-- 10 rows of skeleton loading -->
                    <tr v-for="i in 10" :key="i" class="animate-pulse">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10 bg-gray-200 dark:bg-gray-600 rounded-md"></div>
                                <div class="ml-4 space-y-2">
                                    <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-32"></div>
                                    <div class="h-3 bg-gray-200 dark:bg-gray-600 rounded w-48"></div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="h-6 bg-gray-200 dark:bg-gray-600 rounded-full w-16"></div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="h-6 bg-gray-200 dark:bg-gray-600 rounded w-24"></div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-12"></div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="h-6 bg-gray-200 dark:bg-gray-600 rounded-full w-20"></div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div class="flex justify-end gap-2">
                                <div class="h-6 w-6 bg-gray-200 dark:bg-gray-600 rounded"></div>
                                <div class="h-6 w-6 bg-gray-200 dark:bg-gray-600 rounded"></div>
                                <div class="h-6 w-6 bg-gray-200 dark:bg-gray-600 rounded"></div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Skeleton Pagination -->
        <div
            class="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
            <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-48 mb-4 sm:mb-0"></div>
            <div class="flex items-center gap-2">
                <div class="h-8 w-24 bg-gray-200 dark:bg-gray-600 rounded-md"></div>
                <div class="flex gap-1">
                    <div class="h-8 w-8 bg-gray-200 dark:bg-gray-600 rounded-md"></div>
                    <div class="h-8 w-8 bg-gray-200 dark:bg-gray-600 rounded-md"></div>
                </div>
                <div class="h-8 w-24 bg-gray-200 dark:bg-gray-600 rounded-md"></div>
            </div>
        </div>
    </div>


</template>

<script setup>
const loading = ref(true);

// Simular carga de datos
onMounted(() => {
    setTimeout(() => {
        loading.value = false;
    }, 2000);
});
</script>

<style>
.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}
</style>