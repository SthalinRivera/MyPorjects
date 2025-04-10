<template>
  <div class="group relative bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg overflow-hidden transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
    <NuxtLink :to="`/products/${product.slug}`" class="block">
      <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
        <img 
          :src="product.image || '/placeholder-product.jpg'" 
          :alt="product.name"
          class="w-full h-48 object-cover object-center group-hover:opacity-90 transition-opacity"
        />
      </div>
      
      <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          {{ product.name }}
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">
          {{ product.shortDescription || 'No description available' }}
        </p>
        
        <div class="flex items-center justify-between mt-3">
          <span class="text-lg font-bold text-gray-900 dark:text-white">
            {{ formatCurrency(product.price) }}
          </span>
          <span 
            v-if="product.discount"
            class="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
          >
            -{{ product.discount }}%
          </span>
        </div>
      </div>
    </NuxtLink>
    
    <div class="px-4 pb-4">
      <button 
        @click.stop="addToCart(product)"
        class="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Añadir
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface Product {
  id: number
  slug: string
  name: string
  shortDescription?: string
  description?: string
  price: number
  discount?: number
  image?: string
  categoryId: number
  stock: number
  rating?: number
}

defineProps<{
  product: Product
}>()

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(value)
}

const addToCart = (product: Product) => {
  // Implementar lógica del carrito aquí
  console.log('Added to cart:', product)
  // Puedes usar un store como Pinia para manejar el estado del carrito
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>