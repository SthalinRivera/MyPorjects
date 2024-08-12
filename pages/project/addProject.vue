<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { object, string, type InferType } from 'yup'
import type { Category } from '~/interfaces/category';
definePageMeta({
    middleware:['auth'],
    permiso: "ADMINISTRADOR",
})
const { handleFileInput, files } = useFileStorage()
const router = useRouter()
const { $toast } = useNuxtApp();
const { user } = useUserSession();

type Schema = InferType<typeof schema>
const schema = object({
    title: string().required('Required').min(3, 'Must be at least 3 characters'),
    description: string().required('Required').min(3, 'Must be at least 3 characters'),
    project_url: string().required('Required').url(),
    categoryId: string().required('Category ID is required'), // Agregado
})

const state = reactive({
    title: undefined,
    description: undefined,
    project_url: undefined,
    code_url: undefined,
    categoryId: undefined,

})

const categoryData = ref<Category[]>([])
const { data } = await useFetch<Category[]>("/api/v1/category")
if (data.value) {
    console.log("data.value", data.value);

    categoryData.value = data.value
} else {
    categoryData.value = []
}

const categories = computed(() => {
    return categoryData.value.map((cat: Category) => ({
        value: cat.id,
        label: cat.name
    }))
})


async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
        await schema.validate(state, { abortEarly: false });

        if (!state.title || !state.description || !state.project_url || !user.value?.usuarioId || !state.categoryId) {
            throw new Error("Missing required fields");
        }

        const fileResponse = await $fetch('/api/files', {
            method: 'POST',
            body: { files: files.value },
        });

        if (fileResponse && fileResponse[0]) {
            const projectData = {
                title: state.title,
                description: state.description,
                project_url: state.project_url,
                image_url: fileResponse[0], 
                code_url: state.code_url || null, 
                userId: user.value?.usuarioId,
                categoryId: Number(state.categoryId), // Convertir a número
            };

            const projectResponse = await $fetch("/api/v1/project", {
                method: "POST",
                body: projectData,
            });

            router.push("/project");
            $toast.success("Project added successfully");
        } else {
            throw new Error("File upload failed");
        }
    } catch (error) {
        console.error("Error caught:", error);
        if (error.name === 'ValidationError') {
            $toast.error("Validation Error: " + error.errors.join(", "));
        } else {
            $toast.error("Error adding project: " + error.message);
        }
    }
}

</script>

<template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Title" name="title">
            <UInput v-model="state.title" />
        </UFormGroup>
        <UFormGroup label="Description" name="description">
            <UInput v-model="state.description" />
        </UFormGroup>
        <UFormGroup label="Image" name="image_url">
            <input type="file" @input="handleFileInput" />
        </UFormGroup>
        <UFormGroup label="Project URL" name="project_url">
            <UInput v-model="state.project_url" />
        </UFormGroup>
        <UFormGroup label="Code URL" name="code_url">
            <UInput v-model="state.code_url" />
        </UFormGroup>
        <UFormGroup label="Category" name="categoryId">
            <USelect v-model="state.categoryId" :options="categories" />
        </UFormGroup>
        <UButton type="submit">
            Add Project
        </UButton>
    </UForm>
</template>
