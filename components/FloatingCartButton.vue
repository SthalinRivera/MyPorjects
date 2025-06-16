<template>
  <!-- Mobile Bottom Navigation -->
  <div v-if="isMobile" class="lg:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 
           bg-white/20 dark:bg-black/20 backdrop-blur-3xl rounded-3xl 
           shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(255,255,255,0.05)]
           border border-white/30 dark:border-white/10
           before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-r 
           before:from-blue-500/10 before:via-purple-500/10 before:to-pink-500/10
           before:blur-xl before:-z-10" style="width: calc(100% - 3rem); max-width: 360px; height: 72px;">

    <!-- Animated Background Glow -->
    <div class="absolute inset-0 rounded-3xl overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 
                  animate-pulse opacity-60"></div>
      <div class="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 via-violet-500/20 to-fuchsia-500/20 
                  rounded-3xl blur-xl opacity-30 animate-pulse"></div>
    </div>

    <div class="relative flex justify-around items-center h-full px-1">
      <!-- Inicio -->
      <NuxtLink to="/" class="group relative flex flex-col items-center justify-center p-3 
               text-gray-500 dark:text-gray-400 transition-all duration-500 ease-out
               hover:text-blue-400 dark:hover:text-blue-300"
        active-class="!text-white dark:!text-white scale-125 transform -translate-y-1">

        <!-- Active Background Glow -->
        <div class="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 
                    rounded-2xl blur-lg transition-all duration-500 scale-0 group-hover:scale-100"
          :class="{ 'scale-110 opacity-100': $route.path === '/', 'opacity-0': $route.path !== '/' }"></div>

        <!-- Active Indicator -->
        <div class="absolute -top-2 w-8 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 
                    rounded-full transition-all duration-500 transform scale-x-0 group-hover:scale-x-100"
          :class="{ 'scale-x-100 opacity-100 shadow-[0_0_10px_rgba(59,130,246,0.6)]': $route.path === '/', 'opacity-0': $route.path !== '/' }">
        </div>

        <!-- Icon Container -->
        <div class="relative flex items-center justify-center w-10 h-10 rounded-2xl
                    bg-gradient-to-br from-blue-500/10 to-cyan-500/10
                    group-hover:from-blue-500/20 group-hover:to-cyan-500/20
                    transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]
                    border border-transparent" :class="{
                      'from-blue-500/40 to-cyan-500/40 shadow-[0_0_25px_rgba(59,130,246,0.7)] border-blue-400/50 bg-blue-500/20': $route.path === '/',
                      'scale-110': $route.path === '/'
                    }">
          <i class="ri-home-3-line text-xl transition-all duration-500 
                   group-hover:scale-110 group-hover:rotate-3"
            :class="{ 'scale-125 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]': $route.path === '/' }"></i>
        </div>

        <!-- Label -->
        <span class="text-[0.65rem] font-bold mt-1 tracking-wide opacity-70 
                   group-hover:opacity-100 transition-all duration-300"
          :class="{ 'opacity-100 text-white font-extrabold text-shadow-glow': $route.path === '/' }">Inicio</span>
      </NuxtLink>

      <!-- Servicios -->
      <NuxtLink to="/services" class="group relative flex flex-col items-center justify-center p-3 
               text-gray-500 dark:text-gray-400 transition-all duration-500 ease-out
               hover:text-purple-400 dark:hover:text-purple-300"
        active-class="!text-white dark:!text-white scale-125 transform -translate-y-1">

        <!-- Active Background Glow -->
        <div class="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-violet-500/30 
                    rounded-2xl blur-lg transition-all duration-500 scale-0 group-hover:scale-100"
          :class="{ 'scale-110 opacity-100': $route.path === '/services', 'opacity-0': $route.path !== '/services' }">
        </div>

        <div class="absolute -top-2 w-8 h-1 bg-gradient-to-r from-purple-400 to-violet-400 
                    rounded-full transition-all duration-500 transform scale-x-0 group-hover:scale-x-100"
          :class="{ 'scale-x-100 opacity-100 shadow-[0_0_10px_rgba(147,51,234,0.6)]': $route.path === '/services', 'opacity-0': $route.path !== '/services' }">
        </div>

        <div class="relative flex items-center justify-center w-10 h-10 rounded-2xl
                    bg-gradient-to-br from-purple-500/10 to-violet-500/10
                    group-hover:from-purple-500/20 group-hover:to-violet-500/20
                    transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(147,51,234,0.3)]
                    border border-transparent" :class="{
                      'from-purple-500/40 to-violet-500/40 shadow-[0_0_25px_rgba(147,51,234,0.7)] border-purple-400/50 bg-purple-500/20': $route.path === '/services',
                      'scale-110': $route.path === '/services'
                    }">
          <i class="ri-flashlight-line text-xl transition-all duration-500 
                   group-hover:scale-110 group-hover:-rotate-3"
            :class="{ 'scale-125 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]': $route.path === '/services' }"></i>
        </div>

        <span class="text-[0.65rem] font-bold mt-1 tracking-wide opacity-70 
                   group-hover:opacity-100 transition-all duration-300"
          :class="{ 'opacity-100 text-white font-extrabold text-shadow-glow': $route.path === '/services' }">Servicios</span>
      </NuxtLink>

      <!-- Proyectos -->
      <NuxtLink to="/product" class="group relative flex flex-col items-center justify-center p-3 
               text-gray-500 dark:text-gray-400 transition-all duration-500 ease-out
               hover:text-emerald-400 dark:hover:text-emerald-300"
        active-class="!text-white dark:!text-white scale-125 transform -translate-y-1">

        <!-- Active Background Glow -->
        <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-teal-500/30 
                    rounded-2xl blur-lg transition-all duration-500 scale-0 group-hover:scale-100"
          :class="{ 'scale-110 opacity-100': $route.path === '/product', 'opacity-0': $route.path !== '/product' }">
        </div>

        <div class="absolute -top-2 w-8 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 
                    rounded-full transition-all duration-500 transform scale-x-0 group-hover:scale-x-100"
          :class="{ 'scale-x-100 opacity-100 shadow-[0_0_10px_rgba(34,197,94,0.6)]': $route.path === '/product', 'opacity-0': $route.path !== '/product' }">
        </div>

        <div class="relative flex items-center justify-center w-10 h-10 rounded-2xl
                    bg-gradient-to-br from-emerald-500/10 to-teal-500/10
                    group-hover:from-emerald-500/20 group-hover:to-teal-500/20
                    transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]
                    border border-transparent" :class="{
                      'from-emerald-500/40 to-teal-500/40 shadow-[0_0_25px_rgba(34,197,94,0.7)] border-emerald-400/50 bg-emerald-500/20': $route.path === '/product',
                      'scale-110': $route.path === '/product'
                    }">
          <i class="ri-stack-line text-xl transition-all duration-500 
                   group-hover:scale-110 group-hover:rotate-3"
            :class="{ 'scale-125 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]': $route.path === '/product' }"></i>
        </div>

        <span class="text-[0.65rem] font-bold mt-1 tracking-wide opacity-70 
                   group-hover:opacity-100 transition-all duration-300"
          :class="{ 'opacity-100 text-white font-extrabold text-shadow-glow': $route.path === '/product' }">Proyectos</span>
      </NuxtLink>

      <!-- Herramientas -->
      <NuxtLink to="/tools" class="group relative flex flex-col items-center justify-center p-3 
               text-gray-500 dark:text-gray-400 transition-all duration-500 ease-out
               hover:text-amber-400 dark:hover:text-amber-300"
        active-class="!text-white dark:!text-white scale-125 transform -translate-y-1">

        <!-- Active Background Glow -->
        <div class="absolute inset-0 bg-gradient-to-br from-amber-500/30 to-orange-500/30 
                    rounded-2xl blur-lg transition-all duration-500 scale-0 group-hover:scale-100"
          :class="{ 'scale-110 opacity-100': $route.path === '/tools', 'opacity-0': $route.path !== '/tools' }"></div>

        <div class="absolute -top-2 w-8 h-1 bg-gradient-to-r from-amber-400 to-orange-400 
                    rounded-full transition-all duration-500 transform scale-x-0 group-hover:scale-x-100"
          :class="{ 'scale-x-100 opacity-100 shadow-[0_0_10px_rgba(245,158,11,0.6)]': $route.path === '/tools', 'opacity-0': $route.path !== '/tools' }">
        </div>

        <div class="relative flex items-center justify-center w-10 h-10 rounded-2xl
                    bg-gradient-to-br from-amber-500/10 to-orange-500/10
                    group-hover:from-amber-500/20 group-hover:to-orange-500/20
                    transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]
                    border border-transparent" :class="{
                      'from-amber-500/40 to-orange-500/40 shadow-[0_0_25px_rgba(245,158,11,0.7)] border-amber-400/50 bg-amber-500/20': $route.path === '/tools',
                      'scale-110': $route.path === '/tools'
                    }">
          <i class="ri-cpu-line text-xl transition-all duration-500 
                   group-hover:scale-110 group-hover:-rotate-3"
            :class="{ 'scale-125 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]': $route.path === '/tools' }"></i>
        </div>

        <span class="text-[0.65rem] font-bold mt-1 tracking-wide opacity-70 
                   group-hover:opacity-100 transition-all duration-300"
          :class="{ 'opacity-100 text-white font-extrabold text-shadow-glow': $route.path === '/tools' }">Herramientas</span>
      </NuxtLink>

      <!-- Cuenta/Login -->
      <NuxtLink to="/profile" class="group relative flex flex-col items-center justify-center p-3 
               text-gray-500 dark:text-gray-400 transition-all duration-500 ease-out
               hover:text-pink-400 dark:hover:text-pink-300"
        active-class="!text-white dark:!text-white scale-125 transform -translate-y-1">

        <!-- Active Background Glow -->
        <div class="absolute inset-0 bg-gradient-to-br from-pink-500/30 to-rose-500/30 
                    rounded-2xl blur-lg transition-all duration-500 scale-0 group-hover:scale-100"
          :class="{ 'scale-110 opacity-100': $route.path === '/profile', 'opacity-0': $route.path !== '/profile' }">
        </div>

        <div class="absolute -top-2 w-8 h-1 bg-gradient-to-r from-pink-400 to-rose-400 
                    rounded-full transition-all duration-500 transform scale-x-0 group-hover:scale-x-100"
          :class="{ 'scale-x-100 opacity-100 shadow-[0_0_10px_rgba(236,72,153,0.6)]': $route.path === '/profile', 'opacity-0': $route.path !== '/profile' }">
        </div>

        <div class="relative flex items-center justify-center w-10 h-10 rounded-2xl
                    bg-gradient-to-br from-pink-500/10 to-rose-500/10
                    group-hover:from-pink-500/20 group-hover:to-rose-500/20
                    transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]
                    border border-transparent" :class="{
                      'from-pink-500/40 to-rose-500/40 shadow-[0_0_25px_rgba(236,72,153,0.7)] border-pink-400/50 bg-pink-500/20': $route.path === '/profile',
                      'scale-110': $route.path === '/profile'
                    }">
          <i class="ri-user-3-line text-xl transition-all duration-500 
                   group-hover:scale-110 group-hover:rotate-3"
            :class="{ 'scale-125 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]': $route.path === '/profile' }"></i>
        </div>

        <span class="text-[0.65rem] font-bold mt-1 tracking-wide opacity-70 
                   group-hover:opacity-100 transition-all duration-300"
          :class="{ 'opacity-100 text-white font-extrabold text-shadow-glow': $route.path === '/profile' }">Cuenta</span>
      </NuxtLink>
    </div>

    <!-- Bottom Glow Effect -->
    <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-2 
                bg-gradient-to-r from-blue-500/20 via-purple-500/30 to-pink-500/20 
                rounded-full blur-lg opacity-60 animate-pulse"></div>
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

<style scoped>
/* Efecto de iluminación mejorado cuando está activo */
.router-link-active i {
  text-shadow: 0 0 15px currentColor, 0 0 30px currentColor, 0 0 45px currentColor;
  filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 20px currentColor);
}

.router-link-active {
  z-index: 10;
}

/* Text shadow personalizado para labels activos */
.text-shadow-glow {
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px currentColor;
}

/* Transición suave mejorada para el cambio de página */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

/* Animación personalizada para el pulso */
@keyframes pulse {

  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }

  50% {
    opacity: 0.6;
    transform: scale(1.02);
  }
}

/* Efecto hover mejorado */
.group:hover {
  transform: translateY(-2px);
}

/* Animación de entrada suave */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.lg\\:hidden {
  animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>