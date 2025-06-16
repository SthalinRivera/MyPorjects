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
            <!-- Contenido -->
            <div
                class="p-3 rounded-lg border-l-4 bg-yellow-50 dark:bg-yellow-900 border-yellow-400 dark:border-yellow-500 shadow-sm">
                <p class="text-sm text-yellow-800 dark:text-yellow-100 text-center font-medium">
                    <span v-if="remainingGenerations > 0">
                        ✨ <span class="font-bold">{{ remainingGenerations }} GENERACIÓN{{ remainingGenerations > 1 ?
                            'ES' : '' }} GRATIS</span> ✨
                        <br>
                        <span class="text-xs font-normal block mt-1">¡Úsala{{ remainingGenerations > 1 ? 's' : '' }}
                            antes que se agote!</span>
                    </span>
                    <span v-else>
                        ⚡ <span class="font-bold">LÍMITE ALCANZADO</span> ⚡
                        <br>
                        <NuxtLink to="/login"
                            class="text-xs underline text-yellow-700 dark:text-yellow-200 hover:text-yellow-900 dark:hover:text-white mt-1 inline-block">
                            Iniciar sesión
                        </NuxtLink>
                    </span>
                </p>
            </div>

            <!-- Modal de Nuxt UI -->
            <UModal v-model="showLoginMessage">
                <div
                    class="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-cyan-400/30 shadow-2xl">
                    <!-- Efecto de partículas futuristas -->
                    <div class="absolute inset-0 opacity-10 pointer-events-none">
                        <div class="absolute top-20 left-20 w-2 h-2 rounded-full bg-cyan-400 animate-pulse"
                            style="animation-delay: 0.3s"></div>
                        <div class="absolute bottom-1/3 right-1/4 w-3 h-3 rounded-full bg-blue-400 animate-pulse"
                            style="animation-delay: 0.7s"></div>
                    </div>

                    <!-- Header con gradiente -->
                    <div class="bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-700 dark:to-blue-800 p-5">
                        <div class="flex justify-between items-center">
                            <div class="flex items-center gap-3">
                                <div class="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                    <UIcon name="i-heroicons-rocket-launch" class="w-6 h-6 text-white" />
                                </div>
                                <h3 class="text-xl font-bold text-white">
                                    {{ remainingGenerations <= 0 ? '¡Límite alcanzado!' : '¡Generaciones disponibles!'
                                    }} </h3>
                            </div>
                            <button @click="showLoginMessage = false"
                                class="text-white/80 hover:text-white transition-colors">
                                <UIcon name="i-heroicons-x-mark-20-solid" class="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <!-- Contenido principal -->
                    <div class="p-6">
                        <!-- Mensaje destacado -->
                        <div
                            class="mb-6 p-4 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                            <div class="flex items-start gap-3">
                                <div class="flex-shrink-0 mt-0.5">
                                    <div
                                        class="w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center">
                                        <UIcon name="i-heroicons-exclamation-circle"
                                            class="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                                    </div>
                                </div>
                                <div>
                                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                        {{ remainingGenerations <= 0 ? 'Has agotado tus generaciones' : `Tienes
                                            ${remainingGenerations} generaciones` }} </h4>
                                            <p class="text-gray-600 dark:text-gray-300">
                                                {{ remainingGenerations <= 0
                                                    ? 'Regístrate para obtener acceso ilimitado y características premium'
                                                    : 'Inicia sesión para no perder tus generaciones restantes' }} </p>
                                </div>
                            </div>
                        </div>

                        <!-- Tarjeta de beneficios -->
                        <div
                            class="mb-6 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl overflow-hidden border border-cyan-100 dark:border-cyan-400/20">
                            <div class="p-4">
                                <h4
                                    class="text-center text-lg font-bold text-cyan-700 dark:text-cyan-300 mb-3 flex items-center justify-center gap-2">
                                    <UIcon name="i-heroicons-sparkles" class="w-5 h-5" />
                                    Beneficios Premium
                                </h4>

                                <ul class="space-y-3">
                                    <li class="flex items-start gap-3">
                                        <UIcon name="i-heroicons-check-badge"
                                            class="w-5 h-5 text-cyan-500 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p class="font-medium text-gray-800 dark:text-gray-200">Generación
                                                ilimitada
                                            </p>
                                            <p class="text-sm text-gray-600 dark:text-gray-400">Crea todas las
                                                matrices
                                                que necesites</p>
                                        </div>
                                    </li>
                                    <li class="flex items-start gap-3">
                                        <UIcon name="i-heroicons-check-badge"
                                            class="w-5 h-5 text-cyan-500 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p class="font-medium text-gray-800 dark:text-gray-200">Resultados
                                                mejorados
                                            </p>
                                            <p class="text-sm text-gray-600 dark:text-gray-400">Calidad profesional
                                                en
                                                cada generación</p>
                                        </div>
                                    </li>
                                    <li class="flex items-start gap-3">
                                        <UIcon name="i-heroicons-check-badge"
                                            class="w-5 h-5 text-cyan-500 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p class="font-medium text-gray-800 dark:text-gray-200">Soporte
                                                prioritario
                                            </p>
                                            <p class="text-sm text-gray-600 dark:text-gray-400">Ayuda rápida cuando
                                                la
                                                necesites</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <!-- Botones de acción -->
                        <div class="grid grid-cols-1 gap-3">
                            <UButton to="/login" color="cyan" variant="solid" size="lg"
                                class="justify-center shadow-lg hover:shadow-cyan-500/20 transition-all"
                                icon="i-heroicons-arrow-right-on-rectangle"
                                :label="remainingGenerations <= 0 ? 'Iniciar sesión para desbloquear' : 'Iniciar sesión para guardar tus generaciones'" />

                            <UButton to="/login" color="white" variant="outline" size="lg"
                                class="justify-center border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                icon="i-heroicons-user-plus" label="Crear cuenta gratuita" />
                        </div>

                        <!-- Mensaje adicional -->
                        <p class="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
                            Sin compromisos, cancela cuando quieras
                        </p>
                    </div>

                    <!-- Efecto de gradiente inferior -->
                    <div
                        class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">
                    </div>
                </div>
            </UModal>


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
import { PROMPT_TITLE } from './PROMPT_TITLE';
import { PROMPT_OPERALIZACION_VARIABLES } from './PROMPT_OPERALIZACION_VARIABLES';
import { saveAs } from 'file-saver';
import MatrixTable from './MatrixTable.vue';
import SkeletonTableOperalizacion from '~/components/UI/Skeleton/SkeletonTableOperalizacion.vue';
const route = useRoute()
const router = useRouter()
const { loggedIn, user, clear } = useUserSession()
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



