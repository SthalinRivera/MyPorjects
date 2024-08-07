<template>
    <div>
        <div class="">
            <h1 class="text-4xl text-center mb-2">{{ $t("titulo") }}</h1>
            <div
                class="flex flex-col sm:flex-row sm:max-w-2xl max-w-xs mx-auto overflow-hidden bg-slate-50 dark:bg-gray-700 rounded-lg shadow-lg p-2">
                <div class="p-2 sm:w-1/2">
                    <img class="rounded object-cover w-full sm:h-80 h-60" :src="`/upload/${project.image_url}`"
                        alt="Article" />
                </div>
                <div class="sm:p-4 p-2 sm:w-1/2 flex flex-col justify-between">
                    <div>
                        <a href="#"
                            class="block sm:mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-50 hover:text-gray-600 dark:hover:text-gray-300 hover:underline">
                            {{ project.title }}
                        </a>
                        <p class="mt-2 text-sm text-gray-700 dark:text-gray-400"> {{ project.description }} </p>
                    </div>
                    <div class="mt-4">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <button type="button" @click="handleLike"
                                    class="text-slate-200 border border-slate-200 hover:bg-slate-200 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor" viewBox="0 0 18 18">
                                        <path
                                            d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
                                    </svg>
                                    <span class="sr-only">Icon description</span>
                                </button>

                                <p class="ml-2">{{ project.likes }}</p>
                            </div>
                            <div class="flex items-center">
                                <span class="">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"
                                        fill="none" stroke="#f2f2f2" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <circle cx="18" cy="5" r="3"></circle>
                                        <circle cx="6" cy="12" r="3"></circle>
                                        <circle cx="18" cy="19" r="3"></circle>
                                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                                    </svg>
                                </span>
                            </div>
                            <div>
                                <p class="text-gray-700 dark:text-gray-300">Ver proyecto</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { object, string, type InferType } from 'yup'

// definePageMeta({
//     layout: "exhibicion",
//     middleware: ["video", "auth"],
// })

const isOpen = ref(false)
const route = useRoute();
const { id } = route.params;

const { data: project } = await useFetch(`/api/v1/project/${id}`)
if (!project.value) {
    throw createError({
        statusCode: 404,
        statusMessage: "Video no encontrado"
    })
}
onMounted(async () => {
    const { data, error } = await useFetch(`/api/v1/project/${id}`);
    if (error.value) {
        $toast.error("Error loading project");
    } else {
        project.value = data.value;
    }
});

const state = reactive({
    likes: 1,
    projectId   : project.value.id,
    userId : 1,
})
async function handleLike() {

    try {
        const { data, error } = await $fetch(`/api/v1/addlike`, {
            method: "POST",
            body: {
                ...state,
            }
        });

        if (error) {
            throw new Error(error.message);
        }

        project.value.likes += 1; // Actualiza el estado local
        $toast.success("Like added successfully");
    } catch (error) {
        $toast.error("Error adding like");
    }
}
</script>
<style lang="scss" scoped></style>