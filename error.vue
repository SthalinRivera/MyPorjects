<template>
  <div
    class="min-h-screen w-full flex flex-col justify-center items-center p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

    <!-- Tarjeta principal del error -->
    <div
      class="text-center max-w-md w-full rounded-xl shadow-lg p-6 bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-xl">

      <!-- Icono animado -->
      <div
        class="mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-6 animate-bounce bg-red-100 dark:bg-red-900/20">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-red-500 dark:text-red-400" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <!-- Código de error -->
      <h1 class="text-7xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">
        {{ error.statusCode || '500' }}
      </h1>

      <!-- Mensaje de error -->
      <p class="text-xl mb-6 text-gray-600 dark:text-gray-300">
        {{ error.message || 'Algo salió mal' }}
      </p>

      <!-- Botón principal con gradiente -->
      <button @click="voltarHome"
        class="px-6 py-3 w-full mb-6 rounded-lg font-medium transition-all duration-300 bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 active:scale-95 shadow-md hover:shadow-lg">
        Volver al inicio
      </button>

    </div>

    <!-- Sección de soporte compacta -->
    <div class="mt-8 text-center max-w-md w-full">
      <h3 class="text-lg font-medium mb-3 text-gray-700 dark:text-gray-300">
        ¿Necesitas ayuda?
      </h3>

      <!-- Botones de acción compactos -->
      <div class="flex flex-wrap justify-center gap-2">
        <button @click="contactarSoporte"
          class="px-4 py-2 text-sm rounded-lg flex items-center gap-1 transition-colors bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Soporte
        </button>

        <button @click="enviarReporte"
          class="px-4 py-2 text-sm rounded-lg flex items-center gap-1 transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Reportar
        </button>

        <a v-if="telefonoSoporte" :href="`tel:${telefonoSoporte}`"
          class="px-4 py-2 text-sm rounded-lg flex items-center gap-1 transition-colors bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Llamar
        </a>
      </div>

      <!-- Contacto alternativo minimalista -->
      <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">
        O escribe a <a :href="`mailto:${emailSoporte}`" class="underline text-emerald-600 dark:text-emerald-400">{{
          emailSoporte }}</a>
      </p>
    </div>

    <!-- Detalles técnicos (solo desarrollo) -->
    <div v-if="isDevEnvironment"
      class="mt-8 max-w-md w-full text-xs p-3 rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-800/50 dark:text-gray-400">
      <p><strong class="font-mono">DEBUG:</strong> {{ error.url }}</p>
      <p class="truncate mt-1 font-mono">{{ error.message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Datos de contacto
const emailSoporte = "sthalin.11@gmail.com";
const telefonoSoporte = "+51 910985938";

// Modo oscuro/claro
const isDark = ref(false);
const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark', isDark.value);
};

// Props del error
const props = defineProps({
  error: {
    type: Object,
    default: () => ({
      url: "",
      statusCode: 500,
      message: "Error desconocido",
    })
  }
});

// Detectar entorno de desarrollo
const isDevEnvironment = process.env.NODE_ENV === 'development';

// Métodos
const voltarHome = () => clearError({ redirect: "/" });
const contactarSoporte = () => window.open(`mailto:${emailSoporte}`, '_blank');
const enviarReporte = () => window.open(`mailto:${emailSoporte}?subject=Reporte de error ${props.error.statusCode}&body=Detalles del error: ${props.error.message}`, '_blank');
</script>

<style scoped>
/* Animaciones */
.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

/* Mejorar legibilidad en móviles */
@media (max-width: 640px) {
  h1 {
    font-size: 5rem;
  }

  .max-w-md {
    max-width: 95%;
  }
}
</style>