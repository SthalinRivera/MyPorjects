<template>
    <div class="min-h-screen ">

        <!-- Botón de regreso mejorado -->
        <button @click="goBack"
            class="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors mb-8">
            <UIcon name="i-heroicons-arrow-left" class="w-5 h-5 mr-2" />
            <span class="font-medium">Volver a Herramientas</span>
        </button>
        <div class="max-w-6xl mx-auto">
            <div class="text-center my-6">
                <div class="flex justify-center items-center gap-3">
                    <Workflow class="w-10 h-10 text-gray-700 dark:text-gray-300" />
                    <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100">
                        Operalización de Variables
                    </h1>
                </div>
                <p class="mt-2 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Genera una operalización de variables completa para tu investigación académica.
                </p>
            </div>


            <!-- Futuristic AI Research Generator - Dual Theme -->
            <div class=" m-2 rounded-xl shadow-2xl overflow-hidden 
            bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800
            border border-gray-200 dark:border-gray-700/50 transition-colors duration-300">


                <!-- Main Form Content -->
                <div class="p-5">
                    <!-- Glowing Textarea with Compact Design -->
                    <div class="relative mb-5 group">
                        <label
                            class="block text-xs font-semibold mb-1.5 text-gray-500 dark:text-gray-400 uppercase tracking-wider">TEMA
                            DE INVESTIGACIÓN</label>
                        <textarea v-model="inputValue" rows="3" class="w-full p-3 text-sm rounded-xl border border-gray-300 dark:border-gray-600
                       focus:ring-2  focus:border-transparent
                       bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm
                       text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500
                       transition-all duration-200 shadow-sm group-hover:shadow-md"
                            placeholder="Ej: Inteligencia artificial, educación, rendimiento académico..."></textarea>

                    </div>

                    <!-- Compact Research Type Chips (radio) -->
                    <div class="mb-4">
                        <label
                            class="block text-xs font-semibold mb-2 text-gray-500 dark:text-gray-400 uppercase tracking-wider">TIPO</label>
                        <div class="flex flex-wrap gap-1.5">
                            <template v-for="tipo in tiposInvestigacion" :key="tipo">
                                <input :id="`tipo-${tipo}`" v-model="formData.tipoInvestigacion" type="radio"
                                    :value="tipo" class="hidden">
                                <label :for="`tipo-${tipo}`" class="px-2.5 py-1 text-xs rounded-full border cursor-pointer transition-all
                                  bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/80
                                  border-gray-300 dark:border-gray-600
                                  text-gray-700 dark:text-gray-300
                                  flex items-center" :class="{
                                    '!bg-cyan-100/80 !border-cyan-400 !text-cyan-800 dark:!bg-cyan-900/50 dark:!border-cyan-500 dark:!text-cyan-200':
                                        formData.tipoInvestigacion === tipo
                                }">
                                    <span class="w-2 h-2 rounded-full mr-1.5 bg-current opacity-70"></span>
                                    {{ tipo }}
                                </label>
                            </template>
                        </div>
                    </div>

                    <!-- Ultra-Compact Research Level Toggle (Radio) -->
                    <div class="mb-5">
                        <label
                            class="block text-xs font-semibold mb-2 text-gray-500 dark:text-gray-400 uppercase tracking-wider">NIVEL</label>
                        <div class="flex flex-wrap gap-1.5">
                            <template v-for="nivel in nivelesInvestigacion" :key="nivel">
                                <input :id="`nivel-${nivel}`" v-model="formData.nivelInvestigacion" type="radio"
                                    :value="nivel" name="nivel" class="hidden">
                                <label :for="`nivel-${nivel}`" class="px-2.5 py-1 text-xs rounded-full border cursor-pointer transition-all
                                  bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/80
                                  border-gray-300 dark:border-gray-600
                                  text-gray-700 dark:text-gray-300
                                  flex items-center" :class="{
                                    '!bg-cyan-100/80 !border-cyan-400 !text-cyan-800 dark:!bg-cyan-900/50 dark:!border-cyan-500 dark:!text-cyan-200':
                                        formData.nivelInvestigacion === nivel
                                }">
                                    {{ nivel }}
                                </label>
                            </template>
                        </div>
                    </div>

                    <!-- Holographic Action Buttons -->
                    <div class="flex justify-center gap-3 mt-6">
                        <!-- Generate Button -->
                        <button @click="improveTitle" :disabled="stage !== 'idle' || !inputValue.trim()" class="relative px-6 py-2.5 rounded-xl text-sm font-medium
                           bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-600 dark:to-blue-700
                           text-white hover:shadow-lg
                           focus:outline-none focus:ring-2 focus:ring-cyan-400/50
                           transition-all duration-300 overflow-hidden
                           disabled:opacity-60 disabled:cursor-not-allowed group" style="min-width: 140px">

                            <!-- Animated Shimmer Effect -->
                            <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                            opacity-0 group-hover:opacity-100 animate-[shimmer_1.5s_infinite]"></span>

                            <span class="relative z-10 flex items-center justify-center">
                                <template v-if="stage === 'improving-title' || stage === 'generating-matrix'">
                                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"
                                            fill="none" stroke-dasharray="31.4, 10" class="opacity-50"></circle>
                                        <path fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                        </path>
                                    </svg>
                                    {{ stage === 'improving-title' ? 'Analizando...' : 'Generando...' }}
                                </template>
                                <template v-else>
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                    </svg>
                                    Generar
                                </template>
                            </span>
                        </button>

                        <!-- Reset Button -->
                        <button @click="resetForm"
                            :disabled="stage === 'improving-title' || stage === 'generating-matrix'" class="px-5 py-2.5 rounded-xl text-sm font-medium
                           bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-600/90
                           border border-gray-300 dark:border-gray-600
                           text-gray-700 dark:text-gray-300
                           focus:outline-none focus:ring-2 focus:ring-gray-400/30
                           transition-all duration-300
                           disabled:opacity-50 disabled:cursor-not-allowed flex items-center">
                            <svg class="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                                </path>
                            </svg>
                            Reiniciar
                        </button>
                    </div>

                    <!-- Digital Status Display -->
                    <div v-if="generationTime > 0" class="mt-4 text-center">
                        <div class="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono
                        bg-gray-200/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700
                        text-cyan-700 dark:text-cyan-400">
                            <span class="w-2 h-2 rounded-full bg-cyan-500 mr-2 animate-pulse"></span>
                            PROCESADO_EN: {{ (generationTime / 1000).toFixed(2) }}s
                        </div>
                    </div>
                </div>
            </div>
            <!-- Improved Title -->
            <div v-if="stage === 'improving-title'"
                class="mt-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
                <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4 mx-auto"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
            </div>

            <div v-if="improvedTitle" class="mt-6 max-w-4xl mx-auto text-center">
                <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">
                    Título mejorado:
                </h2>
                <p class="text-xl text-blue-600 dark:text-blue-400 mt-2">
                    {{ improvedTitle }}
                </p>
            </div>

            <!-- Matrix Skeleton -->
            <div v-if="stage === 'generating-matrix'" class="mt-8 max-w-6xl mx-auto space-y-4">
                <SkeletonTableOperalizacion />
            </div>

            <!-- Generated Matrix -->
            <div v-if="apiResponse && stage === 'completed'" class="mt-8 max-w-6xl mx-auto">
                <div class="flex justify-end gap-2 mb-4">
                    <button @click="downloadPDF"
                        class="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Descargar PDF
                    </button>

                </div>

                <div id="matriz-consistencia-table"
                    class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">

                    <!-- Solo muestra si hay variables -->
                    <MatrixTable v-if="apiResponse.variables.length > 0" :variables="apiResponse.variables" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import log from '~/server/middleware/log';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import { saveAs } from 'file-saver';
