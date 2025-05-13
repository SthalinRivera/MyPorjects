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
            <UButton @click="openModal()" icon="i-heroicons-plus" color="primary" variant="solid"
                label="Nueva Promoción" />
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-12">
            <UIcon name="i-heroicons-arrow-path-20-solid" class="animate-spin h-12 w-12 text-primary-500 mb-4" />
            <p class="text-gray-600 dark:text-gray-400">Cargando productos...</p>
        </div>

        <!-- Error State -->
        <UAlert v-else-if="error" icon="i-heroicons-exclamation-triangle" color="red" variant="outline" :title="error"
            class="mb-4" />

        <!-- Empty State -->
        <UCard v-else-if="products.length === 0" class="text-center">
            <template #header>
                <div
                    class="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <UIcon name="i-heroicons-shopping-bag" class="text-3xl text-gray-400 dark:text-gray-500" />
                </div>
                <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-2">No se encontraron productos.</h3>
                <p class="text-gray-500 dark:text-gray-400 mb-4">Comienza agregando tu primer producto.</p>
            </template>

            <UButton @click="openModal()" icon="i-heroicons-plus" color="primary" variant="solid"
                label="Agregar Producto" />
        </UCard>



        <!-- Tabla con Nuxt UI -->
        <div v-else>
            <UTable :rows="promotions" :columns="columns" :loading="loading" class="w-full">
                <!-- Custom cell for Product -->
                <template #product-data="{ row }">
                    <div class="flex items-center">
                        <UAvatar :src="row.product.imageUrl || 'https://via.placeholder.com/40'" size="sm"
                            class="mr-3" />
                        <div>
                            <div class="font-medium">{{ row.product.name }}</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">
                                {{ row.product.category?.name }}
                            </div>
                        </div>
                    </div>
                </template>

                <!-- Custom cell for Discount -->
                <template #discount-data="{ row }">
                    <UBadge :label="row.isPercentage ? `${row.discount}%` : `S/. ${row.discount}`"
                        :color="row.isPercentage ? 'blue' : 'green'" variant="subtle" />
                </template>

                <!-- Custom cell for Date Range -->
                <template #dateRange-data="{ row }">
                    <div>
                        <div class="text-sm">{{ formatDate(row.startDate) }}</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">
                            al {{ formatDate(row.endDate) }}
                        </div>
                    </div>
                </template>

                <!-- Custom cell for Status -->
                <template #status-data="{ row }">
                    <div>
                        <UBadge :label="isPromoActive(row) ? 'Activa' : 'Inactiva'"
                            :color="isPromoActive(row) ? 'green' : 'red'" variant="subtle" />
                        <div v-if="!isPromoActive(row)" class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {{ getPromoStatusText(row) }}
                        </div>
                    </div>
                </template>

                <!-- Custom cell for Actions -->
                <template #actions-data="{ row }">
                    <div class="flex justify-end space-x-2">
                        <UButton @click="openEditModal(row)" icon="i-heroicons-pencil" color="gray" variant="ghost" />
                        <UButton @click="confirmDelete(row)" icon="i-heroicons-trash" color="red" variant="ghost" />
                    </div>
                </template>
            </UTable>

            <!-- Paginación si es necesaria -->
            <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
                <UPagination v-if="promotions.length > 0" v-model="page" :page-count="pageCount"
                    :total="promotions.length" />
            </div>
        </div>
        <!-- Modal para crear/editar promoción -->
        <UModal v-model="showModal">
            <UCard>
                <template #header>
                    <h2 class="text-xl font-bold">{{ editing ? 'Editar Promoción' : 'Nueva Promoción' }}</h2>
                </template>
                <div class="p-6">

                    <form @submit.prevent="submitPromotion" class="space-y-4">
                        <UFormGroup label="Producto" required>
                            <USelect v-model="form.productId"
                                :options="products.map(p => ({ value: p.id, label: `${p.name} (S/. ${p.price})` }))"
                                placeholder="Selecciona un producto" required />
                        </UFormGroup>

                        <UFormGroup label="Título (opcional)">
                            <UInput v-model="form.title" />
                        </UFormGroup>

                        <div class="grid grid-cols-2 gap-4">
                            <UFormGroup label="Descuento" required>
                                <UInput v-model="form.discount" type="number" min="0" required />
                            </UFormGroup>

                            <UFormGroup label="¿Es porcentaje?">
                                <UToggle v-model="form.isPercentage" />
                            </UFormGroup>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <UFormGroup label="Fecha inicio" required>
                                <UInput v-model="form.startDate" type="date" required />
                            </UFormGroup>

                            <UFormGroup label="Fecha fin" required>
                                <UInput v-model="form.endDate" type="date" required />
                            </UFormGroup>
                        </div>

                        <UFormGroup label="Descripción (opcional)">
                            <UTextarea v-model="form.description" rows="3" />
                        </UFormGroup>

                        <div class="flex justify-end space-x-3 pt-4">
                            <UButton type="button" @click="showModal = false" color="gray" variant="ghost"
                                label="Cancelar" />
                            <UButton type="submit" color="primary" variant="solid"
                                :label="editing ? 'Actualizar' : 'Crear'" />
                        </div>
                    </form>
                </div>
            </UCard>
        </UModal>

        <!-- Modal de confirmación para eliminar -->
        <UModal v-model="showDeleteDialog">
            <UCard>
                <template #header>
                    <h3 class="text-lg font-bold">Confirmar Eliminación</h3>
                </template>
                <p>¿Estás seguro de que deseas eliminar esta promoción?</p>
                <template #footer>
                    <div class="flex justify-end space-x-3">
                        <UButton @click="showDeleteDialog = false" color="gray" variant="ghost" label="Cancelar" />
                        <UButton @click="deletePromotion" color="red" variant="solid" label="Eliminar" />
                    </div>
                </template>
            </UCard>
        </UModal>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { format, isAfter, isBefore } from 'date-fns';
