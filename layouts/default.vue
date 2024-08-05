<template>

    <div>
        <navbar />

        <UContainer class="my-4">
            <slot></slot>
        </UContainer>
        <UDivider label="Sthalin Rivera" :ui="{ label: 'text-primary-500 dark:text-primary-400' }" />
    </div>
</template>

<script setup lang="ts">

</script>

<style></style>