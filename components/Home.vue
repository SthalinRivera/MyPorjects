<template>

  <div class="w-full">

    <div class="container mx-auto">
      <!-- Contenedor principal -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <!-- Columna izquierda: bloque grande -->
        <div class="bg-gradient-to-r from-rose-400 to-red-500 rounded-lg shadow-md h-auto">
          <!-- Contenido del bloque grande -->
          <UCarousel v-slot="{ item }" :items="items" :ui="{ item: 'basis-full' }"
            class="rounded-lg overflow-hidden bg-cover" indicators arrows>
            <img :src="item" class="w-full bg-cover " draggable="false">
          </UCarousel>
        </div>

        <!-- Columna derecha: sub-bloques -->
        <div class="grid grid-rows-2 gap-4">
          <!-- Bloque superior derecho -->
          <div class=" rounded-lg shadow-md ">
            <!-- Contenido del bloque superior -->
            <div
              class="bg-gradient-to-r from-violet-200 to-pink-200 rounded-lg shadow-lg  h-full text-start p-4 inset-0 hover:bg-gradient-to-r">
              <h3 class="text-xl font-bold mb-2">Accesorios en Promoción</h3>
              <img src="@/assets/img/audifono.png" alt="Accesorios"
                class="mx-auto h-6 transition-transform duration-300 transform hover:scale-110">
              <button class="bg-green-500 text-white px-4 py-2 rounded-3xl mt-2 hover:bg-green-600">Comprar</button>
            </div>
          </div>

          <!-- Bloques inferiores -->
          <div class="grid grid-cols-2 gap-4">
            <div class=" rounded-lg shadow-md h-auto">
              <!-- Contenido del bloque inferior izquierdo -->
              <div class="bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg shadow-lg text-start p-4 h-full">
                <h3 class="text-xl font-bold mb-2">Oferta de Cargadores</h3>
                <img src="@/assets/img/cargador.jpg" alt="Cargadores"
                  class="mx-auto h-6 transition-transform duration-300 transform hover:scale-110">
                <button class="bg-green-500 text-white px-4 py-2 rounded-3xl mt-4 hover:bg-green-600">Comprar</button>
              </div>

            </div>
            <div class=" rounded-lg shadow-md h-auto">
              <!-- Contenido del bloque inferior derecho -->
              <div class="bg-gradient-to-r from-amber-200 to-yellow-500 rounded-lg shadow-lg  text-start p-4 h-full">
                <h3 class="text-xl font-bold mb-2">Servicio Técnico</h3>
                <img src="@/assets/img/servicio.png" alt="Servicio Técnico"
                  class="mx-auto h-6 transition-transform duration-300 transform hover:scale-110">
                <button class="bg-green-500 text-white px-4 py-2 rounded-3xl mt-4 hover:bg-green-600">Ver
                  Estado</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Carrusel de imágenes -->

    <CardProducts></CardProducts>

  </div>
</template>

<script setup lang="ts">


const items = [
  'https://picsum.photos/1920/1080?random=1',
  'https://picsum.photos/1920/1080?random=2',
  'https://picsum.photos/1920/1080?random=3',
  'https://picsum.photos/1920/1080?random=4',
  'https://picsum.photos/1920/1080?random=5',
  'https://picsum.photos/1920/1080?random=6'
]


</script>
