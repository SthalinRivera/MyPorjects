<script lang="ts" setup>
import { ref } from 'vue'

// Imagen dinámica (pon aquí la ruta que quieras)
const backgroundImage = ref('/banner-sale-offer-reverse.webp')  // Tu imagen dentro de /public
</script>

<template>
    <div class="flex items-center justify-center m-4 mt-28">
        <div class="relative w-full max-w-[800px] h-[400px] md:h-[600px] rounded-lg overflow-hidden shadow-lg">

            <!-- Imagen dinámica -->
            <img :src="backgroundImage" alt="Colección exclusiva" class="w-full h-full object-cover" />

        </div>
    </div>
</template>
