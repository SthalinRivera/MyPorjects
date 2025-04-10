<template>
    <div class="max-w-4xl mx-auto p-4 sm:p-6">
        <!-- Encabezado -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div>
                <h1 class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Gestión de Categorías</h1>
                <p class="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">Organiza tus productos con
                    categorías</p>
            </div>
            <button @click="openCreateModal"
                class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-md hover:shadow-lg w-full sm:w-auto justify-center">
                <i class="ri-add-line"></i>
                <span>Nueva Categoría</span>
            </button>
        </div>
        <!-- Create Category Modal -->
        <div v-if="showCreateModal"
            class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-30 backdrop-blur-sm">
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md animate-fade-in">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-bold text-gray-800 dark:text-white">Agregar Nueva Categoría</h2>
                        <button @click="showCreateModal = false"
                            class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                            <i class="ri-close-line text-2xl"></i>
                        </button>
                    </div>
                    <form @submit.prevent="createCategory" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre de
                                Categoría</label>
                            <input v-model="newCategory.name" type="text" placeholder="e.g. Collar, Aretes ..." required
                                class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                        </div>
                        <div class="flex justify-end gap-3 pt-4">
                            <button type="button" @click="showCreateModal = false"
                                class="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                                Cancela
                            </button>
                            <button type="submit"
                                class="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                                Crear Categoría
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-16">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p class="text-gray-600 dark:text-gray-400">Loading categories...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="categories.length === 0"
            class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div
                class="mx-auto w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <i class="ri-folder-line text-3xl text-gray-400 dark:text-gray-500"></i>
            </div>
            <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-2">No categories found</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-4">Get started by creating your first category</p>
            <button @click="openCreateModal"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Create Category
            </button>
        </div>

        <!-- Categories List -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="category in categories" :key="category.id"
                class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-shadow">
                <div class="flex items-start justify-between">
                    <div>
                        <h3 class="font-semibold text-gray-800 dark:text-white">{{ category.name }}</h3>
                        <!-- <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Last updated: {{
                            formatDate(category.updatedAt) }}</p> -->
                    </div>
                    <div class="flex gap-2">
                        <button @click="editCategory(category)"
                            class="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                            <i class="ri-pencil-line"></i>
                        </button>
                        <button @click="deleteCategory(category.id)"
                            class="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                            <i class="ri-delete-bin-line"></i>
                        </button>
                    </div>
                </div>
                <!-- <div class="mt-4 flex items-center justify-between">
                    <span
                        class="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                        {{ countProducts(category.id) }} products
                    </span>
                    <span class="text-xs text-gray-500">{{ category.id }}</span>
                </div> -->
            </div>
        </div>
        <!-- Lista de Categorías - Versión Móvil -->
        <div v-else class="space-y-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
            <div v-for="category in categories" :key="category.id"
                class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
                <div class="flex items-center justify-between">
                    <h3 class="font-semibold text-gray-800 dark:text-white text-base truncate flex-1">{{ category.name
                        }}</h3>
                    <div class="flex gap-1 ml-2">
                        <button @click="editCategory(category)"
                            class="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                            <i class="ri-pencil-line text-sm"></i>
                        </button>
                        <button @click="deleteCategory(category.id)"
                            class="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                            <i class="ri-delete-bin-line text-sm"></i>
                        </button>
                    </div>
                </div>

                <!-- Información adicional en móvil -->
                <div class="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <!-- <span v-if="category.productCount" class="flex items-center gap-1">
                        <i class="ri-box-line"></i>
                        {{ category.productCount }} productos
                    </span>
                    <span v-if="category.updatedAt" class="text-right">
                        {{ formatShortDate(category.updatedAt) }}
                    </span> -->
                </div>
            </div>
        </div>
        <!-- Edit Modal -->
        <div v-if="editingCategory"
            class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-30 backdrop-blur-sm">
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md animate-fade-in">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-bold text-gray-800 dark:text-white">Editar Categoría</h2>
                        <button @click="editingCategory = null"
                            class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                            <i class="ri-close-line text-2xl"></i>
                        </button>
                    </div>
                    <form @submit.prevent="updateCategory" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre de
                                Categoría</label>
                            <input v-model="editingCategory.name" type="text" required
                                class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                        </div>
                        <div class="flex justify-end gap-3 pt-4">
                            <button type="button" @click="editingCategory = null"
                                class="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                                Cancelar
                            </button>
                            <button type="submit"
                                class="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                                Actualizar Categoría
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, nextTick } from "vue";
import { useRoute } from "vue-router";
const { $toast } = useNuxtApp();
const route = useRoute();
const categories = ref<any[]>([]);
const loading = ref(true);
const { user } = useUserSession();

const newCategory = ref({ name: "" });
const editingCategory = ref<any>(null);
const showCreateModal = ref(false);

definePageMeta({
    middleware: ['auth'],
    permiso: "ADMINISTRADOR",
    layout: 'dashboard',
});

// Format date for display
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

// Count products in category (mock function - replace with real implementation)
const countProducts = (categoryId: number) => {
    // In a real app, you would fetch this from your API
    return Math.floor(Math.random() * 50); // Random number for demo
};

const openCreateModal = () => {
    showCreateModal.value = true;
    newCategory.value = { name: "" };
};

const fetchCategories = async () => {
    loading.value = true;
    try {
        const { data } = await useFetch(`/api/v1/category`);
        categories.value = data.value || [];
    } catch (error) {
        console.error("Error fetching categories:", error);
        $toast.error("Failed to load categories");
    } finally {
        loading.value = false;
    }
};

const createCategory = async () => {
    if (!newCategory.value.name.trim()) return;

    try {
        await useFetch(`/api/v1/addCategory`, {
            method: "POST",
            body: { name: newCategory.value.name },
        });
        showCreateModal.value = false;
        fetchCategories();
        $toast.success("Category created successfully!");
    } catch (error) {
        console.error("Error creating category:", error);
        $toast.error("Failed to create category");
    }
};

const deleteCategory = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category? This action cannot be undone.")) return;

    try {
        await useFetch(`/api/v1/deleteCategory/${id}`, { method: "DELETE" });
        fetchCategories();
        $toast.success("Category deleted successfully!");
    } catch (error) {
        console.error("Error deleting category:", error);
        $toast.error("Failed to delete category");
    }
};

const editCategory = (category: any) => {
    editingCategory.value = { ...category };
};

const updateCategory = async () => {
    if (!editingCategory.value.name.trim()) return;

    try {
        await useFetch(`/api/v1/updateCategory/${editingCategory.value.id}`, {
            method: "PUT",
            body: { name: editingCategory.value.name },
        });
        editingCategory.value = null;
        fetchCategories();
        $toast.success("Category updated successfully!");
    } catch (error) {
        console.error("Error updating category:", error);
        $toast.error("Failed to update category");
    }
};

watchEffect(async () => {
    await nextTick();
    fetchCategories();
});
</script>

<style scoped>
.animate-fade-in {
    animation: fade-in 0.2s ease-out;
}

@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Custom scrollbar for modal content */
.modal-content {
    scrollbar-width: thin;
    scrollbar-color: #3b82f6 #f1f1f1;
}

.modal-content::-webkit-scrollbar {
    width: 8px;
}

.modal-content::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.modal-content::-webkit-scrollbar-thumb {
    background-color: #3b82f6;
    border-radius: 10px;
}

.dark .modal-content::-webkit-scrollbar-track {
    background: #374151;
}

.dark .modal-content::-webkit-scrollbar-thumb {
    background-color: #1e40af;
}
</style>