<template>
    <div class="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h1 class="text-3xl font-bold text-amber-600 mb-2">Política de Privacidad</h1>
            <p class="text-gray-600 dark:text-gray-300">Última actualización: 15/06/2023</p>
        </div>

        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6 prose dark:prose-invert max-w-none">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">1. Información recopilada</h2>
            <p class="mb-6">Recopilamos información cuando:</p>
            <ul class="list-disc pl-5 space-y-2 mb-6">
                <li>Realizas una compra</li>
                <li>Te registras en nuestra newsletter</li>
                <li>Navegas por nuestro sitio</li>
            </ul>

            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">2. Uso de la información</h2>
            <p class="mb-4">Utilizamos tu información para:</p>
            <ul class="list-disc pl-5 space-y-2 mb-6">
                <li>Procesar tus pedidos</li>
                <li>Mejorar nuestros servicios</li>
                <li>Personalizar tu experiencia</li>
            </ul>

            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">3. Protección de datos</h2>
            <p class="mb-6">Usamos encriptación SSL y cumplimos con estándares PCI-DSS para procesamiento de pagos.</p>

            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">4. Cookies</h2>
            <p class="mb-6">Nuestro sitio utiliza cookies para mejorar la experiencia. Puedes desactivarlas en tu
                navegador.</p>

            <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Contacto</h2>
                <p class="text-amber-600 dark:text-amber-400">privacidad@sunshinemadeforyou.com</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'default'
})
</script>