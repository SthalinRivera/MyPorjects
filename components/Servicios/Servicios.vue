<template>
    <div class=" transition-colors duration-300">
        <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <!-- Header -->
            <div class="text-center mb-16">

                <h3
                    class="text-center text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
                    <span class=""> Servicios Profesionales</span>
                </h3>
                <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Soluciones integrales para tus proyectos digitales y académicos
                </p>
            </div>

            <!-- Servicios Grid -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                <!-- Diseño Web -->
                <div class="relative group">
                    <div
                        class="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300">
                    </div>
                    <div
                        class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden h-full flex flex-col border border-gray-200 dark:border-gray-700">
                        <div class="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-5">
                            <h3 class="text-xl font-bold text-white">🌐 Diseño Web</h3>
                            <p class="text-blue-100 text-sm mt-1">Sitios personalizados y funcionales</p>
                        </div>
                        <div class="p-6 flex-grow">
                            <ul class="space-y-3 mb-6">
                                <li class="flex items-start">
                                    <UIcon name="i-heroicons-check-circle"
                                        class="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                                    <span class="text-gray-700 dark:text-gray-300">Diseño completamente
                                        personalizado</span>
                                </li>
                                <li class="flex items-start">
                                    <UIcon name="i-heroicons-check-circle"
                                        class="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                                    <span class="text-gray-700 dark:text-gray-300">Desarrollo responsive (móvil, tablet,
                                        desktop)</span>
                                </li>
                                <li class="flex items-start">
                                    <UIcon name="i-heroicons-check-circle"
                                        class="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                                    <span class="text-gray-700 dark:text-gray-300">Optimización SEO básica</span>
                                </li>
                                <li class="flex items-start">
                                    <UIcon name="i-heroicons-check-circle"
                                        class="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                                    <span class="text-gray-700 dark:text-gray-300">Integración con redes sociales</span>
                                </li>
                            </ul>
                        </div>
                        <div class="px-6 pb-6">
                            <UButton label="Más información" block size="lg" color="blue" variant="solid"
                                icon="i-heroicons-information-circle" :ui="{ rounded: 'rounded-lg' }" />
                        </div>
                    </div>
                </div>

                <!-- Ecommerce -->
                <div class="relative group">
                    <div
                        class="absolute -inset-1 bg-gradient-to-r from-purple-400 to-fuchsia-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300">
                    </div>
                    <div
                        class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden h-full flex flex-col border border-gray-200 dark:border-gray-700">
                        <div class="bg-gradient-to-r from-purple-500 to-fuchsia-600 px-6 py-5">
                            <h3 class="text-xl font-bold text-white">🛒 Ecommerce</h3>
                            <p class="text-purple-100 text-sm mt-1">Tiendas online listas para vender</p>
                        </div>
                        <div class="p-6 flex-grow">
                            <ul class="space-y-3 mb-6">
                                <li class="flex items-start">
                                    <UIcon name="i-heroicons-check-circle"
                                        class="text-purple-500 mt-0.5 mr-2 flex-shrink-0" />
                                    <span class="text-gray-700 dark:text-gray-300">Diseño de tienda online
                                        completa</span>
                                </li>
                                <li class="flex items-start">
                                    <UIcon name="i-heroicons-check-circle"
                                        class="text-purple-500 mt-0.5 mr-2 flex-shrink-0" />
                                    <span class="text-gray-700 dark:text-gray-300">Integración de pasarelas de
                                        pago</span>
                                </li>
                                <li class="flex items-start">
                                    <UIcon name="i-heroicons-check-circle"
                                        class="text-purple-500 mt-0.5 mr-2 flex-shrink-0" />
                                    <span class="text-gray-700 dark:text-gray-300">Gestión de inventario</span>
                                </li>
                                <li class="flex items-start">
                                    <UIcon name="i-heroicons-check-circle"
                                        class="text-purple-500 mt-0.5 mr-2 flex-shrink-0" />
                                    <span class="text-gray-700 dark:text-gray-300">Carrito de compras optimizado</span>
                                </li>
                            </ul>
                        </div>
                        <div class="px-6 pb-6">
                            <UButton label="Más información" block size="lg" color="purple" variant="solid"
                                icon="i-heroicons-information-circle" :ui="{ rounded: 'rounded-lg' }" />
                        </div>
                    </div>
                </div>

                <!-- Landing Pages -->
                <div class="relative group">
                    <div
                        class="absolute -inset-1 bg-gradient-to-r from-green-400 to-teal-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300">
                    </div>
                    <div
                        class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden h-full flex flex-col border border-gray-200 dark:border-gray-700">
                        <div class="bg-gradient-to-r from-green-500 to-teal-600 px-6 py-5">
                            <h3 class="text-xl font-bold text-white">🚀 Landing Pages</h3>
                            <p class="text-green-100 text-sm mt-1">Conversión de visitantes en clientes</p>
                        </div>
                        <div class="p-6 flex-grow">
                            <ul class="space-y-3 mb-6">
                                <li class="flex items-start">
                                    <UIcon name="i-heroicons-check-circle"
                                        class="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                    <span class="text-gray-700 dark:text-gray-300">Diseño de alta conversión</span>
                                </li>
                                <li class="flex items-start">
                                    <UIcon name="i-heroicons-check-circle"
                                        class="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                    <span class="text-gray-700 dark:text-gray-300">Optimización para campañas</span>
                                </li>
                                <li class="flex items-start">
                                    <UIcon name="i-heroicons-check-circle"
                                        class="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                    <span class="text-gray-700 dark:text-gray-300">Formularios de contacto
                                        efectivos</span>
                                </li>
                                <li class="flex items-start">
                                    <UIcon name="i-heroicons-check-circle"
                                        class="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                    <span class="text-gray-700 dark:text-gray-300">Integración con herramientas de
                                        marketing</span>
                                </li>
                            </ul>
                        </div>
                        <div class="px-6 pb-6">
                            <UButton label="Más información" block size="lg" color="teal" variant="solid"
                                icon="i-heroicons-information-circle" :ui="{ rounded: 'rounded-lg' }" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Servicios Académicos -->
            <div
                class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 mb-16">
                <div class="bg-gradient-to-r from-orange-400 to-amber-500 px-6 py-5">
                    <h3 class="text-xl font-bold text-white">📚 Servicios Académicos</h3>
                    <p class="text-orange-100 text-sm mt-1">Apoyo especializado para tu investigación</p>
                </div>
                <div class="p-6">
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-bold text-lg text-gray-800 dark:text-gray-200 mb-3">Asesoría en Tesis</h4>
                            <ul class="space-y-2">
                                <li class="flex items-start">
                                    <UIcon name="i-heroicons-academic-cap"
                                        class="text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                                    <span class="text-gray-700 dark:text-gray-300">Estructuración de proyectos</span>
                                </li>
                                <li class="flex items-start">
                                    <UIcon name="i-heroicons-academic-cap"
                                        class="text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                                    <span class="text-gray-700 dark:text-gray-300">Redacción y corrección</span>
                                </li>
                                <li class="flex items-start">
                                    <UIcon name="i-heroicons-academic-cap"
                                        class="text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                                    <span class="text-gray-700 dark:text-gray-300">Formato según normas</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-bold text-lg text-gray-800 dark:text-gray-200 mb-3">Análisis Estadístico
                            </h4>
                            <ul class="space-y-2">
                                <li class="flex items-start">
                                    <UIcon name="i-heroicons-chart-bar"
                                        class="text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                                    <span class="text-gray-700 dark:text-gray-300">Estadística descriptiva</span>
                                </li>
                                <li class="flex items-start">
                                    <UIcon name="i-heroicons-chart-bar"
                                        class="text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                                    <span class="text-gray-700 dark:text-gray-300">Análisis inferencial</span>
                                </li>
                                <li class="flex items-start">
                                    <UIcon name="i-heroicons-chart-bar"
                                        class="text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                                    <span class="text-gray-700 dark:text-gray-300">Interpretación de resultados</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <UButton label="Consultar servicios académicos" block size="lg" color="amber" variant="solid"
                        icon="i-heroicons-book-open" class="mt-6" :ui="{ rounded: 'rounded-lg' }" />
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
// No se necesitan datos adicionales para este componente
</script>

<style>
/* Efecto de gradiente en los bordes */
.group:hover .group-hover\:opacity-50 {
    opacity: 0.5;
}
</style>