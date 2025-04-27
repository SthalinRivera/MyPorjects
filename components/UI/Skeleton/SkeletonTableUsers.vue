<template>
    <!-- Skeleton Loader para Usuarios -->
    <div v-if="loading"
        class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <!-- Tabla Desktop -->
        <div class="hidden md:block overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Usuario</th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Email</th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Rol</th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Teléfono</th>
                        <th scope="col"
                            class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Acciones</th>
                    </tr>
                </thead>
                <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <!-- 5 filas de skeleton loading -->
                    <tr v-for="i in 10" :key="i" class="animate-pulse">
                        <!-- Columna Usuario -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                                <div class="ml-4 space-y-2">
                                    <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-24"></div>
                                    <div class="h-3 bg-gray-200 dark:bg-gray-600 rounded w-16"></div>
                                </div>
                            </div>
                        </td>

                        <!-- Columna Email -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-32"></div>
                        </td>

                        <!-- Columna Rol -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="h-6 bg-gray-200 dark:bg-gray-600 rounded-full w-20"></div>
                        </td>

                        <!-- Columna Teléfono -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-16"></div>
                        </td>

                        <!-- Columna Acciones -->
                        <td class="px-6 py-4 whitespace-nowrap text-right">
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

        <!-- Versión Móvil -->
        <div class="md:hidden space-y-4 p-4">
            <div v-for="i in 3" :key="'mobile-' + i" class="border dark:border-gray-700 rounded-lg p-4 animate-pulse">
                <div class="flex items-start justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="h-12 w-12 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                        <div class="space-y-2">
                            <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-24"></div>
                            <div class="h-3 bg-gray-200 dark:bg-gray-600 rounded w-16"></div>
                        </div>
                    </div>
                    <div class="flex space-x-2">
                        <div class="h-6 w-6 bg-gray-200 dark:bg-gray-600 rounded"></div>
                        <div class="h-6 w-6 bg-gray-200 dark:bg-gray-600 rounded"></div>
                        <div class="h-6 w-6 bg-gray-200 dark:bg-gray-600 rounded"></div>
                    </div>
                </div>

                <div class="mt-3 grid grid-cols-2 gap-4">
                    <div>
                        <div class="h-3 bg-gray-200 dark:bg-gray-600 rounded w-12 mb-1"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-32"></div>
                    </div>
                    <div>
                        <div class="h-3 bg-gray-200 dark:bg-gray-600 rounded w-12 mb-1"></div>
                        <div class="h-6 bg-gray-200 dark:bg-gray-600 rounded-full w-20"></div>
                    </div>
                    <div>
                        <div class="h-3 bg-gray-200 dark:bg-gray-600 rounded w-16 mb-1"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-16"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Tabla real cuando loading es false -->
    <div v-else>
        <!-- Tu tabla real de usuarios aquí -->
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