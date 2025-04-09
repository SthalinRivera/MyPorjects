<template>
    <div class="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h1 class="text-3xl font-bold text-amber-600 mb-2">Términos y Condiciones</h1>
            <p class="text-gray-600 dark:text-gray-300">Condiciones generales de SunshineMadeForYou</p>
        </div>

        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6 prose dark:prose-invert max-w-none">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">1. Aceptación de términos</h2>
            <p class="mb-6">Al usar este sitio, aceptas estos términos. Si no estás de acuerdo, abstente de usarlo.</p>

            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">2. Propiedad intelectual</h2>
            <p class="mb-6">Todo el contenido es propiedad exclusiva de SunshineMadeForYou.</p>

            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">3. Compras</h2>
            <ul class="list-disc pl-5 space-y-2 mb-6">
                <li>Información veraz requerida</li>
                <li>Nos reservamos derecho a rechazar pedidos</li>
                <li>Precios pueden cambiar</li>
            </ul>

            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">4. Devoluciones</h2>
            <p class="mb-4">Aceptamos devoluciones en 14 días si:</p>
            <ul class="list-disc pl-5 space-y-2 mb-6">
                <li>Producto en estado original</li>
                <li>Con empaque y etiquetas</li>
                <li>Presentando comprobante</li>
            </ul>

            <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
                <p class="text-sm text-gray-500 dark:text-gray-400">© 2023 SunshineMadeForYou. Todos los derechos
                    reservados.</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'default'
})
</script>