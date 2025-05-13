<script setup lang="ts">
const items = [
    { src: '/img-1.jpg', link: '/category/1' },
    { src: '/img-2.jpg', link: '/category/2' },
    { src: '/img-3.jpg', link: '/category/3' },
    { src: '/img-4.jpg', link: '/category/3' },
    { src: '/img-5.jpg', link: '/category/3' },
]
</script>

<template>
    <div class="flex justify-center">
        <UCarousel v-slot="{ item }" class=" w-full" :items="items"
            :ui="{ item: 'basis-full sm:basis-1/2 md:px-2 lg:basis-1/3' }" arrows>
            <NuxtLink :to="item.link">
                <img :src="item.src"
                    class="mx-auto rounded-lg mr-2 w-full h-auto sm:w-full sm:h-auto lg:w-full lg:h-auto" />
            </NuxtLink>
        </UCarousel>
    </div>
</template>
