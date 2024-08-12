<template>
    <div>
        <h1 class="text-4xl text-center mb-2">{{ $t("titulo_favoritos") }}</h1>
        <div class="grid grid-cols-2 lg:grid-cols-3 items-center justify-center gap-4">
            <UCard v-for="video in favoritos" :key="video.id">
                <template #header>
                    {{ video.description }}
                </template>
                <iframe class=" w-full h-64 mb-3" :src="video.url" title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                <UButton @click="removeFavorito(video.id)"> Eliminar de favoritos</UButton>
            </UCard>
            <div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { $toast } = useNuxtApp();
const videoStore = useVideoStore();
const { favoritos } = storeToRefs(videoStore)
const removeFavorito = (id: number) => {
    videoStore.deleteFavoritos(id);
    $toast.error('Video eliminado de favoritos!')
}
</script>

<style lang="css" scoped></style>