<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';

const flashSaleItems = [
    {
        id: 1,
        name: "Pantalones de Pierna Ancha Armani",
        description: "Elegancia masculina en microfibra. Fabricados con tejido italiano premium para máxima comodidad.",
        originalPrice: 80.00,
        salePrice: 60.00,
        sold: 100,
        available: 40,
        image: "http://localhost:3000/SaleFlash-01.webp"
    },
    {
        id: 2,
        name: "Chaqueta de Cuero Gucci",
        description: "Chaqueta de cuero premium con forro de estampado GG característico.",
        originalPrice: 1200.00,
        salePrice: 899.00,
        sold: 45,
        available: 15,
        image: "http://localhost:3000/SaleFlash-02.webp"
    },
    {
        id: 3,
        name: "Gafas de Sol Prada",
        description: "Gafas de sol rectangulares clásicas con lentes polarizadas.",
        originalPrice: 350.00,
        salePrice: 249.00,
        sold: 78,
        available: 22,
        image: "http://localhost:3000/SaleFlash-03.webp"
    }
];

const currentIndex = ref(0);
let intervalId: number;

const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % flashSaleItems.length;
};

const prevSlide = () => {
    currentIndex.value = (currentIndex.value - 1 + flashSaleItems.length) % flashSaleItems.length;
};

const goToSlide = (index: number) => {
    currentIndex.value = index;
};

const startAutoSlide = () => {
    intervalId = window.setInterval(nextSlide, 5000);
};

const stopAutoSlide = () => {
    clearInterval(intervalId);
};

onMounted(() => {
    startAutoSlide();
});

onUnmounted(() => {
    stopAutoSlide();
});
</script>

<template>
    <aside class="sticky top-6 h-fit">
        <div class="rounded-2xl p-5 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
            <!-- Encabezado con cuenta regresiva -->
            <div class="flex justify-between items-center mb-5">
                <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                            clip-rule="evenodd" />
                    </svg>
                    <h2 class="text-xl font-bold dark:text-white">Oferta Relámpago</h2>
                </div>
                <div
                    class="flex items-center bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 px-3 py-1 rounded-full text-sm font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Termina en 02:45:31
                </div>
            </div>

            <!-- Carrusel de productos -->
            <div class="relative rounded-lg overflow-hidden mb-5 group" @mouseenter="stopAutoSlide"
                @mouseleave="startAutoSlide">
                <!-- Diapositivas -->
                <div class="relative w-full max-w-md mx-auto aspect-[9/16] overflow-hidden">
                    <div v-for="(item, index) in flashSaleItems" :key="item.id"
                        class="absolute inset-0 transition-opacity duration-500"
                        :class="{ 'opacity-100 z-10': currentIndex === index, 'opacity-0 z-0': currentIndex !== index }">
                        <img :src="item.image" :alt="item.name" class="w-full h-full object-cover ">

                        <!-- Etiqueta de descuento -->
                        <div
                            class="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            {{ Math.round((1 - item.salePrice / item.originalPrice) * 100) }}% DESCUENTO
                        </div>
                    </div>
                </div>

                <!-- Flechas de navegación -->
                <button @click="prevSlide"
                    class="absolute top-1/2 left-3 z-50 transform -translate-y-1/2 bg-white bg-opacity-90 dark:bg-gray-700 dark:bg-opacity-90 rounded-full w-9 h-9 flex items-center justify-center shadow-md hover:bg-opacity-100 dark:hover:bg-opacity-100 transition ">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 dark:text-white" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button @click="nextSlide"
                    class="absolute top-1/2 right-3 z-50  transform -translate-y-1/2 bg-white bg-opacity-90 dark:bg-gray-700 dark:bg-opacity-90 rounded-full w-9 h-9 flex items-center justify-center shadow-md hover:bg-opacity-100 dark:hover:bg-opacity-100 transition ">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 dark:text-white" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                <!-- Indicadores -->
                <div class="absolute bottom-3 left-0 right-0 flex justify-center space-x-2 z-10">
                    <button v-for="(item, index) in flashSaleItems" :key="'indicator-' + item.id"
                        @click="goToSlide(index)" class="w-2 h-2 rounded-full transition-all duration-300" :class="{
                            'bg-white w-4': currentIndex === index,
                            'bg-white bg-opacity-50 dark:bg-gray-400': currentIndex !== index
                        }">
                    </button>
                </div>
            </div>

            <!-- Detalles del producto -->
            <div>
                <h3 class="font-bold text-lg mb-1 dark:text-white">{{ flashSaleItems[currentIndex].name }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">{{ flashSaleItems[currentIndex].description }}
                </p>

                <!-- Precio con animación -->
                <div class="flex items-center mb-4">
                    <span class="text-sm line-through text-gray-500 dark:text-gray-400 mr-2">${{
                        flashSaleItems[currentIndex].originalPrice.toFixed(2) }}</span>
                    <span class="text-xl font-bold text-red-500">${{ flashSaleItems[currentIndex].salePrice.toFixed(2)
                    }}</span>
                    <span
                        class="ml-auto text-xs font-medium px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                        ⚡ Oferta Limitada
                    </span>
                </div>

                <!-- Barra de progreso con animación -->
                <div class="mb-4">
                    <div class="flex justify-between text-xs mb-1 text-gray-600 dark:text-gray-300">
                        <span>Vendidos: {{ flashSaleItems[currentIndex].sold }}</span>
                        <span>Disponibles: {{ flashSaleItems[currentIndex].available }}</span>
                    </div>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div class="bg-gradient-to-r from-red-500 to-red-400 h-2 rounded-full transition-all duration-500"
                            :style="`width: ${(flashSaleItems[currentIndex].sold / (flashSaleItems[currentIndex].sold + flashSaleItems[currentIndex].available)) * 100}%`">
                        </div>
                    </div>
                </div>

             
            </div>
        </div>
    </aside>
</template>

<style scoped></style>