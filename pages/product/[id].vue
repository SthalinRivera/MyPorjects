<template>
    <div class="my-8">
        <h1 class="text-4xl text-center mb-6 font-semibold text-gray-900 dark:text-gray-50">Details Product</h1>

        <div
            class="flex flex-col sm:flex-row mx-auto overflow-hidden bg-slate-50 dark:bg-gray-700 rounded-lg shadow-lg p-4">
            <!-- Imagen del producto -->
            <div class="p-4 sm:w-1/2">
                <img class="rounded-lg object-cover w-full sm:h-80 h-60 shadow-lg" :src="product.imageUrl"
                    alt="Product Image" />
            </div>

            <!-- Detalles del producto -->
            <div class="sm:p-6 p-4 sm:w-1/2 flex flex-col justify-between">
                <div>
                    <a href="#"
                        class="block sm:mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-50 hover:text-gray-600 dark:hover:text-gray-300 hover:underline">
                        {{ product.name }}
                    </a>
                    <p class="mt-2 text-lg font-bold text-gray-700 dark:text-gray-200">Description</p>
                    <p class="mt-2 text-sm text-gray-700 dark:text-gray-400">
                        {{ product.description }}
                    </p>

                    <p class="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                        <strong>Precio:</strong> S/ {{ product.price }}
                    </p>

                    <p class="mt-1 text-lg font-medium text-gray-900 dark:text-gray-100">
                        <strong>Stock:</strong> {{ product.stock }} disponible(s)
                    </p>


                </div>


                <!-- Botón de agregar al carrito -->
                <div class="mt-4">
                    <button @click="addToCard(product); isOpen = true" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out 
        dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700 dark:text-white">
                        Add to Cart
                    </button>

                </div>

                <!-- Información adicional sobre envíos, cambios y entregas -->
                <div class="mt-6 space-y-4">
                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5 text-green-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <p class="ml-2 text-sm text-gray-700 dark:text-gray-400">Envío gratis por compras superiores a
                            S/ 100.00</p>
                    </div>

                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5 text-blue-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <p class="ml-2 text-sm text-gray-700 dark:text-gray-400">Cambios y devoluciones: 06 meses para
                            realizar cambios y devoluciones.</p>
                    </div>

                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5 text-yellow-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <p class="ml-2 text-sm text-gray-700 dark:text-gray-400">Entrega en tiendas: Retira tu pedido en
                            la tienda más cercana sin costo adicional.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Productos similares -->
        <div class="mt-8">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-50">Similar products</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <div v-for="similarProduct in products" :key="similarProduct.id"
                    class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <img class="rounded-t-lg object-cover w-full h-48" :src="similarProduct.imageUrl"
                        alt="Similar Product" />
                    <div class="p-4">
                        <a href="#"
                            class="text-xl font-semibold text-gray-900 dark:text-gray-50 hover:text-gray-600 dark:hover:text-gray-300">
                            {{ similarProduct.name }}
                        </a>
                        <p class="text-gray-700 dark:text-gray-400 mt-2">{{ similarProduct.description.slice(0, 50)
                            }}...</p>
                        <p class="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">S/ {{ similarProduct.price
                            }}</p>
                        <NuxtLink :to="{ name: 'product-id', params: { id: similarProduct.id.toString() } }"
                            class="mt-2 inline-block text-blue-500 hover:text-blue-700">Ver más</NuxtLink>
                    </div>
                </div>
            </div>
        </div>


        <!-- Modal Component -->
        <ShoppingCart :isOpen="isOpen" @update:isOpen="isOpen = $event">

        </ShoppingCart>


    </div>
</template>
<script setup lang="ts">

// Importación de tipos e interfaces necesarias
import type { Product } from '~/interfaces/product';

// Importación del store y otras funciones útiles
import { useProductShoppingCartStore } from '~/stores/productShoppingCart';
const { $toast } = useNuxtApp();
const route = useRoute();

// Obtención del parámetro 'id' de la ruta
const { id } = route.params;

// Definición de estado reactivo para controlar la visibilidad del modal
const isOpen = ref(false); // Controla la visibilidad del modal

// Desestructuración del store para acceder a la función de agregar productos al carrito
const { addProductShoppingCart } = useProductShoppingCartStore();

// Función que se ejecuta al agregar un producto al carrito
const addToCard = (product: Product) => {
    // Asegura que el producto tenga una cantidad por defecto de 1 si no la tiene
    if (!product.quantity) {
        product.quantity = 1;
    }
    addProductShoppingCart(product); // Añade el producto al carrito
    isOpen.value = true; // Abre el modal de confirmación
    $toast.success("Added to Car!"); // Muestra un mensaje de éxito
};

// Obtención de los datos del producto usando el ID desde la API
const { data: product, error } = await useFetch(`/api/v1/product/${id}`);

// Manejo de errores si no se encuentra el producto
if (error.value) {
    throw createError({
        status: 404,
        statusText: "Product no encontrado"
    });
}

// Obtención de los productos relacionados a la categoría del producto actual
const categoryId = product.value.categoryId; // Obtiene el ID de la categoría del producto actual

const { data: products } = await useFetch(`/api/v1/productByCategoryId/${categoryId}`);

</script>


<style lang="scss" scoped></style>