<script lang="ts" setup>
const { data: visitStats } = await useFetch('/api/v1/getVisitStats')

const fallbackData = {
    daily: {
        "2025-04-24": 15,
        "2025-04-25": 52,
        "2025-04-26": 71,
        "2025-04-27": 27
    },
    weekly: {},
    monthly: {},
    yearly: {}
}

const selectedType = ref<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily')

const filteredData = computed(() => {
    return visitStats?.value?.[selectedType.value] || fallbackData[selectedType.value]
})
</script>
<template>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <i class="ri-line-chart-line mr-2 text-blue-500"></i>
            Estadísticas de Visitas
        </h3>

        <!-- Selector -->
        <div class="mb-4">
            <select v-model="selectedType" class="border rounded px-3 py-1 dark:bg-gray-700 dark:text-white">
                <option value="daily">Diario</option>
                <option value="weekly">Semanal</option>
                <option value="monthly">Mensual</option>
                <option value="yearly">Anual</option>
            </select>
        </div>

        <ChartVisitByDayMonYear :daily-data="filteredData" />
        <pre class="text-xs mt-4">{{ visitStats || 'Cargando...' }}</pre>
    </div>
</template>

<style lang="postcss" scoped></style>
