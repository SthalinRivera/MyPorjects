<template>
    <div>
        <div class="">
            <h1 class="text-4xl text-center mb-2">{{ $t("titulo") }}</h1>
            <div class="grid md:grip-cols-1 sm:grid-cols-2 lg:grip-cols-3 items-center justify-center gap-2">
                <div>
                    <div class="flex justify-between m-2">
                        <UButton icon="i-heroicons-pencil-square" size="sm" color="primary" variant="solid"
                            label="Editar" @click="abrirModal" :trailing="false" />
                        <UButton icon="i-heroicons-pencil-square" size="sm" color="red" variant="solid"
                            label="Eliminar Video" @click="deleteVideo" :trailing="false" />
                    </div>

                    <UCard class="w-[800px justify-center">
                        <template #header>
                            {{ video.description }}
                        </template>
                        <iframe class="h-[500px] w-full" :src="video.url" title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        <p v-data-horario="'dd/mm/yyyy'">{{ video.data_potagem }}</p>
                        <template #footer>
                            <div class="flex justify-between">
                            </div>
                        </template>
                    </UCard>
                </div>
            </div>

            <UModal v-model="isOpen">
                <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                    <template #header>
                        <h1 class="text-4xl text-center mb-2">{{ $t("actulizar_video") }}</h1>
                    </template>
                    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                        <UFormGroup label="Descripción" name="description">
                            <UInput v-model="state.description" />
                        </UFormGroup>
                        <UFormGroup label="Url" name="url">
                            <UInput v-model="state.url" type="text" />
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
    </div>
</template>
<script setup lang="ts">
import type { Video } from '~/interfaces/project';
import type { FormSubmitEvent } from '#ui/types'
import { object, string, type InferType } from 'yup'

//Personalizar layout padre 
// definePageMeta({
//     layout: "exhibicion",
//     middleware: ["video", "auth"],
// })

const isOpen = ref(false)
const route = useRoute();
const {id} = route.params;
// const video = ref<Video>({} as Video);

const {data:video}=  await useFetch(`/api/v1/videos/${id}`)

// onMounted(async () => {
//     video.value = await $fetch(`/api/v1/videos/${route.params.id}`)
//     console.log("aqui se muestra los videos", video);
// })

if (!video.value) {
    throw createError({
        statusCode:404,
        statusMessage:"Video no encontrado"
    })
    
}
type Schema = InferType<typeof schema>
const schema = object({
    description: string().required('Required').min(3, 'Must be at least 8 characters'),
    url: string()
        .min(8, 'Must be at least 8 characters')
        .required('Required')
})

const router = useRouter()
const { $toast } = useNuxtApp();
const state = reactive({
    id: 0,
    description: '',
    url: ''
})
async function onSubmit(event: FormSubmitEvent<Schema>) {
    // Do something with event.data
    try {
        await $fetch(`/api/v1/videos/${route.params.id}`,
            {
                method: "PUT",
                body: state,
            }
        )
        router.push("/videos")
        $toast.success("video actulizado")
        isOpen.value = false;
    } catch (error) {
        $toast.error("Error al actualizar video")
    }
    console.log(event.data)
}
const abrirModal = () => {
    state.description = video.value.description;
    state.url = video.value.url;
    state.id = video.value.id;
    isOpen.value = true;
}
const deleteVideo = async () => {
    try {
        await $fetch(`/api/v1/videos/${route.params.id}`,
            {
                method: "DELETE",
            }
        )
        router.push("/videos")
        $toast.success("video eliminado")
    } catch (error) {
        $toast.error("Error al eliminar video")

    }
}
</script>
<style lang="scss" scoped></style>