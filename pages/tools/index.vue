<template>
    <div class="min-h-screen ">
        <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
            <!-- Header elegante -->
            <div class="text-center mb-8 sm:mb-12">
                <h1 class="text-3xl font-black text-gray-900 dark:text-white sm:text-5xl leading-tight">
                    <span
                        class="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400">
                        Herramientas de Investigación
                    </span>
                </h1>
                <p class="mt-3 max-w-2xl mx-auto text-base sm:text-lg text-gray-600 dark:text-gray-300 font-medium">
                    Suite completa para potenciar tu investigación académica
                </p>
            </div>

            <!-- Tools Grid optimizado para móvil -->
            <div class="space-y-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:space-y-0">
                <router-link v-for="tool in tools" :key="tool.id" :to="`/tools/${tool.id}`"
                    class="group block relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/20 transition-all duration-500 hover:-translate-y-1 active:scale-95 touch-manipulation">
                    <!-- Efecto de brillo futurista -->
                    <div
                        class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out">
                    </div>

                    <!-- Borde animado -->
                    <div
                        class="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm">
                    </div>

                    <div class="relative p-5 sm:p-6">
                        <div class="flex items-start space-x-4 sm:flex-col sm:space-x-0 sm:space-y-4">
                            <!-- Icono mejorado para móvil -->
                            <div class="flex-shrink-0">
                                <div
                                    :class="['rounded-xl sm:rounded-2xl p-3 sm:p-4 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110', tool.color, tool.darkColor]">
                                    <span
                                        class="text-xl sm:text-2xl transform group-hover:rotate-12 transition-transform duration-300">
                                        {{ tool.icon }}
                                    </span>
                                </div>
                            </div>

                            <!-- Contenido optimizado -->
                            <div class="flex-1 min-w-0 sm:flex-none">
                                <h3
                                    class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 mb-2">
                                    {{ tool.title }}
                                </h3>
                                <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300 line-clamp-2">
                                    {{ tool.description }}
                                </p>

                                <!-- Indicador de clic muy visible en móvil -->
                                <div class="mt-3 sm:mt-4 flex items-center justify-between">
                                    <span
                                        class="inline-flex items-center text-sm font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                                        <span class="sm:hidden">Abrir</span>
                                        <span class="hidden sm:inline">Explorar herramienta</span>
                                        <ArrowRightIcon
                                            class="ml-1 sm:ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </span>

                                    <!-- Botón táctil muy visible -->
                                    <div
                                        class="sm:hidden w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg group-hover:shadow-xl group-active:scale-90 transition-all duration-200">
                                        <ArrowRightIcon class="w-4 h-4 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Barra de progreso sutil en la parte inferior -->
                    <div
                        class="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl sm:rounded-b-3xl">
                    </div>
                </router-link>
            </div>

            <!-- Indicador de funcionalidad -->
            <div class="mt-8 text-center">
                <p
                    class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center space-x-2">
                    <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span>Toca cualquier herramienta para comenzar</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const tools = [
    {
        id: 'redaccion/recursos-de-tesis',
        title: 'Recursos de Tesis',
        description: 'Plantillas y guías paso a paso para organizar tu trabajo de investigación.',
        icon: '✍️',
        color: 'bg-gradient-to-br from-indigo-100 to-indigo-200 text-indigo-700',
        darkColor: 'dark:from-indigo-900/40 dark:to-indigo-800/40 dark:text-indigo-300'
    },
    {
        id: 'matriz/matriz-de-consistencia',
        title: 'Matriz de Consistencia',
        description: 'Genera matrices automáticas para tu proyecto de investigación con validación de coherencia entre objetivos, variables e hipótesis.',
        icon: '📊',
        color: 'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700',
        darkColor: 'dark:from-blue-900/40 dark:to-blue-800/40 dark:text-blue-300'
    },
    {
        id: 'operacionalizacion/operalizacion-de-variables',
        title: 'Operacionalización',
        description: 'Define y operacionaliza variables de investigación con ejemplos prácticos y sugerencias metodológicas.',
        icon: '🔬',
        color: 'bg-gradient-to-br from-green-100 to-green-200 text-green-700',
        darkColor: 'dark:from-green-900/40 dark:to-green-800/40 dark:text-green-300'
    },
]
</script>

<style scoped>
/* Optimizaciones para dispositivos táctiles */
@media (hover: none) and (pointer: coarse) {

    /* Estilos específicos para dispositivos táctiles */
    .group:active {
        transform: translateY(-2px) scale(0.98);
    }
}

/* Mejoras de accesibilidad */
.group:focus-visible {
    outline: 2px solid theme('colors.blue.500');
    outline-offset: 2px;
}

/* Animación de entrada */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.group {
    animation: fadeInUp 0.6s ease-out forwards;
}

.group:nth-child(2) {
    animation-delay: 0.1s;
}

.group:nth-child(3) {
    animation-delay: 0.2s;
}

/* Limitar líneas de texto */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>