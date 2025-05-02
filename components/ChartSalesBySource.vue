<script lang="ts" setup>


// Define el tipo para los props
interface SalesSourceItem {
    _sum: {
        total: string
    }
    _count: number
    source: string
}

// Props del componente
const props = defineProps<{
    data: SalesSourceItem[]
}>()

// Procesamiento de datos
const salesData = computed(() => {
    return props.data.map(item => ({
        source: item.source,
        total: parseFloat(item._sum.total), // Convertir a número
        count: item._count
    }))
})

// Configuración de categorías
const salesCategories = {
    web: { name: 'Web' },
    whatsapp: { name: 'WhatsApp' }
}

// Formateadores
const xFormatter = (i: number): string => {
    const source = salesData.value[i]?.source
    return source === 'WEB' ? 'Web' : 'WhatsApp'
}

const yFormatter = (value: number): string => `S/. ${value}`
</script>

<template>
    <BarChart :data="salesData" :categories="salesCategories" :height="200" :y-axis="['total']" :xNumTicks="1"
        :radius="2" :y-grid-line="true" :x-formatter="xFormatter" :y-formatter="yFormatter"
        :legend-position="LegendPosition.Top" :colors="['#ffffff', '#200006']" />
</template>