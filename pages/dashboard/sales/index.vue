<template>
    <div class="max-w-9xl mx-auto p-4">
        <Breadcrumb :items="[{ title: 'Ventas', to: '/dashboard/sales' }]" />

        <h1 class="text-3xl font-bold mb-6">Reporte de Ventas 🧾</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div class="bg-white dark:bg-gray-800 shadow rounded-xl p-4">
                <h2 class="text-xl font-semibold mb-2">Ingresos Totales</h2>
                <p class="text-2xl text-green-600 dark:text-green-400 font-bold">
                    S/. {{ report?.totalRevenue || 0 }}
                </p>
            </div>

            <div class="bg-white dark:bg-gray-800 shadow rounded-xl p-4">
                <h2 class="text-xl font-semibold mb-2">Ventas por Fuente</h2>
                <ul class="text-sm text-gray-700 dark:text-gray-300">
                    <li v-for="source in report?.salesBySource" :key="source.source">
                        <span class="font-medium">{{ source.source }}:</span>
                        S/. {{ source._sum.total }} ({{ source._count }})
                    </li>
                </ul>
            </div>

            <div class="bg-white dark:bg-gray-800 shadow rounded-xl p-4">
                <h2 class="text-xl font-semibold mb-2">Ventas por Estado</h2>
                <ul class="text-sm text-gray-700 dark:text-gray-300">
                    <li v-for="status in report?.salesByStatus" :key="status.status">
                        <span class="font-medium">{{ formatStatus(status.status) }}:</span>
                        S/. {{ status._sum.total }} ({{ status._count }})
                    </li>
                </ul>
            </div>
        </div>

        <div class="bg-white dark:bg-gray-800 shadow rounded-xl p-4">
            <h2 class="text-xl font-semibold mb-4">Ventas por Producto</h2>
            <table class="min-w-full text-sm">
                <thead>
                    <tr
                        class="text-left text-gray-600 dark:text-gray-300 border-b border-gray-300 dark:border-gray-600">
                        <th class="py-2">ID</th>
                        <th class="py-2">Ventas Totales</th>
                        <th class="py-2">Cantidad Vendida</th>
                        <th class="py-2">N° de Ventas</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in report?.salesByProduct" :key="item.productId"
                        class="border-b border-gray-200 dark:border-gray-700">
                        <td class="py-2">{{ item.productId }}</td>
                        <td class="py-2">S/. {{ item._sum.price }}</td>
                        <td class="py-2">{{ item._sum.quantity }}</td>
                        <td class="py-2">{{ item._count }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useFetch } from '#app';

definePageMeta({
    middleware: ['auth'],
    layout: 'dashboard',
});

const report = ref<any>(null);

const { data, error } = await useFetch('/api/v1/salesReport');
if (data.value) {
    report.value = data.value;
}

const formatStatus = (status: string) => {
    const map: Record<string, string> = {
        PENDING: 'Pendiente',
        PROCESSED: 'Procesado',
        SHIPPED: 'Enviado',
        DELIVERED: 'Entregado',
        CANCELED: 'Cancelado',
        COMPLETED: 'Completado',
    };
    return map[status] || status;
};
</script>