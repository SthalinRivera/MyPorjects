<template>
    <div class="min-h-screen ">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <!-- Header elegante -->
            <div class="text-center mb-12">
                <h1 class="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
                    <span
                        class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                        Herramientas de Investigación
                    </span>
                </h1>
                <p class="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
                    Suite completa para potenciar tu investigación académica
                </p>
            </div>

            <!-- Tools Grid mejorado -->
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <router-link v-for="tool in tools" :key="tool.id" :to="`/tools/${tool.id}`"
                    class="group relative overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                    <!-- Efecto de fondo sutil -->

                    <div class="relative p-6">
                        <div class="flex flex-col h-full">
                            <!-- Icono con efecto 3D -->
                            <div
                                :class="['rounded-xl p-4 w-16 h-16 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300', tool.color, tool.darkColor]">
                                <span
                                    class="text-2xl transform group-hover:scale-110 transition-transform duration-300">
                                    {{ tool.icon }}
                                </span>
                            </div>

                            <!-- Contenido de la tarjeta -->
                            <div class="mt-6 flex-1">
                                <h3
                                    class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                                    {{ tool.title }}
                                </h3>
                                <p class="mt-3 text-gray-600 dark:text-gray-300">
                                    {{ tool.description }}
                                </p>
                            </div>

                            <!-- Botón con efecto hover -->
                            <div class="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <span
                                    class="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-300">
                                    Explorar herramienta
                                    <ArrowRightIcon
                                        class="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </span>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'


const tools = [

    {
        id: 'redaccion/estructura-de-tesis',
        title: 'Estructura de Tesis',
        description: 'Plantillas y guías paso a paso para organizar tu trabajo de investigación.',
        icon: '✍️',
        color: 'bg-indigo-100 text-indigo-600',
        darkColor: 'dark:bg-indigo-900/30 dark:text-indigo-300'
    },
    {
        id: 'matriz/matriz-de-consistencia',
        title: 'Matriz de Consistencia',
        description: 'Genera matrices automáticas para tu proyecto de investigación con validación de coherencia entre objetivos, variables e hipótesis.',
        icon: '📊',
        color: 'bg-blue-100 text-blue-600',
        darkColor: 'dark:bg-blue-900/30 dark:text-blue-300'
    },
    {
        id: 'operacionalizacion/operalizacion-de-variables',
        title: 'Operacionalización',
        description: 'Define y operacionaliza variables de investigación con ejemplos prácticos y sugerencias metodológicas.',
        icon: '🔬',
        color: 'bg-green-100 text-green-600',
        darkColor: 'dark:bg-green-900/30 dark:text-green-300'
    },
    // {
    //     id: 'bibliografia/generador-citas',
    //     title: 'Generador de Citas',
    //     description: 'Crea referencias bibliográficas automáticamente en múltiples formatos (APA, MLA, Chicago).',
    //     icon: '📚',
    //     color: 'bg-purple-100 text-purple-600',
    //     darkColor: 'dark:bg-purple-900/30 dark:text-purple-300'
    // },
    // {
    //     id: 'metodologia/disenos-investigacion',
    //     title: 'Diseños de Investigación',
    //     description: 'Guía interactiva para seleccionar el diseño metodológico adecuado para tu estudio.',
    //     icon: '🧩',
    //     color: 'bg-yellow-100 text-yellow-600',
    //     darkColor: 'dark:bg-yellow-900/30 dark:text-yellow-300'
    // },
    // {
    //     id: 'analisis/estadistico-basico',
    //     title: 'Análisis Estadístico',
    //     description: 'Herramientas para análisis descriptivos e inferenciales con visualización de datos.',
    //     icon: '📈',
    //     color: 'bg-red-100 text-red-600',
    //     darkColor: 'dark:bg-red-900/30 dark:text-red-300'
    // }
]
</script>

<style scoped>
/* Efecto hover sutil para las tarjetas */
.router-link-active {
    transform: translateY(-2px);
}
</style>