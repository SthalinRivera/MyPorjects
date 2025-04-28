<template>

  <div class="flex flex-col justify-center items-center bg-whit p-4">
    <div class="min-h-screen w-full flex flex-col justify-center items-center bg-whitp-4">
      <div class="text-center max-w-md w-full bg-white rounded-xl shadow-md p-8">

        <!-- Icono de error -->
        <div class="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <!-- Código de error grande -->
        <h1 class="text-6xl md:text-8xl font-bold text-green-600 mb-4">
          {{ error.statusCode || '500' }}
        </h1>

        <!-- Mensaje de error corto con límite de caracteres -->
        <p class="text-xl md:text-2xl font-light text-green-600 mb-6 truncate">
          {{ error.message ? error.message.substring(0, 15) : 'Error' }}
        </p>

        <!-- Botón de acción (estilo original mejorado) -->
        <button @click="voltarHome"
          class="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-200">
          Ir a la Home
        </button>

        <!-- Información adicional solo para desarrolladores -->
        <div v-if="isDevEnvironment" class="mt-6 text-left text-xs text-gray-500 p-2 bg-gray-100 rounded">
          <p><strong>Detalles técnicos:</strong></p>
          <p class="truncate">URL: {{ error.url }}</p>
          <p class="truncate">Mensaje completo: {{ error.message }}</p>
        </div>
      </div>


      <!-- Sección de soporte -->
      <div class="border-t border-gray-200 pt-6">
        <h3 class="text-lg font-medium text-gray-700 mb-3">¿Necesitas ayuda?</h3>

        <div class="flex flex-col md:flex-row gap-3 justify-center">
          <UButton @click="contactarSoporte" icon="i-heroicons-chat-bubble-bottom-center-text" color="blue"
            variant="soft">
            Contactar soporte
          </UButton>

          <UButton @click="enviarReporte" icon="i-heroicons-envelope" variant="ghost">
            Enviar reporte
          </UButton>

          <UButton @click="llamarSoporte" icon="i-heroicons-phone" variant="ghost" v-if="telefonoSoporte">
            Llamar al soporte
          </UButton>
        </div>

        <!-- Información de contacto alternativa -->
        <div class="mt-4 text-sm text-gray-500">
          <p>También puedes contactarnos en:</p>
          <p class="font-medium mt-1">
            <a :href="`mailto:${emailSoporte}`" class="text-blue-600 hover:underline">{{ emailSoporte }}</a>
            <span v-if="telefonoSoporte"> | {{ telefonoSoporte }}</span>
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>

// Datos de contacto (pueden venir de .env o configuración)
const emailSoporte = "sthalin.11@gmail.com";
const telefonoSoporte = "+51 910985938";
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

// Detectar si estamos en entorno de desarrollo
const isDevEnvironment = process.env.NODE_ENV === 'development';

const voltarHome = () => clearError({ redirect: "/" });
</script>

<style scoped>
/* Asegurar buen aspecto en móviles */
@media (max-width: 640px) {
  h1 {
    font-size: 4rem;
  }

  p {
    font-size: 1rem;
  }

  button {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }
}

/* Transición suave para el botón */
button {
  transition: all 0.2s ease;
}

/* Efecto hover para el contenedor */
div.rounded-xl:hover {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}
</style>