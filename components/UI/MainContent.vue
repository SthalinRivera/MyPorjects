<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const banner = ref({
    name: "Gafas de Sol Prada",
    image: "/banner-1-home.webp",

})

const products = [
    {
        id: 1,
        name: "Gafas de Sol Prada",
        image: "/banner-2-home.webp",
    },
    {
        id: 2,
        name: "Gafas de Sol Prada",
        image: "/banner-3-home.webp",
    }
]
</script>
<template>
    <main class="my-2">
        <!-- Banner principal dinámico -->
        <div class="relative rounded-3xl my-2">
            <div class="relative">
                <div class="rounded-lg ">
                    <img :src="banner.image" :alt="banner.name"
                        class="w-full h-full object-cover object-center  rounded-lg ">
                </div>
            </div>
        </div>
        <!-- Grid de productos con descuento -->
        <div class="grid grid-cols-2 gap-2">
            <div v-for="product in products" :key="product.id" class="group relative rounded-lg overflow-hidden">
                <!-- Imagen del producto -->
                <div class="aspect-square bg-gray-100 dark:bg-gray-700 overflow-hidden relative">
                    <img :src="product.image" :alt="product.name" class="w-full h-full object-cover">
                </div>
            </div>
        </div>
    </main>
</template>