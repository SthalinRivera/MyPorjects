<script setup lang="ts">
import type { PropType } from 'vue'

// Props que recibes desde el padre
const props = defineProps({
    data: {
        type: Array as PropType<Array<{ date: string; total: number | string }>>,
        required: true
    }
})

// Agrupa las ventas por día (suma los totales)
const groupedData = computed(() => {
    const map: Record<string, number> = {}

    props.data.forEach(({ date, total }) => {
        map[date] = (map[date] || 0) + Number(total)
    })

    return Object.entries(map).map(([date, total]) => ({
        date,
        total
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
})

// Formato para el componente LineChart
const chartData = computed(() =>
    groupedData.value.map(item => ({
        x: item.date,
        ventas: item.total
    }))
)

const categories = {
    ventas: {
        name: 'Ventas',
        color: '#3b82f6'
    }
}

// Para mostrar la fecha en el eje X
const xFormatter = (index: number) => {
    const item = chartData.value[index]
    return new Date(item?.x).toLocaleDateString('es-PE', { day: '2-digit', month: 'short' })
}
</script>

<template>
    <LineChart :data="chartData" :categories="categories" :height="300" :x-formatter="xFormatter" x-label="Día"
        y-label="S/. Ventas" />
</template>
