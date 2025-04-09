<template>
    <div class="max-w-5xl mx-auto p-6">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            Inventory Management
        </h1>

        <!-- Formulario para agregar un nuevo producto -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Add New Product
            </h2>
            <form @submit.prevent="createProduct" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input v-model="newProduct.name" type="text" placeholder="Product Name"
                    class="p-2 border rounded dark:bg-gray-700 dark:text-white" required />

                <input v-model="newProduct.price" type="number" placeholder="Price"
                    class="p-2 border rounded dark:bg-gray-700 dark:text-white" required />

                <input v-model="newProduct.quantity" type="number" placeholder="Quantity"
                    class="p-2 border rounded dark:bg-gray-700 dark:text-white" required />

                <input v-model="newProduct.image" type="text" placeholder="Image URL"
                    class="p-2 border rounded dark:bg-gray-700 dark:text-white" required />

                <select v-model="newProduct.categoryId" class="p-2 border rounded dark:bg-gray-700 dark:text-white">
                    <option disabled value="">Select Category</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                        {{ category.name }}
                    </option>
                </select>

                <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Add Product
                </button>
            </form>
        </div>

        <!-- Estado de carga -->
        <div v-if="loading" class="text-center text-gray-600 dark:text-gray-400">
            <p class="animate-pulse">Loading products...</p>
        </div>

        <!-- Tabla de Inventario -->
        <div v-else-if="products.length > 0" class="overflow-x-auto">
            <table
                class="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <thead>
                    <tr class="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
                        <th class="p-3">Image</th>
                        <th class="p-3">Product</th>
                        <th class="p-3">Price</th>
                        <th class="p-3">Quantity</th>
                        <th class="p-3">Category</th>
                        <th class="p-3 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in products" :key="product.id"
                        class="border-b border-gray-200 dark:border-gray-700">
                        <td class="p-3">
                            <img :src="product.image" alt="Product Image" class="w-12 h-12 object-cover rounded-lg">
                        </td>
                        <td class="p-3 text-gray-800 dark:text-white">{{ product.name }}</td>
                        <td class="p-3 text-gray-800 dark:text-white">${{ product.price }}</td>
                        <td class="p-3 text-gray-800 dark:text-white">{{ product.quantity }}</td>
                        <td class="p-3 text-gray-800 dark:text-white">
                            {{ getCategoryName(product.categoryId) }}
                        </td>
                        <td class="p-3 flex justify-center gap-3">
                            <button @click="editProduct(product)"
                                class="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
                                Edit
                            </button>
                            <button @click="deleteProduct(product.id)"
                                class="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal para Editar Producto -->
        <div v-if="editingProduct" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Edit Product</h2>
                <input v-model="editingProduct.name" type="text"
                    class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" required />
                <input v-model="editingProduct.price" type="number"
                    class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" required />
                <input v-model="editingProduct.quantity" type="number"
                    class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" required />
                <input v-model="editingProduct.image" type="text"
                    class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" required />
                <div class="mt-4 flex justify-end gap-2">
                    <button @click="updateProduct"
                        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                        Save
                    </button>
                    <button @click="editingProduct = null"
                        class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, nextTick } from "vue";

const { $toast } = useNuxtApp();

const products = ref<any[]>([]);
const categories = ref<any[]>([]);
const loading = ref(true);
definePageMeta({
    middleware: ['auth'],
    permiso: "ADMINISTRADOR",
})
definePageMeta({
    layout: 'dashboard', // Aplica el layout de dashboard a esta página
});
const newProduct = ref({
    name: "",
    price: 0,
    quantity: 0,
    image: "",
    categoryId: "",
});

const editingProduct = ref<any>(null);

/**
 * Obtener productos y categorías
 */
const fetchProducts = async () => {
    loading.value = true;
    try {
        const { data } = await useFetch(`/api/v1/products`);
        products.value = data.value || [];
        const categoriesData = await useFetch(`/api/v1/category`);
        categories.value = categoriesData.data.value || [];
    } catch (error) {
        console.error("Error loading products:", error);
        $toast.error("Error fetching products!");
    } finally {
        loading.value = false;
    }
};

/**
 * Agregar producto
 */
const createProduct = async () => {
    try {
        await useFetch(`/api/v1/addProduct`, {
            method: "POST",
            body: JSON.stringify(newProduct.value),
        });
        newProduct.value = { name: "", price: 0, quantity: 0, image: "", categoryId: "" };
        fetchProducts();
        $toast.success("Product added successfully!");
    } catch (error) {
        $toast.error("Error adding product!");
    }
};

/**
 * Eliminar producto
 */
const deleteProduct = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    try {
        await useFetch(`/api/v1/deleteProduct/${id}`, { method: "DELETE" });
        fetchProducts();
        $toast.success("Product deleted!");
    } catch (error) {
        $toast.error("Error deleting product!");
    }
};

/**
 * Obtener nombre de categoría
 */
const getCategoryName = (id: number) => {
    return categories.value.find(cat => cat.id === id)?.name || "Unknown";
};

watchEffect(() => {
    fetchProducts();
});
</script>
