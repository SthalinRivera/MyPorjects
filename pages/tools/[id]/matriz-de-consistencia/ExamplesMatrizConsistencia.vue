<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <!-- Tarjetas compactas -->
        <div v-for="(card, index) in cardsData" :key="index"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 transition-all duration-200 hover:shadow-md border border-gray-100 dark:border-gray-700">
            <div class="flex items-start gap-3">
                <div class="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                    <i class="ri-table-line text-blue-500 dark:text-blue-400 text-xl"></i>
                </div>
                <div class="flex-1">
                    <h2 class="text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-3">
                        {{ card.titulo }}
                    </h2>

                </div>
            </div>

            <button @click="openModal(card)"
                class="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                <i class="ri-eye-line"></i>
                Ver ejemplo
            </button>
        </div>

        <!-- Modal mejorado -->
        <div v-if="selectedCard"
            class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            @click.self="closeModal">
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-7xl w-full max-h-[90vh] flex flex-col">
                <div class="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-700">
                    <div class="flex items-center gap-3">
                        <i class="ri-table-2 text-blue-500 dark:text-blue-400 text-xl"></i>
                        <h3 class="text-xl font-bold text-gray-800 dark:text-gray-100">
                            {{ selectedCard.titulo }}
                        </h3>
                    </div>
                    <button @click="closeModal"
                        class="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Cerrar modal">
                        <i class="ri-close-line text-gray-500 dark:text-gray-400 text-xl"></i>
                    </button>
                </div>

                <div class="overflow-y-auto overflow-x-auto p-4 flex-1">
                    <MatrizConsistenciaTable v-if="selectedCard" :api-response="selectedCard" />
                </div>

                <div class="p-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                    <button @click="closeModal"
                        class="px-4 py-2 flex items-center gap-2 text-sm bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                        <i class="ri-close-line"></i>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MatrizConsistenciaTable from './MatrizConsistenciaTable.vue'
import examples from './examples.json'

export default {
    components: {
        MatrizConsistenciaTable
    },
    data() {
        return {
            cardsData: examples,
            selectedCard: null
        }
    },
    methods: {
        openModal(card) {
            this.selectedCard = card
            document.body.style.overflow = 'hidden'
        },
        closeModal() {
            this.selectedCard = null
            document.body.style.overflow = 'auto'
        }
    }
}
</script>

<style></style>