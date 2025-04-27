<template>
    <div class="relative w-full h-[300px] md:h-[500px] mx-auto overflow-x-hidden">
        <!-- Contenedor principal -->
        <div class="relative h-full flex items-center max-w-7xl mx-auto">
            <!-- Slides -->
            <div v-for="(slide, index) in visibleSlides" :key="`${slide.id}-${index}`"
                class="absolute transition-all duration-500 ease-in-out flex items-center" :style="{
                    width: isMobile ? '100%' : '90%',
                    height: isMobile ? '80%' : '100%',
                    left: getSlidePosition(index),
                    zIndex: getZIndex(index),
                    opacity: getOpacity(index),
                    transform: getTransform(index)
                }">
                <!-- Contenido del slide -->
                <div class="h-full w-full px-1 md:px-2 relative overflow-hidden group" @click="handleSlideClick(index)">
                    <img :src="slide.image" :alt="slide.title" class="w-full h-full object-cover rounded-lg shadow-sm">
                    <!-- Efecto flash horizontal -->
                    <div class="absolute inset-0 overflow-hidden">
                        <div class="absolute -left-full top-0 w-full h-full bg-gradient-to-r from-transparent via-white/90 to-transparent 
                            opacity-0 group-hover:opacity-100 group-active:opacity-100 group-hover:animate-horizontal-flash 
                            group-active:animate-horizontal-flash transition-opacity duration-300 mix-blend-overlay">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Indicadores -->
        <div
            class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3 z-50 px-3 py-2 bg-black/30 backdrop-blur-sm rounded-full">
            <button v-for="(_, i) in originalSlides" :key="i" @click="goToSlide(i)"
                class="h-2 w-6 rounded-full transition-all duration-300"
                :class="currentSlideIndex === i ? 'bg-white' : 'bg-white/40'"
                :aria-label="'Ir a slide ' + (i + 1)"></button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// Configuración
const AUTO_ROTATE_INTERVAL = 5000
const DESKTOP_SLIDE_WIDTH = 80 // Porcentaje del ancho del slide en desktop
const MOBILE_SLIDE_WIDTH = 100 // Porcentaje del ancho del slide en móvil
const SLIDE_OFFSET = 2 // Espacio entre slides

const originalSlides = [
    { id: 1, title: 'EQUIPAJE DE VIAJE', image: '/banner-1.webp' },
    { id: 2, title: 'COLECCIÓN VERANO', image: '/banner-2.webp' },
    { id: 3, title: 'MODA URBANA', image: '/banner-3.webp' }
]

// Estado
const currentPosition = ref(1)
const isMobile = ref(false)
const intervalId = ref<number | null>(null)

// Computed
const currentSlideIndex = computed(() => {
    return ((currentPosition.value % originalSlides.length) + originalSlides.length) % originalSlides.length
})

const visibleSlides = computed(() => {
    return isMobile.value ? originalSlides : infiniteSlides.value
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

// Métodos
const checkMobile = () => {
    isMobile.value = window.innerWidth < 768
}

const getSlidePosition = (index: number) => {
    if (isMobile.value) {
        // Para móvil: mostrar 3 slides con el central completo
        const centerPosition = 50 - (MOBILE_SLIDE_WIDTH / 2)
        const offset = (index - currentSlideIndex.value) * (MOBILE_SLIDE_WIDTH + SLIDE_OFFSET)
        return `${centerPosition + offset}%`
    }
    // Para desktop: comportamiento original
    const offset = index - (centerSlideIndex.value + currentPosition.value)
    const totalWidth = DESKTOP_SLIDE_WIDTH + 10
    return `${50 - (DESKTOP_SLIDE_WIDTH / 2) + (offset * totalWidth)}%`
}

const getOpacity = (index: number) => {
    if (isMobile.value) {
        // Para móvil: opacidad basada en la distancia del slide central
        const distance = Math.abs(index - currentSlideIndex.value)
        return distance > 1 ? 0.6 : 1 - (distance * 0.2)
    }
    const position = Math.abs(index - (centerSlideIndex.value + currentPosition.value))
    return position > 2 ? 0 : 1 - position * 0.3
}

const getZIndex = (index: number) => {
    if (isMobile.value) {
        // Para móvil: z-index más alto para el slide central
        const distance = Math.abs(index - currentSlideIndex.value)
        return 50 - distance * 10
    }
    const position = Math.abs(index - (centerSlideIndex.value + currentPosition.value))
    return 50 - Math.floor(position) * 10
}

const getTransform = (index: number) => {
    if (isMobile.value) {
        // Para móvil: escala reducida para slides laterales
        const distance = Math.abs(index - currentSlideIndex.value)
        return `scale(${1 - distance * 0.01})`
    }
    const position = Math.abs(index - (centerSlideIndex.value + currentPosition.value))
    return `scale(${1 - position * 0.0})`
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
    if (isMobile.value) {
        const distance = index - currentSlideIndex.value
        if (distance < 0) prevSlide()
        if (distance > 0) nextSlide()
    } else {
        const clickedPosition = index - centerSlideIndex.value
        if (clickedPosition < 0) prevSlide()
        if (clickedPosition > 0) nextSlide()
    }
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

// Lifecycle
onMounted(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
    startInterval()
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', checkMobile)
    if (intervalId.value) {
        clearInterval(intervalId.value)
        intervalId.value = null
    }
})
</script>

<style scoped></style>