<template>
    <div class="max-w-9xl mx-auto p-4">
        <Breadcrumb :items="[
            { title: 'Productos', to: '/dashboard/products' },
            { title: 'Promoción', to: '/dashboard/promotion' }

        ]" />
        <!-- Header y botón -->
        <div class="flex justify-between items-center mb-6">
            <div>
                <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Gestión de Promociones</h1>
                <p class="text-gray-500 dark:text-gray-400 mt-1">Gestiona tu promociones de productos</p>
            </div>
            <button @click="openModal()"
                class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all">
                <i class="ri-add-line"></i>
                <span>Nueva Promoción</span>
            </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p class="text-gray-600 dark:text-gray-400">Cargando productos...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error"
            class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center">
            <p class="text-red-600 dark:text-red-400 font-medium">{{ error }}</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="products.length === 0"
            class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div
                class="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <i class="ri-box-2-line text-3xl text-gray-400 dark:text-gray-500"></i>
            </div>
            <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-2">No se encontraron productos.</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-4">Comienza agregando tu primer producto.</p>
            <button @click="openModal()"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Agregar Producto.
            </button>
        </div>
        <!-- Tabla (desktop) -->
        <div v-else
            class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div class="hidden md:block overflow-x-auto">

                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead class="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                                Producto</th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                                Descuento</th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                                Vigencia</th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                                Estado</th>
                            <th
                                class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                                Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <tr v-for="promo in promotions" :key="promo.id"
                            class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <img :src="promo.product.imageUrl || 'https://via.placeholder.com/40'"
                                        class="h-10 w-10 rounded-md object-cover mr-3">
                                    <div>
                                        <div class="font-medium text-gray-900 dark:text-white">{{ promo.product.name }}
                                        </div>
                                        <div class="text-sm text-gray-500 dark:text-gray-400">{{
                                            promo.product.category?.name }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 py-1 rounded-full text-sm font-medium"
                                    :class="promo.isPercentage ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'">
                                    {{ promo.isPercentage ? `${promo.discount}%` : `S/. ${promo.discount}` }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900 dark:text-white">{{ formatDate(promo.startDate) }}
                                </div>
                                <div class="text-sm text-gray-500 dark:text-gray-400">al {{ formatDate(promo.endDate) }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 py-1 rounded-full text-xs font-medium"
                                    :class="isPromoActive(promo) ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'">
                                    {{ isPromoActive(promo) ? 'Activa' : 'Inactiva' }}
                                </span>
                                <div v-if="!isPromoActive(promo)" class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {{ getPromoStatusText(promo) }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div class="flex justify-end space-x-2">
                                    <button @click="openEditModal(promo)"
                                        class="text-blue-600 hover:text-blue-900 dark:hover:text-blue-300">
                                        <i class="ri-pencil-line"></i>
                                    </button>
                                    <button @click="confirmDelete(promo)"
                                        class="text-red-600 hover:text-red-900 dark:hover:text-red-300">
                                        <i class="ri-delete-bin-line"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
        <!-- Cards (mobile) -->
        <div class="md:hidden space-y-3">
            <div v-for="promo in promotions" :key="promo.id" class="p-4 border rounded-lg dark:border-gray-700">
                <div class="flex justify-between items-start">
                    <div class="flex items-center space-x-3">
                        <img :src="promo.product.imageUrl || 'https://via.placeholder.com/40'"
                            class="h-12 w-12 rounded-md object-cover">
                        <div>
                            <h3 class="font-medium">{{ promo.product.name }}</h3>
                            <p class="text-sm text-gray-500 dark:text-gray-400">{{ promo.product.category?.name }}</p>
                        </div>
                    </div>
                    <div class="flex flex-col items-end">
                        <span class="px-2 py-1 rounded-full text-xs mb-1"
                            :class="promo.isPercentage ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'">
                            {{ promo.isPercentage ? `${promo.discount}%` : `S/. ${promo.discount}` }}
                        </span>
                        <span class="px-2 py-1 rounded-full text-xs"
                            :class="isPromoActive(promo) ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'">
                            {{ isPromoActive(promo) ? 'Activa' : 'Inactiva' }}
                        </span>
                    </div>
                </div>

                <div class="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div>
                        <p class="text-gray-500 dark:text-gray-400">Inicio</p>
                        <p>{{ formatDate(promo.startDate) }}</p>
                    </div>
                    <div>
                        <p class="text-gray-500 dark:text-gray-400">Fin</p>
                        <p>{{ formatDate(promo.endDate) }}</p>
                    </div>
                </div>

                <div v-if="!isPromoActive(promo)" class="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    {{ getPromoStatusText(promo) }}
                </div>

                <div class="mt-3 flex justify-end space-x-2">
                    <button @click="openEditModal(promo)" class="text-blue-600">
                        <i class="ri-pencil-line"></i>
                    </button>
                    <button @click="confirmDelete(promo)" class="text-red-600">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Modal para crear/editar promoción -->
        <div v-if="showModal"
            class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                <div class="p-6">
                    <h2 class="text-xl font-bold mb-4">{{ editing ? 'Editar Promoción' : 'Nueva Promoción' }}</h2>

                    <form @submit.prevent="submitPromotion" class="space-y-4">
                        <div>
                            <label class="block mb-1 font-medium">Producto</label>
                            <select v-model="form.productId" required
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                                <option v-for="product in products" :key="product.id" :value="product.id">
                                    {{ product.name }} (S/. {{ product.price }})
                                </option>
                            </select>
                        </div>

                        <div>
                            <label class="block mb-1 font-medium">Título (opcional)</label>
                            <input v-model="form.title"
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block mb-1 font-medium">Descuento</label>
                                <input v-model="form.discount" type="number" min="0" required
                                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                            </div>
                            <div class="flex items-end">
                                <label class="flex items-center space-x-2">
                                    <input v-model="form.isPercentage" type="checkbox"
                                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600">
                                    <span>¿Es porcentaje?</span>
                                </label>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block mb-1 font-medium">Fecha inicio</label>
                                <input v-model="form.startDate" type="date" required
                                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                            </div>
                            <div>
                                <label class="block mb-1 font-medium">Fecha fin</label>
                                <input v-model="form.endDate" type="date" required
                                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                            </div>
                        </div>

                        <div>
                            <label class="block mb-1 font-medium">Descripción (opcional)</label>
                            <textarea v-model="form.description" rows="3"
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"></textarea>
                        </div>

                        <div class="flex justify-end space-x-3 pt-4">
                            <button type="button" @click="showModal = false"
                                class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                Cancelar
                            </button>
                            <button type="submit"
                                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                {{ editing ? 'Actualizar' : 'Crear' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Modal de confirmación para eliminar -->
        <div v-if="showDeleteDialog"
            class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-sm w-full">
                <h3 class="text-lg font-bold mb-4">Confirmar Eliminación</h3>
                <p class="mb-6">¿Estás seguro de que deseas eliminar esta promoción?</p>
                <div class="flex justify-end space-x-3">
                    <button @click="showDeleteDialog = false"
                        class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md">
                        Cancelar
                    </button>
                    <button @click="deletePromotion"
                        class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { format, isAfter, isBefore } from 'date-fns';

// Estado reactivo
const promotions = ref([]);
const products = ref([]);
const loading = ref(true);
const showModal = ref(false);
const showDeleteDialog = ref(false);
const editing = ref(false);
const currentPromoId = ref(null);

const form = reactive({
    productId: null,
    title: '',
    description: '',
    discount: 0,
    isPercentage: true,
    startDate: format(new Date(), 'yyyy-MM-dd'),
    endDate: ''
});

// Configuración de página (Nuxt.js)
definePageMeta({
    middleware: ['auth'],
    layout: 'dashboard'
});

// Carga inicial de datos
const loadInitialData = async () => {
    try {
        loading.value = true;

        // Simulación de llamadas API - reemplaza con tus llamadas reales
        const [promotionsRes, productsRes] = await Promise.all([
            $fetch('/api/v1/promotions').catch(() => []),
            $fetch('/api/v1/product').catch(() => [])
        ]);

        promotions.value = promotionsRes || [];
        products.value = productsRes || [];
    } catch (error) {
        console.error('Error cargando datos iniciales:', error);
        // useToast().error('Error al cargar datos');
    } finally {
        loading.value = false;
    }
};

// Usar useAsyncData para SSR (Nuxt.js)
onMounted(loadInitialData);

// Métodos
const openModal = () => {
    editing.value = false;
    resetForm();
    showModal.value = true;
};

const openEditModal = (promo) => {
    editing.value = true;
    currentPromoId.value = promo.id;
    Object.assign(form, {
        productId: promo.productId,
        title: promo.title,
        description: promo.description,
        discount: promo.discount,
        isPercentage: promo.isPercentage,
        startDate: format(new Date(promo.startDate), 'yyyy-MM-dd'),
        endDate: format(new Date(promo.endDate), 'yyyy-MM-dd')
    });
    showModal.value = true;
};

const resetForm = () => {
    Object.assign(form, {
        productId: null,
        title: '',
        description: '',
        discount: 0,
        isPercentage: true,
        startDate: format(new Date(), 'yyyy-MM-dd'),
        endDate: ''
    });
};

// Función para verificar si una promoción está activa
const isPromoActive = (promo) => {
    const today = new Date();
    const startDate = new Date(promo.startDate);
    const endDate = new Date(promo.endDate);

    return isAfter(today, startDate) && isBefore(today, endDate);
};

// Función para obtener texto de estado detallado
const getPromoStatusText = (promo) => {
    const today = new Date();
    const startDate = new Date(promo.startDate);
    const endDate = new Date(promo.endDate);

    if (isBefore(today, startDate)) {
        return `Inicia en ${formatDate(promo.startDate)}`;
    } else if (isAfter(today, endDate)) {
        return `Finalizó el ${formatDate(promo.endDate)}`;
    }
    return '';
};

const submitPromotion = async () => {
    try {
        const url = editing.value
            ? `/api/v1/promotions/${currentPromoId.value}`
            : '/api/v1/promotions';

        const method = editing.value ? 'PUT' : 'POST';

        // Simulación de llamada API - reemplaza con tu llamada real
        const response = await $fetch(url, {
            method,
            body: {
                ...form,
                discount: Number(form.discount)
            }
        });

        showModal.value = false;
        await loadInitialData(); // Recargar datos
        // useToast().success(`Promoción ${editing.value ? 'actualizada' : 'creada'} con éxito`);
    } catch (error) {
        // useToast().error('Error al guardar la promoción');
        console.error(error);
    }
};

const confirmDelete = (promo) => {
    currentPromoId.value = promo.id;
    showDeleteDialog.value = true;
};

const deletePromotion = async () => {
    try {
        // Simulación de llamada API - reemplaza con tu llamada real
        await $fetch(`/api/v1/promotions/${currentPromoId.value}`, {
            method: 'DELETE'
        });
        await loadInitialData(); // Recargar datos
        // useToast().success('Promoción eliminada con éxito');
    } catch (error) {
        // useToast().error('Error al eliminar la promoción');
        console.error(error);
    } finally {
        showDeleteDialog.value = false;
    }
};

const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd/MM/yyyy');
};
</script>

<style scoped>
/* Estilos personalizados */
.animate-spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>