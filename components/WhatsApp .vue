<template>
    <div class="fixed bottom-20 md:bottom-6 right-6 z-50 animate-bounce hover:animate-none">
        <a href="https://wa.me/51910985938?text=Hola,%20estoy%20interesado%20en%20tus%20proyectos%20free"
            target="_blank" rel="noopener noreferrer"
            class="block w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#25D366] shadow-lg hover:bg-[#128C7E] transition-all duration-300 flex items-center justify-center group"
            aria-label="Contactar por WhatsApp">
            <div class="relative">
                <!-- Icono de WhatsApp alternativo -->
                <UIcon name="i-heroicons-chat-bubble-oval-left-ellipsis" class="text-white text-3xl md:text-4xl" />

                <!-- Efecto de notificación -->
                <span class="absolute -top-2 -right-2 flex h-5 w-5 md:h-6 md:w-6">
                    <span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span
                        class="relative inline-flex rounded-full h-5 w-5 md:h-6 md:w-6 bg-red-500 text-white text-xs font-bold items-center justify-center">
                        !
                    </span>
                </span>
            </div>

            <span
                class="absolute right-20 w-auto px-3 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                ¡Contáctanos!
            </span>
        </a>
    </div>
</template>

<script setup lang="ts">
// No se necesita lógica adicional ya que es un enlace directo
</script>

<style scoped>
.animate-bounce {
    animation: bounce 2s infinite;
}

@keyframes bounce {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-15px);
    }
}
</style>