<template>
  <div class="">
    <h1 class="text-slate-900  dark:text-slate-200 font-bold text-center text-2xl mb-4 mt-6">Mis Blogs</h1>

    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div v-for="blog in blogs" :key="blog.id"
        class="max-w-md bg-white dark:bg-gray-800 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-500">
        <div class="p-4">
          <img class="rounded-xl  w-64 h-48 object-cover" :src="`${blog.image_url}`" :alt="blog.title" />
          <div class="items-center mt-2">
            <h1 class="text-lg text-gray-900 dark:text-gray-100 font-bold">{{ blog.title }}</h1>
            <p class="text-gray-900 dark:text-gray-100">{{ blog.content.substring(0, 100) }}...</p>
          </div>
        </div>
        <div class="flex p-6  justify-center ">
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
import type { Record } from '~/interfaces/Record';
const id = 1;
const { data: blogs, error: blogError } = await useFetch("/api/v1/blog");

</script>
