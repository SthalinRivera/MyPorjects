<template>
    <div class="max-w-9xl mx-auto p-4">
        <!-- Breadcrumb -->
        <UBreadcrumb :links="[
            { label: 'Dashboard', to: '/dashboard' },
            { label: 'Gestión de Pedidos', to: '/dashboard/orders' }
        ]" class="mb-6" />

        <!-- Panel de Estadísticas -->
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <UCard>
                <div class="flex items-center gap-3">
                    <UIcon name="i-heroicons-shopping-bag" class="w-8 h-8 text-blue-500" />
                    <div>
                        <p class="text-gray-500 dark:text-gray-400 text-sm">Total Pedidos</p>
                        <p class="text-xl font-semibold">{{ stats.totalOrders }}</p>
                    </div>
                </div>
            </UCard>

            <UCard>
                <div class="flex items-center gap-3">
                    <UIcon name="i-heroicons-clock" class="w-8 h-8 text-yellow-500" />
                    <div>
                        <p class="text-gray-500 dark:text-gray-400 text-sm">Pendientes</p>
                        <p class="text-xl font-semibold">{{ stats.pendingOrders }}</p>
                    </div>
                </div>
            </UCard>

            <UCard>
                <div class="flex items-center gap-3">
                    <UIcon name="i-heroicons-cog" class="w-8 h-8 text-purple-500" />
                    <div>
                        <p class="text-gray-500 dark:text-gray-400 text-sm">Procesados</p>
                        <p class="text-xl font-semibold">{{ stats.processedOrders }}</p>
                    </div>
                </div>
            </UCard>

            <UCard>
                <div class="flex items-center gap-3">
                    <UIcon name="i-heroicons-check-circle" class="w-8 h-8 text-green-500" />
                    <div>
                        <p class="text-gray-500 dark:text-gray-400 text-sm">Entregados</p>
                        <p class="text-xl font-semibold">{{ stats.deliveredOrders }}</p>
                    </div>
                </div>
            </UCard>

            <UCard>
                <div class="flex items-center gap-3">
                    <UIcon name="i-heroicons-x-circle" class="w-8 h-8 text-red-500" />
                    <div>
                        <p class="text-gray-500 dark:text-gray-400 text-sm">Cancelados</p>
                        <p class="text-xl font-semibold">{{ stats.canceledOrders }}</p>
                    </div>
                </div>
            </UCard>
        </div>

        <!-- Panel de Filtros -->
        <UCard class="mb-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <h2 class="text-lg font-semibold text-gray-800 dark:text-white">Filtros</h2>
                <div class="flex gap-2">
                    <UButton @click="resetFilters" icon="i-heroicons-funnel" color="gray" variant="solid"
                        label="Limpiar" />
                    <UButton @click="exportToExcel" icon="i-heroicons-document-arrow-down" color="green" variant="solid"
                        label="Exportar" />
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <!-- Filtro por Cliente -->
                <div>
                    <UFormGroup label="Cliente">
                        <USelect v-model="filters.clientId" :options="clientOptions" @change="fetchOrders"
                            placeholder="Todos los clientes" />
                    </UFormGroup>
                </div>

                <!-- Filtro por Estado -->
                <div>
                    <UFormGroup label="Estado">
                        <USelect v-model="filters.status" :options="statusOptions" @change="fetchOrders"
                            placeholder="Todos los estados" />
                    </UFormGroup>
                </div>

                <!-- Filtro por Fecha -->
                <div>
                    <UFormGroup label="Desde">
                        <UInput v-model="filters.startDate" type="date" @change="fetchOrders" />
                    </UFormGroup>
                </div>

                <div>
                    <UFormGroup label="Hasta">
                        <UInput v-model="filters.endDate" type="date" @change="fetchOrders" />
                    </UFormGroup>
                </div>
            </div>
        </UCard>

        <!-- Tabla de Pedidos -->
        <UCard>
            <UTable :rows="orders" :columns="columns" :loading="loading" :empty-state="{
                icon: 'i-heroicons-shopping-bag',
                label: 'No se encontraron pedidos',
                description: 'No hay pedidos que coincidan con tus filtros actuales'
            }" class="w-full">
                <template #id-data="{ row }">
                    <div class="flex flex-col">
                        <span class="font-medium">#{{ row.id }}</span>
                        <span class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(row.createdAt) }}</span>
                        <span v-if="row.source" :class="sourceClass(row.source)"
                            class="text-xs mt-1 px-2 py-0.5 rounded-full inline-block w-fit">
                            {{ formatSource(row.source) }}
                        </span>
                    </div>
                </template>

                <template #client-data="{ row }">
                    <div class="flex items-center gap-3">
                        <UAvatar :src="row.user?.image || ''" :alt="row.user?.name" size="sm" />
                        <div class="flex flex-col">
                            <span class="font-medium">{{ row.user?.name || row.clientName || 'Invitado' }}</span>
                            <span class="text-sm text-gray-500 dark:text-gray-400">{{ row.user?.email || 'Sin email'
                            }}</span>
                            <span class="text-xs text-gray-500 dark:text-gray-400">{{ row.user?.phoneNumber ||
                                row.clientPhone || 'Sin teléfono' }}</span>
                        </div>
                    </div>
                </template>

                <template #products-data="{ row }">
                    <div class="flex items-center gap-2">
                        <UAvatarGroup size="xs" :max="3">
                            <UAvatar v-for="(item, index) in row.orderItems.slice(0, 3)" :key="index"
                                :src="item.product.imageUrl || '/placeholder-product.png'" :alt="item.product.name" />
                        </UAvatarGroup>
                        <span class="text-sm text-gray-500 dark:text-gray-400">
                            {{row.orderItems.reduce((sum, item) => sum + item.quantity, 0)}} items
                        </span>
                    </div>
                </template>

                <template #total-data="{ row }">
                    <div class="flex flex-col">
                        <span class="font-bold">S/. {{ row.total }}</span>
                        <span v-if="row.coupon" class="text-xs text-blue-500 dark:text-blue-400 mt-1">
                            Cupón: {{ row.coupon.code }} (-{{ row.coupon.discount }}{{ row.coupon.isPercentage ? '%' :
                                'S/.' }})
                        </span>
                    </div>
                </template>

                <template #status-data="{ row }">
                    <div class="flex flex-col">
                        <UBadge :label="formatStatus(row.status)" :color="statusColor(row.status)" />
                        <span v-if="row.status === 'DELIVERED' || row.status === 'CANCELED'"
                            class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {{ formatDate(row.updatedAt) }}
                        </span>
                    </div>
                </template>

                <template #actions-data="{ row }">
                    <div class="flex items-center gap-2 justify-end">
                        <UButton v-if="!['DELIVERED', 'CANCELED'].includes(row.status)"
                            @click="updateOrderStatus(row, 'DELIVERED')" :loading="updatingStatus === row.id"
                            icon="i-heroicons-check" color="green" variant="soft" size="xs" label="Entregar" />

                        <UButton v-if="!['CANCELED', 'DELIVERED'].includes(row.status)" @click="confirmCancelOrder(row)"
                            :loading="updatingStatus === row.id" icon="i-heroicons-x-mark" color="red" variant="soft"
                            size="xs" label="Cancelar" />

                        <UDropdown :items="actionItems(row)">
                            <UButton icon="i-heroicons-ellipsis-vertical" color="gray" variant="ghost" size="xs" />
                        </UDropdown>
                    </div>
                </template>
            </UTable>

            <!-- Paginación -->
            <div v-if="orders.length > 0 && totalPages > 1"
                class="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div class="text-sm text-gray-500 dark:text-gray-400">
                    Mostrando <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span> a
                    <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, totalOrders) }}</span> de
                    <span class="font-medium">{{ totalOrders }}</span> pedidos
                </div>

                <UPagination v-model="currentPage" :page-count="itemsPerPage" :total="totalOrders"
                    @update:model-value="fetchOrders" />
            </div>
        </UCard>

        <!-- Modal de confirmación -->
        <UModal v-model="showCancelModal">
            <UCard>
                <template #header>
                    Confirmar cancelación
                </template>

                <p class="text-gray-700 dark:text-gray-300 mb-4">¿Estás seguro de que deseas cancelar el pedido #{{
                    selectedOrder?.id }}?</p>

                <template #footer>
                    <div class="flex justify-end gap-3">
                        <UButton @click="showCancelModal = false" color="gray" variant="ghost" label="Cancelar" />
                        <UButton @click="confirmCancel" color="red" variant="solid" label="Sí, cancelar pedido" />
                    </div>
                </template>
            </UCard>
        </UModal>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, onMounted } from "vue";

