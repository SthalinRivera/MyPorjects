<template>
    <div>
        <div class="">
            <h1 class="text-4xl text-center mb-2">Detalles de blog</h1>
            <div
                class="flex flex-col sm:flex-row sm:max-w-2xl max-w-xs mx-auto overflow-hidden bg-slate-50 dark:bg-gray-700 rounded-lg shadow-lg p-2">
                <div class="p-2 sm:w-1/2">
                    <img class="rounded object-cover w-full sm:h-80 h-60" :src="`${blog.image_url}`" alt="Article" />
                </div>
                <div class="sm:p-4 p-2 sm:w-1/2 flex flex-col justify-between">
                    <div>
                        <a href="#"
                            class="block sm:mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-50 hover:text-gray-600 dark:hover:text-gray-300 hover:underline">
                            {{ blog.title }}
                        </a>
                        <p class="mt-2 text-sm text-gray-700 dark:text-gray-400"> {{ blog.content }} </p>
                    </div>
                    <div class="mt-4">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <button type="button" @click="" class="text-slate-800 border border-slate-800 
                                    hover:bg-slate-900 hover:text-slate-600 
                                    focus:ring-4 focus:outline-none focus:ring-blue-300 
                                    font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center 
                                    dark:bg-gray-800 dark:text-slate-100 dark:border-gray-700 dark:hover:bg-gray-900 
                                    dark:focus:ring-blue-800 dark:hover:text-white">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor" viewBox="0 0 18 18">
                                        <path
                                            d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
                                    </svg>
                                    <span class="sr-only">Icon description</span>
                                </button>


                            </div>

                            <div class="flex ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>


                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script setup lang="ts">

import { useUserStore } from '~/stores/userStore'; // Asegúrate de importar tu store

const route = useRoute();
const { id } = route.params;

const userStore = useUserStore();
const isOpen = ref(false);

const { data: blog, error } = await useFetch(`/api/v1/blog/${id}`);
if (error.value) {
    throw createError({
        status: 404,
        statusText: "Video no encontrado"
    });
}

onMounted(async () => {
    const { data: blog, error: errorProject } = await useFetch(`/api/v1/blog/${id}`);
    if (errorProject.value) {
        // $toast.error("Error loading project");
    } else {
        blog.value = blog.value;
    }

    userStore.getUser(); // Load user from local storage if available
});

const ROLE_ID_VISITOR = 3;


</script>

<style lang="scss" scoped></style>