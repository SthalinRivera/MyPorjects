<template>
    <main class="md:my-2">
        <!-- Banner principal dinámico -->
        <div class="relative rounded-3xl mb-1 md:mb-4">
            <NuxtLink v-for="banner in banners" :key="banner.id" :to="banner.link">
                <div class="relative rounded-lg overflow-hidden">
                    <img :src="banner.image" :alt="banner.name"
                        class="w-full h-full object-cover object-center rounded-lg">
                </div>
            </NuxtLink>
        </div>

        <!-- Grid de productos con descuento -->
        <div class="grid grid-cols-2 gap-1 md:gap-4">
            <NuxtLink v-for="product in products" :key="product.id" :to="product.link"
                class="group relative rounded-lg overflow-hidden block">
                <div class="aspect-square bg-gray-100 dark:bg-gray-700 overflow-hidden">
                    <img :src="product.image" :alt="product.name"
                        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
                </div>
            </NuxtLink>
        </div>
    </main>
</template>
<script lang="ts" setup>
const banners = [
    {
        id: 1,
        name: "Gafas de Sol Prada",
        image: "/banner-1-home-2.webp",
        link: "/product/1"
    }]

const products = [
    {
        id: 1,
        name: "Gafas de Sol Prada",
        image: "/banner1.png",
        link: "/product/9"
    },
    {
        id: 2,
        name: "Gafas de Sol Prada",
        image: "/banner2.png",
        link: "/product/16"
    }
]
</script>