<template>
    <div class="relative h-[800px] overflow-hidden rounded-lg">
        <!-- Carrusel -->
        <div class="relative h-full w-full ">
            <!-- Slides -->
            <div v-for="(slide, index) in slides" :key="index"
                class="absolute inset-0 transition-opacity duration-1000 ease-in-out "
                :class="{ 'opacity-100 z-10': currentSlide === index, 'opacity-0 z-0': currentSlide !== index }">
                <!-- Imagen de fondo -->
                <div class="absolute inset-0 bg-black/20"></div>
                <img :src="slide.image" :alt="slide.title" class="w-full h-full object-cover object-center " />

                <!-- Contenido del slide -->
                <div class="absolute inset-0 flex items-center justify-center">
                    <div class="text-center px-4 max-w-4xl mx-auto text-white">
                        <h2 class="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{{ slide.title }}</h2>
                        <p class="text-xl md:text-2xl mb-8 drop-shadow-lg">{{ slide.subtitle }}</p>
                        <button @click="navigateTo(slide.ctaLink)"
                            class="px-8 py-3 bg-white text-gray-800 font-medium rounded-full hover:bg-gray-100 transition-colors">
                            {{ slide.ctaText }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Controles del carrusel -->
        <button @click="prevSlide"
            class="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-sm transition-all"
            aria-label="Previous slide">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
        </button>

        <button @click="nextSlide"
            class="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-sm transition-all"
            aria-label="Next slide">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
        </button>

        <!-- Indicadores de paginación -->
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
            <button v-for="(slide, index) in slides" :key="index" @click="goToSlide(index)"
                class="w-3 h-3 rounded-full transition-all"
                :class="{ 'bg-white w-6': currentSlide === index, 'bg-white/50': currentSlide !== index }"
                aria-label="Go to slide"></button>
        </div>

        <!-- Flecha indicadora de scroll -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 animate-bounce">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
        </div>
    </div>
</template>

<script setup>
const currentSlide = ref(0)
const autoPlay = ref(true)
let interval

const slides = [
    {
        title: "Seleccionamos Cada Detalle",
        subtitle: "Con cariño y dedicación, debes probarlo al menos una vez.",
        ctaText: "Ver Colección",
        ctaLink: "/product",
        image: "/banner-inicio-1.jpg"
    },
    {
        title: "Nuevos Lanzamientos",
        subtitle: "Descubre nuestras últimas novedades en belleza y detalles florales.",
        ctaText: "Ver Novedades",
        ctaLink: "/product",
        image: "/banner-inicio-2.jpg"
    },
    {
        title: "Belleza & Flores",
        subtitle: "Productos de belleza irresistibles y arreglos florales para sorprender a quien más quieres.",
        ctaText: "Descúbrelos Aquí",
        ctaLink: "/product",
        image: "/banner-inicio-3.jpg"
    }
]

const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
    resetAutoPlay()
}

const prevSlide = () => {
    currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length
    resetAutoPlay()
}

const goToSlide = (index) => {
    currentSlide.value = index
    resetAutoPlay()
}

const resetAutoPlay = () => {
    if (autoPlay.value) {
        clearInterval(interval)
        startAutoPlay()
    }
}

const startAutoPlay = () => {
    interval = setInterval(() => {
        nextSlide()
    }, 5000)
}

onMounted(() => {
    if (autoPlay.value) {
        startAutoPlay()
    }
})

onBeforeUnmount(() => {
    clearInterval(interval)
})
</script>

<style scoped>
.animate-bounce {
    animation: bounce 2s infinite;
}

@keyframes bounce {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-20px);
    }
}
</style>