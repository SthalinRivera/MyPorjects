<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { object, string, type InferType } from 'yup'

definePageMeta({
    middleware:['auth'],
    permiso: "ADMINISTRADOR",
})

const router = useRouter()
const { $toast } = useNuxtApp();

type Schema = InferType<typeof schema>
const schema = object({
    name: string().required('Required').min(3, 'Must be at least 3 characters'),

})
const state = reactive({
    name: undefined,
})


async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
        await schema.validate(state, { abortEarly: false });

        if (!state.name ) {
            throw new Error("Missing required fields");
        }
            const categoryResponse = await $fetch("/api/v1/addCategory", {
                method: "POST",
                body: {
                    ...state
                }
            });

            router.push("/category");
            $toast.success("Category added successfully");
     
    } catch (error) {
        console.error("Error caught:", error);
    }
}

</script>

<template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Nombre" name="name">
            <UInput v-model="state.name" />
        </UFormGroup>
   
        <UButton type="submit">
            Add Project
        </UButton>
    </UForm>
</template>
