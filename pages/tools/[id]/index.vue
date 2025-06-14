<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Header dinámico -->
            <div class="mb-6">
                <div class="flex items-center">
                    <router-link to="/tools"
                        class="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center">
                        <ArrowLeftIcon class="h-5 w-5 mr-1" /> Volver
                    </router-link>
                </div>
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white mt-4">

                </h1>
            </div>

            <!-- Navegación entre subvistas -->
            <nav class="flex space-x-4 mb-6 border-b border-gray-200 dark:border-gray-700">

            </nav>

        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const tools = [
    // misma lista de herramientas que en el index
]

const currentTool = computed(() => {
    return tools.find(tool => tool.id === route.params.id)
})

const tabs = [
    { path: 'matriz', name: 'Matriz' },
    { path: 'operacionalizacion', name: 'Operacionalización' },
    // ... otras pestañas
]
</script>