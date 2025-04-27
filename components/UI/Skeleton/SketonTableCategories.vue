<script lang="ts" setup>

</script>

<template>
    <div>
        <!-- Skeleton Loader -->
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                    <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Imagen
                    </th>
                    <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Nombre
                    </th>
                    <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Slug
                    </th>
                    <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Descripción
                    </th>
                    <th scope="col"
                        class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Acciones
                    </th>
                </tr>
            </thead>

            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <!-- Aquí simulo 5 filas de skeleton -->
                <tr v-for="n in 5" :key="n" class="animate-pulse">
                    <td class="px-6 py-4">
                        <div class="h-12 w-12 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32 mb-2"></div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24 mb-2"></div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-64 mb-2"></div>
                    </td>
                    <td class="px-6 py-4 text-right">
                        <div class="flex justify-end gap-2">
                            <div class="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                            <div class="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="postcss" scoped></style>
