<template>
  <div class="">
    <!-- Sección Parallax con fondo de joyería -->
    <div
      class="relative overflow-hidden rounded-xl my-8 flex items-center justify-center group border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900/90 h-96 ">
      <!-- Imagen de fondo de joyería (con overlay) -->
      <div class="absolute inset-0 w-full h-full">
        <div class="absolute inset-0 bg-black/40 dark:bg-black/60 z-10"></div>
        <img src="/banner-2.jpg" alt="Joyería de lujo" class="w-full h-full object-cover" />
      </div>

      <!-- Patrón decorativo -->
      <div
        class="absolute inset-0 z-20 opacity-30 dark:opacity-40 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]">
        <div
          class="absolute inset-0 [background:radial-gradient(circle_400px_at_50%_30%,#f59e0b,transparent)] dark:[background:radial-gradient(circle_400px_at_50%_30%,#f59e0b,transparent)]">
        </div>
      </div>

      <!-- Contenido principal -->
      <div class="relative z-30 text-center p-2 w-full ">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div class="flex flex-col md:flex-row items-center justify-between gap-8 ">
            <div class="text-center md:text-left">
              <!-- Icono -->
              <div
                class="mb-5 inline-flex p-3 rounded-full bg-amber-50 dark:bg-amber-900/30 shadow-inner border border-amber-200 dark:border-amber-800/50">
                <UIcon name="i-heroicons-sparkles" class="w-8 h-8 text-amber-500 dark:text-amber-300" />
              </div>
              <!-- Texto -->
              <h3 class="text-2xl font-bold text-white dark:text-white mb-2">
                Descubre nuestras colecciones de belleza y flores
              </h3>
              <p class="text-gray-100 dark:text-gray-200 mb-6">
                Sé el primero en conocer nuestros productos de cuidado personal y arreglos florales únicos, con acceso a
                promociones especiales
              </p>
            </div>
            <div class="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <div class="relative flex-grow">
                <input type="email" v-model="email" placeholder="tu@email.com" :disabled="isSubmitting" class="w-full px-5 py-3 pr-12 rounded-lg border border-gray-200 dark:border-gray-600
                  focus:ring-2 focus:ring-purple-500 focus:border-transparent
                  shadow-sm transition-all duration-200
                  bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200
                  disabled:bg-gray-100 disabled:text-gray-400 dark:disabled:bg-gray-700" />
                <svg class="absolute right-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <button @click="subscribe" :disabled="isSubmitting" class="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700
                dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600
                text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg 
                transition-all duration-300 transform hover:-translate-y-0.5 
                focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2
                disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none">
                <span v-if="isSubmitting" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>
                  Enviando...
                </span>
                <span v-else>Suscribirse</span>
              </button>
            </div>

          </div>
        </div>
      </div>
      <!-- Efectos decorativos (elementos de joyería) -->
      <div
        class="absolute top-8 left-8 w-16 h-16 rounded-full border-2 border-amber-300/30 dark:border-amber-500/20 z-20 backdrop-blur-sm">
      </div>
      <div
        class="absolute bottom-12 right-12 w-24 h-24 rounded-full border-2 border-amber-300/30 dark:border-amber-500/20 z-20 backdrop-blur-sm">
      </div>
      <div
        class="absolute top-1/2 -translate-y-1/2 -left-6 w-12 h-12 rounded-full bg-amber-400/10 dark:bg-amber-400/5 z-20 backdrop-blur-sm">
      </div>

    </div>
  </div>
</template>

<script setup>
const { $toast } = useNuxtApp();
const email = ref('');
const isSubmitting = ref(false);

// Validación de email mejorada
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const subscribe = async () => {
  // Validación de email
  if (!email.value.trim()) {
    $toast.error('Por favor ingresa un correo electrónico');
    return;
  }

  if (!isValidEmail(email.value)) {
    $toast.error('Por favor ingresa un correo electrónico válido');
    return;
  }

  // Actualizar estado
  isSubmitting.value = true;

  try {
    // Simulación de envío a API (reemplazar con tu lógica real)
    await new Promise(resolve => setTimeout(resolve, 1500));

    $toast.success('¡Bienvenido/a a nuestra colección exclusiva! Te hemos enviado un código de descuento a tu correo.', {
      timeout: 5000
    });

    // Resetear formulario
    email.value = '';
  } catch (error) {
    console.error('Error al procesar la suscripción:', error);
    $toast.error('Ocurrió un error al procesar tu suscripción. Por favor intenta nuevamente.');
  } finally {
    isSubmitting.value = false;
  }
};
</script>