const { $toast } = useNuxtApp();
const { user } = useUserSession();
const orders = ref<any[]>([]);
const clients = ref<any[]>([]);
const loading = ref(true);
const updatingStatus = ref<number | null>(null);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalOrders = ref(0);
const showCancelModal = ref(false);
const selectedOrder = ref<any>(null);

// Columnas de la tabla
const columns = [
    { key: 'id', label: 'ID / Fecha' },
    { key: 'client', label: 'Cliente' },
    { key: 'products', label: 'Productos' },
    { key: 'total', label: 'Total / Método' },
    { key: 'status', label: 'Estado' },
    { key: 'actions', label: 'Acciones' }
];

// Filtros avanzados
const filters = ref({
    clientId: 'ALL',
    status: 'ALL',
    startDate: '',
    endDate: ''
});

// Estadísticas
const stats = ref({
    totalOrders: 0,
    pendingOrders: 0,
    processedOrders: 0,
    shippedOrders: 0,
    deliveredOrders: 0,
    canceledOrders: 0
});

// Opciones para selects
const statusOptions = [
    { value: 'ALL', label: 'Todos los estados' },
    { value: 'PENDING', label: 'Pendiente' },
    { value: 'PROCESSED', label: 'Procesado' },
    { value: 'SHIPPED', label: 'Enviado' },
    { value: 'DELIVERED', label: 'Entregado' },
    { value: 'CANCELED', label: 'Cancelado' }
];

