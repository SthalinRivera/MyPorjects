<template>
    <div>
        <NuxtLink to="/videos/favoritos">Favoritos</NuxtLink>
        <!-- <h1 class="text-4xl text-center mb-2">{{ $t("titulo") }}</h1> -->
        <h1 class="text-4xl text-center mb-2">Category</h1>

        <!-- component -->
        <div class="container mx-auto p-4">
            <table
                class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                <thead class="bg-gray-50 dark:bg-gray-700 text-left text-gray-600 dark:text-gray-300">
                    <tr>
                        <th class="px-6 py-3 text-xs font-medium uppercase tracking-wider">Categoria</th>
                        <th class="px-6 py-3 text-xs font-medium uppercase tracking-wider">Acción</th>
                    </tr>
                </thead>
                <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr v-for="category in categories" :key="category.id"
                        class="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td class="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                            {{ category.name }}
                        </td>
                        <td class="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                            <UButton icon="i-heroicons-pencil-square" size="sm" color="primary" variant="solid"
                                label="Editar" @click="abrirModal(category)" :trailing="false" />
                            <UButton icon="i-heroicons-trash" size="sm" color="red" variant="solid"
                                label="Eliminar" @click="deleteCategory(category.id)" :trailing="false" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <UModal v-model="isOpen">
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <h1 class="text-4xl text-center mb-2">{{ $t("actualizar_categoria") }}</h1>
                </template>
                <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                    <UFormGroup label="Nombre" name="name">
                        <UInput v-model="state.name" />
                    </UFormGroup>
                    <UButton type="submit">
                        Submit
                    </UButton>
                </UForm>
                <template #footer>
                    <Placeholder class="h-8" />
                </template>
            </UCard>
        </UModal>
    </div>
</template>


<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormSubmitEvent } from '#ui/types'
import { object, string, type InferType } from 'yup'
import type { Category } from '~/interfaces/category'
import { useRouter } from '#imports'
import { useNuxtApp } from '#app'

const isOpen = ref(false)
const router = useRouter()
const { $toast } = useNuxtApp()

// Define categories as a ref that can hold either an array of Category or null
const categories = ref<Category[] | null>(null)

// Function to fetch categories
const fetchCategories = async () => {
    const { data } = await useFetch<Category[]>("/api/v1/category")
    if (!data.value) {
        throw createError({
            statusCode: 404,
            statusMessage: "Categorías no encontradas"
        })
    }
    categories.value = data.value
}

// Fetch categories initially
await fetchCategories()

type Schema = InferType<typeof schema>
const schema = object({
    name: string().required('Requerido').min(3, 'Debe tener al menos 3 caracteres'),
})
const state = reactive({
    id: 0,
    name: '',
})

const abrirModal = (category: Category) => {
    state.id = category.id
    state.name = category.name
    isOpen.value = true
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
        await $fetch(`/api/v1/updateCategory/${state.id}`, {
            method: "PUT",
            body: state,
        })
        $toast.success("Categoría actualizada")
        isOpen.value = false

        // Update categories list by fetching again
        await fetchCategories()
    } catch (error) {
        $toast.error("Error al actualizar la categoría")
    }
}

const deleteCategory = async (id: number) => {
    try {
        await fetch(`/api/v1/deleteCategory/${id}`, {
            method: 'DELETE'
        })
        $toast.success('Categoría eliminada con éxito')
        
        // Update categories list by fetching again
        await fetchCategories()
    } catch (error) {
        $toast.error('Error al eliminar la categoría')
    }
}
</script>




<style lang="css" scoped></style>
