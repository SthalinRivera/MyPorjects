<script lang="ts" setup>

</script>

<template>
    <!-- View pRODUCT Details Modal -->
    <!-- <div v-if="showViewProductModal"
            class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-xl font-bold text-gray-800 dark:text-white">Detalles del Producto.</h2>
                    <button @click="showViewProductModal = false"
                        class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                        <i class="ri-close-line text-2xl"></i>
                    </button>
                </div>

                <div v-if="selectedProduct" class="space-y-6">
                    <div class="flex flex-col items-center mb-6">
                        <img :src="selectedProduct.imageUrl || 'https://via.placeholder.com/200'"
                            class="h-40 w-40 rounded-lg object-cover border-2 border-gray-200 dark:border-gray-700 mb-3">
                        <h3 class="text-lg font-medium text-gray-900 dark:text-white">{{ selectedProduct.name }}</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400">ID: {{ selectedProduct.id }}</p>
                    </div>

                    <div class="grid grid-cols-1 gap-1   md:gap-4">
                        <div class="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                            <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Descripción.</p>
                            <p class="text-sm text-gray-900 dark:text-white">{{ selectedProduct.description }}</p>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div class="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                                <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Priecio</p>
                                <p class="text-sm text-gray-900 dark:text-white">S/. {{ selectedProduct.price }}
                                </p>
                            </div>
                            <div class="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                                <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Stock</p>
                                <p class="text-sm text-gray-900 dark:text-white">{{ selectedProduct.stock }}</p>
                            </div>
                        </div>

                        <div class="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                            <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Categoría</p>
                            <p class="text-sm text-gray-900 dark:text-white">{{
                                getCategoryName(selectedProduct.categoryId)
                            }}</p>
                        </div>

                        <div v-if="selectedProduct.createdAt" class="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                            <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Creado En.</p>
                            <p class="text-sm text-gray-900 dark:text-white">{{ selectedProduct.createdAt }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
</template>

<style lang="postcss" scoped></style>
