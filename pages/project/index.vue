<template>
    <div>
        <NuxtLink to="/videos/favoritos">Favoritos</NuxtLink>
        <!-- <h1 class="text-4xl text-center mb-2">{{ $t("titulo") }}</h1> -->
        <h1 class="text-4xl text-center mb-2">My Portfolio</h1>

        <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div v-for="project in projects" :key="project.id"
                class="max-w-md bg-white dark:bg-gray-800 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-500">
                <div class="p-4">

                    <img class="rounded-xl" :src="`${project.image_url}`" :alt="project.title" />

                    <div class="flex justify-between mt-3 items-center">
                        <div class="items-center mt-2">
                            <h1 class="text-lg text-gray-900 dark:text-gray-400 font-semibold"> {{ project.Category ?
                                project.Category.name : 'No category' }}</h1>
                        </div>
                        <div class="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                            <p>{{ project.likes }}</p>
                        </div>
                    </div>

                    <h1 class="text-lg text-gray-900 dark:text-gray-100 font-bold">{{ project.title }}</h1>
                </div>
                <div class="flex p-6  justify-center ">
                    <div class="flex  justify-between w-full max-w-lg">
                        <a :href="project.project_url" target="_blank" rel="noopener noreferrer">
                            <div class="flex space-x-2 items-center">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M3 8.25V18a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18V8.25m-18 0V6a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6ZM7.5 6h.008v.008H7.5V6Zm2.25 0h.008v.008H9.75V6Z" />
                                    </svg>
                                </span>
                                <span class="text-gray-700 dark:text-gray-300 font-semibold">Demo</span>
                            </div>
                        </a>
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
                </div>
            </div>
        </div>

    </div>
</template>



<script setup lang="ts">
import { useNuxtApp } from '#app'; // Importa el hook para acceder a los métodos del app
const { $toast } = useNuxtApp();

const { data: projects, error } = await useFetch("/api/v1/project")
onMounted(() => {
    if (error.value) {
        $toast.error(error.value.statusMessage || "");
    }

})


</script>
<style lang="css" scoped></style>