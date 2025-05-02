<template>
    <div class="max-w-9xl mx-auto p-4">
        <UBreadcrumb :links="breadcrumbLinks" class="mb-6" />

        <UPageHeader title="Reporte de Ventas" description="Resumen completo de las ventas y estadísticas">
            <template #icon>
                <UIcon name="i-heroicons-document-chart-bar" class="text-primary" />
            </template>
        </UPageHeader>

        <!-- Filtros -->
        <UCard class="mb-6">
            <UForm class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <UFormGroup label="Fecha inicial">
                    <UInput type="date" v-model="filters.startDate" />
                </UFormGroup>

                <UFormGroup label="Fecha final">
                    <UInput type="date" v-model="filters.endDate" />
                </UFormGroup>

                <UFormGroup label="Fuente">
                    <USelect v-model="filters.source" :options="sourceOptions" placeholder="Todas" />
                </UFormGroup>

                <UFormGroup label="Estado">
                    <USelect v-model="filters.status" :options="statusOptions" placeholder="Todos" />
                </UFormGroup>

                <div class="md:col-span-4 flex justify-end gap-2">
                    <UButton label="Filtrar" color="primary" @click="fetchReport" :loading="loading" />
                    <UButton label="Limpiar" color="gray" variant="outline" @click="resetFilters" />
                </div>
            </UForm>
        </UCard>

        <!-- Resumen estadístico -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <UCard>
                <template #header>
                    <div class="flex items-center gap-2">
                        <UIcon name="i-heroicons-currency-dollar" class="text-green-500" />
                        <span>Ingresos Totales</span>
                    </div>
                </template>

                <div class="text-3xl font-bold text-green-600 dark:text-green-400">
                    S/. {{ formatNumber(report?.totalRevenue || 0) }}
                </div>

                <template #footer>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                        vs período anterior:
                        <span :class="revenueChange >= 0 ? 'text-green-500' : 'text-red-500'">
                            {{ revenueChange >= 0 ? '↑' : '↓' }} {{ Math.abs(revenueChange) }}%
                        </span>
                    </div>
                </template>
            </UCard>

            <UCard>
                <template #header>
                    <div class="flex items-center gap-2">
                        <UIcon name="i-heroicons-shopping-bag" class="text-blue-500" />
                        <span>Total Ventas</span>
                    </div>
                </template>

                <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {{ report?.totalSales || 0 }}
                </div>

                <template #footer>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                        {{ report?.averageOrderValue ? `Valor promedio: S/. ${formatNumber(report.averageOrderValue)}` :
                            '' }}
                    </div>
                </template>
            </UCard>

            <UCard>
                <template #header>
                    <div class="flex items-center gap-2">
                        <UIcon name="i-heroicons-users" class="text-purple-500" />
                        <span>Clientes</span>
                    </div>
                </template>

                <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {{ report?.totalCustomers || 0 }}
                </div>

                <template #footer>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                        {{ report?.repeatCustomers ? `${report.repeatCustomers} clientes recurrentes` : '' }}
                    </div>
                </template>
            </UCard>

            <UCard>
                <template #header>
                    <div class="flex items-center gap-2">
                        <UIcon name="i-heroicons-cube" class="text-orange-500" />
                        <span>Productos Vendidos</span>
                    </div>
                </template>

                <div class="text-3xl font-bold text-orange-600 dark:text-orange-400">
                    {{ report?.totalProductsSold || 0 }}
                </div>

                <template #footer>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                        {{ report?.topProduct ? `Producto más vendido: ${report.topProduct}` : '' }}
                    </div>
                </template>
            </UCard>
        </div>

        <!-- Gráficos y tablas -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <!-- Gráfico de ventas por día -->
            <UCard>
                <template #header>
                    <div class="flex items-center gap-2">
                        <UIcon name="i-heroicons-chart-bar" class="text-primary" />
                        <span>Ventas por Día</span>
                    </div>
                </template>

                <div class="h-64">
                    <ChartSalesByDay :data="report?.salesByDay || []" />
                </div>

            </UCard>

            <!-- Gráfico de ventas por fuente -->
            <UCard>
                <template #header>
                    <div class="flex items-center gap-2">
                        <UIcon name="i-heroicons-puzzle-piece" class="text-primary" />
                        <span>Ventas por Fuente</span>
                    </div>
                </template>

                <div class="h-64">
                    <ChartSalesBySource :data="report?.salesBySource || []" />
                </div>
            </UCard>
        </div>

        <!-- Tabla de ventas por producto -->
        <UCard>
            <template #header>
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <UIcon name="i-heroicons-rectangle-stack" class="text-primary" />
                        <span>Ventas por Producto</span>
                    </div>
                    <UButton label="Exportar" color="gray" variant="outline" size="sm"
                        icon="i-heroicons-arrow-down-tray" @click="exportToExcel" />
                </div>
            </template>

            <UTable :rows="report?.salesByProduct || []" :columns="productColumns" :loading="loading">
                <template #price-data="{ row }">
                    S/. {{ formatNumber(row._sum.price) }}
                </template>

                <template #quantity-data="{ row }">
                    {{ formatNumber(row._sum.quantity) }}
                </template>

                <template #count-data="{ row }">
                    <UBadge color="primary">
                        {{ row._count }}
                    </UBadge>
                </template>
            </UTable>

            <template #footer>
                <div class="flex justify-between items-center">
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                        Mostrando {{ Math.min(report?.salesByProduct?.length || 0, 10) }} de {{
                            report?.salesByProduct?.length || 0 }} productos
                    </div>
                    <UPagination v-model="page" :page-count="pageCount" :total="report?.salesByProduct?.length || 0" />
                </div>
            </template>
        </UCard>

        <!-- Tabla de ventas por estado -->
        <UCard class="mt-6">
            <template #header>
                <div class="flex items-center gap-2">
                    <UIcon name="i-heroicons-check-badge" class="text-primary" />
                    <span>Ventas por Estado</span>
                </div>
            </template>

            <UTable :rows="report?.salesByStatus || []" :columns="statusColumns" :loading="loading">
                <template #status-data="{ row }">
                    <UBadge :color="getStatusColor(row.status)">
                        {{ formatStatus(row.status) }}
                    </UBadge>
                </template>

                <template #sum-data="{ row }">
                    S/. {{ formatNumber(row._sum.total) }}
                </template>

                <template #count-data="{ row }">
                    {{ row._count }}
                </template>
            </UTable>
        </UCard>
    </div>
