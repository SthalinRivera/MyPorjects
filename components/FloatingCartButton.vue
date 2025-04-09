<template>
  <!-- Mobile Bottom Navigation (solo visible en móvil) -->
  <div v-if="isMobile"
    class="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
    <div class="flex justify-around items-center h-16">
      <!-- Inicio -->
      <NuxtLink to="/"
        class="flex flex-col items-center justify-center p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        active-class="text-blue-600 dark:text-blue-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span class="text-xs mt-1">Inicio</span>
      </NuxtLink>

      <!-- Favoritos -->
      <NuxtLink to="/product/favorites"
        class="flex flex-col items-center justify-center p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        active-class="text-blue-600 dark:text-blue-400">
        <div class="relative">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span v-if="totalItemsFavorite > 0"
            class="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full font-medium">
            {{ totalItemsFavorite }}
          </span>
        </div>
        <span class="text-xs mt-1">Favoritos</span>
      </NuxtLink>

      <!-- Carrito (con contador) -->
      <button @click="isCartOpen = true"
        class="flex flex-col items-center justify-center p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative">
        <div class="relative">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span v-if="totalItems > 0"
            class="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full font-medium">
            {{ totalItems }}
          </span>
        </div>
        <span class="text-xs mt-1">Carrito</span>
      </button>

      <!-- Cuenta/Login -->
      <NuxtLink v-if="!loggedIn" to="/profile"
        class="flex flex-col items-center justify-center p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        active-class="text-blue-600 dark:text-blue-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span class="text-xs mt-1">Cuenta</span>
      </NuxtLink>


    </div>
  </div>

  <!-- Modal del carrito -->
  <ShoppingCart :isOpen="isCartOpen" @update:isOpen="isCartOpen = $event" />
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';


const { totalItems } = storeToRefs(useProductShoppingCartStore());
const { totalItemsFavorite } = storeToRefs(useProductStore());
const { loggedIn } = useUserSession();
const isCartOpen = ref(false);

// Detectar si es móvil
const isMobile = ref(false);

onMounted(() => {
  const checkMobile = () => {
    isMobile.value = window.innerWidth < 1024;
  };

  checkMobile();
  window.addEventListener('resize', checkMobile);

  return () => {
    window.removeEventListener('resize', checkMobile);
  };
});
</script>

<style scoped>
/* Transición suave para el menú móvil */
.fixed {
  transition: transform 0.3s ease;
}

/* Evitar que el menú tape contenido en móvil */
body {
  padding-bottom: 4rem;
  @apply lg:pb-0;
}
</style>