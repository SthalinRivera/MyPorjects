<template>
    <button 
      @click="openCart"
      class="fixed bottom-6 right-6 z-50 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
      aria-label="Carrito de compras"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      <span 
        v-if="totalItems > 0"
        class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center"
      >
        {{ totalItems }}
      </span>
    </button>
  </template>
  
  <script setup lang="ts">
  const productStore = useProductShoppingCartStore();
  const { totalItems } = storeToRefs(productStore);
  
  const openCart = () => {
    // Emitir evento o usar un store para abrir el modal del carrito
    // Dependiendo de cómo tengas implementado el modal
    // Por ejemplo, si usas un store:
    const cartStore = useCartStore(); // Asume que tienes un store para el carrito
    cartStore.setCartOpen(true);
  };
  </script>