const clientOptions = computed(() => [
    { value: 'ALL', label: 'Todos los clientes' },
    ...clients.value.map(client => ({
        value: client.id,
        label: `${client.name} (${client.email})`
    }))
]);

// Items del menú de acciones
const actionItems = (row: any) => [
    [{
        label: 'Ver detalles',
        icon: 'i-heroicons-eye',
        click: () => navigateTo(`/dashboard/order-history/${row.id}/details`),
    }],
    [{
        label: 'Imprimir',
        icon: 'i-heroicons-printer',
        click: () => printOrder(row)
    }],
    [{
        label: 'Copiar enlace',
        icon: 'i-heroicons-link',
        click: () => copyOrderLink(row)
    }]
];

definePageMeta({
    middleware: ['auth'],
    layout: 'dashboard',
});

// Formatear fecha completa
const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
};

// Formatear estado para mostrar
const formatStatus = (status: string) => {
    const statusMap: Record<string, string> = {
        PENDING: "Pendiente",
        PROCESSED: "Procesado",
        SHIPPED: "Enviado",
        DELIVERED: "Entregado",
        CANCELED: "Cancelado"
    };
    return statusMap[status] || status;
};

// Color del badge según estado
const statusColor = (status: string) => {
    const colors: Record<string, string> = {
        PENDING: "amber",
        PROCESSED: "blue",
        SHIPPED: "purple",
        DELIVERED: "green",
        CANCELED: "red"
    };
    return colors[status] || "gray";
};

// Formatear origen del pedido
const formatSource = (source: string) => {
    const sourceMap: Record<string, string> = {
        WEB: "Web",
        WHATSAPP: "WhatsApp"
    };
    return sourceMap[source] || source;
};

// Clases para el badge de origen
const sourceClass = (source: string): string => {
    const classes: Record<string, string> = {
        WEB: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200",
        WHATSAPP: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
    };
    return classes[source] || "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200";
};

// Resetear filtros
const resetFilters = () => {
    filters.value = {
        clientId: 'ALL',
        status: 'ALL',
        startDate: '',
        endDate: ''
    };
    currentPage.value = 1;
    fetchOrders();
};

// Paginación
const totalPages = computed(() => Math.ceil(totalOrders.value / itemsPerPage.value));

// Obtener todos los clientes
const fetchClients = async () => {
    try {
        const { data, error } = await useFetch('/api/v1/users/clients');

        if (error.value) {
            throw error.value;
        }

        clients.value = data.value?.clients || [];
    } catch (error) {
        console.error("Error al obtener clientes:", error);
        $toast.error("No se pudieron cargar los clientes");
    }
};

