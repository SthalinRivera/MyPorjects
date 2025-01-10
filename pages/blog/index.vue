<template>
    <div>
        <!-- Título de la página -->
        <h1 class="text-4xl text-center mb-2">My Blog</h1>

        <!-- Sección de Blog -->
        <h2 class="text-2xl text-center mb-6 mt-8">Blog Posts</h2>
        <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            <div v-for="blog in blogs" :key="blog.id"
                class="max-w-md bg-white dark:bg-gray-800 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-500">
                <div class="p-4">
                    <img class="rounded-xl  w-64 h-48 object-cover" :src="`${blog.image_url}`" :alt="blog.title" />
                    <h3 class="text-lg text-gray-900 dark:text-gray-100 font-bold">{{ blog.title }}</h3>
                    <p class="text-gray-700 dark:text-gray-400 mt-2">{{ blog.content.substring(0, 100) }}...</p>
                </div>
                <div class="flex p-6 justify-center">
                    <NuxtLink :to="`/blog/${blog.id}`">
                        <UButton label="Leer más" color="gray">
                            <template #trailing>
                                <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5" />
                            </template>
                        </UButton>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from '#app'; // Importa el hook para acceder a los métodos del app
const { $toast } = useNuxtApp();

// Obtener blogs (eliminamos la parte de proyectos)
const { data: blogs, error: blogError } = await useFetch("/api/v1/blog");

onMounted(() => {
    if (blogError.value) {
        $toast.error(blogError.value.statusMessage || "");
        console.error('Error al obtener los blogs:', blogError.value);
    } else {
        if (!blogs) {
            console.log('No hay blogs disponibles.');
        } else {
            console.log('Blogs cargados:', blogs);
        }
    }
});
</script>

<style lang="css" scoped></style>