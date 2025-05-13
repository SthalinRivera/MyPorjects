<template>
    <div class="relative w-full h-[120px] md:h-[500px] mx-auto overflow-x-hidden">
        <!-- Contenedor principal -->
        <div class="relative h-full flex items-center">
            <!-- Slides -->
            <div v-for="(slide, index) in visibleSlides" :key="`${slide.id}-${index}`"
                class="absolute transition-all duration-500 ease-in-out flex items-center justify-center" :style="{
                    width: `${SLIDE_WIDTH}%`,
                    height: '100%',
                    left: getSlidePosition(index),
                    zIndex: getZIndex(index),
                    opacity: getOpacity(index)
                }">
                <!-- Contenido del slide -->
                <div class="h-full w-full relative overflow-hidden group" @click="handleSlideClick(index)">
                    <img :src="slide.image" :alt="slide.title" class="w-full h-full object-contain">
                </div>
            </div>
        </div>

        <!-- Indicadores simplificados -->
        <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 z-50">
            <button v-for="(_, i) in originalSlides" :key="i" @click="goToSlide(i)"
                class="h-1.5 w-4 rounded-full transition-all duration-200"
                :class="currentSlideIndex === i ? 'bg-white' : 'bg-white/40'"></button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// Configuración ÚNICA para todos los dispositivos
const AUTO_ROTATE_INTERVAL = 5000
const SLIDE_WIDTH = 95 // Mismo ancho para todos los dispositivos
const SLIDE_OFFSET = 1 // Espacio fijo entre slides

const originalSlides = [
    { id: 1, title: 'EQUIPAJE DE VIAJE', image: '/img-1.jpg' },
    { id: 2, title: 'COLECCIÓN VERANO', image: '/img-2.jpg' },
    { id: 3, title: 'MODA URBANA', image: '/img-3.jpg' }
]

// Estado
const currentPosition = ref(1)
const intervalId = ref<number | null>(null)

// Computed
const currentSlideIndex = computed(() => {
    return ((currentPosition.value % originalSlides.length) + originalSlides.length) % originalSlides.length
})

const infiniteSlides = computed(() => {
    const repeated = []
    for (let i = 0; i < 5; i++) {
        repeated.push(...originalSlides.map(s => ({ ...s, originalId: s.id })))
    }
    return repeated
})

const centerSlideIndex = computed(() => {
    return Math.floor(infiniteSlides.value.length / 2)
})

const visibleSlides = computed(() => {
    return infiniteSlides.value
})

// Métodos
const getSlidePosition = (index: number) => {
    const offset = index - (centerSlideIndex.value + currentPosition.value)
    const totalWidth = SLIDE_WIDTH + SLIDE_OFFSET
    return `${50 - (SLIDE_WIDTH / 2) + (offset * totalWidth)}%`
}

const getOpacity = (index: number) => {
    const position = Math.abs(index - (centerSlideIndex.value + currentPosition.value))
    return position > 1 ? 0.6 : 1 // Solo 2 niveles de opacidad
}

const getZIndex = (index: number) => {
    const position = Math.abs(index - (centerSlideIndex.value + currentPosition.value))
    return 50 - position * 10
}

const getTransform = (index: number) => {
    const position = Math.abs(index - (centerSlideIndex.value + currentPosition.value))
    return position > 0 ? 'scale(0.98)' : 'scale(1)' // Escala casi imperceptible
}

const nextSlide = () => {
    currentPosition.value += 1
    checkBoundaries()
}

const prevSlide = () => {
    currentPosition.value -= 1
    checkBoundaries()
}

const goToSlide = (index: number) => {
    const diff = index - currentSlideIndex.value
    currentPosition.value += diff
    checkBoundaries()
    resetInterval()
}

const handleSlideClick = (index: number) => {
    const clickedPosition = index - centerSlideIndex.value
    if (clickedPosition < 0) prevSlide()
    if (clickedPosition > 0) nextSlide()
    resetInterval()
}

const checkBoundaries = () => {
    if (currentPosition.value > originalSlides.length) {
        currentPosition.value = 1
    }
    else if (currentPosition.value < -originalSlides.length) {
        currentPosition.value = -1
    }
}

const resetInterval = () => {
    if (intervalId.value) {
        clearInterval(intervalId.value)
        intervalId.value = null
    }
    startInterval()
}

const startInterval = () => {
    intervalId.value = window.setInterval(nextSlide, AUTO_ROTATE_INTERVAL)
}


</script>

<style scoped>
/* Animación flash horizontal */
@keyframes horizontal-flash {
    0% {
        left: -100%;
    }

    20%,
    100% {
        left: 100%;
    }
}

.animate-horizontal-flash {
    animation: horizontal-flash 1.5s ease-out;
}

/* Asegurar que las imágenes mantengan su relación de aspecto */
img {
    object-fit: contain !important;
    max-width: 100%;
    max-height: 100%;
}
</style>