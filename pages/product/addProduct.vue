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
definePageMeta({
    layout: 'dashboard', // Aplica el layout de dashboard a esta página
});
const router = useRouter()

const { user } = useUserSession();

type Schema = InferType<typeof schema>
const schema = object({
    name: string().required('Required').min(3, 'Must be at least 3 characters'),
    description: string().required('Required').min(3, 'Must be at least 3 characters'),
    price: string().required('Required').min(1, 'Must be at least 1 characters'),
    stock: string().required('Required').min(1, 'Must be at least 1 characters'),
    categoryId: string().required('Category ID is required'), // Agregado
})

const state = reactive({
    name: undefined,
    description: undefined,
    price: undefined,
    stock: undefined,
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
        if (!state.name || !state.description || !user.value?.usuarioId || !state.categoryId) {
            throw new Error("Missing required fields");
        }
        if (imageUrl) {
            const productData = {
                name: state.name,
                description: state.description,
                price: Number(state.price),
                stock: Number(state.stock), // Convertir a número
                imageUrl: imageUrl.value,
                categoryId: Number(state.categoryId), // Convertir a número
            };
            const productResponse = await $fetch("/api/v1/addProduct", {
                method: "POST",
                body: productData,
            });

            router.push("/product");
            $toast.success("Product added successfully");
        } else {
            throw new Error("File upload failed");
        }
    } catch (error) {
        console.error("Error caught:", error);
        if (error.name === 'ValidationError') {
            console.log("Validation errors:", error.errors);
            $toast.error("Validation Error: " + error.errors.join(", "));
        } else {
            console.log("Error message:", error.message);
            $toast.error("Error adding Product: " + error.message);
        }
    }
}

</script>

<template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Name" name="name">
            <UInput v-model="state.name" />
        </UFormGroup>
        <UFormGroup label="Description" name="description">
            <UInput v-model="state.description" />
        </UFormGroup>
        <UFormGroup label="Price" name="price">
            <UInput v-model="state.price" />
        </UFormGroup>
        <UFormGroup label="Stock" name="stock">
            <UInput v-model="state.stock" />
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

        <UFormGroup label="Category" name="categoryId">
            <USelect v-model="state.categoryId" :options="categories" />
        </UFormGroup>
        <UButton type="submit" :disabled="uploadProgress !== 100">
            Save
        </UButton>
    </UForm>
</template>