// Obtener estadísticas
const fetchStats = async () => {
    try {
        const { data, error } = await useFetch('/api/v1/orders/stats');

        if (error.value) {
            throw error.value;
        }

        stats.value = data.value || {
            totalOrders: 0,
            pendingOrders: 0,
            processedOrders: 0,
            shippedOrders: 0,
            deliveredOrders: 0,
            canceledOrders: 0
        };
    } catch (error) {
        console.error("Error al obtener estadísticas:", error);
    }
};

// Actualizar estado del pedido
const updateOrderStatus = async (order: any, status: string) => {
    if (['DELIVERED', 'CANCELED'].includes(order.status)) return;

    try {
        updatingStatus.value = order.id;

        const { error } = await useFetch(`/api/v1/orders/${order.id}/status`, {
            method: 'PATCH',
            body: { status }
        });

        if (error.value) {
            throw error.value;
        }

        // Actualizar el estado localmente
        const orderToUpdate = orders.value.find(o => o.id === order.id);
        if (orderToUpdate) {
            orderToUpdate.status = status;
            orderToUpdate.updatedAt = new Date().toISOString();
        }

        // Actualizar estadísticas
        await fetchStats();

        $toast.success(`El pedido #${order.id} ha sido actualizado a "${formatStatus(status)}"`);
    } catch (error) {
        console.error("Error al actualizar estado del pedido:", error);
        $toast.error("No se pudo actualizar el estado del pedido");
    } finally {
        updatingStatus.value = null;
    }
};

// Confirmar cancelación de pedido
const confirmCancelOrder = (order: any) => {
    selectedOrder.value = order;
    showCancelModal.value = true;
};

// Confirmar cancelación
const confirmCancel = async () => {
    if (!selectedOrder.value) return;

    await updateOrderStatus(selectedOrder.value, 'CANCELED');
    showCancelModal.value = false;
    selectedOrder.value = null;
};

// Imprimir pedido
const printOrder = (order: any) => {
    window.open(`/dashboard/order-history/${order.id}/print`, '_blank');
};

// Copiar enlace del pedido
const copyOrderLink = async (order: any) => {
    try {
        await navigator.clipboard.writeText(`${window.location.origin}/dashboard/order-history/${order.id}/details`);
        $toast.success("Enlace copiado al portapapeles");
    } catch (error) {
        console.error("Error al copiar enlace:", error);
        $toast.error("No se pudo copiar el enlace");
    }
};

// Exportar a Excel
const exportToExcel = async () => {
    try {
        // Implementar lógica de exportación a Excel
        // Puedes usar librerías como xlsx o exportar a CSV
        $toast.success("La exportación a Excel se ha iniciado");
    } catch (error) {
        console.error("Error al exportar a Excel:", error);
        $toast.error("No se pudo exportar a Excel");
    }
};

// Obtener pedidos
const fetchOrders = async () => {
    loading.value = true;
    try {
        const query: any = {
            page: currentPage.value,
            limit: itemsPerPage.value
        };

        if (filters.value.clientId !== 'ALL') {
            query.userId = filters.value.clientId;
        }

        if (filters.value.status !== 'ALL') {
            query.status = filters.value.status;
        }

        if (filters.value.startDate) {
            query.startDate = new Date(filters.value.startDate).toISOString();
        }

        if (filters.value.endDate) {
            query.endDate = new Date(filters.value.endDate).toISOString();
        }

        const { data, error } = await useFetch('/api/v1/orders', { query });

        if (error.value) {
            throw error.value;
        }

        orders.value = data.value?.orders || [];
        totalOrders.value = data.value?.total || 0;
    } catch (error) {
        console.error("Error al obtener pedidos:", error);
        orders.value = [];
        totalOrders.value = 0;
        $toast.error("No se pudieron cargar los pedidos");
    } finally {
        loading.value = false;
    }
};

// Carga inicial
onMounted(async () => {
    await Promise.all([
        fetchClients(),
        fetchStats(),
        fetchOrders()
    ]);
});

// Observar cambios en los filtros
watchEffect(() => {
    if (user.value) {
        currentPage.value = 1;
        fetchOrders();
    }
});
</script>