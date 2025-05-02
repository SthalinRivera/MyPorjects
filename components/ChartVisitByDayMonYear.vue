<script lang="ts" setup>



// 1. Define el tipo de datos esperado
interface DailyVisit {
    date: string
    visits: number
}


// 2. Props del componente
const props = defineProps<{
    dailyData: Record<string, number> // Ejemplo: {"2025-04-24": 15, "2025-04-25": 52}
}>()

// 3. Transformación de datos
const chartData = computed<DailyVisit[]>(() => {
    return Object.entries(props.dailyData)
        .map(([date, visits]) => ({ date, visits }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
})


// 4. Configuración de categorías
const categories = {
    visits: {
        name: 'Visitas',
        color: '#3b82f6' // Color azul de Nuxt UI
    }
}

// 5. Formateador de fechas
const xFormatter = (i: number): string => {
    if (!chartData.value[i]) return ''
    return new Date(chartData.value[i].date).toLocaleDateString('es-PE', {
        day: 'numeric',
        month: 'short'
    })
}
</script>

<template>
    <div class="">
        <!-- 6. Gráfico de área con validación -->
        <AreaChart v-if="chartData.length > 0" :data="chartData" :categories="categories" :height="300"
            :grid-line-y="true" :x-formatter="xFormatter" :curve-type="CurveType.MonotoneX" :y-axis="['visits']" />
        <div v-else>
            No hay datos disponibles para mostrar
        </div>
    </div>
</template>
