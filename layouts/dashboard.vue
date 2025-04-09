<template>
    <div class="min-h-screen flex ">
        <!-- Sidebar -->
        <Sidebar />

        <!-- Main content -->
        <div class="flex-1 p-6 bg-white dark:bg-gray-900 dark:text-white">
            <!-- Aquí se cargará el contenido de la página -->
            <Navbar></Navbar>
            <NuxtPage />
            <Footer></Footer>
        </div>
    </div>
</template>

<script setup>
import Sidebar from '~/components/Sidebar.vue';
</script>

<style scoped>
/* Aquí puedes agregar más estilos personalizados si lo necesitas */
</style>
