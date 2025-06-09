<template>
    <div class="">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">Paquetes por Tipo de Investigación</h2>
            <p class="text-lg max-w-3xl mx-auto opacity-90">Asistencia profesional adaptada al diseño metodológico
                de tu estudio</p>
        </div>

        <!-- Paquetes Grid -->
        <section class="container mx-auto px-4 py-12">
            <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">

                <!-- Investigación Descriptiva -->
                <div
                    class="group relative overflow-hidden rounded-xl border border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300">
                    <div
                        class="absolute top-4 right-4 w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold text-xl">
                        📘
                    </div>

                    <div class="p-6">
                        <h3 class="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">Investigación Descriptiva
                        </h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Describe características de una
                            población o fenómeno</p>

                        <ul class="space-y-3 text-sm">
                            <li class="flex items-start">
                                <svg class="w-4 h-4 mt-0.5 mr-2 text-blue-500 flex-shrink-0" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Recolección y organización de datos</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="w-4 h-4 mt-0.5 mr-2 text-blue-500 flex-shrink-0" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Distribución de frecuencias</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="w-4 h-4 mt-0.5 mr-2 text-blue-500 flex-shrink-0" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Gráficos de barras, circulares</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="w-4 h-4 mt-0.5 mr-2 text-blue-500 flex-shrink-0" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Medidas de tendencia central</span>
                            </li>
                        </ul>

                        <div
                            class="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                            <span class="text-2xl font-bold">S/150</span>
                            <button @click="contactarWhatsApp('Investigación Descriptiva', 'S/150')"
                                class="px-3 py-1.5 text-sm rounded-lg bg-purple-50 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900 transition">
                                Seleccionar
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Investigación Comparativa -->
                <div
                    class="group relative overflow-hidden rounded-xl border border-green-200 dark:border-green-800 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300">
                    <div
                        class="absolute top-4 right-4 w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-300 font-bold text-xl">
                        📗
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold mb-2 text-green-600 dark:text-green-400">Investigación Comparativa
                        </h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Compara grupos experimentales o
                            cuasi-experimentales</p>

                        <ul class="space-y-3 text-sm">
                            <li class="flex items-start">
                                <svg class="w-4 h-4 mt-0.5 mr-2 text-green-500 flex-shrink-0" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Todo el análisis descriptivo</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="w-4 h-4 mt-0.5 mr-2 text-green-500 flex-shrink-0" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Pruebas de normalidad y homogeneidad</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="w-4 h-4 mt-0.5 mr-2 text-green-500 flex-shrink-0" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Prueba t de Student y ANOVA</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="w-4 h-4 mt-0.5 mr-2 text-green-500 flex-shrink-0" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Pruebas no paramétricas equivalentes</span>
                            </li>
                        </ul>

                        <div
                            class="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                            <span class="text-2xl font-bold">S/250</span>
                            <button @click="contactarWhatsApp('Investigación Comparativa', 'S/250')"
                                class="px-3 py-1.5 text-sm rounded-lg bg-purple-50 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900 transition">
                                Seleccionar
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Investigación Correlacional -->
                <div
                    class="group relative overflow-hidden rounded-xl border border-yellow-200 dark:border-yellow-800 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300">
                    <div
                        class="absolute top-4 right-4 w-12 h-12 rounded-lg bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center text-yellow-600 dark:text-yellow-300 font-bold text-xl">
                        📙
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold mb-2 text-yellow-600 dark:text-yellow-400">Investigación
                            Correlacional</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Analiza relaciones entre variables</p>

                        <ul class="space-y-3 text-sm">
                            <li class="flex items-start">
                                <svg class="w-4 h-4 mt-0.5 mr-2 text-yellow-500 flex-shrink-0" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Todo el análisis descriptivo</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="w-4 h-4 mt-0.5 mr-2 text-yellow-500 flex-shrink-0" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Correlación de Pearson, Spearman</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="w-4 h-4 mt-0.5 mr-2 text-yellow-500 flex-shrink-0" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Pruebas de significancia</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="w-4 h-4 mt-0.5 mr-2 text-yellow-500 flex-shrink-0" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Gráficos de dispersión</span>
                            </li>
                        </ul>

                        <div
                            class="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                            <span class="text-2xl font-bold">S/300</span>
                            <button @click="contactarWhatsApp('Investigación Correlacional', 'S/300')"
                                class="px-3 py-1.5 text-sm rounded-lg bg-purple-50 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900 transition">
                                Seleccionar
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Investigación Explicativa -->
                <div
                    class="group relative overflow-hidden rounded-xl border border-red-200 dark:border-red-800 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300">
                    <div
                        class="absolute top-4 right-4 w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/50 flex items-center justify-center text-red-600 dark:text-red-300 font-bold text-xl">
                        📕
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold mb-2 text-red-600 dark:text-red-400">Investigación Explicativa</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Analiza relaciones causales o
                            predictivas</p>

                        <ul class="space-y-3 text-sm">
                            <li class="flex items-start">
                                <svg class="w-4 h-4 mt-0.5 mr-2 text-red-500 flex-shrink-0" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Análisis comparativo y correlacional</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="w-4 h-4 mt-0.5 mr-2 text-red-500 flex-shrink-0" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Diseño de pruebas de hipótesis</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="w-4 h-4 mt-0.5 mr-2 text-red-500 flex-shrink-0" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Modelos multivariables</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="w-4 h-4 mt-0.5 mr-2 text-red-500 flex-shrink-0" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Redacción profesional de resultados</span>
                            </li>
                        </ul>

                        <div
                            class="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                            <span class="text-2xl font-bold">S/400</span>
                            <button @click="contactarWhatsApp('Investigación Explicativa', 'S/400')"
                                class="px-3 py-1.5 text-sm rounded-lg bg-purple-50 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900 transition">
                                Seleccionar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Comparativa de Paquetes -->
        <section class=" py-12">
            <div class="container mx-auto px-4">
                <h2 class="text-2xl font-bold text-center mb-8">Comparativa de Paquetes</h2>

                <div class="overflow-x-auto">
                    <table class="min-w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
                        <thead>
                            <tr class="bg-gray-200 dark:bg-gray-600">
                                <th class="py-3 px-4 text-left">Característica</th>
                                <th class="py-3 px-4 text-center">Descriptivo</th>
                                <th class="py-3 px-4 text-center">Comparativo</th>
                                <th class="py-3 px-4 text-center">Correlacional</th>
                                <th class="py-3 px-4 text-center">Explicativo</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 dark:divide-gray-600">
                            <tr>
                                <td class="py-3 px-4">Análisis descriptivo</td>
                                <td class="py-3 px-4 text-center text-green-500">✓</td>
                                <td class="py-3 px-4 text-center text-green-500">✓</td>
                                <td class="py-3 px-4 text-center text-green-500">✓</td>
                                <td class="py-3 px-4 text-center text-green-500">✓</td>
                            </tr>
                            <tr class="bg-gray-50 dark:bg-gray-700">
                                <td class="py-3 px-4">Pruebas comparativas</td>
                                <td class="py-3 px-4 text-center text-gray-400">✗</td>
                                <td class="py-3 px-4 text-center text-green-500">✓</td>
                                <td class="py-3 px-4 text-center text-gray-400">✗</td>
                                <td class="py-3 px-4 text-center text-green-500">✓</td>
                            </tr>
                            <tr>
                                <td class="py-3 px-4">Análisis correlacional</td>
                                <td class="py-3 px-4 text-center text-gray-400">✗</td>
                                <td class="py-3 px-4 text-center text-gray-400">✗</td>
                                <td class="py-3 px-4 text-center text-green-500">✓</td>
                                <td class="py-3 px-4 text-center text-green-500">✓</td>
                            </tr>
                            <tr class="bg-gray-50 dark:bg-gray-700">
                                <td class="py-3 px-4">Modelos predictivos</td>
                                <td class="py-3 px-4 text-center text-gray-400">✗</td>
                                <td class="py-3 px-4 text-center text-gray-400">✗</td>
                                <td class="py-3 px-4 text-center text-gray-400">✗</td>
                                <td class="py-3 px-4 text-center text-green-500">✓</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        <!-- Servicio Premium -->
        <section class="container mx-auto px-4 pb-20">
            <div class="rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-0.5">
                <div class="bg-white dark:bg-gray-900 rounded-xl p-8">
                    <div class="flex flex-col md:flex-row items-center">
                        <div class="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                            <div
                                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-200 mb-4">
                                🎁 Servicio Premium
                            </div>
                            <h2 class="text-2xl font-bold mb-4">Acompañamiento completo en tu tesis</h2>
                            <p class="text-gray-600 dark:text-gray-300 mb-6">Asesoría personalizada desde la metodología
                                hasta la defensa</p>
                            <ul class="space-y-3 text-gray-700 dark:text-gray-300">
                                <li class="flex items-start">
                                    <svg class="w-5 h-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>Asesoría por videollamada</span>
                                </li>
                                <li class="flex items-start">
                                    <svg class="w-5 h-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>Revisión de instrumentos</span>
                                </li>
                                <li class="flex items-start">
                                    <svg class="w-5 h-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>Procesamiento de datos</span>
                                </li>
                            </ul>
                        </div>
                        <div class="md:w-1/2 md:pl-8 md:border-l border-gray-200 dark:border-gray-700">
                            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                                <h3 class="font-bold text-lg mb-4">Personaliza tu paquete</h3>
                                <p class="text-gray-600 dark:text-gray-400 text-sm mb-6">Combina servicios según tus
                                    necesidades específicas</p>
                                <div class="mb-6">
                                    <label
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Selecciona
                                        servicios:</label>
                                    <select
                                        class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                                        <option>Asesoría básica</option>
                                        <option>Análisis completo</option>
                                        <option>Redacción de capítulos</option>
                                        <option>Paquete completo</option>
                                    </select>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-3xl font-bold">S/450+</span>
                                    <button @click="contactarWhatsApp('Servicio Premium Personalizado', 'S/450+')"
                                        class="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition">
                                        Contactar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
const contactarWhatsApp = (servicio, precio) => {
    const telefono = '51910985938';
    const mensaje = `Hola, estoy interesado en el servicio de ${servicio} (${precio}). ¿Podrías brindarme más información?`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}
</script>

<style>
/* Smooth transitions */
html {
    scroll-behavior: smooth;
}
</style>