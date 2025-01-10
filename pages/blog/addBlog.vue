<script setup lang="ts">
import type { content } from '#tailwind-config';
import type { FormSubmitEvent } from '#ui/types'
import { object, string, type InferType } from 'yup'

definePageMeta({
    middleware: ['auth'],
    permiso: "ADMINISTRADOR",
})
const { user } = useUserSession();
const router = useRouter()
const { $toast } = useNuxtApp();
import { useFirebaseUpload } from '~/composables/useFirebaseUpload';

const imageUrl = ref<string | null>(null);
const { uploadProgress, uploadImage } = useFirebaseUpload();

const handleFileUpload = async (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        imageUrl.value = await uploadImage(file);

    }
};

type Schema = InferType<typeof schema>
const schema = object({
    title: string().required('Required').min(5, 'Must be at least 5 characters'),
    content: string().required('Required').min(10, 'Must be at least 10 characters'),
})
const state = reactive({
    title: undefined,
    content: undefined,

})


async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
        await schema.validate(state, { abortEarly: false });

        if (!state.title) {
            throw new Error("Missing required fields");
        }

        if (imageUrl) {
            console.log("esto es la url", imageUrl);

            const categoryResponse = await $fetch("/api/v1/addBlog", {
                method: "POST",
                body: {
                    ...state, userId: user.value?.usuarioId, image_url: imageUrl.value,
                }
            });

            router.push("/blog");
            $toast.success("blog added successfully");

        } else {
            throw new Error("File upload failed");
        }


    } catch (error) {
        console.error("Error caught:", error);
    }
}

</script>

<template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Title" name="title">
            <UInput v-model="state.title" />
        </UFormGroup>
        <UFormGroup label="Content" name="content">
            <UInput v-model="state.content" />
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
        <UButton type="submit">
            Add Blog
        </UButton>
    </UForm>
</template>
