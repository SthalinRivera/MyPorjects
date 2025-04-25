<template>
    <div class="max-w-9xl mx-auto p-4" v-if="order">
        <!-- Breadcrumb -->
        <Breadcrumb :items="[
            { title: 'Historial de orden', to: '/dashboard/order-history' },
            { title: `Orden #${order.id}`, to: `#` },
        ]" class="mb-6" />

        <!-- Header con botón de impresión -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
                <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    Detalles de la Orden #{{ order.id }}
                </h1>
                <div class="flex flex-wrap items-center gap-4 mt-2">
                    <span class="text-gray-600 dark:text-gray-400">
                        Fecha: {{ formatDate(order.createdAt) }}
                    </span>
                    <span
                        :class="`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusClasses[order.status]}`">
                        {{ getStatusText(order.status) }}
                    </span>
                </div>
            </div>
            <button @click="printOrder"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Imprimir
            </button>
        </div>

        <!-- Contenedor principal -->
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <!-- Sección de productos -->
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Productos</h2>

                <div v-if="order.orderItems && order.orderItems.length > 0">
                    <div v-for="(item, index) in order.orderItems" :key="item.product.id"
                        :class="['flex flex-col sm:flex-row gap-6 py-4', index !== 0 ? 'border-t border-gray-200 dark:border-gray-700' : '']">
                        <div class="flex-shrink-0">
                            <img :src="item.product.image || '/images/placeholder-product.png'" :alt="item.product.name"
                                class="h-24 w-24 rounded-md object-cover">
                        </div>
                        <div class="flex-1">
                            <h3 class="text-lg font-medium text-gray-900 dark:text-white">{{ item.product.name }}</h3>
                            <p class="text-gray-600 dark:text-gray-400 mt-1">{{ item.product.description }}</p>
                            <div class="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <span>Cantidad: {{ item.quantity }}</span>
                                <span class="mx-2">•</span>
                                <span>Precio unitario: S/ {{ item.product.price }}</span>
                            </div>
                        </div>
                        <div class="sm:text-right">
                            <p class="text-lg font-semibold text-gray-900 dark:text-white">
                                S/ {{ (parseFloat(item.product.price) * item.quantity).toFixed(2) }}
                            </p>
                        </div>
                    </div>
                </div>
                <div v-else class="text-center py-8">
                    <p class="text-gray-600 dark:text-gray-400">No se encontraron productos para esta orden.</p>
                </div>
            </div>

            <!-- Resumen de la orden -->
            <div class="p-6">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Resumen del Pedido</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-md font-medium text-gray-900 dark:text-white mb-2">Dirección de Envío</h3>
                        <div class="text-gray-600 dark:text-gray-400">
                            <p>{{ order.shippingAddress?.name || 'No especificado' }}</p>
                            <p>{{ order.shippingAddress?.address || 'No especificado' }}</p>
                            <p>{{ order.shippingAddress?.city }}, {{ order.shippingAddress?.postalCode }}</p>
                            <p>{{ order.shippingAddress?.country }}</p>
                            <p class="mt-2">Teléfono: {{ order.shippingAddress?.phone || 'No especificado' }}</p>
                        </div>
                    </div>
                    <div>
                        <h3 class="text-md font-medium text-gray-900 dark:text-white mb-2">Método de Pago</h3>
                        <div class="text-gray-600 dark:text-gray-400">
                            <p>{{ getPaymentMethodText(order.paymentMethod) }}</p>
                            <p v-if="order.paymentResult?.status" class="mt-2">
                                Estado del pago: {{ order.paymentResult.status }}
                            </p>
                            <p v-if="order.paidAt" class="mt-2">
                                Pagado el: {{ formatDate(order.paidAt) }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Total de la orden -->
                <div class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                    <div class="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                        <span>Total:</span>
                        <span>S/ {{ order.total }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Versión para imprimir (oculta visualmente) -->
        <div class="hidden print-block">
            <div ref="printContent" class="p-8">
                <h1 class="text-2xl font-bold mb-2">Comprobante de Pedido</h1>
                <p class="text-gray-600 mb-6">Orden #{{ order.id }} - {{ formatDate(order.createdAt) }}</p>

                <div class="mb-8">
                    <h2 class="text-xl font-semibold mb-4">Productos</h2>
                    <table class="w-full border-collapse">
                        <thead>
                            <tr class="border-b">
                                <th class="text-left py-2">Producto</th>
                                <th class="text-right py-2">Precio</th>
                                <th class="text-right py-2">Cantidad</th>
                                <th class="text-right py-2">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in order.orderItems" :key="item.product.id" class="border-b">
                                <td class="py-3">
                                    <p class="font-medium">{{ item.product.name }}</p>
                                    <p class="text-sm text-gray-600">{{ item.product.description }}</p>
                                </td>
                                <td class="text-right py-3">S/ {{ item.product.price }}</td>
                                <td class="text-right py-3">{{ item.quantity }}</td>
                                <td class="text-right py-3">S/ {{ (parseFloat(item.product.price) *
                                    item.quantity).toFixed(2) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="flex justify-between mt-8">
                    <div>
                        <h3 class="font-semibold mb-2">Dirección de Envío</h3>
                        <p>{{ order.shippingAddress?.name }}</p>
                        <p>{{ order.shippingAddress?.address }}</p>
                        <p>{{ order.shippingAddress?.city }}, {{ order.shippingAddress?.postalCode }}</p>
                        <p>{{ order.shippingAddress?.country }}</p>
                    </div>

                    <div class="text-right">
                        <h3 class="font-semibold mb-2">Resumen</h3>
                        <p>Método de pago: {{ getPaymentMethodText(order.paymentMethod) }}</p>
                        <p class="mt-4 font-bold">Total: S/ {{ order.total }}</p>
                    </div>
                </div>

                <div class="mt-12 pt-4 border-t text-center text-sm text-gray-500">
                    <p>Gracias por su compra</p>
                    <p>{{ new Date().toLocaleDateString() }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    image?: string;
}

interface ShippingAddress {
    name?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    phone?: string;
}

interface PaymentResult {
    id?: string;
    status?: string;
    update_time?: string;
    email_address?: string;
}

interface OrderItem {
    product: Product;
    quantity: number;
}

interface Order {
    id: number;
    createdAt: string;
    orderItems: OrderItem[];
    status: string;
    total: string;
    updatedAt: string;
    userId: number;
    shippingAddress?: ShippingAddress;
    paymentMethod?: string;
    paymentResult?: PaymentResult;
    paidAt?: string;
}

const order = ref<Order | null>(null);
const printContent = ref<HTMLElement | null>(null);

definePageMeta({
    middleware: ['auth'],
    layout: 'dashboard',
});

const route = useRoute();
const { id } = route.params;

const statusClasses = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
        pending: 'Pendiente',
        processing: 'Procesando',
        shipped: 'Enviado',
        delivered: 'Entregado',
        cancelled: 'Cancelado',
    };
    return statusMap[status] || status;
};

const getPaymentMethodText = (method?: string) => {
    if (!method) return 'No especificado';
    const methodMap: Record<string, string> = {
        paypal: 'PayPal',
        credit_card: 'Tarjeta de Crédito',
        cash: 'Efectivo',
        bank_transfer: 'Transferencia Bancaria',
    };
    return methodMap[method] || method;
};

const formatDate = (dateString: string) => {
    if (!dateString) return 'Fecha no disponible';
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
};

const printOrder = () => {
    if (!printContent.value) return;

    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow) {
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Comprobante de Pedido #${order.value?.id}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
                    h1, h2, h3 { margin: 0 0 10px 0; }
                    table { width: 100%; border-collapse: collapse; }
                    th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
                    .text-right { text-align: right; }
                    .border-t { border-top: 1px solid #ddd; }
                    .mt-4 { margin-top: 1rem; }
                    .mt-8 { margin-top: 2rem; }
                </style>
            </head>
            <body>
                ${printContent.value.innerHTML}
                <script>
                    setTimeout(() => {
                        window.print();
                        window.close();
                    }, 200);
                <\/script>
            </body>
            </html>
        `);
        printWindow.document.close();
    } else {
        alert('No se pudo abrir la ventana de impresión. Por favor, desbloquea los popups para este sitio.');
    }
};

const fetchOrderDetails = async () => {
    if (!id) {
        console.error('El ID de la orden no está disponible');
        return;
    }

    try {
        const response = await useFetch(`/api/v1/orders/${id}`);
        const orderData = response.data.value;

        if (orderData && orderData.order) {
            order.value = orderData.order;
        } else {
            console.error('No se encontraron detalles de la orden:', orderData);
        }
    } catch (error) {
        console.error('Error fetching order details:', error);
    }
};

onMounted(() => {
    if (id) {
        fetchOrderDetails();
    } else {
        console.error('ID no disponible al montar el componente');
    }
});

watch(() => route.params.id, (newId) => {
    if (newId) {
        fetchOrderDetails();
    }
});
</script>

<style scoped>
.print-block {
    display: none;
}

@media print {
    body * {
        visibility: hidden;
    }

    .print-block,
    .print-block * {
        visibility: visible;
    }

    .print-block {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        display: block;
    }
}
</style>