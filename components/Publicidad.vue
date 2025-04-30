<script setup lang="ts">
const items = [
    { src: '/ban1.webp', link: '/category/1' },
    { src: '/ban2.webp', link: '/category/2' },
    { src: '/ban3.webp', link: '/category/3' }
]
</script>

<template>
    <div class="flex justify-center">
        <UCarousel v-slot="{ item }" class=" w-full" :items="items"
            :ui="{ item: 'basis-full sm:basis-1/2 lg:basis-1/3' }" arrows>
            <NuxtLink :to="item.link">
                <img :src="item.src" class="mx-auto rounded-lg w-full h-auto sm:w-full sm:h-auto lg:w-full lg:h-auto" />
            </NuxtLink>
        </UCarousel>
    </div>
</template>