// Estado para contar generaciones
const generationCount = ref(0);
const maxFreeGenerations = 2;

// Computar generaciones restantes
const remainingGenerations = computed(() => {
    return loggedIn.value ? Infinity : maxFreeGenerations - generationCount.value;
});
// Verificar generaciones guardadas al cargar el componente
onMounted(() => {
    const savedCount = localStorage.getItem('freeGenerationCountOoperationVariable');
    generationCount.value = savedCount ? parseInt(savedCount) : 0;
});

// Modificar el método improveTitle para incluir la verificación
const improveTitle = async () => {
    if (!inputValue.value.trim()) {
        $toast.error("Por favor ingrese un tema de investigación");
        return;
    }



    // Verificar límite para usuarios no logueados
    if (!loggedIn.value && generationCount.value >= maxFreeGenerations) {
        showLoginMessage.value = true; // Mostrar modal cuando se alcance el límite
        $toast.error("Has alcanzado tu límite de generaciones. Por favor inicia sesión para continuar.");
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

        // Incrementar contador solo si el usuario no está logueado
        if (!loggedIn.value) {
            generationCount.value++;
            localStorage.setItem('freeGenerationCountOoperationVariable', generationCount.value);

            // Mostrar modal si alcanzó el límite después de esta generación
            if (generationCount.value >= maxFreeGenerations) {
                showLoginMessage.value = true;
            }
        }

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