<script lang="ts" setup>

</script>

<template>
    <div class="overflow-x-auto animate-pulse">
        <table class="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
                <tr class="bg-gray-100 dark:bg-gray-700">
                    <th class="border px-4 py-3">
                        <div class="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto"></div>
                    </th>
                    <th class="border px-4 py-3">
                        <div class="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto"></div>
                    </th>
                    <th class="border px-4 py-3">
                        <div class="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto"></div>
                    </th>
                    <th class="border px-4 py-3">
                        <div class="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto"></div>
                    </th>
                    <th class="border px-4 py-3">
                        <div class="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto"></div>
                    </th>
                    <th class="border px-4 py-3">
                        <div class="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto"></div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <!-- Fila de Variable 1 -->
                <tr class="bg-white dark:bg-gray-800">
                    <!-- Variable (rowspan) -->
                    <td class="border px-4 py-3 align-top" rowspan="4">
                        <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mt-1"></div>
                    </td>
                    <!-- Definición Operacional (rowspan) -->
                    <td class="border px-4 py-3 align-top" rowspan="4">
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6 mt-1"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mt-1"></div>
                    </td>
                    <!-- Dimensión 1 (rowspan) -->
                    <td class="border px-4 py-3 align-top" rowspan="2">
                        <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mt-1"></div>
                    </td>
                    <!-- Indicador 1 -->
                    <td class="border px-4 py-3">
                        <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                    </td>
                    <td class="border px-4 py-3">
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mt-1"></div>
                    </td>
                    <td class="border px-4 py-3">
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    </td>
                </tr>

                <!-- Fila de Indicador 2 -->
                <tr class="bg-gray-50 dark:bg-gray-700">
                    <!-- Indicador 2 -->
                    <td class="border px-4 py-3">
                        <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/5"></div>
                    </td>
                    <td class="border px-4 py-3">
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                    </td>
                    <td class="border px-4 py-3">
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mt-1"></div>
                    </td>
                </tr>

                <!-- Fila de Dimensión 2 -->
                <tr class="bg-white dark:bg-gray-800">
                    <!-- Dimensión 2 (rowspan) -->
                    <td class="border px-4 py-3 align-top" rowspan="2">
                        <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mt-1"></div>
                    </td>
                    <!-- Indicador 1 -->
                    <td class="border px-4 py-3">
                        <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    </td>
                    <td class="border px-4 py-3">
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                    </td>
                    <td class="border px-4 py-3">
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5 mt-1"></div>
                    </td>
                </tr>

                <!-- Fila de Indicador 2 -->
                <tr class="bg-gray-50 dark:bg-gray-700">
                    <!-- Indicador 2 -->
                    <td class="border px-4 py-3">
                        <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    </td>
                    <td class="border px-4 py-3">
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mt-1"></div>
                    </td>
                    <td class="border px-4 py-3">
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                    </td>
                </tr>

                <!-- Fila de Variable 2 -->
                <tr class="bg-white dark:bg-gray-800">
                    <!-- Variable (rowspan) -->
                    <td class="border px-4 py-3 align-top" rowspan="3">
                        <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                    </td>
                    <!-- Definición Operacional (rowspan) -->
                    <td class="border px-4 py-3 align-top" rowspan="3">
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mt-1"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mt-1"></div>
                    </td>
                    <!-- Dimensión 1 (rowspan) -->
                    <td class="border px-4 py-3 align-top" rowspan="3">
                        <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mt-1"></div>
                    </td>
                    <!-- Indicador 1 -->
                    <td class="border px-4 py-3">
                        <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/5"></div>
                    </td>
                    <td class="border px-4 py-3">
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    </td>
                    <td class="border px-4 py-3">
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mt-1"></div>
                    </td>
                </tr>

                <!-- Fila de Indicador 2 -->
                <tr class="bg-gray-50 dark:bg-gray-700">
                    <!-- Indicador 2 -->
                    <td class="border px-4 py-3">
                        <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                    </td>
                    <td class="border px-4 py-3">
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mt-1"></div>
                    </td>
                    <td class="border px-4 py-3">
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    </td>
                </tr>

                <!-- Fila de Indicador 3 -->
                <tr class="bg-white dark:bg-gray-800">
                    <!-- Indicador 3 -->
                    <td class="border px-4 py-3">
                        <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    </td>
                    <td class="border px-4 py-3">
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                    </td>
                    <td class="border px-4 py-3">
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mt-1"></div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="postcss" scoped></style>
