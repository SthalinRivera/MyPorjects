<template>
    <div class="max-w-9xl mx-auto p-4">
        <!-- Breadcrumb -->
        <UBreadcrumb :links="[
            { label: 'Dashboard', to: '/dashboard' },
            { label: 'Gestión de Pedidos', to: '/dashboard/orders' },
            { label: `Pedido #${order?.id}`, to: `/dashboard/orders/${order?.id}` }
        ]" class="mb-6" />

        <div v-if="loading" class="flex justify-center py-12">
            <USpin />
        </div>

        <div v-else-if="order" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Columna izquierda - Información del pedido -->
            <div class="lg:col-span-2 space-y-6">
                <!-- Resumen del pedido -->
                <UCard>
                    <template #header>
                        <div class="flex items-center justify-between">
                            <h2 class="text-lg font-semibold">Resumen del Pedido</h2>
                            <UBadge :label="formatStatus(order.status)" :color="statusColor(order.status)" size="lg" />
                        </div>
                    </template>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 class="font-medium text-gray-900 dark:text-white mb-3">Información del Pedido</h3>
                            <ul class="space-y-2">
                                <li class="flex justify-between">
                                    <span class="text-gray-500 dark:text-gray-400">Número de Pedido:</span>
                                    <span class="font-medium">#{{ order.id }}</span>
                                </li>
                                <li class="flex justify-between">
                                    <span class="text-gray-500 dark:text-gray-400">Fecha:</span>
                                    <span>{{ formatDate(order.createdAt) }}</span>
                                </li>
                                <li class="flex justify-between">
                                    <span class="text-gray-500 dark:text-gray-400">Estado:</span>
                                    <span>{{ formatStatus(order.status) }}</span>
                                </li>
                                <li v-if="order.source" class="flex justify-between">
                                    <span class="text-gray-500 dark:text-gray-400">Origen:</span>
                                    <UBadge :label="formatSource(order.source)"
                                        :color="source === 'WEB' ? 'blue' : 'green'" size="sm" />
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 class="font-medium text-gray-900 dark:text-white mb-3">Método de Pago</h3>
                            <div class="flex items-center gap-3 mb-4">
                                <UIcon name="i-heroicons-credit-card" class="w-6 h-6 text-primary" />
                                <span>{{ formatPaymentMethod(order.paymentMethod) }}</span>
                            </div>

                            <div v-if="order.paymentStatus" class="flex items-center gap-2">
                                <span class="text-gray-500 dark:text-gray-400">Estado de pago:</span>
                                <UBadge :label="formatPaymentStatus(order.paymentStatus)"
                                    :color="order.paymentStatus === 'PAID' ? 'green' : 'red'" />
                            </div>
                        </div>
                    </div>

                    <template #footer>
                        <div class="flex justify-end gap-3">
                            <UButton v-if="!['DELIVERED', 'CANCELED'].includes(order.status)"
                                @click="updateOrderStatus('DELIVERED')" :loading="updatingStatus"
                                icon="i-heroicons-check" color="green" label="Marcar como Entregado" />

                            <UButton v-if="!['CANCELED', 'DELIVERED'].includes(order.status)"
                                @click="confirmCancelOrder" :loading="updatingStatus" icon="i-heroicons-x-mark"
                                color="red" variant="outline" label="Cancelar Pedido" />

                            <UButton icon="i-heroicons-printer" color="gray" variant="outline" label="Imprimir"
                                @click="printOrder" />
                        </div>
                    </template>
                </UCard>

                <!-- Productos -->
                <UCard>
                    <template #header>
                        <h2 class="text-lg font-semibold">Productos</h2>
                    </template>

                    <UTable :rows="order.orderItems" :columns="productColumns" class="w-full">
                        <template #product-data="{ row }">
                            <div class="flex items-center gap-3">
                                <UAvatar :src="row.product.imageUrl || '/placeholder-product.png'" size="sm" />
                                <div>
                                    <p class="font-medium">{{ row.product.name }}</p>
                                    <p v-if="row.product.sku" class="text-sm text-gray-500 dark:text-gray-400">SKU: {{
                                        row.product.sku }}</p>
                                </div>
                            </div>
                        </template>

                        <template #price-data="{ row }">
                            S/. {{ row.price }}
                        </template>

                        <template #total-data="{ row }">
                            S/. {{ (row.price * row.quantity) }}
                        </template>
                    </UTable>

                    <div class="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                        <div class="flex justify-end">
                            <div class="w-full max-w-xs space-y-3">
                                <div class="flex justify-between">
                                    <span class="text-gray-500 dark:text-gray-400">Subtotal:</span>
                                    <span>S/. {{ order.subtotal }}</span>
                                </div>

                                <div v-if="order.discount > 0" class="flex justify-between">
                                    <span class="text-gray-500 dark:text-gray-400">Descuento:</span>
                                    <span class="text-red-500">-S/. {{ order.discount }}</span>
                                </div>

                                <div class="flex justify-between">
                                    <span class="text-gray-500 dark:text-gray-400">Envío:</span>
                                    <span>S/. {{ order.shippingCost }}</span>
                                </div>

                                <div
                                    class="flex justify-between font-bold text-lg border-t border-gray-200 dark:border-gray-700 pt-2">
                                    <span>Total:</span>
                                    <span>S/. {{ order.total }}</span>
                                </div>

                                <div v-if="order.coupon" class="text-sm text-blue-500 dark:text-blue-400 mt-2">
                                    Cupón aplicado: {{ order.coupon.code }} (-{{ order.coupon.discount }}{{
                                        order.coupon.isPercentage ?
                                            '%' : 'S/.' }})
                                </div>
                            </div>
                        </div>
                    </div>
                </UCard>

                <!-- Dirección de envío -->
                <UCard>
                    <template #header>
                        <h2 class="text-lg font-semibold">Dirección de Envío</h2>
                    </template>

                    <div v-if="order.shippingAddress">
                        <div class="flex items-start gap-3">
                            <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-gray-500 mt-0.5" />
                            <div>
                                <p class="font-medium">{{ order.shippingAddress.recipientName }}</p>
                                <p>{{ order.shippingAddress.street }}, {{ order.shippingAddress.city }}</p>
                                <p>{{ order.shippingAddress.state }}, {{ order.shippingAddress.postalCode }}</p>
                                <p>{{ order.shippingAddress.country }}</p>
                                <p class="mt-2">
                                    <span class="text-gray-500 dark:text-gray-400">Teléfono:</span>
                                    {{ order.shippingAddress.phone }}
                                </p>
                                <p v-if="order.shippingAddress.notes" class="mt-2">
                                    <span class="text-gray-500 dark:text-gray-400">Notas:</span>
                                    {{ order.shippingAddress.notes }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div v-else class="text-gray-500 dark:text-gray-400">
                        No se proporcionó dirección de envío
                    </div>
                </UCard>
            </div>

            <!-- Columna derecha - Cliente y acciones -->
            <div class="space-y-6">
                <!-- Información del cliente -->
                <UCard>
                    <template #header>
                        <h2 class="text-lg font-semibold">Cliente</h2>
                    </template>

                    <div class="flex items-center gap-3 mb-4">
                        <UAvatar :src="order.user?.image" size="lg" />
                        <div>
                            <p class="font-medium">{{ order.user?.name || order.clientName || 'Invitado' }}</p>
                            <p class="text-gray-500 dark:text-gray-400">{{ order.user?.email || 'Sin email' }}</p>
                            <p class="text-gray-500 dark:text-gray-400">
                                {{ order.user?.phoneNumber || order.clientPhone
                                    || 'Sin teléfono' }}</p>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <UButton v-if="order.user" icon="i-heroicons-user-circle" label="Ver perfil del cliente" block
                            :to="`/dashboard/customers/${order.user.id}`" />
                        <UButton icon="i-heroicons-envelope" label="Enviar mensaje" block variant="outline" />
                        <UButton icon="i-heroicons-arrow-path" label="Crear pedido similar" block variant="outline" />
                    </div>
                </UCard>

                <!-- Historial de estado -->
                <UCard>
                    <template #header>
                        <h2 class="text-lg font-semibold">Historial del Pedido</h2>
                    </template>

                    <div class="space-y-4">
                        <div v-for="(event, index) in order.statusHistory" :key="index" class="flex gap-3">
                            <div class="flex flex-col items-center">
                                <div :class="{
                                    'bg-primary-500': index === 0,
                                    'bg-gray-300 dark:bg-gray-600': index > 0
                                }" class="w-3 h-3 rounded-full mt-1"></div>
                                <div v-if="index < order.statusHistory.length - 1"
                                    class="w-px h-full bg-gray-200 dark:bg-gray-700">
                                </div>
                            </div>
                            <div class="flex-1 pb-4">
                                <p class="font-medium">{{ formatStatus(event.status) }}</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(event.date) }}</p>
                                <p v-if="event.notes" class="text-sm mt-1 text-gray-600 dark:text-gray-300">{{
                                    event.notes }}</p>
                            </div>
                        </div>
                    </div>
                </UCard>

                <!-- Notas internas -->
                <UCard>
                    <template #header>
                        <div class="flex items-center justify-between">
                            <h2 class="text-lg font-semibold">Notas Internas</h2>
                            <UButton icon="i-heroicons-pencil-square" color="gray" variant="ghost" size="xs"
                                @click="isEditingNotes = true" />
                        </div>
                    </template>

                    <div v-if="isEditingNotes">
                        <UTextarea v-model="internalNotes" rows="3" />
                        <div class="flex justify-end gap-2 mt-3">
                            <UButton label="Cancelar" color="gray" variant="outline" size="sm"
                                @click="isEditingNotes = false" />
                            <UButton label="Guardar" color="primary" size="sm" @click="saveInternalNotes" />
                        </div>
                    </div>
                    <p v-else class="text-gray-700 dark:text-gray-300">
                        {{ order.internalNotes || 'No hay notas internas para este pedido' }}
                    </p>
                </UCard>
            </div>
        </div>

        <!-- Modal de cancelación -->
        <UModal v-model="showCancelModal">
            <UCard>
                <template #header>
                    Confirmar Cancelación
                </template>

                <p class="mb-4">¿Estás seguro de que deseas cancelar el pedido #{{ order?.id }}?</p>

                <UFormGroup label="Razón de cancelación (opcional)">
                    <UTextarea v-model="cancelReason" placeholder="Ej: Cliente solicitó cancelación" />
                </UFormGroup>

                <template #footer>
                    <div class="flex justify-end gap-3">
                        <UButton label="Cancelar" color="gray" variant="outline" @click="showCancelModal = false" />
                        <UButton label="Confirmar Cancelación" color="red" @click="cancelOrder" />
                    </div>
                </template>
            </UCard>
        </UModal>
    </div>
