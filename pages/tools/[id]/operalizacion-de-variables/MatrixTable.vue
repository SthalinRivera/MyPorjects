<template>
    <div class="overflow-x-auto">
        <table class="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
                <tr class="bg-gray-100 dark:bg-gray-700">
                    <th class="border px-4 py-3 text-gray-800 dark:text-gray-200 font-medium">Variables</th>
                    <th class="border px-4 py-3 text-gray-800 dark:text-gray-200 font-medium">Definición Operacional
                    </th>
                    <th class="border px-4 py-3 text-gray-800 dark:text-gray-200 font-medium">Dimensión</th>
                    <th class="border px-4 py-3 text-gray-800 dark:text-gray-200 font-medium">Indicador</th>
                    <th class="border px-4 py-3 text-gray-800 dark:text-gray-200 font-medium">Ítems/Fórmula</th>
                    <th class="border px-4 py-3 text-gray-800 dark:text-gray-200 font-medium">Instrumento y Escala</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(variable, variableIndex) in variables" :key="variableIndex">
                    <template v-for="(dimension, dimensionIndex) in variable.dimensiones" :key="dimensionIndex">
                        <tr v-for="(indicador, indicadorIndex) in dimension.indicadores"
                            :key="`${variableIndex}-${dimensionIndex}-${indicadorIndex}`"
                            :class="indicadorIndex % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'"
                            class="hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                            <!-- Variable -->
                            <template v-if="dimensionIndex === 0 && indicadorIndex === 0">
                                <td class="border px-4 py-2 text-gray-900 dark:text-gray-100 align-top"
                                    :rowspan="getTotalFilasVariable(variable)">
                                    <div class="font-medium">{{ variable.nombre }}</div>
                                </td>
                                <td class="border px-4 py-2 text-gray-900 dark:text-gray-100 align-top"
                                    :rowspan="getTotalFilasVariable(variable)">
                                    <div class="text-sm">{{ variable.definicion_operacional }}</div>
                                </td>
                            </template>

                            <!-- Dimensión -->
                            <template v-if="indicadorIndex === 0">
                                <td class="border px-4 py-2 text-gray-900 dark:text-gray-100 align-top"
                                    :rowspan="dimension.indicadores.length">
                                    <div class="font-medium">{{ dimension.nombre }}</div>
                                </td>
                            </template>

                            <!-- Indicador -->
                            <td class="border px-4 py-2 text-gray-900 dark:text-gray-100">
                                <div class="font-medium">{{ indicador.nombre }}</div>
                            </td>
                            <td class="border px-4 py-2 text-gray-900 dark:text-gray-100">
                                <div class="text-sm">{{ indicador.items_formula }}</div>
                            </td>
                            <td class="border px-4 py-2 text-gray-900 dark:text-gray-100">
                                <div class="text-sm">{{ indicador.instrumento_escala }}</div>
                            </td>
                        </tr>
                    </template>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    variables: Array<any>
}>()

function getTotalFilasVariable(variable: any): number {
    return variable.dimensiones.reduce(
        (total: number, dimension: any) => total + dimension.indicadores.length,
        0
    )
}
</script>