const { $toast } = useNuxtApp();
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


// Columnas para la tabla
const columns = [{
    key: 'product',
    label: 'Producto'
}, {
    key: 'discount',
    label: 'Descuento'
}, {
    key: 'dateRange',
    label: 'Vigencia'
}, {
    key: 'status',
    label: 'Estado'
}, {
    key: 'actions',
    label: 'Acciones'
}];
// Configuración de página (Nuxt.js)
definePageMeta({
    middleware: ['auth'],
    layout: 'dashboard'
});

// Carga inicial de datos
const loadInitialData = async () => {
    try {
        loading.value = true;
        // Cargar promociones y productos
        const [promotionsRes, productsRes] = await Promise.all([
            $fetch('/api/v1/promotions').catch(() => []),
            $fetch('/api/v1/product').catch(() => [])
        ]);

        promotions.value = promotionsRes || [];
        products.value = productsRes || [];
    } catch (error) {
        console.error('Error cargando datos iniciales:', error);
        $toast.success("Error al cargar datos");
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
        title: 'Oferta Especial',
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
        const response = await $fetch(url, {
            method,
            body: {
                ...form,
                discount: Number(form.discount)
            }
        });

        showModal.value = false;
        await loadInitialData(); // Recargar datos
        $toast.success(`Promoción ${editing.value ? 'actualizada' : 'creada'} con éxito`);
    } catch (error) {
        $toast.error("Error al guardar la promoción");
        console.error(error);
    }
};

const confirmDelete = (promo) => {
    currentPromoId.value = promo.id;
    showDeleteDialog.value = true;
};

const deletePromotion = async () => {
    try {
        await $fetch(`/api/v1/promotions/${currentPromoId.value}`, {
            method: 'DELETE'
        });
        await loadInitialData();
        $toast.success("Promoción eliminada con éxito");
    } catch (error) {
        $toast.success("Error al eliminar la promoción");
        console.error(error);
    } finally {
        showDeleteDialog.value = false;
    }
};

const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd/MM/yyyy');
};
</script>
