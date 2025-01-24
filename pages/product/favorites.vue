<template>
    <div>
        <h1 class="text-4xl text-center mb-2">{{ $t("titulo_favoritos") }}</h1>
        <div class="grid grid-cols-2 lg:grid-cols-3 items-center justify-center gap-4">
            <UCard v-for="product in favorites" :key="product.id">
                <template #header>
                    {{ product.description }}
                </template>
                <img class="rounded-xl" :src="`${product.imageUrl}`" :alt="product.name" />
                <br>
                <UButton @click="removeFavorite(product.id)"> Eliminar de favoritos</UButton>
            </UCard>
            <div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { $toast } = useNuxtApp();
const productStore = useProductStore();
const { favorites } = storeToRefs(productStore)
const removeFavorite = (id: number) => {
    productStore.deleteFavorites(id);
    $toast.error('Video eliminado de favoritos!')
}
</script>

<style lang="css" scoped></style>