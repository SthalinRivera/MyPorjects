<template>
    <div class="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div class="text-center">
            <div class="text-6xl mb-4 text-yellow-500">
                🚧
            </div>
            <h1 class="text-4xl font-bold mb-4">
                ¡Sitio en Construcción!
            </h1>
            <p class="text-xl mb-6">
                Estamos trabajando para ofrecerte una mejor experiencia. ¡Vuelve pronto! 🙌
            </p>
            <p class="text-sm">
                Si necesitas más información, contáctanos en <a href="mailto:info@example.com"
                    class="text-blue-400">info@example.com</a>.
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
// No se requiere lógica adicional para este caso.

definePageMeta({
    middleware: ['auth'],
    permiso: "ADMINISTRADOR",
    layout: 'dashboard',
});
</script>

<style scoped>
/* Puedes agregar cualquier estilo adicional aquí si es necesario */
</style>