<template>
    <div>
        <NuxtLink to="/videos/favoritos">Favoritos</NuxtLink>
        <!-- <h1 class="text-4xl text-center mb-2">{{ $t("titulo") }}</h1> -->
        <h1 class="text-4xl text-center mb-2">My Portfolio</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <!-- Utiliza v-for para iterar sobre los proyectos -->
            <UCard v-for="project in projects" :key="project.id"
                class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 gap-1">
                <img class="w-full h-32 rounded-xl  transition duration-300 ease-in-out hover:scale-110"
                    :src="`/upload/${project.image_url}`" alt="Card Image">
                <div class="p-2 md:p-5">
                    <div class="flex justify-between items-center  ">
                        <p class="text-slate-200">Aplication</p>
                        <div class="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg> 
                             <p>{{project.likes}}</p>
                        </div>
                    </div>
                    <h3 class="text-sm font-bold text-gray-800 dark:text-gray-100 mt-4  ">
                        {{ project.title }}
                    </h3>
                </div>
                <template #footer>
                    <div class="flex justify-between">
                       
                        <NuxtLink :to="{
                            name: 'project-id',
                            params: { id: project.id.toString() }
                        }">
                            <UButton label="Ver" color="gray">
                                <template #trailing>
                                    <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5" />
                                </template>
                            </UButton>
                        </NuxtLink>
                    </div>
                </template>
            </UCard>
        </div>
    </div>
</template>



<script setup lang="ts">

import { useVideoStore } from '~/stores/video';
import formatoData from '~/utils/formatoData';
const { adicionarFavorito } = useVideoStore();
const { data: projects, error } = await useFetch("/api/v1/project")

definePageMeta({
    middleware: ["auth"],
});
onMounted(() => {
    if (error.value) {
        $toast.error(error.value.statusMessage || "");
        // videos.value = await $fetch("/api/v1/videos")
    }

})

const { $toast } = useNuxtApp()
const favortitos = (video: Video) => {
    adicionarFavorito(video);
    $toast.success("Video agregado a favoritos");
}
</script>
<style lang="css" scoped></style>