<template>
    <div class="">

        <!-- Botón de regreso mejorado -->
        <button @click="goBack"
            class="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors mb-8">
            <UIcon name="i-heroicons-arrow-left" class="w-5 h-5 mr-2" />
            <span class="font-medium">Volver a servicios</span>
        </button>
        <div class="">
            <div class="text-center ">
                <h1
                    class="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                    Elaboración de tesis profesionales
                </h1>
                <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Elaboración de tesis profesionales para estudiantes de pregrado en diversas carreras universitarias.
                </p>
            </div>

            <div class="">
                <section v-for="(serviceData, serviceKey) in servicios" :key="serviceKey"
                    class="relativerounded-xl   overflow-hidden">

                    <div class="p-2">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                            <div>
                                <h2
                                    class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                                    {{ serviceData.nombre }}
                                </h2>

                                <p class="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                                    {{ serviceData.descripcion }}
                                </p>
                            </div>

                        </div>

                        <div class="grid md:grid-cols-2 gap-5">
                            <div v-for="(paquete, index) in serviceData.paquetes" :key="index"
                                class="bg-gradient-to-br from-white/50 to-white/0 dark:from-gray-700/50 dark:to-gray-700/0 rounded-lg border border-gray-200 dark:border-gray-700 p-5 transition-all hover:-translate-y-1 hover:shadow-md">

                                <div class="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 class="font-bold text-gray-800 dark:text-white">{{ paquete.nombre }}</h3>
                                        <p class="text-blue-600 dark:text-blue-400 font-medium">
                                            {{ paquete.precio }} {{ paquete.moneda }}
                                            <span v-if="paquete.duracion.includes('hora')" class="text-xs">/hora</span>
                                        </p>
                                    </div>
                                    <span
                                        class="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs px-2 py-1 rounded-full">
                                        {{ paquete.duracion }}
                                    </span>
                                </div>

                                <div
                                    class="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent my-3">
                                </div>

                                <ul class="space-y-2 mb-4 text-xs md:text-sm">
                                    <li v-for="(entregable, i) in paquete.entregables" :key="i"
                                        class="flex items-start">
                                        <div class="flex-shrink-0 mt-1 mr-2">
                                            <div
                                                class="h-3 w-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 flex items-center justify-center">
                                                <svg class="h-2 w-2" fill="none" viewBox="0 0 24 24"
                                                    stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="3" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        </div>
                                        <span class="text-gray-600 dark:text-gray-300">{{ entregable }}</span>
                                    </li>
                                </ul>

                                <div
                                    class="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                    <span class="text-2xl font-bold">S/. {{ paquete.precio }}</span>
                                    <button @click="contactarWhatsApp(paquete.nombre, paquete.precio)"
                                        class="px-4 py-2 text-sm rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.03]"
                                        :class="getColorClasses(index).button">
                                        Seleccionar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script setup>

const route = useRoute()
const router = useRouter()
const servicios = {
    "ciencias_empresariales": {
        "nombre": "Ciencias Empresariales",
        "descripcion": "Asesoría para Administración, Contabilidad, Marketing y Negocios",
        "paquetes": [
            {
                "nombre": "Proyecto de tesis",
                "precio": 500,
                "moneda": "PEN",
                "duracion": "4 semanas",
                "entregables": [
                    "Formulación del problema",
                    "Objetivos generales y específicos",
                    "Marco teórico básico",
                    "Diseño metodológico",
                    "Cronograma de trabajo",
                    "Anexos documentarios"
                ]
            },
            {
                "nombre": "Tesis Completa",
                "precio": 2000,
                "moneda": "PEN",
                "duracion": "10-12 semanas",
                "entregables": [
                    "Proyecto completo (5 capítulos)",
                    "Marco teórico con 50+ referencias",
                    "Instrumentos validados",
                    "Trabajo de campo",
                    "Análisis estadístico",
                    "3 revisiones posteriores"
                ]
            }
        ]
    },
    "ingenierias": {
        "nombre": "Ingenierías",
        "descripcion": "Asesoría técnica para Sistemas, Industrial, Civil y Mecánica",
        "paquetes": [
            {
                "nombre": "Proyecto de Tesis",
                "precio": 700,
                "moneda": "PEN",
                "duracion": "5 semanas",
                "entregables": [
                    "Planteamiento del problema",
                    "Estado del arte",
                    "Especificaciones técnicas",
                    "Metodología",
                    "Diagramas preliminares"
                ]
            },
            {
                "nombre": "Desarrollo Completo",
                "precio": 3500,
                "moneda": "PEN",
                "duracion": "14-16 semanas",
                "entregables": [
                    "Prototipo funcional",
                    "Documentación técnica",
                    "Pruebas de laboratorio",
                    "Análisis de resultados",
                    "Soporte post-sustentación"
                ]
            }
        ]
    }
}
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
    router.push('/services/')
}
</script>