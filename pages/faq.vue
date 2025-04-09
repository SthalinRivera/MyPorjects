<template>
  <div class="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h1 class="text-3xl font-bold text-amber-600 mb-2">Preguntas Frecuentes</h1>
      <p class="text-gray-600 dark:text-gray-300">Encuentra respuestas a las dudas más comunes sobre SunshineMadeForYou
      </p>
    </div>

    <div class="space-y-6">
      <!-- Sección Envíos -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <h2 class="text-xl font-semibold bg-amber-50 dark:bg-amber-900/20 px-6 py-4 text-amber-700 dark:text-amber-300">
          <UIcon name="i-heroicons-truck" class="mr-2" />
          Envíos y entregas
        </h2>
        <div class="divide-y divide-gray-200 dark:divide-gray-700">
          <div class="p-6">
            <h3 class="font-medium text-lg text-gray-900 dark:text-white mb-2">¿Cuánto tardan los envíos?</h3>
            <p class="text-gray-600 dark:text-gray-300">Los envíos estándar tardan 3-5 días hábiles. Envíos express:
              24-48 horas (productos seleccionados).</p>
          </div>
          <div class="p-6">
            <h3 class="font-medium text-lg text-gray-900 dark:text-white mb-2">¿Hacen envíos internacionales?</h3>
            <p class="text-gray-600 dark:text-gray-300">Sí, enviamos a todo el mundo (7-15 días hábiles). Los pedidos
              internacionales pueden estar sujetos a aduanas.</p>
          </div>
        </div>
      </div>

      <!-- Sección Pagos -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <h2 class="text-xl font-semibold bg-amber-50 dark:bg-amber-900/20 px-6 py-4 text-amber-700 dark:text-amber-300">
          <UIcon name="i-heroicons-credit-card" class="mr-2" />
          Pagos y facturación
        </h2>
        <div class="divide-y divide-gray-200 dark:divide-gray-700">
          <div class="p-6">
            <h3 class="font-medium text-lg text-gray-900 dark:text-white mb-2">¿Qué métodos de pago aceptan?</h3>
            <p class="text-gray-600 dark:text-gray-300">Tarjetas (Visa, Mastercard, Amex), PayPal, y transferencias
              bancarias.</p>
          </div>
          <div class="p-6">
            <h3 class="font-medium text-lg text-gray-900 dark:text-white mb-2">¿Es seguro pagar en su tienda?</h3>
            <p class="text-gray-600 dark:text-gray-300">Usamos encriptación SSL y no almacenamos tus datos de pago.</p>
          </div>
        </div>
      </div>

      <!-- Sección Productos -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <h2 class="text-xl font-semibold bg-amber-50 dark:bg-amber-900/20 px-6 py-4 text-amber-700 dark:text-amber-300">
          <UIcon name="i-heroicons-sparkles" class="mr-2" />
          Productos y materiales
        </h2>
        <div class="divide-y divide-gray-200 dark:divide-gray-700">
          <div class="p-6">
            <h3 class="font-medium text-lg text-gray-900 dark:text-white mb-2">¿Qué materiales usan?</h3>
            <p class="text-gray-600 dark:text-gray-300">Plata 925, oro 14k, piedras semipreciosas, acero quirúrgico y
              materiales ecológicos.</p>
          </div>
          <div class="p-6">
            <h3 class="font-medium text-lg text-gray-900 dark:text-white mb-2">¿Hacen productos personalizados?</h3>
            <p class="text-gray-600 dark:text-gray-300">Sí, contáctanos con tu idea para una cotización personalizada.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-12 text-center">
      <p class="text-gray-500 dark:text-gray-400">¿No encontraste lo que buscabas?</p>
      <UButton to="/contacto" color="amber" variant="solid" label="Contáctanos" class="mt-3" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>