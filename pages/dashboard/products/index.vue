    <template>
        <div class="max-w-9xl mx-auto p-4">
            <Breadcrumb :items="[{ title: 'Productos', to: '/dashboard/products' }]" />

            <!-- Header Section -->
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Gestión de Productos</h1>
                    <p class="text-gray-500 dark:text-gray-400 mt-1">Gestiona tu inventario de productos y detalles</p>
                </div>
                <div class="flex flex-col sm:flex-row gap-4">
                    <!-- Buscador -->
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i class="ri-search-line text-gray-400"></i>
                        </div>
                        <input v-model="searchQuery" type="text" placeholder="Buscar productos..."
                            class="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                    </div>

                    <!-- Botones de acción -->
                    <div class="flex gap-2">
                        <button @click="exportToExcel"
                            class="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg">
                            <i class="ri-file-excel-line"></i>
                            <span>Exportar</span>
                        </button>
                        <button @click="openModal()"
                            class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-md hover:shadow-lg">
                            <i class="ri-add-line"></i>
                            <span>Agregar</span>
                        </button>
                    </div>
                </div>
            </div>
            <!-- Loading State -->
            <div v-if="loading">
                <SkeletonTableProducts></SkeletonTableProducts>
            </div>

            <!-- Error State -->
            <div v-else-if="error"
                class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center">
                <p class="text-red-600 dark:text-red-400 font-medium">{{ error }}</p>
            </div>

            <!-- Empty State -->
            <div v-else-if="products.length === 0"
                class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
                <div
                    class="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <i class="ri-box-2-line text-3xl text-gray-400 dark:text-gray-500"></i>
                </div>
                <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-2">No se encontraron productos.</h3>
                <p class="text-gray-500 dark:text-gray-400 mb-4">Comienza agregando tu primer producto.</p>
                <button @click="openModal()"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Agregar Producto.
                </button>
            </div>

            <div v-else
                class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <div class=" overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead class="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Producto</th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Categoría</th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Prommocion</th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Precio</th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Stock</th>
                                <th scope="col"
                                    class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Acción</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            <tr v-for="product in paginatedProducts" :key="product.id"
                                class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="flex-shrink-0 h-10 w-10">
                                            <img class="h-10 w-10 rounded-md object-cover"
                                                :src="product.imageUrl || 'https://via.placeholder.com/40'"
                                                alt="Product image">
                                        </div>
                                        <div class="ml-4">
                                            <div class="text-sm font-medium text-gray-900 dark:text-white">{{
                                                product.name
                                                }}</div>
                                            <div class="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{{
                                                truncateText(product.description, 50) }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span
                                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                                        {{ getCategoryName(product.categoryId) }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div v-if="product.hasPromotion"
                                        class="promotion-badge bg-red-500 text-white p-2 rounded-lg">
                                        <div class="flex items-center gap-2">
                                            <span class="font-bold text-lg">
                                                {{ promotionText }}
                                            </span>
                                            <span class="text-sm">
                                                Válido hasta {{ formatDate(product.promotions[0].endDate) }}
                                            </span>
                                        </div>
                                        <div class="flex items-center mt-1">
                                            <span class="line-through mr-2">S/ {{ product.originalPrice }}</span>
                                            <span class="font-bold text-xl">S/ {{ product.currentPrice }}</span>
                                        </div>
                                    </div>
                                </td>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                    S/. {{ product.price }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span :class="{
                                        'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200': product.stock > 10,
                                        'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200': product.stock > 0 && product.stock <= 10,
                                        'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200': product.stock === 0
                                    }" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                                        {{ product.stock }} en stock
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div class="flex justify-end gap-2">
                                        <!-- <button @click="openViewModal(product)"
                                            class="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 transition-colors">
                                            <i class="ri-eye-line"></i>
                                        </button> -->
                                        <button @click="openModal(product)"
                                            class="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors">
                                            <i class="ri-pencil-line"></i>
                                        </button>
                                        <button @click="deleteProduct(product.id)"
                                            class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 transition-colors">
                                            <i class="ri-delete-bin-line"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <!-- Paginación -->
                <div v-if="filteredProducts.length > 0"
                    class="flex flex-col items-center px-4 py-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 space-y-3">
                    <!-- Información de resultados -->
                    <div class="text-sm text-gray-700 dark:text-gray-300 text-center sm:text-left w-full">
                        Mostrando {{ Math.min((currentPage - 1) * itemsPerPage + 1, filteredProducts.length) }}
                        a {{ Math.min(currentPage * itemsPerPage, filteredProducts.length) }}
                        de {{ filteredProducts.length }} resultados
                    </div>

                    <!-- Controles de paginación -->
                    <div class="flex flex-col sm:flex-row items-center justify-between w-full gap-3">
                        <!-- Selector de items por página -->
                        <select v-model="itemsPerPage"
                            class="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm dark:bg-gray-700 dark:text-white w-full sm:w-auto">
                            <option value="5">5 por página</option>
                            <option value="10">10 por página</option>
                            <option value="20">20 por página</option>
                            <option value="50">50 por página</option>
                        </select>

                        <!-- Navegación -->
                        <div class="flex items-center gap-2 w-full sm:w-auto justify-center">
                            <!-- Botón Anterior -->
                            <button @click="currentPage = Math.max(1, currentPage - 1)" :disabled="currentPage === 1"
                                class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm disabled:opacity-50 dark:bg-gray-700 dark:text-white">
                                Anterior
                            </button>

                            <!-- Números de página - scroll horizontal en móvil -->
                            <div class="flex overflow-x-auto gap-1 hide-scrollbar">
                                <button v-for="page in totalPages" :key="page" @click="currentPage = page" :class="{
                                    'bg-blue-600 text-white': currentPage === page,
                                    'hover:bg-gray-100 dark:hover:bg-gray-600': currentPage !== page
                                }"
                                    class="min-w-8 h-8 flex items-center justify-center rounded-md text-sm transition-colors">
                                    {{ page }}
                                </button>
                            </div>

                            <!-- Botón Siguiente -->
                            <button @click="currentPage = Math.min(totalPages, currentPage + 1)"
                                :disabled="currentPage === totalPages"
                                class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm disabled:opacity-50 dark:bg-gray-700 dark:text-white">
                                Siguiente
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal  Edit Product-->
            <div v-if="showModal"
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                    <div class="p-6">
                        <div class="flex justify-between items-center mb-4">
                            <h2 class="text-xl font-bold text-gray-800 dark:text-white">
                                {{ editingProduct ? "Edit Product" : "Add Product" }}
                            </h2>
                            <button @click="showModal = false"
                                class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                                <i class="ri-close-line text-2xl"></i>
                            </button>
                        </div>

                        <form @submit.prevent="saveProduct" class="space-y-4">
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
                                <input v-model="formState.name" type="text" required
                                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                            </div>

                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descripción</label>
                                <textarea v-model="formState.description" rows="3"
                                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"></textarea>
                            </div>

                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Precio</label>
                                    <div class="relative">
                                        <span
                                            class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">S/.</span>
                                        <input v-model="formState.price" type="number" min="0" step="0.01" required
                                            class="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                                    </div>
                                </div>

                                <div>
                                    <label
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock</label>
                                    <input v-model="formState.stock" type="number" min="0" required
                                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                                </div>
                            </div>

                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Categoría</label>
                                <select v-model="formState.categoryId" required
                                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                                    <option value="">Select Category</option>
                                    <option v-for="category in categories" :key="category.id" :value="category.id">
                                        {{ category.name }}
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Imagen de
                                    producto</label>
                                <div class="mt-1 flex items-center gap-4">
                                    <label class="cursor-pointer">
                                        <span
                                            class="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                                            <i class="ri-upload-line mr-2"></i>
                                            Subir Imagen
                                        </span>
                                        <input type="file" @change="handleFileUpload" class="hidden">
                                    </label>
                                    <div v-if="uploadProgress > 0 && uploadProgress < 100" class="flex-1">
                                        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div class="bg-blue-600 h-2 rounded-full"
                                                :style="{ width: uploadProgress + '%' }"></div>
                                        </div>
                                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Subiendo : {{
                                            uploadProgress }}%</p>
                                    </div>
                                </div>
                                <img v-if="imageUrl" :src="imageUrl"
                                    class="mt-2 h-20 rounded-md object-cover border border-gray-200 dark:border-gray-700">
                            </div>

                            <div class="flex justify-end gap-3 pt-4">
                                <button type="button" @click="showModal = false"
                                    class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                                    Cancel
                                </button>
                                <button type="submit"
                                    class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                                    {{ editingProduct ? "Update Product" : "Add Product" }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </template>

<script setup lang="ts">
import { ref, reactive, watchEffect, nextTick, computed } from "vue";
import { format } from 'date-fns';
import * as XLSX from 'xlsx'; // Importar librería para exportar a Excel

import { useNuxtApp } from "#app";
import { useFirebaseUpload } from '~/composables/useFirebaseUpload';
import SkeletonTableProducts from "~/components/UI/Skeleton/SkeletonTableProducts.vue";

const { $toast } = useNuxtApp();
const products = ref<any[]>([]);
const filteredProducts = ref<any[]>([]); // Para los productos filtrados
const categories = ref<any[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const showModal = ref(false);
const editingProduct = ref<any | null>(null);
const imageUrl = ref<string | null>(null);
const searchQuery = ref(''); // Para el buscador
const currentPage = ref(1); // Paginación
const itemsPerPage = ref(10); // Items por página

definePageMeta({
    middleware: ['auth'],
    layout: 'dashboard',
});
// Configuración de paginación
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage.value));
const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredProducts.value.slice(start, end);
});


