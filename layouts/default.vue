<template>
    <div
        class="min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-gray-100">
        <navbar />
        <UContainer class="my-4">
            <slot></slot>
        </UContainer>
        <Footer></Footer>
    </div>
</template>
<script setup lang="ts">
</script>
<style></style>