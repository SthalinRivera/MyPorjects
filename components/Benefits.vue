<script lang="ts" setup>

</script>

<template>
    <div class="max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm dark:shadow-gray-700/30 flex items-start">
            <div class="bg-pink-100 dark:bg-pink-900/50 p-3 rounded-full mr-4">
                <UIcon name="i-heroicons-truck" class="w-6 h-6 text-pink-500 dark:text-pink-400" />
            </div>
            <div>
                <h3 class="font-semibold text-gray-900 dark:text-white mb-1">Envío rápido</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">Recibe tu pedido en 24-48 horas</p>
            </div>
        </div>

        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm dark:shadow-gray-700/30 flex items-start">
            <div class="bg-pink-100 dark:bg-pink-900/50 p-3 rounded-full mr-4">
                <UIcon name="i-heroicons-arrow-path" class="w-6 h-6 text-pink-500 dark:text-pink-400" />
            </div>
            <div>
                <h3 class="font-semibold text-gray-900 dark:text-white mb-1">Devoluciones</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">30 días para devoluciones gratuitas</p>
            </div>
        </div>

        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm dark:shadow-gray-700/30 flex items-start">
            <div class="bg-pink-100 dark:bg-pink-900/50 p-3 rounded-full mr-4">
                <UIcon name="i-heroicons-shield-check" class="w-6 h-6 text-pink-500 dark:text-pink-400" />
            </div>
            <div>
                <h3 class="font-semibold text-gray-900 dark:text-white mb-1">Pago seguro</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">Protegido con encriptación SSL</p>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