// Función para filtrar productos
const filterProducts = () => {
    if (!searchQuery.value) {
        filteredProducts.value = [...products.value];
    } else {
        const query = searchQuery.value.toLowerCase();
        filteredProducts.value = products.value.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            getCategoryName(product.categoryId).toLowerCase().includes(query)
        );
    }
    currentPage.value = 1; // Resetear a la primera página al filtrar
};


// Función para exportar a Excel
const exportToExcel = () => {
    const dataToExport = filteredProducts.value.map(product => ({
        'Nombre': product.name,
        'Descripción': product.description,
        'Categoría': getCategoryName(product.categoryId),
        'Precio': product.price,
        'Stock': product.stock,
        'Promoción': product.hasPromotion ? 'Sí' : 'No',
        'Fecha Creación': product.createdAt || 'N/A'
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");
    XLSX.writeFile(workbook, "productos.xlsx");
};


// Modificar fetchProducts para actualizar filteredProducts
const fetchProducts = async () => {
    loading.value = true;
    try {
        const { data } = await useFetch("/api/v1/product");
        products.value = data.value || [];
        filteredProducts.value = [...products.value];
    } catch (err) {
        error.value = "Failed to load products.";
    } finally {
        loading.value = false;
    }
};

// Observar cambios en searchQuery
watch(searchQuery, filterProducts);

// Observar cambios en products
watch(products, filterProducts, { deep: true });


const { uploadProgress, uploadImage } = useFirebaseUpload();

const handleFileUpload = async (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        imageUrl.value = await uploadImage(file);
    }
};

const formState = reactive({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    imageUrl: "",
    categoryId: "",
});
const showViewProductModal = ref<boolean>(false);
const selectedProduct = ref<Product | null>(null);
const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});

