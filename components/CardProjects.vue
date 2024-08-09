<template>
  <div class="">
    <h1 class="text-slate-900  dark:text-slate-200 font-bold text-center text-2xl mb-4">Mis poryectos </h1>
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div v-for="record in records" :key="record.id"
        class="max-w-md bg-white dark:bg-gray-800 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-500">
        <div class="p-4">
          <img class="rounded-xl" :src="record.imageUrl" :alt="record.title" />
          <div class="items-center mt-2">
            <h1 class="text-lg text-gray-900 dark:text-gray-100 font-bold">{{ record.title }}</h1>
            <p class="text-gray-900 dark:text-gray-100">{{ record.description }}</p>
          </div>
        </div>
        <div class="flex p-6  justify-center ">
          <div class="flex  justify-between w-full max-w-lg">
            <NuxtLink :to="record.demoUrl">
              <div class="flex space-x-2 items-center">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M3 8.25V18a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18V8.25m-18 0V6a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6ZM7.5 6h.008v.008H7.5V6Zm2.25 0h.008v.008H9.75V6Z" />
                  </svg>
                </span>
                <span class="text-gray-700 dark:text-gray-300 font-semibold">Demo</span>
              </div>
            </NuxtLink>
            <NuxtLink :to="record.codigoUrl">
              <div class="flex space-x-2 items-center pr-4">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                  </svg>
                </span>
                <span class="text-gray-700 dark:text-gray-300 font-semibold">Codigo</span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Record } from '~/interfaces/Record';

// Sample data
const records = ref<Record[]>([
  {
    id: 1,
    title: 'React + OpenAI',
    description: 'Implementación con Tailwind CSS',
    imageUrl: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1049&q=80',
    demoUrl: 'https://reat-openai-tailwindcss.vercel.app/',
    codigoUrl: 'https://github.com/SthalinRivera/Chat---React---API---OpenAI---Tailwind-CSS',
  },
  {
    id: 2,
    title: 'Vue.js + Tailwind CSS',
    description: 'Integration with Tailwind CSS',
    imageUrl: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1049&q=80',
    demoUrl: 'Implementación con Tailwinsdd CSS',
    codigoUrl: 'Implementación con Tailwidsnd CSS',
  },
  {
    id: 3,
    title: 'Angular + Firebase',
    description: 'Building real-time applications with Firebase',
    imageUrl: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1049&q=80',
    demoUrl: 'Implementación con Tailwinsdd CSS',
    codigoUrl: 'Implementación con Tailwidsnd CSS',
  },
  {
    id: 4,
    title: 'Node.js + Express',
    description: 'Backend development with Node.js and Express',
    imageUrl: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1049&q=80',
    demoUrl: 'Implementación con Tailwinsdd CSS',
    codigoUrl: 'Implementación con Tailwidsnd CSS',
  }
]);
</script>