import MatrixTable from './MatrixTable.vue';
import SkeletonTableOperalizacion from '~/components/UI/Skeleton/SkeletonTableOperalizacion.vue';
const route = useRoute()
const router = useRouter()

const { $toast } = useNuxtApp();
// Función para regresar
const goBack = () => {
    router.push('/tools')
}
// State
const inputValue = ref('Turismo Alternativo y Turismo Comunitario en la Provincia de Cañete, 2025');
const improvedTitle = ref('');
const apiResponse = ref({ variables: [] })

const stage = ref('idle'); // 'idle', 'improving-title', 'generating-matrix', 'completed'
const generationTime = ref(0);
const formData = reactive({
    tipoInvestigacion: 'Básica',
    nivelInvestigacion: 'Descriptiva',
    gradoAcademico: ''
})

const tiposInvestigacion = [
    'Básica',
    'Aplicada',
    'Tecnológica',
    'Documental',
]

const nivelesInvestigacion = [
    'Descriptiva',
    'Correlacional',
    'Explicativa',
    'Exploratoria'
]

// Prompts
const PROMPT_TITLE = `
Eres un experto en metodología de la investigación. Tu tarea es descomponer la variable proporcionada en dos variables principales, siguiendo estas pautas:

1. Cada variable debe ser clara, concisa y específica.  
2. Deben reflejar adecuadamente el contenido de la investigación.  
3. Utiliza un lenguaje académico y formal.  

Ejemplo de entrada: "Comercio Electrónico  y proceso de ventas en la empresa Mass sac"  
Ejemplo de salida:  
- Comercio Electrónico  
- proceso de ventas en la empresa Mass sac

IMPORTANTE:  
- Devuelve ÚNICAMENTE dos variables.  
- No incluyas explicaciones, comentarios ni texto adicional.  
- El formato debe ser exclusivamente dos nombres de variables en texto plano.  

Ahora, por favor descompón la siguiente variable en dos principales:

`;