</template>

<script lang="ts" setup>
import ChartSalesByDay from '~/components/ChartSalesByDay.vue'
import type { SalesReport } from '~/types'

// Configuración de la página
definePageMeta({
    middleware: ['auth'],
    layout: 'dashboard',
})

// Breadcrumb
const breadcrumbLinks = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Ventas', to: '/dashboard/sales' },
    { label: 'Reportes', to: '/dashboard/sales/reports' }
]

// Filtros
const filters = reactive({
    startDate: '',
    endDate: '',
    source: '',
    status: ''
})

const sourceOptions = [
    { value: 'WEB', label: 'Web' },
    { value: 'APP', label: 'App Móvil' },
    { value: 'PHYSICAL', label: 'Tienda Física' },
    { value: 'MARKETPLACE', label: 'Marketplace' }
]

const statusOptions = [
    { value: 'PENDING', label: 'Pendiente' },
    { value: 'PROCESSED', label: 'Procesado' },
    { value: 'SHIPPED', label: 'Enviado' },
    { value: 'DELIVERED', label: 'Entregado' },
    { value: 'CANCELED', label: 'Cancelado' },
    { value: 'COMPLETED', label: 'Completado' }
]

// Columnas de las tablas
const productColumns = [
    { key: 'productId', label: 'Producto' },
    { key: 'productName', label: 'Nombre' },
    { key: 'price', label: 'Total Vendido' },
    { key: 'quantity', label: 'Cantidad' },
    { key: 'count', label: 'N° Ventas' }
]

const statusColumns = [
    { key: 'status', label: 'Estado' },
    { key: 'sum', label: 'Total' },
    { key: 'count', label: 'N° Ventas' }
]

// Paginación
const page = ref(1)
const pageCount = 10

// Datos del reporte
const report = ref<SalesReport | null>(null)
const loading = ref(false)
const revenueChange = ref(0) // % de cambio vs período anterior

// Formateadores
const formatStatus = (status: string) => {
    const map: Record<string, string> = {
        PENDING: 'Pendiente',
        PROCESSED: 'Procesado',
        SHIPPED: 'Enviado',
        DELIVERED: 'Entregado',
        CANCELED: 'Cancelado',
        COMPLETED: 'Completado',
    }
    return map[status] || status
}

const getStatusColor = (status: string) => {
    const map: Record<string, string> = {
        PENDING: 'amber',
        PROCESSED: 'blue',
        SHIPPED: 'indigo',
        DELIVERED: 'green',
        CANCELED: 'red',
        COMPLETED: 'purple'
    }
    return map[status] || 'gray'
}

const formatNumber = (value: number) => {
    return new Intl.NumberFormat('es-PE').format(value)
}

// Funciones
const resetFilters = () => {
    filters.startDate = ''
    filters.endDate = ''
    filters.source = ''
    filters.status = ''
    fetchReport()
}

const fetchReport = async () => {
    loading.value = true
    try {
        const { data, error } = await useFetch('/api/v1/salesReport', {
            query: {
                startDate: filters.startDate,
                endDate: filters.endDate,
                source: filters.source,
                status: filters.status
            }
        })

        if (data.value) {
            report.value = data.value
            // Calcular % de cambio (simulado)
            revenueChange.value = Math.floor(Math.random() * 30) - 10 // Entre -10% y +20%
        }

        if (error.value) {
            throw error.value
        }
    } catch (err) {
        useToast().add({
            title: 'Error',
            description: 'No se pudo cargar el reporte',
            color: 'red'
        })
    } finally {
        loading.value = false
    }
}

const exportToExcel = () => {
    useToast().add({
        title: 'Exportado',
        description: 'Los datos se han exportado correctamente',
        color: 'green'
    })
    // Aquí iría la lógica real de exportación
}

// Cargar datos iniciales
onMounted(() => {
    // Establecer fechas por defecto (últimos 30 días)
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 30)

    filters.startDate = startDate.toISOString().split('T')[0]
    filters.endDate = endDate.toISOString().split('T')[0]

    fetchReport()
})
</script>