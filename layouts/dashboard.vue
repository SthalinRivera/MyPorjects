<!-- layouts/dashboard.vue -->
<template>
    <div class="min-h-screen flex">
        <!-- Sidebar -->
        <Sidebar />

        <!-- Main content -->
        <div class="flex-1 p-6 bg-white">
            <!-- Aquí se cargará el contenido de la página -->
            <NuxtPage />
        </div>
    </div>
</template>

<script setup>
import Sidebar from '~/components/Sidebar.vue';

// Importa el componente Sidebar para usarlo en este layout


</script>

<style scoped>
/* Aquí puedes agregar más estilos personalizados si lo necesitas */
</style>