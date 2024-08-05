<template>
    <div class="">
        <NuxtLink to="/videos/favoritos">Favoritos</NuxtLink>
        <h1 class="text-4xl text-center mb-2">{{ $t("titulo") }}</h1>
        <div class="grid md:grip-cols-1 sm:grid-cols-2 lg:grip-cols-3 items-center justify-center gap-2">
            <UCard v-for="project in projects" :key="project.id">
                <template #header>
                    {{ project.title }}
                    {{ project.description }}
                </template>
 
                <template #footer>
                    <div class="flex justify-between">
                        <!-- <UButton @click="favortitos(video)">Agregar a favoritos</UButton> -->
                        <NuxtLink :to="{
                            name: 'project-id',
                            params: { id: project.id.toString() }
                        }">
                            <UButton label="Ver Video" color="gray">
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