</template>

<script setup lang="ts">

const route = useRoute();
const { id } = route.params;
const { $toast } = useNuxtApp();

const order = ref<any>(null);
const loading = ref(true);
const updatingStatus = ref(false);
const showCancelModal = ref(false);
const cancelReason = ref('');
const isEditingNotes = ref(false);
const internalNotes = ref('');

// Columnas para la tabla de productos
const productColumns = [
    { key: 'product', label: 'Producto' },
    { key: 'price', label: 'Precio Unitario' },
    { key: 'quantity', label: 'Cantidad' },
    { key: 'total', label: 'Total' }
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

// Color según estado
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

// Formatear método de pago
const formatPaymentMethod = (method: string) => {
    const methods: Record<string, string> = {
        CASH: "Efectivo",
        CARD: "Tarjeta de Crédito/Débito",
        TRANSFER: "Transferencia Bancaria",
        PAYPAL: "PayPal",
        OTHER: "Otro"
    };
    return methods[method] || method;
};

// Formatear estado de pago
const formatPaymentStatus = (status: string) => {
    const statuses: Record<string, string> = {
        PENDING: "Pendiente",
        PAID: "Pagado",
        FAILED: "Fallido",
        REFUNDED: "Reembolsado"
    };
    return statuses[status] || status;
};

// Formatear origen del pedido
const formatSource = (source: string) => {
    const sourceMap: Record<string, string> = {
        WEB: "Web",
        WHATSAPP: "WhatsApp"
    };
    return sourceMap[source] || source;
};


// Obtener detalles del pedido
const fetchOrder = async () => {
    loading.value = true
    try {
        const { data: response, error } = await useFetch(`/api/v1/orders/${id}`, {
            // Configuración importante:
            server: false, // Fuerza llamada desde cliente
            transform: (res) => {
                return res?.data || res // Maneja ambos formatos de respuesta
            }
        })

        if (error.value) {
            throw error.value
        }

        console.log("Respuesta completa:", response.value)

        if (!response.value) {
            throw new Error("La respuesta está vacía")
        }

        order.value = response.value
        internalNotes.value = order.value.internalNotes || ''

    } catch (err) {
        console.error("Error al cargar orden:", err)
        $toast.error("No se pudo cargar el pedido")
        // Redirige después de 2 segundos
        //  setTimeout(() => navigateTo('/dashboard/order-history'), 2000)
    } finally {
        loading.value = false
    }
}

// Actualizar estado del pedido
const updateOrderStatus = async (status: string) => {
    if (!order.value || ['DELIVERED', 'CANCELED'].includes(order.value.status)) return;

    try {
        updatingStatus.value = true;

        const { error } = await useFetch(`/api/v1/orders/${order.value.id}/status`, {
            method: 'PATCH',
            body: { status }
        });

        if (error.value) {
            throw error.value;
        }

        // Actualizar el estado localmente
        order.value.status = status;
        order.value.updatedAt = new Date().toISOString();
        order.value.statusHistory.unshift({
            status,
            date: new Date().toISOString(),
            notes: status === 'DELIVERED' ? 'Pedido marcado como entregado' : ''
        });

        $toast.success(`El pedido ha sido actualizado a "${formatStatus(status)}"`);
    } catch (error) {
        console.error("Error al actualizar estado del pedido:", error);
        $toast.error("No se pudo actualizar el estado del pedido");
    } finally {
        updatingStatus.value = false;
    }
};

// Confirmar cancelación de pedido
const confirmCancelOrder = () => {
    showCancelModal.value = true;
    cancelReason.value = '';
};

// Cancelar pedido
const cancelOrder = async () => {
    if (!order.value) return;

    try {
        updatingStatus.value = true;

        const { error } = await useFetch(`/api/v1/orders/${order.value.id}/status`, {
            method: 'PATCH',
            body: {
                status: 'CANCELED',
                notes: cancelReason.value
            }
        });

        if (error.value) {
            throw error.value;
        }

        // Actualizar el estado localmente
        order.value.status = 'CANCELED';
        order.value.updatedAt = new Date().toISOString();
        order.value.statusHistory.unshift({
            status: 'CANCELED',
            date: new Date().toISOString(),
            notes: cancelReason.value || 'Pedido cancelado'
        });

        showCancelModal.value = false;
        $toast.success("El pedido ha sido cancelado");
    } catch (error) {
        console.error("Error al cancelar el pedido:", error);
        $toast.error("No se pudo cancelar el pedido");
    } finally {
        updatingStatus.value = false;
    }
};

// Guardar notas internas
const saveInternalNotes = async () => {
    try {
        const { error } = await useFetch(`/api/v1/orders/${order.value.id}/notes`, {
            method: 'PATCH',
            body: { internalNotes: internalNotes.value }
        });

        if (error.value) {
            throw error.value;
        }

        order.value.internalNotes = internalNotes.value;
        isEditingNotes.value = false;
        $toast.success("Notas internas guardadas");
    } catch (error) {
        console.error("Error al guardar notas:", error);
        $toast.error("No se pudieron guardar las notas");
    }
};

// Imprimir pedido
const printOrder = () => {
    if (!order.value) return;
    window.open(`/dashboard/order-history/${order.value.id}/print`, '_blank');
};

// Carga inicial
onMounted(() => {
    fetchOrder();
});
</script>

<style scoped>
/* Estilos personalizados si son necesarios */
</style>