const PROMPT_OPERALIZACION_VARIABLES = `
Eres un asistente que genera datos en formato JSON estricto para operacionalización de variables. Usa EXACTAMENTE esta estructura:
 Mínimo 2 variables, cada una con 3 dimensiones, y cada dimensión con al menos 3 indicadores

Ejemplo: 
{
    "variables": [
        {
            "nombre": "Satisfacción Laboral",
            "definicion_operacional": "Grado en que los empleados se sienten satisfechos con su trabajo.",
            "dimensiones": [
                {
                    "nombre": "Satisfacción Intrínseca",
                    "indicadores": [
                        {
                            "nombre": "Nivel de satisfacción con tareas del puesto",
                            "items_formula": "Preguntas sobre disfrute de tareas y realización personal (1-5)",
                            "instrumento_escala": "Cuestionario de satisfacción laboral. Escala Likert (1-5)"
                        }
                    ]
                },
                {
                    "nombre": "Satisfacción Extrínseca",
                    "indicadores": [
                        {
                            "nombre": "Satisfacción con el salario y condiciones",
                            "items_formula": "Preguntas sobre satisfacción con salario, ambiente y beneficios (1-5)",
                            "instrumento_escala": "Cuestionario de satisfacción laboral. Escala Likert (1-5)"
                        }
                    ]
                }
            ]
        },
        {
            "nombre": "Productividad",
            "definicion_operacional": "Rendimiento del empleado en la realización de tareas laborales.",
            "dimensiones": [
                {
                    "nombre": "Eficiencia",
                    "indicadores": [
                        {
                            "nombre": "Tareas realizadas en tiempo y forma",
                            "items_formula": "Medición de cantidad de tareas completadas por semana.",
                            "instrumento_escala": "Registro de tareas completadas. Escala numérica"
                        }
                    ]
                },
                {
                    "nombre": "Eficacia",
                    "indicadores": [
                        {
                            "nombre": "Calidad del trabajo realizado",
                            "items_formula": "Evaluación del supervisor sobre la calidad de trabajo (1-5)",
                            "instrumento_escala": "Evaluación del desempeño del supervisor. Escala Likert (1-5)"
                        }
                    ]
                }
            ]
        },
        {
            "nombre": "Motivación Laboral",
            "definicion_operacional": "Nivel de compromiso y energía con la que un empleado desempeña sus funciones.",
            "dimensiones": [
                {
                    "nombre": "Motivación Intrínseca",
                    "indicadores": [
                        {
                            "nombre": "Interés en el desarrollo profesional y personal",
                            "items_formula": "Preguntas sobre el deseo de crecer en el trabajo (1-5)",
                            "instrumento_escala": "Cuestionario de motivación laboral. Escala Likert (1-5)"
                        }
                    ]
                },
                {
                    "nombre": "Motivación Extrínseca",
                    "indicadores": [
                        {
                            "nombre": "Incentivos económicos y reconocimiento externo",
                            "items_formula": "Preguntas sobre la importancia del salario y reconocimiento (1-5)",
                            "instrumento_escala": "Cuestionario de motivación laboral. Escala Likert (1-5)"
                        }
                    ]
                }
            ]
        }
    ]
}

El formato JSON debe ser exactamente como en este ejemplo:
{
    "variables": [
        {
            "nombre": "...",
            "definicion_operacional": "...",
            "dimensiones": [
                {
                    "nombre": "...",
                    "indicadores": [
                        {
                            "nombre": "...",
                            "items_formula": "...",
                            "instrumento_escala": "..."
                        }
                    ]
                },
                {
                    "nombre": "...",
                    "indicadores": [
                        {
                            "nombre": "...",
                            "items_formula": "...",
                            "instrumento_escala": "..."
                        }
                    ]
                }
            ]
        },
        {
            "nombre": "...",
            "definicion_operacional": "...",
            "dimensiones": [
                {
                    "nombre": "...",
                    "indicadores": [
                        {
                            "nombre": "...",
                            "items_formula": "...",
                            "instrumento_escala": "..."
                        }
                    ]
                },
                {
                    "nombre": "Eficacia",
                    "indicadores": [
                        {
                            "nombre": "...",
                            "items_formula": "...",
                            "instrumento_escala": "..."
                        }
                    ]
                }
            ]
        },
        {
            "nombre": "...",
            "definicion_operacional": "...",
            "dimensiones": [
                {
                    "nombre": "...",
                    "indicadores": [
                        {
                            "nombre": "...",
                            "items_formula": "...",
                            "instrumento_escala": "..."
                        }
                    ]
                },
                {
                    "nombre": "...",
                    "indicadores": [
                        {
                            "nombre": "...",
                            "items_formula": "...",
                            "instrumento_escala": "..."
                        }
                    ]
                }
            ]
        }
    ]
}
`;

