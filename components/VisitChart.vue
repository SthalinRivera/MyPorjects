<script setup lang="ts">
import { ref, watch } from 'vue'
import { useFetch } from '#app'
import { Line } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title, Tooltip, Legend,
    LineElement, CategoryScale, LinearScale, PointElement,
} from 'chart.js'
import type { ChartData, ChartOptions } from 'chart.js'

// Registrar los componentes de Chart.js
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

// Estado del rango de tiempo seleccionado
const rangoSeleccionado = ref<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily')

// Datos para la gráfica
const datosGrafica = ref<ChartData<'line'>>({
    labels: [],
    datasets: [],
})

// Opciones de configuración de la gráfica
const opcionesGrafica: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Visitas al sitio web',
        },
    },
}

// Obtener las estadísticas desde el backend
const { data: estadisticas, error } = await useFetch('/api/v1/getVisitStats')

// Observar cambios en el rango seleccionado y actualizar la gráfica
watch(rangoSeleccionado, () => {
    const datos = estadisticas.value?.[rangoSeleccionado.value] || {}
    const etiquetas = Object.keys(datos).sort()
    const valores = etiquetas.map(key => datos[key])

    datosGrafica.value = {
        labels: etiquetas,
        datasets: [{
            label: 'Visitas',
            data: valores,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: true,
            tension: 0.3,
        }]
    }
}, { immediate: true })
</script>

<template>
    <div class="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <!-- Encabezado y botones de rango -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
                <i class="ri-pulse-line mr-2 text-blue-500"></i>
                Tráfico del Sitio
            </h3>

            <div class="flex flex-wrap gap-2">
                <button v-for="rango in ['daily', 'weekly', 'monthly', 'yearly']" :key="rango"
                    @click="rangoSeleccionado = rango" :class="[
                        'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
                        rangoSeleccionado === rango
                            ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    ]">
                    {{
                        rango === 'daily' ? 'Diario' :
                            rango === 'weekly' ? 'Semanal' :
                                rango === 'monthly' ? 'Mensual' :
                                    'Anual'
                    }}
                </button>
            </div>
        </div>

        <!-- Contenedor del gráfico -->
        <div class="relative h-64 sm:h-80 md:h-96 w-full">
            <Line :data="datosGrafica" :options="{
                ...opcionesGrafica,
                responsive: true,
                maintainAspectRatio: false
            }" class="absolute inset-0 w-full h-full" />
        </div>
    </div>
</template>

<style scoped>
button {
    transition: background-color 0.2s;
}
</style>
