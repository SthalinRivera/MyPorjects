<template>
  <div class="">
    <!-- Sección Parallax -->
    <div
      class="relative overflow-hidden rounded-xl my-8  flex items-center justify-center group border-2 border-dashed border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900/50">

      <!-- Patrón de fondo sutil (modo claro/oscuro) -->
      <div
        class="absolute inset-0 opacity-10 dark:opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]">
        <div
          class="absolute inset-0 [background:radial-gradient(circle_400px_at_50%_30%,#ec4899,transparent)] dark:[background:radial-gradient(circle_400px_at_50%_30%,#7e22ce,transparent)]">
        </div>
      </div>

      <!-- Contenido principal -->
      <div class="relative z-10 text-center p-6 w-full max-w-md mx-auto">
        <!-- Icono -->
        <div class="mb-5 inline-flex p-4 rounded-full bg-pink-50 dark:bg-slate-800 shadow-inner">
          <UIcon name="i-heroicons-bell-alert" class="w-10 h-10 text-pink-500 dark:text-pink-400" />
        </div>

        <!-- Texto -->
        <h3 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          ¿Quieres ser el primero en saber?
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Déjanos tu correo y te avisaremos cuando lleguen nuevas promociones
        </p>

        <!-- Formulario de suscripción -->
        <div class="flex flex-col sm:flex-row gap-3 w-full max-w-xs mx-auto justify-center items-center">
          <UInput v-model="email" placeholder="tucorreo@ejemplo.com" icon="i-heroicons-envelope" class="flex-grow" :ui="{
            icon: {
              base: 'text-gray-400 dark:text-gray-500',
            },
            variant: {
              outline: 'dark:bg-slate-800 dark:border-slate-700'
            }
          }" />
          <UButton @click="subscribe" size="xl" :loading="isSubmitting" color="pink"
            class="shadow hover:shadow-md transition-shadow">
            Suscribirse
          </UButton>
        </div>


        <!-- Texto pequeño -->
        <p class="text-xs text-gray-400 dark:text-gray-500 mt-4">
          Solo notificaciones importantes. Puedes darte de baja cuando quieras.
        </p>
      </div>

      <!-- Efectos decorativos (modo claro/oscuro) -->
      <div class="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-500/5 dark:bg-pink-400/5 rounded-full blur-xl"></div>
      <div class="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/5 dark:bg-purple-400/5 rounded-full blur-xl"></div>
    </div>
  </div>
</template>
<script setup>
const { $toast } = useNuxtApp();
const email = ref('');
const isSubmitting = ref(false);

const subscribe = async () => {
  if (!email.value || !/^\S+@\S+\.\S+$/.test(email.value)) {
    $toast.error('Por favor ingresa un correo electrónico válido');
    return;
  }

  isSubmitting.value = true;

  try {
    // Simulación de envío a API (reemplazar con tu lógica real)
    await new Promise(resolve => setTimeout(resolve, 1500));

    $toast.success('¡Bienvenida al Club! Revisa tu correo para obtener tu descuento.', {
      timeout: 5000
    });

    // Resetear formulario
    email.value = '';

  } catch (error) {
    $toast.error('Ocurrió un error al procesar tu suscripción. Por favor intenta nuevamente.');
  } finally {
    isSubmitting.value = false;
  }
};
</script>
