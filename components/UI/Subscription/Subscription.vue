<template>
    <div class="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 
                dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
                py-12 rounded-xl shadow-lg border border-white/20 dark:border-gray-700/50">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div class="flex flex-col md:flex-row items-center justify-between gap-8">
                <div class="text-center md:text-left">
                    <h2 class="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 
                              dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                        Únete a nuestra comunidad
                    </h2>
                    <p class="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-md">
                        Recibe consejos exclusivos, ofertas especiales y contenido premium directamente en tu email.
                    </p>
                </div>

                <div class="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                    <div class="relative flex-grow">
                        <input type="email" placeholder="tu@email.com" class="w-full px-5 py-3 pr-12 rounded-lg border border-gray-200 dark:border-gray-600
                                   focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                   shadow-sm transition-all duration-200
                                   bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200" />
                        <svg class="absolute right-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <button class="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700
                               dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600
                               text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg 
                               transition-all duration-300 transform hover:-translate-y-0.5 
                               focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2">
                        Suscribirse
                    </button>
                </div>
            </div>

            <p class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                Nos preocupamos por tu privacidad. Nunca compartiremos tu información.
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
// No se requiere lógica adicional para este componente estático
</script>