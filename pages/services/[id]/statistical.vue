<template>
    <div class="">
        <div class="">
            <!-- Botón de regreso mejorado -->
            <button @click="goBack"
                class="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors mb-8">
                <UIcon name="i-heroicons-arrow-left" class="w-5 h-5 mr-2" />
                <span class="font-medium">Volver a servicios</span>
            </button>
            <div class="text-center mb-16">
                <h1
                    class="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                    Paquetes por Tipo de Investigación
                </h1>
                <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Asistencia profesional adaptada al diseño metodológico de tu estudio
                </p>
            </div>

            <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div v-for="(paquete, index) in paquetesInvestigacion" :key="paquete.nombre"
                    class="relative group overflow-hidden rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

                    <div class="absolute top-4 right-4 w-12 h-12 rounded-lg flex items-center justify-center text-xl"
                        :class="getColorClasses(index).emojiBg">
                        {{ paquete.emoji }}
                    </div>

                    <div class="p-6">
                        <h3 class="text-xl font-bold mb-2" :class="getColorClasses(index).text">
                            {{ paquete.nombre }}
                        </h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            {{ paquete.descripcion }}
                        </p>

                        <div
                            class="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent my-4">
                        </div>

                        <ul class="space-y-3 text-sm">
                            <li v-for="entregable in paquete.entregables" :key="entregable" class="flex items-start">
                                <div class="flex-shrink-0 mt-1">
                                    <div class="flex items-center justify-center h-4 w-4 rounded-full"
                                        :class="getColorClasses(index).iconBg">
                                        <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <span class="ml-3 text-gray-600 dark:text-gray-300">{{ entregable }}</span>
                            </li>
                        </ul>

                        <div
                            class="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                            <span class="text-2xl font-bold">{{ paquete.precio }}</span>
                            <button @click="contactarWhatsApp(paquete.nombre, paquete.precio)"
                                class="px-4 py-2 text-sm rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.03]"
                                :class="getColorClasses(index).button">
                                Seleccionar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const paquetesInvestigacion = [
    {
        "nombre": "Investigación Descriptiva",
        "descripcion": "Describe características de una población o fenómeno",
        "emoji": "📘",
        "precio": "S/150",
        "entregables": [
            "Recolección y organización de datos",
            "Distribución de frecuencias",
            "Gráficos de barras, circulares",
            "Medidas de tendencia central"
        ]
    },
    {
        "nombre": "Investigación Comparativa",
        "descripcion": "Compara grupos experimentales o cuasi-experimentales",
        "emoji": "📗",
        "precio": "S/250",
        "entregables": [
            "Todo el análisis descriptivo",
            "Pruebas de normalidad y homogeneidad",
            "Prueba t de Student y ANOVA",
            "Pruebas no paramétricas equivalentes"
        ]
    },
    {
        "nombre": "Investigación Correlacional",
        "descripcion": "Analiza relaciones entre variables",
        "emoji": "📙",
        "precio": "S/300",
        "entregables": [
            "Todo el análisis descriptivo",
            "Correlación de Pearson, Spearman",
            "Pruebas de significancia",
            "Gráficos de dispersión"
        ]
    },
    {
        "nombre": "Investigación Explicativa",
        "descripcion": "Analiza relaciones causales o predictivas",
        "emoji": "📕",
        "precio": "S/400",
        "entregables": [
            "Análisis comparativo y correlacional",
            "Diseño de pruebas de hipótesis",
            "Modelos multivariables",
            "Redacción profesional de resultados"
        ]
    }
]

const getColorClasses = (index) => {
    const colors = [
        {   // Azul
            text: 'text-blue-600 dark:text-blue-400',
            emojiBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300',
            iconBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400',
            button: 'bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600'
        },
        {   // Verde
            text: 'text-green-600 dark:text-green-400',
            emojiBg: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300',
            iconBg: 'bg-green-100 dark:bg-green-900/30 text-green-500 dark:text-green-400',
            button: 'bg-green-600 hover:bg-green-700 text-white dark:bg-green-500 dark:hover:bg-green-600'
        },
        {   // Amarillo
            text: 'text-yellow-600 dark:text-yellow-400',
            emojiBg: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-300',
            iconBg: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-500 dark:text-yellow-400',
            button: 'bg-yellow-600 hover:bg-yellow-700 text-white dark:bg-yellow-500 dark:hover:bg-yellow-600'
        },
        {   // Rojo
            text: 'text-red-600 dark:text-red-400',
            emojiBg: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300',
            iconBg: 'bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400',
            button: 'bg-red-600 hover:bg-red-700 text-white dark:bg-red-500 dark:hover:bg-red-600'
        }
    ]
    return colors[index % colors.length]
}

const contactarWhatsApp = (servicio, precio) => {
    const telefono = '51910985938'
    const mensaje = `Hola, estoy interesado en el servicio de ${servicio} (${precio}). ¿Podrías brindarme más información?`
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`
    window.open(url, '_blank')
}

// Función para regresar
const goBack = () => {
    router.push('/services')
}
</script>

<style>
/* Efectos de gradiente y animaciones */
@keyframes float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-5px);
    }
}

.group:hover .float-hover {
    animation: float 3s ease-in-out infinite;
}
</style>