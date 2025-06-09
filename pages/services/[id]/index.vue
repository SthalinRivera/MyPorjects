<template>
    <div class="">
        <!-- Botón de regreso mejorado -->
        <button @click="goBack"
            class="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors mb-8">
            <UIcon name="i-heroicons-arrow-left" class="w-5 h-5 mr-2" />
            <span class="font-medium">Volver a servicios</span>
        </button>

        <!-- Contenedor principal del servicio -->
        <div v-if="service"
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl">
            <!-- Encabezado con gradiente -->
            <div
                class="px-8 py-6 bg-gradient-to-r from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 flex items-center justify-between rounded-tl-2xl rounded-tr-2xl">
                <div class="flex items-center">
                    <span class="text-4xl mr-4">{{ service.icon }}</span>
                    <div>
                        <h1 class="text-3xl font-bold text-slate-800 dark:text-slate-100">{{ service.name }}</h1>
                        <p class="text-slate-800 dark:text-slate-100">{{ service.subtitle }}</p>
                    </div>
                </div>
            </div>

            <!-- Contenido del servicio -->
            <div class="p-6 md:p-8">
                <div class="grid lg:grid-cols-3 gap-8">
                    <!-- Columna principal (2/3) -->
                    <div class="lg:col-span-2 space-y-8">
                        <!-- Descripción -->
                        <div>
                            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                                <UIcon name="i-heroicons-document-text" class="w-6 h-6 mr-2"
                                    :class="`text-${service.color}-500`" />
                                Descripción del servicio
                            </h2>
                            <p class="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{{ service.description
                                }}</p>
                        </div>

                        <!-- Características -->
                        <div>
                            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                                <UIcon name="i-heroicons-check-badge" class="w-6 h-6 mr-2"
                                    :class="`text-${service.color}-500`" />
                                Lo que incluye
                            </h2>
                            <ul class="space-y-3">
                                <li v-for="feature in service.features" :key="feature"
                                    class="flex items-start bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                                    <UIcon name="i-heroicons-check-circle" class="mt-0.5 mr-3 flex-shrink-0"
                                        :class="`text-${service.color}-500 text-xl`" />
                                    <span class="text-gray-700 dark:text-gray-300 text-lg">{{ feature }}</span>
                                </li>
                            </ul>
                        </div>

                        <!-- Detalles adicionales -->
                        <div v-if="service.additionalDetails"
                            class="bg-gradient-to-r from-gray-50 to-white dark:from-gray-700/50 dark:to-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                            <h3 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center">
                                <UIcon name="i-heroicons-information-circle" class="w-5 h-5 mr-2"
                                    :class="`text-${service.color}-500`" />
                                Información importante
                            </h3>
                            <p class="text-gray-600 dark:text-gray-300">{{ service.additionalDetails }}</p>
                        </div>
                    </div>

                    <!-- Columna lateral (1/3) -->
                    <div class="space-y-6">
                        <!-- Card de contacto -->
                        <div
                            class="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600 sticky top-6">
                            <h3 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
                                <UIcon name="i-heroicons-currency-dollar" class="w-5 h-5 mr-2"
                                    :class="`text-${service.color}-500`" />
                                Inversión requerida
                            </h3>

                            <div class="mb-6">
                                <p class="text-4xl font-bold mb-2" :class="`text-${service.color}-500`">{{ service.price
                                    }}</p>
                                <p v-if="service.priceNote" class="text-sm text-gray-500 dark:text-gray-400">{{
                                    service.priceNote }}</p>
                            </div>

                            <!-- Botón de WhatsApp -->
                            <a :href="`https://wa.me/51910985938?text=Hola, estoy interesado en el servicio de ${service.name}`"
                                target="_blank"
                                class="w-full flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg"
                                :class="`bg-green-500 hover:bg-green-600`">
                                <UIcon name="i-heroicons-chat-bubble-bottom-center-text" class="w-5 h-5 mr-2" />
                                Contactar por WhatsApp
                            </a>

                            <div class="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                Respuesta en menos de 24 horas
                            </div>
                        </div>

                        <!-- Servicios relacionados -->
                        <div
                            class="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                            <h3 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                                <UIcon name="i-heroicons-puzzle-piece" class="w-5 h-5 mr-2"
                                    :class="`text-${service.color}-500`" />
                                Servicios relacionados
                            </h3>
                            <ul class="space-y-3">
                                <li v-for="related in relatedServices" :key="related.id">
                                    <NuxtLink :to="`/services/${related.id}`"
                                        class="flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-600 group">
                                        <span class="text-2xl mr-3">{{ related.icon }}</span>
                                        <div>
                                            <h4
                                                class="font-medium group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                                                {{ related.name }}</h4>
                                            <p class="text-sm text-gray-500 dark:text-gray-400">{{ related.subtitle }}
                                            </p>
                                        </div>
                                    </NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import servicesData from './../services.json'

const route = useRoute()
const router = useRouter()

// Encontrar el servicio actual por ID
const service = computed(() => {
    return servicesData.find(s => s.id === route.params.id)
})

// Servicios relacionados (excluyendo el actual)
const relatedServices = computed(() => {
    if (!service.value) return []
    return servicesData
        .filter(s => s.id !== route.params.id && s.category === service.value.category)
        .slice(0, 3)
})

// Función para regresar
const goBack = () => {
    router.push('/services')
}

// SEO dinámico
useHead({
    title: () => service.value ? `${service.value.name} | Nuestros Servicios` : 'Servicio no encontrado',
    meta: [
        {
            name: 'description',
            content: () => service.value ? service.value.description : 'El servicio que buscas no está disponible'
        }
    ]
})
</script>

<style scoped></style>