<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router'; // Importación opcional para manejar navegación programática

const flashSaleItems = [
    {
        id: 9,
        name: "COLLAR DE PRINCESITAS DE DISNEY",
        description: "Material Acero Quirurjico Inoxidable",
        originalPrice: 23.00,
        salePrice: 23.00,
        sold: 1,
        available: 4,
        image: "SaleFlash-01.webp"
    },
    {
        id: 27,
        name: "COLECCIÓN ARETES VERANO",
        description: "Aretes de acero inoxidable",
        originalPrice: 17.00,
        salePrice: 17.00,
        sold: 1,
        available: 3,
        image: "SaleFlash-02.webp"
    },
    {
        id: 16,
        name: "PULSERA PANDORAS",
        description: "Pulsera estilo pandora con charms con distintos diseños💝",
        originalPrice: 25.00,
        salePrice: 25.00,
        sold: 1,
        available: 2,
        image: "SaleFlash-03.webp"
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
        <div class="rounded-lg p-2 md:p-6 bg-gray-50 dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 relative group"
            @mouseenter="stopAutoSlide" @mouseleave="startAutoSlide">
            <!-- Encabezado -->
            <div class="flex justify-between items-center mb-5">
                <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                            clip-rule="evenodd" />
                    </svg>
                    <h2 class="text-xl font-bold dark:text-white md:my-6">Oferta Relámpago</h2>
                </div>
            </div>

            <!-- Usando NuxtLink para hacer toda la tarjeta clickeable -->
            <NuxtLink :to="`/product/${flashSaleItems[currentIndex].id}`"
                class="block mb-5 cursor-pointer hover:opacity-95 transition-opacity" @click.stop>
                <!-- Carrusel adaptativo -->
                <div class="flex md:flex-col flex-row gap-4">
                    <!-- Imagen -->
                    <div
                        class="relative rounded-lg overflow-hidden flex-shrink-0 md:w-full w-32 sm:w-full md:aspect-[9/12] aspect-[3/4]">
                        <div v-for="(item, index) in flashSaleItems" :key="item.id"
                            class="absolute inset-0 transition-opacity duration-500"
                            :class="{ 'opacity-100 z-10': currentIndex === index, 'opacity-0 z-0': currentIndex !== index }">
                            <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                            <div
                                class="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                {{ Math.round((1 - item.salePrice / item.originalPrice) * 100) }}% DESCUENTO
                            </div>
                        </div>
                    </div>
                    <!-- Información -->
                    <div class="flex-1 content-center justify-center ">
                        <h3 class="font-bold text-lg md:mb-1 dark:text-white">{{ flashSaleItems[currentIndex].name }}
                        </h3>
                        <p class="text-sm text-gray-600 dark:text-gray-300 md:mb-3 line-clamp-1">{{
                            flashSaleItems[currentIndex].description
                            }}</p>

                        <div class="flex items-center nd:mb-4">
                            <span class="text-md font-bold text-gray-500 dark:text-gray-400  mr-2">S/.{{
                                flashSaleItems[currentIndex].salePrice.toFixed(2) }}</span>
                            <span class="text-sm line-through text-gray-500 dark:text-gray-400">S/.{{
                                flashSaleItems[currentIndex].originalPrice.toFixed(2) }}</span>


                        </div>


                    </div>

                </div>
                <div>
                    <div class="flex justify-between text-xs md:mb-1 text-gray-600 dark:text-gray-300">
                        <span>Vendidos: {{ flashSaleItems[currentIndex].sold }}</span>
                        <span>Disponibles: {{ flashSaleItems[currentIndex].available }}</span>
                    </div>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div class=" dark:bg-gray-200 bg-gray-900 h-2 rounded-full transition-all duration-500"
                            :style="`width: ${(flashSaleItems[currentIndex].sold / (flashSaleItems[currentIndex].sold + flashSaleItems[currentIndex].available)) * 100}%`">
                        </div>
                    </div>
                </div>
            </NuxtLink>

            <!-- Flechas de navegación movidas a las esquinas del card -->
            <button @click.stop="prevSlide"
                class="absolute top-1/2 left-2 z-20 transform -translate-y-1/2 bg-white bg-opacity-90 dark:bg-gray-700 dark:bg-opacity-90 rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-opacity-100 dark:hover:bg-opacity-100 transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 dark:text-white" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button @click.stop="nextSlide"
                class="absolute top-1/2 right-2 z-20 transform -translate-y-1/2 bg-white bg-opacity-90 dark:bg-gray-700 dark:bg-opacity-90 rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-opacity-100 dark:hover:bg-opacity-100 transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 dark:text-white" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>

            <!-- Indicadores en el centro del card -->
            <div class="absolute bottom-2 left-0 right-0 flex justify-center space-x-2 z-20">
                <button v-for="(item, index) in flashSaleItems" :key="'indicator-' + item.id"
                    @click.stop="goToSlide(index)" class="w-2 h-2 rounded-full transition-all duration-300" :class="{
                        'bg-gray-900 w-4': currentIndex === index,
                        'bg-gray-300 dark:bg-gray-600': currentIndex !== index
                    }">
                </button>
            </div>
        </div>
    </aside>
</template>

<style scoped>
/* No se requiere CSS adicional para los cambios, todo está en Tailwind */
</style>