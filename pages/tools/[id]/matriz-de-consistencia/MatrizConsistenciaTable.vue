<template>
    <div id="matriz-consistencia-table" class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden m-2">
        <div class="overflow-x-auto">
            <table className=" w-full  border border-gray-300 dark:border-gray-700 ">
                <thead>
                    <tr className=" text-gray-800 dark:text-gray-200">
                        <th className="py-2 px-4 border border-gray-300 dark:border-gray-600">Problema</th>
                        <th className="py-2 px-4 border border-gray-300 dark:border-gray-600">Objetivos</th>
                        <th className="py-2 px-4 border border-gray-300 dark:border-gray-600">Hipótesis</th>
                        <th className="py-2 px-4 border border-gray-300 dark:border-gray-600">Variables</th>
                        <th className="py-2 px-4 border border-gray-300 dark:border-gray-600">Dimensiones
                        </th>
                        <th className="py-2 px-4 border border-gray-300 dark:border-gray-600 w-80">
                            Indicadores
                        </th>
                        <th className="py-2 px-4 border border-gray-300 dark:border-gray-600">Metodología
                        </th>
                    </tr>
                </thead>
                <tbody className="text-gray-800 dark:text-gray-200 rounded-lg">
                    <tr className="">
                        <td className="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p className="text-sm font-bold">Problema general:</p>
                            <p className="text-sm">{{ apiResponse.problema_general || 'No hay datos' }}</p>
                        </td>
                        <td className="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p className="text-sm font-bold">Objetivo general</p>
                            <p className="text-sm"> {{ apiResponse.objetivo_general || 'No hay datos' }}</p>
                        </td>
                        <td className="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p className="text-sm font-bold">Hipótesis general</p>
                            <p className="text-sm">{{ apiResponse.hipótesis_general || 'No hay datos' }}
                            </p>
                        </td>
                        <td className="py-2 px-4 border border-gray-300 dark:border-gray-600" rowspan="3">
                            <p className="text-sm font-bold">Variable 01</p>
                            <br />
                            <p className="text-sm"> {{ apiResponse.variable1 || 'No hay datos' }}</p>
                        </td>
                        <td className="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p className="text-sm font-bold">Dimensión 1:</p>
                            <p className="text-sm">{{ apiResponse.variable1_dimension1 || 'No hay datos' }}
                            </p>
                        </td>
                        <td className="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p className="text-sm font-bold">Indicador 1:</p>
                            <p className="text-sm">{{ apiResponse.variable1_dimension1_indicador1 ||
                                'No hay datos' }} </p>
                            <p className="text-sm font-bold">Indicador 2:</p>
                            <p className="text-sm"> {{ apiResponse.variable1_dimension1_indicador2 ||
                                'No hay datos' }}</p>
                            <p className="text-sm font-bold">Indicador 3:</p>
                            <p className="text-sm">{{ apiResponse.variable1_dimension1_indicador3 ||
                                'No hay datos' }}</p>
                        </td>
                        <td className="py-2 px-4 border border-gray-300 dark:border-gray-600" rowspan="6">
                            <p className="text-sm font-bold">Enfoque:</p>
                            <p className="text-sm">{{ apiResponse.enfoque || 'No hay datos' }} </p>
                            <p className="text-sm font-bold">Tipo de investigación:</p>
                            <p className="text-sm"> {{ apiResponse.tipo_de_investigación || 'No hay datos'
                                }}
                            </p>
                            <p className="text-sm font-bold">Nivel de investigación:</p>
                            <p className="text-sm"> {{ apiResponse.nivel_de_investigación || 'No hay datos'
                                }}
                            </p>
                            <p className="text-sm font-bold">Población:</p>
                            <p className="text-sm"> {{ apiResponse.población || 'No hay datos' }}</p>
                            <p className="text-sm font-bold">Muestra:</p>
                            <p className="text-sm"> {{ apiResponse.muestra || 'No hay datos' }}</p>
                            <p className="text-sm font-bold">Muestreo:</p>
                            <p className="text-sm">{{ apiResponse.muestreo || 'No hay datos' }} </p>
                            <p className="text-sm font-bold">Instrumento:</p>
                            <p className="text-sm">{{ apiResponse.instrumento || 'No hay datos' }} </p>
                        </td>
                    </tr>
                    <tr className="">
                        <td className="py-2 px-4 border border-gray-300 dark:border-gray-600" rowspan="2">
                            <p className="text-sm font-bold">Problema específico 1</p>
                            <p className="text-sm">{{ apiResponse.problema_especifico1 || 'No hay datos' }}
                            </p>
                        </td>
                        <td className="py-2 px-4 border border-gray-300 dark:border-gray-600" rowspan="2">
                            <p className="text-sm font-bold">Objetivo específico 1</p>
                            <p className="text-sm"> {{ apiResponse.objetivo_especifico1 || 'No hay datos' }}
                            </p>
                        </td>
                        <td className="py-2 px-4 border border-gray-300 dark:border-gray-600" rowspan="2">
                            <p className="text-sm font-bold">Hipótesis específica 1</p>
                            <p className="text-sm"> {{ apiResponse.hipótesis_especifico1 || 'No hay datos'
                                }}
                            </p>
                        </td>
                        <td className="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p className="text-sm font-bold">Dimensión 2:</p>
                            <p className="text-sm"> {{ apiResponse.variable1_dimension2 || 'No hay datos' }}
                            </p>
                        </td>
                        <td className="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p className="text-sm font-bold">Indicador 1:</p>
                            <p className="text-sm">{{ apiResponse.variable1_dimension2_indicador1 ||
                                'No hay datos' }} </p>
                            <p className="text-sm font-bold">Indicador 2:</p>
                            <p className="text-sm">{{ apiResponse.variable1_dimension2_indicador2 ||
                                'No hay datos' }} </p>
                            <p className="text-sm font-bold">Indicador 3:</p>
                            <p className="text-sm"> {{ apiResponse.variable1_dimension2_indicador3 ||
                                'No hay datos' }}</p>
                        </td>
                    </tr>
                    <tr className="">

                        <td className="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p className="text-sm font-bold">Dimensión 3: </p>
                            <p className="text-sm"> {{ apiResponse.variable1_dimension3 || 'No hay datos' }}
                            </p>
                        </td>
                        <td className="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p className="text-sm font-bold">Indicador 1:</p>
                            <p className="text-sm">{{ apiResponse.variable1_dimension3_indicador1 ||
                                'No hay datos' }} </p>
                            <p className="text-sm font-bold">Indicador 2:</p>
                            <p className="text-sm">{{ apiResponse.variable1_dimension3_indicador2 ||
                                'No hay datos' }} </p>
                            <p className="text-sm font-bold">Indicador 3:</p>
                            <p className="text-sm"> {{ apiResponse.variable1_dimension3_indicador3 ||
                                'No haydatos' }}</p>
                        </td>
                    </tr>
                    <tr className="">
                        <td className="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p className="text-sm font-bold">Problema específico 2</p>
                            <p className="text-sm"> {{ apiResponse.problema_especifico2 || 'No hay datos' }}
                            </p>
                        </td>
                        <td className="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p className="text-sm font-bold">Objetivo específico 2</p>
                            <p className="text-sm">{{ apiResponse.objetivo_especifico2 || 'No hay datos' }}
                            </p>
                        </td>
                        <td className="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p className="text-sm font-bold">Hipótesis específica 2</p>
                            <p className="text-sm"> {{ apiResponse.hipótesis_especifico2 || 'No hay datos'
                                }}
                            </p>
                        </td>
                        <td className="py-2 px-4 border border-gray-300 dark:border-gray-600" rowspan="3">
                            <p className="text-sm font-bold">Variable 02:</p>
                            <p className="text-sm"> {{ apiResponse.variable2 || 'No hay datos' }}</p>
                        </td>
                        <td className="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p className="text-sm font-bold">Dimensión 1</p>
                            <p className="text-sm"> {{ apiResponse.variable2_dimension1 || 'No hay datos' }}
                            </p>
                        </td>
                        <td className="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p className="text-sm font-bold">Indicador 1:</p>
                            <p className="text-sm">{{ apiResponse.variable2_dimension3_indicador1 ||
                                'No hay datos' }} </p>
                            <p className="text-sm font-bold">Indicador 2:</p>
                            <p className="text-sm">{{ apiResponse.variable2_dimension3_indicador2 ||
                                'No hay datos' }} </p>
                            <p className="text-sm font-bold">Indicador 3:</p>
                            <p className="text-sm"> {{ apiResponse.variable2_dimension3_indicador3 ||
                                'No hay datos' }}</p>
                        </td>
                    </tr>
                    <tr className="">
                        <td className="py-2 px-4 border border-gray-300 dark:border-gray-600" rowspan="2">
                            <p className="text-sm font-bold">Problema específico 3</p>
                            <p className="text-sm"> {{ apiResponse.problema_especifico3 || 'No hay datos' }}
                            </p>
                        </td>
                        <td className="py-2 px-4 border border-gray-300 dark:border-gray-600" rowspan="2">
                            <p className="text-sm font-bold">Objetivo específico 3</p>
                            <p className="text-sm"> {{ apiResponse.objetivo_especifico3 || 'No hay datos' }}
                            </p>
                        </td>
                        <td className="py-2 px-4 border border-gray-300 dark:border-gray-600" rowspan="2">
                            <p className="text-sm font-bold">Hipótesis específica 3</p>
                            <p className="text-sm"> {{ apiResponse.hipótesis_especifico3 || 'No hay datos'
                                }}
                            </p>
                        </td>
                        <td className="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p className="text-sm font-bold">Dimensión 2:</p>
                            <p className="text-sm"> {{ apiResponse.variable2_dimension2 || 'No hay datos' }}
                            </p>
                        </td>
                        <td className="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p className="text-sm font-bold">Indicador 1:</p>
                            <p className="text-sm"> {{ apiResponse.variable2_dimension2_indicador1 ||
                                'No hay datos' }} </p>
                            <p className="text-sm font-bold">Indicador 2:</p>
                            <p className="text-sm"> {{ apiResponse.variable2_dimension2_indicador2 ||
                                'No hay datos' }} </p>
                            <p className="text-sm font-bold">Indicador 3:</p>
                            <p className="text-sm">{{ apiResponse.variable2_dimension2_indicador3 ||
                                'No hay datos' }} </p>
                        </td>

                    </tr>
                    <tr className="">

                        <td className="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p className="text-sm font-bold">Dimensión 3: </p>
                            <p className="text-sm"> {{ apiResponse.variable2_dimension3 || 'No hay datos' }}
                            </p>
                        </td>
                        <td className="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p className="text-sm font-bold">Indicador 1:</p>
                            <p className="text-sm">{{ apiResponse.variable2_dimension3_indicador1 ||
                                'No hay datos' }} </p>
                            <p className="text-sm font-bold">Indicador 2:</p>
                            <p className="text-sm">{{ apiResponse.variable2_dimension3_indicador2 ||
                                'No hay datos' }} </p>
                            <p className="text-sm font-bold">Indicador 3:</p>
                            <p className="text-sm"> {{ apiResponse.variable2_dimension3_indicador3 ||
                                'No hay datos' }}</p>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>
</template>

<script setup>
defineProps({
    apiResponse: {
        type: Object,
        required: true
    }
});
</script>