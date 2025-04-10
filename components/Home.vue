<template>

  <div class="w-full ">
    <div class="container mx-auto">
      <!-- Contenedor principal -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Columna izquierda: bloque grande -->
        <div
          class="relative group rounded-xl shadow-2xl overflow-hidden h-full transition-all duration-500 bg-white dark:bg-gray-800">
          <UCarousel v-slot="{ item }" :items="items" :ui="{ item: 'basis-full' }"
            class="rounded-xl overflow-hidden h-full" indicators arrows>
            <div class="relative h-full w-full">
              <img :src="item"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                draggable="false">
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </UCarousel>
          <div class="absolute bottom-6 left-6 z-10">
            <span class="bg-pink-500 text-white text-sm font-semibold px-3 py-1 rounded-full">Nuevo</span>
            <h2 class="text-2xl font-bold text-pink-500 dark:text-white mt-2 drop-shadow-lg">Ofertas Exclusivas</h2>
          </div>
        </div>

        <!-- Columna derecha: sub-bloques -->
        <div class="grid grid-rows-2 gap-6">
          <!-- Bloque superior derecho -->
          <div
            class="relative  rounded-xl shadow-2xl overflow-visible transition-all duration-300 bg-white dark:bg-gray-800 h-full">
            <div
              class="bg-gradient-to-r rounded-xl from-violet-200 to-pink-200 dark:from-violet-600 dark:to-pink-600 h-full p-6 flex flex-col relative">
              <!-- Imagen que sobresale SIN afectar el layout -->
              <div class="absolute -top-6 right-4 w-28 h-28 z-10">
                <img src="@/assets/img/anillo.png" alt="Accesorios"
                  class="w-full h-full object-contain drop-shadow-lg transition-transform duration-500 hover:scale-110">
                <div class="absolute inset-0 rounded-full bg-pink-200/30 dark:bg-pink-800/30 blur-md -z-10"></div>
              </div>

              <div class="flex-1 z-0">
                <h3 class="text-2xl font-bold mb-3 text-gray-800 dark:text-white">Accesorios en Promoción</h3>
                <p class="text-gray-600 dark:text-gray-200 mb-4">Accesorios en acero inoxidable duraderos y
                  sofisticados

                </p>
              </div>

              <nuxt-link to="/product"
                class="mt-4 bg-pink-500 hover:bg-pink-600 dark:bg-pink-600 dark:hover:bg-pink-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-pink-500/20 w-full z-0">
                Ver ofertas
              </nuxt-link>
            </div>
          </div>

          <!-- Bloques inferiores -->
          <div class="grid grid-cols-2 gap-6">
            <!-- Bloque inferior izquierdo -->
            <div
              class="relative  rounded-xl shadow-2xl overflow-visible transition-all duration-300 bg-white dark:bg-gray-800 h-full">
              <div
                class="bg-gradient-to-r rounded-xl from-emerald-400 to-cyan-400 dark:from-emerald-600 dark:to-cyan-600 h-full p-5 flex flex-col relative">
                <!-- Imagen flotante -->
                <div class="absolute -top-5 right-2 w-24 h-24 z-10">
                  <img src="@/assets/img/collar.png" alt="Cargadores"
                    class="w-full h-full object-contain drop-shadow-lg transition-transform duration-500 hover:scale-110">
                  <div class="absolute inset-0 rounded-full bg-cyan-200/30 dark:bg-cyan-800/30 blur-md -z-10"></div>
                </div>

                <div class="flex-1 z-0">
                  <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">Collares</h3>
                  <p class="text-gray-800 dark:text-gray-100 text-sm">Collares para cada estilo</p>
                </div>

                <nuxt-link to="/product"
                  class="mt-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-cyan-600 dark:text-cyan-400 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-md z-0">
                  Comprar
                </nuxt-link>
              </div>
            </div>

            <!-- Bloque inferior derecho -->
            <div
              class="relative  rounded-xl shadow-2xl overflow-visible transition-all duration-300  bg-white dark:bg-gray-800 h-full">
              <div
                class="bg-gradient-to-r from-amber-200 to-yellow-500 rounded-xl dark:from-amber-600 dark:to-yellow-600 h-full p-5 flex flex-col relative">
                <!-- Imagen flotante -->
                <div class="absolute -top-5 right-2 w-24 h-24 z-10">
                  <img src="@/assets/img/Pulsera.png" alt="Servicio Técnico"
                    class="w-full h-full object-contain drop-shadow-lg transition-transform duration-500 hover:scale-110">
                  <div class="absolute inset-0 rounded-full bg-amber-200/30 dark:bg-amber-800/30 blur-md -z-10"></div>
                </div>

                <div class="flex-1 z-0">
                  <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">Pulseras</h3>
                  <p class="text-gray-800 dark:text-gray-100 text-sm">Pulseras elegantes y modernas</p>
                </div>

                <nuxt-link to="/product"
                  class="mt-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-yellow-600 dark:text-yellow-400 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-md z-0">
                  Comprar
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Carrusel de imágenes -->

    <CardProducts></CardProducts>


    <ParallaxSection></ParallaxSection>

  </div>
</template>



<script setup lang="ts">


const items = [
  '/image01.jpg',
  '/image02.jpg',
  '/image03.jpg'
]


</script>
