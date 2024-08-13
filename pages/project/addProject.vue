<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { object, string, type InferType } from 'yup'
import type { Category } from '~/interfaces/category';
import { useNuxtApp } from '#app'; // Importa el hook para acceder a los métodos del app
const { $toast } = useNuxtApp();
definePageMeta({
    middleware: ['auth'],
    permiso: "ADMINISTRADOR",
})

const router = useRouter()

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
import { useFirebaseUpload } from '~/composables/useFirebaseUpload';

const imageUrl = ref<string | null>(null);
const { uploadProgress, uploadImage } = useFirebaseUpload();

const handleFileUpload = async (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        imageUrl.value = await uploadImage(file);

    }
};


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


        if (imageUrl) {
            const projectData = {
                title: state.title,
                description: state.description,
                project_url: state.project_url,
                image_url: imageUrl.value,
                code_url: state.code_url || null,
                userId: user.value?.usuarioId,
                categoryId: Number(state.categoryId), // Convertir a número
            };

            console.log(projectData);

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
            <input type="file" @change="handleFileUpload" />
            <div v-if="uploadProgress > 0" class="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div class="bg-blue-600 h-2.5 rounded-full" :style="{ width: `${uploadProgress}%` }"></div>
            </div>
            <p v-if="uploadProgress > 0 && uploadProgress < 100" class="text-gray-600 mt-2 mb-2">Upload progress: {{
                uploadProgress }}%</p>
            <img class="w-20 h-auto rounded-md mt-2" v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" />
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
        <UButton type="submit" :disabled="uploadProgress !== 100">
            Add Project
        </UButton>
    </UForm>
</template>
