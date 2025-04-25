<template>
    <nav
        class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 shadow-xs p-3 mb-4">
        <ol class="flex items-center flex-wrap gap-y-2">
            <li class="inline-flex items-center">
                <NuxtLink to="/dashboard"
                    class="inline-flex items-center text-sm font-medium px-3 py-1 rounded-lg transition-colors" :class="[
                        'text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400',
                        'hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20'
                    ]">
                    <Icon name="heroicons:home" class="w-4 h-4 mr-2" />
                    Dashboard
                </NuxtLink>
            </li>

            <li v-for="(item, index) in items" :key="index" class="flex items-center">
                <Icon name="heroicons:chevron-right" class="w-4 h-4 mx-1 text-gray-400 dark:text-gray-500" />
                <NuxtLink v-if="index < items.length - 1 && item.to" :to="item.to"
                    class="text-sm font-medium px-3 py-1 rounded-lg transition-colors" :class="[
                        'text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400',
                        'hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20'
                    ]">
                    {{ item.title }}
                </NuxtLink>
                <span v-else class="text-sm font-medium px-3 py-1 rounded-lg" :class="[
                    'text-indigo-600 dark:text-indigo-400',
                    'bg-indigo-50/50 dark:bg-indigo-900/20'
                ]">
                    {{ item.title }}
                </span>
            </li>
        </ol>
    </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
    title: string
    to?: string  // Opcional para el último elemento
    icon?: string  // Opcional para íconos personalizados
}

const props = defineProps<{
    items: BreadcrumbItem[]
}>()
</script>