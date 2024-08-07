<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { object, string, type InferType } from 'yup'

const { handleFileInput, files } = useFileStorage()
const router = useRouter()
const { $toast } = useNuxtApp();
const { user } = useUserSession();
definePageMeta({
    middleware: ['auth'],
    permiso: "ADMINISTRADOR",
})
type Schema = InferType<typeof schema>
const schema = object({
    title: string().required('Required').min(3, 'Must be at least 8 characters'),
    description: string().required('Required').min(3, 'Must be at least 8 characters'),
    project_url: string().required('Required').url(),
})

const state = reactive({
    title: undefined,
    description: undefined,
    project_url: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    // Do something with event.data
    try {

        const response = await $fetch('/api/files', {
            method: 'POST',
            body: {
                files: files.value
            }
        })
        console.log("llegue hasta aqui");
        console.log(response[0]);

        if (response) {
            await $fetch("/api/v1/project",
                {
                    method: "POST",
                    body: {
                        ...state,
                        image_url: response[0],
                        userId: user.value?.usuarioId,
                    }
                }
            )
            router.push("/project")
            $toast.success("Video agregado")
        }

    } catch (error) {
        $toast.error("Error al agregar video")
    }
    console.log(event.data)
}




</script>

<template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Titulo" name="title">
            <UInput v-model="state.title" />
        </UFormGroup>
        <UFormGroup label="Descripción" name="description">
            <UInput v-model="state.description" />
        </UFormGroup>
        <UFormGroup label="Imagen" name="image_url">
            <input type="file" @input="handleFileInput" />
        </UFormGroup>
     
        <UFormGroup label="URL" name="project_url">
            <UInput v-model="state.project_url" />
        </UFormGroup> 
          <UButton type="submit">
            Add Project
        </UButton>
    </UForm>
</template>
