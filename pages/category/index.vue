<template>
    <div>
        <NuxtLink to="/videos/favoritos">Favoritos</NuxtLink>
        <!-- <h1 class="text-4xl text-center mb-2">{{ $t("titulo") }}</h1> -->
        <h1 class="text-4xl text-center mb-2">Category</h1>

        <!-- component -->
        <div class="container mx-auto p-4">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <thead class="bg-gray-50 dark:bg-gray-700 text-left text-gray-600 dark:text-gray-300">
                <tr>
                    <th class="px-6 py-3 text-xs font-medium uppercase tracking-wider">Categoria</th>
                    <th class="px-6 py-3 text-xs font-medium uppercase tracking-wider">Accion</th>
                </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="category in categories" :key="category.id" class="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td class="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                        {{ category.name }}
                    </td>
                    <td class="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                        <!-- Accion content here -->
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>
</template>

<script setup lang="ts">

import type { Category } from '~/interfaces/category';
const { data: categories } = await useFetch<Category[]>("/api/v1/category")
</script>
<style lang="css" scoped></style>