const promotionText = computed(() => {
    const promo = props.product.promotions[0];
    return promo.isPercentage
        ? `${promo.discount}% DE DESCUENTO`
        : `S/ ${promo.discount} DE DESCUENTO`;
});

const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd/MM/yyyy');
};

// Define Product interface (add this at the top of your script)
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
    categoryId: number;
    createdAt?: string;
}

// Add this method to open the view modal
const openViewModal = (product: Product) => {
    selectedProduct.value = product;
    showViewProductModal.value = true;
};

// Obtener categorías
const fetchCategories = async () => {
    try {
        const { data } = await useFetch("/api/v1/category");
        categories.value = data.value || [];
    } catch (err) {
        error.value = "Failed to load categories.";
    }
};

// Abrir modal
const openModal = async (product = null) => {
    editingProduct.value = product;
    if (product) {
        Object.assign(formState, product);
        imageUrl.value = product.imageUrl;
    } else {
        Object.assign(formState, {
            name: "",
            description: "",
            price: 0,
            stock: 0,
            categoryId: "",
            imageUrl: ""
        });
        imageUrl.value = null;
    }
    showModal.value = false;
    await nextTick();
    showModal.value = true;
};

// Guardar producto
const saveProduct = async () => {
    try {
        const productData = {
            ...formState,
            imageUrl: imageUrl.value || formState.imageUrl
        };

        if (editingProduct.value) {
            await useFetch(`/api/v1/updateProduct/${editingProduct.value.id}`, {
                method: "PUT",
                body: productData
            });
            $toast.success("Product updated successfully");
        } else {
            await useFetch("/api/v1/addProduct", {
                method: "POST",
                body: productData
            });
            $toast.success("Product added successfully");
        }

        showModal.value = false;
        fetchProducts();
    } catch (error) {
        $toast.error("Failed to save product.");
    }
};

// Eliminar producto
const deleteProduct = async (productId: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
        await useFetch(`/api/v1/deleteProduct/${productId}`, { method: "DELETE" });
        products.value = products.value.filter(p => p.id !== productId);
        $toast.success("Product deleted successfully");
    } catch (error) {
        $toast.error("Failed to delete product.");
    }
};

// Obtener el nombre de la categoría
const getCategoryName = (categoryId: number) => {
    const category = categories.value.find(cat => cat.id === categoryId);
    return category ? category.name : "Uncategorized";
};

const truncateText = (text: string, maxLength: number): string => {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};
// Cargar datos
watchEffect(async () => {
    await nextTick();
    fetchProducts();
    fetchCategories();
});

</script>

