<script setup>
const formData = reactive({
    tituloTentativo: '',
    tipoInvestigacion: [],
    nivelInvestigacion: '',
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

const gradosAcademicos = [
    'Pregrado',
    'Maestría',
    'Doctorado'
]

const submitForm = () => {
    // Crear el mensaje con formato legible
    let mensaje = '📝 Resumen de tu investigación:\n\n';
    mensaje += `🔹 Título tentativo: ${formData.tituloTentativo || 'No especificado'}\n\n`;
    mensaje += `🔹 Tipo(s) de investigación: ${formData.tipoInvestigacion.length > 0
        ? formData.tipoInvestigacion.join(', ')
        : 'No especificado'}\n\n`;
    mensaje += `🔹 Nivel de investigación: ${formData.nivelInvestigacion || 'No especificado'}\n\n`;
    mensaje += `🔹 Grado académico: ${formData.gradoAcademico || 'No especificado'}\n\n`;

    mensaje += '✅ ¡Formulario completado correctamente!';

    alert(mensaje);
}
</script>

<template>
    <div class="max-w-3xl mx-auto">
        <div
            class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50">
            <!-- Form Content -->
            <div class="px-5 py-6 sm:px-6">
                <h1 class="text-xl font-bold text-white mb-1 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                        </path>
                    </svg>
                    DATOS DE INVESTIGACIÓN
                </h1>
                <p class="text-gray-400 text-sm mb-5">Configura los parámetros de tu proyecto</p>

                <!-- Formulario ultracompacto -->
                <div class="space-y-5">

                    <!-- Título -->
                    <div>
                        <label class="block text-xs font-medium text-gray-400 mb-1">TÍTULO TENTATIVO</label>
                        <textarea v-model="formData.tituloTentativo" rows="3"
                            class="w-full p-3 text-sm bg-gray-800/70 border border-gray-700 rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-500 transition-all duration-200"
                            placeholder="Escribe tu tema de investigación..."></textarea>
                    </div>

                    <!-- Tipo de investigación - Versión compacta tipo chips -->
                    <div>
                        <label class="block text-xs font-medium text-gray-400 mb-2">TIPO DE INVESTIGACIÓN</label>
                        <div class="flex flex-wrap gap-2">
                            <div v-for="tipo in tiposInvestigacion" :key="tipo" class="relative">
                                <input :id="`tipo-${tipo}`" v-model="formData.tipoInvestigacion" type="checkbox"
                                    :value="tipo" class="absolute opacity-0 h-0 w-0">
                                <label :for="`tipo-${tipo}`"
                                    class="inline-flex items-center px-3 py-1 text-xs rounded-full border cursor-pointer transition-all"
                                    :class="{
                                        'border-cyan-500 bg-cyan-900/30 text-cyan-400': formData.tipoInvestigacion.includes(tipo),
                                        'border-gray-600 hover:border-gray-500 text-gray-300': !formData.tipoInvestigacion.includes(tipo)
                                    }">
                                    {{ tipo }}
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Nivel de investigación - Versión toggle compacta -->
                    <div>
                        <label class="block text-xs font-medium text-gray-400 mb-2">NIVEL DE INVESTIGACIÓN</label>
                        <div class="grid grid-cols-4 gap-1.5">
                            <div v-for="nivel in nivelesInvestigacion" :key="nivel" class="relative">
                                <input :id="`nivel-${nivel}`" v-model="formData.nivelInvestigacion" type="radio"
                                    :value="nivel" name="nivel-investigacion" class="absolute opacity-0 h-0 w-0">
                                <label :for="`nivel-${nivel}`"
                                    class="block text-center px-2 py-1.5 text-xs rounded-md cursor-pointer transition-all"
                                    :class="{
                                        'bg-cyan-600 text-white shadow-md shadow-cyan-500/20': formData.nivelInvestigacion === nivel,
                                        'bg-gray-700 hover:bg-gray-600 text-gray-300': formData.nivelInvestigacion !== nivel
                                    }">
                                    {{ nivel.slice(0, 4) }}
                                    <span class="hidden sm:inline">{{ nivel.slice(4) }}</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Grado académico - Versión pills horizontal -->
                    <div>
                        <label class="block text-xs font-medium text-gray-400 mb-2">GRADO ACADÉMICO</label>
                        <div class="flex gap-1.5">
                            <div v-for="grado in gradosAcademicos" :key="grado" class="relative flex-1">
                                <input :id="`grado-${grado}`" v-model="formData.gradoAcademico" type="radio"
                                    :value="grado" name="grado-academico" class="absolute opacity-0 h-0 w-0">
                                <label :for="`grado-${grado}`"
                                    class="block text-center px-2 py-1.5 text-xs rounded-md cursor-pointer transition-all truncate"
                                    :class="{
                                        'bg-purple-600 text-white shadow-md shadow-purple-500/20': formData.gradoAcademico === grado,
                                        'bg-gray-700 hover:bg-gray-600 text-gray-300': formData.gradoAcademico !== grado
                                    }">
                                    {{ grado }}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Botón de enviar futurista -->
                <div class="mt-6">
                    <button @click="submitForm" type="button"
                        class="w-full px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg text-white font-medium hover:from-cyan-600/90 hover:to-purple-600/90 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:ring-offset-1 focus:ring-offset-gray-800 transition-all duration-300 flex items-center justify-center">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                        GENERAR MATRIZ
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>