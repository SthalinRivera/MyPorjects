<script lang="ts" setup>
import { defineProps } from 'vue'

// Definir las props para recibir la imagen y otras configuraciones
const props = defineProps<{
    imageSrc: string
    altText: string
    height?: string
    width?: string
}>()

</script>

<template>
    <div class="flex items-center justify-center m-4 mt-28">
        <div class="relative w-full max-w-[800px] rounded-lg overflow-hidden shadow-lg"
            :style="{ height: props.height || '400px' }">
            <!-- Imagen dinámica -->
            <img :src="props.imageSrc" :alt="props.altText" class="w-full h-full object-cover" />
        </div>
    </div>
</template>