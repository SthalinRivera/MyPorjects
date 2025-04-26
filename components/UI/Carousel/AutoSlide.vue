<template>
    <div class="relative w-full overflow-hidden h-64 md:h-80">
        <!-- Contenedor principal -->
        <div class="relative h-full flex items-center">
            <!-- Slides -->
            <div v-for="(slide, index) in slides" :key="index"
                class="absolute h-full transition-all duration-500 ease-in-out flex" :style="{
                    width: `${slideWidth}%`,
                    left: `${getSlidePosition(index)}%`,
                    zIndex: currentSlide === index ? 30 : 20,
                    opacity: currentSlide === index ? 1 : 0.7
                }">
                <!-- Contenido del slide -->
                <div class="h-full w-full flex items-center justify-center px-4" :class="slide.bgColor">
                    <div class="text-center max-w-md">
                        <h3 class="text-2xl md:text-4xl font-bold mb-2">{{ slide.discount }}</h3>
                        <p class="text-lg md:text-2xl mb-6">{{ slide.title }}</p>
                        <button class="bg-white px-6 py-2 rounded-full font-semibold transition-colors"
                            :class="slide.textColor">
                            {{ slide.cta }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Flechas de navegación -->
        <button @click="prevSlide"
            class="absolute left-2 top-1/2 -translate-y-1/2 z-40 bg-white bg-opacity-80 rounded-full p-2 shadow-lg">
            <i class="ri-arrow-left-s-line text-2xl text-gray-700"></i>
        </button>
        <button @click="nextSlide"
            class="absolute right-2 top-1/2 -translate-y-1/2 z-40 bg-white bg-opacity-80 rounded-full p-2 shadow-lg">
            <i class="ri-arrow-right-s-line text-2xl text-gray-700"></i>
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const slides = ref([
    {
        discount: 'UP TO 60% OFF',
        title: 'FOR ALL TRAVEL BAGGAGE',
        cta: 'SHOP NOW',
        bgColor: 'bg-blue-600',
        textColor: 'text-blue-600'
    },
    {
        discount: 'UP TO 50% OFF',
        title: 'FOR ALL TRY',
        cta: 'SHOP NOW',
        bgColor: 'bg-green-500',
        textColor: 'text-green-500'
    },
    {
        discount: 'UP TO 70% OFF',
        title: 'SUMMER COLLECTION',
        cta: 'DISCOVER',
        bgColor: 'bg-red-500',
        textColor: 'text-red-500'
    }
])

const currentSlide = ref(1) // Empezar con el slide central
const slideWidth = 80 // Ancho de cada slide en porcentaje
let intervalId: number | null = null

const getSlidePosition = (index: number) => {
    const offset = (100 - slideWidth) / 2
    return (index - currentSlide.value) * slideWidth + offset
}

const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % slides.value.length
    resetInterval()
}

const prevSlide = () => {
    currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length
    resetInterval()
}

const goToSlide = (index: number) => {
    currentSlide.value = index
    resetInterval()
}

const startInterval = () => {
    intervalId = window.setInterval(nextSlide, 2000)
}

const resetInterval = () => {
    if (intervalId) {
        clearInterval(intervalId)
    }
    startInterval()
}

onMounted(() => {
    startInterval()
})

onBeforeUnmount(() => {
    if (intervalId) {
        clearInterval(intervalId)
    }
})
</script>

<style scoped>
/* Efecto de transición suave */
.slide-enter-active,
.slide-leave-active {
    transition: all 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>