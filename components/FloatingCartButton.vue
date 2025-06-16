<template>
  <!-- Mobile Bottom Navigation -->
  <div v-if="isMobile" class="lg:hidden fixed bottom-0 left-0 right-0 z-50 
            bg-white/90 dark:bg-gray-800/90 backdrop-blur-md
            w-full h-16 border-t border-gray-200 dark:border-gray-700 shadow-lg">

    <div class="relative flex justify-around items-center h-full px-1">
      <!-- Inicio -->
      <NuxtLink to="/" class="group relative flex flex-col items-center justify-center p-2 
               text-gray-500 dark:text-gray-400 transition-all duration-300 ease-out
               hover:text-blue-500 dark:hover:text-blue-400" active-class="!text-blue-500 dark:!text-blue-400">

        <!-- Active Indicator -->
        <div class="absolute -top-1 w-6 h-1 bg-blue-500 dark:bg-blue-400 
                    rounded-full transition-all duration-300 transform scale-x-0"
          :class="{ 'scale-x-100': $route.path === '/' }">
        </div>

        <!-- Icon Container -->
        <div class="relative flex items-center justify-center w-9 h-9 rounded-xl
                    transition-all duration-300 group-hover:bg-blue-500/10 dark:group-hover:bg-blue-400/10"
          :class="{ 'bg-blue-500/10 dark:bg-blue-400/10': $route.path === '/' }">
          <i class="ri-home-3-line text-xl transition-all duration-300"
            :class="{ 'scale-110': $route.path === '/' }"></i>
        </div>

        <!-- Label -->
        <span class="text-[0.65rem] font-medium mt-0.5 tracking-wide opacity-80 
                   transition-all duration-300"
          :class="{ 'opacity-100 font-semibold': $route.path === '/' }">Inicio</span>
      </NuxtLink>

      <!-- Servicios -->
      <NuxtLink to="/services" class="group relative flex flex-col items-center justify-center p-2 
               text-gray-500 dark:text-gray-400 transition-all duration-300 ease-out
               hover:text-purple-500 dark:hover:text-purple-400" active-class="!text-purple-500 dark:!text-purple-400">

        <div class="absolute -top-1 w-6 h-1 bg-purple-500 dark:bg-purple-400 
                    rounded-full transition-all duration-300 transform scale-x-0"
          :class="{ 'scale-x-100': $route.path === '/services' }">
        </div>

        <div class="relative flex items-center justify-center w-9 h-9 rounded-xl
                    transition-all duration-300 group-hover:bg-purple-500/10 dark:group-hover:bg-purple-400/10"
          :class="{ 'bg-purple-500/10 dark:bg-purple-400/10': $route.path === '/services' }">
          <i class="ri-flashlight-line text-xl transition-all duration-300"
            :class="{ 'scale-110': $route.path === '/services' }"></i>
        </div>

        <span class="text-[0.65rem] font-medium mt-0.5 tracking-wide opacity-80 
                   transition-all duration-300"
          :class="{ 'opacity-100 font-semibold': $route.path === '/services' }">Servicios</span>
      </NuxtLink>

      <!-- Proyectos -->
      <NuxtLink to="/product" class="group relative flex flex-col items-center justify-center p-2 
               text-gray-500 dark:text-gray-400 transition-all duration-300 ease-out
               hover:text-emerald-500 dark:hover:text-emerald-400"
        active-class="!text-emerald-500 dark:!text-emerald-400">

        <div class="absolute -top-1 w-6 h-1 bg-emerald-500 dark:bg-emerald-400 
                    rounded-full transition-all duration-300 transform scale-x-0"
          :class="{ 'scale-x-100': $route.path === '/product' }">
        </div>

        <div class="relative flex items-center justify-center w-9 h-9 rounded-xl
                    transition-all duration-300 group-hover:bg-emerald-500/10 dark:group-hover:bg-emerald-400/10"
          :class="{ 'bg-emerald-500/10 dark:bg-emerald-400/10': $route.path === '/product' }">
          <i class="ri-stack-line text-xl transition-all duration-300"
            :class="{ 'scale-110': $route.path === '/product' }"></i>
        </div>

        <span class="text-[0.65rem] font-medium mt-0.5 tracking-wide opacity-80 
                   transition-all duration-300"
          :class="{ 'opacity-100 font-semibold': $route.path === '/product' }">Proyectos</span>
      </NuxtLink>

      <!-- Herramientas -->
      <NuxtLink to="/tools" class="group relative flex flex-col items-center justify-center p-2 
               text-gray-500 dark:text-gray-400 transition-all duration-300 ease-out
               hover:text-amber-500 dark:hover:text-amber-400" active-class="!text-amber-500 dark:!text-amber-400">

        <div class="absolute -top-1 w-6 h-1 bg-amber-500 dark:bg-amber-400 
                    rounded-full transition-all duration-300 transform scale-x-0"
          :class="{ 'scale-x-100': $route.path === '/tools' }">
        </div>

        <div class="relative flex items-center justify-center w-9 h-9 rounded-xl
                    transition-all duration-300 group-hover:bg-amber-500/10 dark:group-hover:bg-amber-400/10"
          :class="{ 'bg-amber-500/10 dark:bg-amber-400/10': $route.path === '/tools' }">
          <i class="ri-cpu-line text-xl transition-all duration-300"
            :class="{ 'scale-110': $route.path === '/tools' }"></i>
        </div>

        <span class="text-[0.65rem] font-medium mt-0.5 tracking-wide opacity-80 
                   transition-all duration-300"
          :class="{ 'opacity-100 font-semibold': $route.path === '/tools' }">Herramientas</span>
      </NuxtLink>

      <!-- Cuenta/Login -->
      <NuxtLink to="/profile" class="group relative flex flex-col items-center justify-center p-2 
               text-gray-500 dark:text-gray-400 transition-all duration-300 ease-out
               hover:text-pink-500 dark:hover:text-pink-400" active-class="!text-pink-500 dark:!text-pink-400">

        <div class="absolute -top-1 w-6 h-1 bg-pink-500 dark:bg-pink-400 
                    rounded-full transition-all duration-300 transform scale-x-0"
          :class="{ 'scale-x-100': $route.path === '/profile' }">
        </div>

        <div class="relative flex items-center justify-center w-9 h-9 rounded-xl
                    transition-all duration-300 group-hover:bg-pink-500/10 dark:group-hover:bg-pink-400/10"
          :class="{ 'bg-pink-500/10 dark:bg-pink-400/10': $route.path === '/profile' }">
          <i class="ri-user-3-line text-xl transition-all duration-300"
            :class="{ 'scale-110': $route.path === '/profile' }"></i>
        </div>

        <span class="text-[0.65rem] font-medium mt-0.5 tracking-wide opacity-80 
                   transition-all duration-300"
          :class="{ 'opacity-100 font-semibold': $route.path === '/profile' }">Cuenta</span>
      </NuxtLink>
    </div>
  </div>

  <!-- Modal del carrito -->
  <ShoppingCart :isOpen="isCartOpen" @update:isOpen="isCartOpen = $event" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const { totalItems } = storeToRefs(useProductShoppingCartStore());
const { totalItemsFavorite } = storeToRefs(useProductStore());
const { loggedIn } = useUserSession();
const isCartOpen = ref(false);
const route = useRoute();

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