// Métodos actualizados
const improveTitle = async () => {
    if (!inputValue.value.trim()) {
        $toast.error("Por favor ingrese un tema de investigación");
        return;
    }

    try {
        stage.value = 'improving-title';
        const startTime = performance.now();

        const response = await $fetch('/api/title', {
            method: 'POST',
            body: {
                prompt: PROMPT_TITLE,
                input: inputValue.value
            }
        });

        if (!response.content) {
            throw new Error("No se recibió respuesta del servidor");
        }

        const endTime = performance.now();
        generationTime.value = endTime - startTime;

        improvedTitle.value = response.content;
        await generateMatrix(improvedTitle.value);

    } catch (error) {
        console.error('Error:', error);
        $toast.error("Error al mejorar el título: " + error.message);
        stage.value = 'idle';
    }
};

const generateMatrix = async (title) => {
    try {
        stage.value = 'generating-matrix';
        const startTime = performance.now();
        // Incluye el tipo y nivel de investigación en el prompt
        const fullPrompt = `${PROMPT_OPERALIZACION_VARIABLES}\n\nTipo de investigación: ${formData.tipoInvestigacion}\nNivel de investigación: ${formData.nivelInvestigacion}`;
        const response = await $fetch('/api/generate-matrix', {
            method: 'POST',
            body: {
                prompt: fullPrompt,
                input: title
            }
        });

        if (!response.content) {
            throw new Error("No se recibió respuesta del servidor");
        }
        console.log(response.content);

        const endTime = performance.now();
        generationTime.value = endTime - startTime;

        // Parsear la respuesta JSON
        try {
            apiResponse.value = JSON.parse(response.content);
            stage.value = 'completed';
            $toast.success("Matriz generada con éxito!");
        } catch (parseError) {
            throw new Error("Error al parsear la respuesta JSON: " + parseError.message);
        }

    } catch (error) {
        console.error('Error:', error);
        $toast.error("Error al generar la matriz: " + error.message);
        stage.value = 'idle';
    }
};

const resetForm = () => {
    inputValue.value = '';
    improvedTitle.value = '';
    apiResponse.value = null;
    stage.value = 'idle';
    generationTime.value = 0;
};

const downloadPDF = async () => {
    try {
        $toast.info("Generando PDF, por favor espere...");

        // 1. Clonar la tabla para manipularla sin afectar la vista
        const originalTable = document.getElementById('matriz-consistencia-table');
        const clonedTable = originalTable.cloneNode(true);

        // 2. Ajustar estilos para mejor renderizado en PDF
        clonedTable.style.width = '100%';
        clonedTable.style.borderCollapse = 'collapse';

        // 3. Asegurar que todos los bordes sean visibles
        const allCells = clonedTable.querySelectorAll('th, td');
        allCells.forEach(cell => {
            cell.style.border = '1px solid #000';
            cell.style.padding = '8px';
        });

        // 4. Crear un contenedor temporal para la tabla clonada
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.style.width = '1200px'; // Ancho fijo para mejor renderizado
        tempContainer.appendChild(clonedTable);
        document.body.appendChild(tempContainer);

        // 5. Configurar html2canvas con opciones mejoradas
        const canvas = await html2canvas(clonedTable, {
            scale: 2,
            logging: false,
            useCORS: true,
            backgroundColor: '#ffffff',
            scrollX: 0,
            scrollY: 0,
            windowWidth: 1200,
            width: 1200
        });

        // 6. Eliminar el contenedor temporal
        document.body.removeChild(tempContainer);

        // 7. Configurar el PDF en orientación landscape (horizontal)
        const pdf = new jsPDF('l', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
        const pdfWidth = pdf.internal.pageSize.getWidth() - 20; // Margen de 10mm cada lado
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        // 8. Ajustar la imagen al tamaño de la página
        if (pdfHeight > pdf.internal.pageSize.getHeight()) {
            // Si es demasiado alto, ajustar manteniendo proporciones
            const adjustedHeight = pdf.internal.pageSize.getHeight() - 20;
            const adjustedWidth = (canvas.width * adjustedHeight) / canvas.height;
            pdf.addImage(imgData, 'PNG', 10, 10, adjustedWidth, adjustedHeight);
        } else {
            pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth, pdfHeight);
        }

        // 9. Guardar el PDF
        pdf.save(`matriz-consistencia-${new Date().toISOString().slice(0, 10)}.pdf`);
        $toast.success("PDF descargado con éxito!");
    } catch (error) {
        console.error('Error generating PDF:', error);
        $toast.error("Error al generar el PDF: " + error.message);
    }
};

</script>