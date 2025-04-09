<template>
    <div>
        <div class="flex justify-center items-center mt-5">
            <button @click="openSalesModal" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
                Seleccionar Venta
            </button>
        </div>

        <!-- Modal de Selección de Venta -->
        <div v-if="isSalesModalOpen" class="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div class="bg-white p-6 rounded-lg shadow-lg">
                <h2 class="text-2xl mb-4">Selecciona una venta</h2>
                <div class="mb-4">
                    <label for="product" class="block text-gray-700">Producto</label>
                    <select v-model="selectedProduct" id="product"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg">
                        <option value="product1">Producto 1</option>
                        <option value="product2">Producto 2</option>
                        <option value="product3">Producto 3</option>
                    </select>
                </div>
                <button @click="showSalesQuestion"
                    class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700">
                    Mostrar Pregunta
                </button>
                <button @click="closeSalesModal"
                    class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 mt-3">
                    Cerrar
                </button>
            </div>
        </div>

        <!-- Modal de Pregunta de Venta -->
        <div v-if="isQuestionModalOpen"
            class="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div class="bg-white p-6 rounded-lg shadow-lg">
                <h2 class="text-2xl mb-4">Pregunta de Venta</h2>
                <p class="mb-4">¿Cuántas unidades de {{ selectedProduct }} deseas vender?</p>
                <input v-model="quantity" type="number"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4" />
                <button @click="submitSale" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
                    Confirmar Venta
                </button>
                <button @click="closeQuestionModal"
                    class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 mt-3">
                    Cancelar
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
definePageMeta({
    middleware: ['auth'],
    permiso: "ADMINISTRADOR",
})
definePageMeta({
    layout: 'dashboard', // Aplica el layout de dashboard a esta página
});
export default defineComponent({
    name: 'SalesComponent',
    setup() {
        const isSalesModalOpen = ref(false);
        const isQuestionModalOpen = ref(false);
        const selectedProduct = ref<string>('');
        const quantity = ref<number>(0);

        const openSalesModal = () => {
            isSalesModalOpen.value = true;
        };

        const closeSalesModal = () => {
            isSalesModalOpen.value = false;
        };

        const showSalesQuestion = () => {
            isSalesModalOpen.value = false;
            isQuestionModalOpen.value = true;
        };

        const closeQuestionModal = () => {
            isQuestionModalOpen.value = false;
        };

        const submitSale = () => {
            // Lógica para procesar la venta
            alert(`Venta confirmada de ${quantity.value} unidades de ${selectedProduct.value}`);
            quantity.value = 0;
            selectedProduct.value = '';
            isQuestionModalOpen.value = false;
        };

        return {
            isSalesModalOpen,
            isQuestionModalOpen,
            selectedProduct,
            quantity,
            openSalesModal,
            closeSalesModal,
            showSalesQuestion,
            closeQuestionModal,
            submitSale,
        };
    },
});
</script>

<style scoped>
/* Agregar estilo si es necesario */
</style>