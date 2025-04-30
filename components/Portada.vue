<template>
    <div class="w-full">
        <div class="grid grid-cols-1 md:grid-cols-12 md:gap-2">
            <!-- Contenedor principal -->
            <div class="md:col-span-7 relative overflow-hidden rounded-xl shadow-xl">
                <!-- Columna izquierda: bloque grande (Carrusel que ocupa 2 columnas en MD) -->
                <div class="">
                    <UCarousel v-slot="{ item }" :items="items" :ui="{ item: 'basis-full' }" arrows
                        class="overflow-hidden  rounded-lg">
                        <div class="relative w-full h-full">
                            <img :src="item" class="w-full h-full object-cover" draggable="false" />
                            <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>
                    </UCarousel>
                    <!-- Texto encima del carrusel -->
                    <div class="absolute bottom-2 md:bottom-12 left-6 z-10">
                        <span class="bg-pink-500 text-white text-md md:text-2xl font-semibold px-3 py-1 rounded-full">
                            Nuevo
                        </span>
                        <h2
                            class=" text-3xl md:text-[50px] font-bold text-pink-100 dark:text-white mt-2 drop-shadow-lg">
                            Ofertas Exclusivas
                        </h2>
                    </div>
                </div>
            </div>
            <!-- Columna derecha: sub-bloques debajo del carrusel -->
            <div class="md:col-span-5 flex flex-col">
                <MainContent />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import MainContent from './promotion/MainContent.vue';

const items = [
    '/image01.jpg',
    '/image02.jpg',
    '/image03.jpg'
]

</script>