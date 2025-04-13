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

        <!-- Estado de Error -->
        <div v-if="error"
            class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-4">
            <div class="flex items-center gap-3">
                <i class="ri-error-warning-line text-red-500 dark:text-red-400 text-xl"></i>
                <div>
                    <h3 class="font-medium text-red-800 dark:text-red-200">Error al cargar categorías</h3>
                    <p class="text-sm text-red-600 dark:text-red-300">{{ error.message || 'Ocurrió un error desconocido'
                        }}</p>
                </div>
            </div>
            <button @click="fetchCategories" class="mt-2 text-sm text-red-600 dark:text-red-300 hover:underline">
                Intentar nuevamente
            </button>
        </div>

        <!-- Loading State -->
        <div v-else-if="loading" class="flex flex-col items-center justify-center py-16">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p class="text-gray-600 dark:text-gray-400">Cargando categorías...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="categories.length === 0"
            class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div
                class="mx-auto w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <i class="ri-folder-line text-3xl text-gray-400 dark:text-gray-500"></i>
            </div>
            <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-2">No se encontraron categorías</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-4">Comienza creando tu primera categoría</p>
            <button @click="openCreateModal"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Crear Categoría
            </button>
        </div>

        <!-- Categories List -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="category in categories" :key="category.id"
                class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-shadow">
                <div class="flex items-start justify-between">
                    <div>
                        <h3 class="font-semibold text-gray-800 dark:text-white">{{ category.name }}</h3>
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
            </div>
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
                                Cancelar
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
import { onMounted, ref, watch } from 'vue';
import { useRoute } from "vue-router";


const { $toast } = useNuxtApp();
const route = useRoute();
const { user } = useUserSession();

// Estados reactivos
const categories = ref<any[]>([]);
const loading = ref(true);
const error = ref<any>(null);
const newCategory = ref({ name: "" });
const editingCategory = ref<any>(null);
const showCreateModal = ref(false);

// Configuración de la página
definePageMeta({
    middleware: ['auth'],

    layout: 'dashboard',
});

// Función para cargar categorías con reintentos
const fetchCategories = async (retries = 3) => {
    loading.value = true;
    error.value = null;

    try {
        const { data, error: fetchError } = await useFetch('/api/v1/category', {
            headers: {
                'Authorization': `Bearer ${user.value?.token}` // Asegurar autenticación
            }
        });

        if (fetchError.value) {
            throw fetchError.value;
        }

        if (!data.value || !Array.isArray(data.value)) {
            throw new Error('Formato de respuesta inválido');
        }

        categories.value = data.value;
    } catch (err) {
        console.error("Error al cargar categorías:", err);

        if (retries > 1) {
            // Reintentar después de un breve retraso
            await new Promise(resolve => setTimeout(resolve, 1000));
            return fetchCategories(retries - 1);
        }

        error.value = err;
        $toast.error("Error al cargar categorías");
        categories.value = [];
    } finally {
        loading.value = false;
    }
};

// Funciones CRUD
const createCategory = async () => {
    if (!newCategory.value.name.trim()) return;

    try {
        loading.value = true;
        const { error: createError } = await useFetch('/api/v1/addCategory', {
            method: "POST",
            body: { name: newCategory.value.name },
            headers: {
                'Authorization': `Bearer ${user.value?.token}`
            }
        });

        if (createError.value) {
            throw createError.value;
        }

        showCreateModal.value = false;
        await fetchCategories();
        $toast.success("¡Categoría creada exitosamente!");
    } catch (err) {
        console.error("Error al crear categoría:", err);
        $toast.error("Error al crear categoría");
    } finally {
        loading.value = false;
    }
};

const deleteCategory = async (id: number) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta categoría? Esta acción no se puede deshacer.")) return;

    try {
        loading.value = true;
        const { error: deleteError } = await useFetch(`/api/v1/deleteCategory/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${user.value?.token}`
            }
        });

        if (deleteError.value) {
            throw deleteError.value;
        }

        await fetchCategories();
        $toast.success("¡Categoría eliminada exitosamente!");
    } catch (err) {
        console.error("Error al eliminar categoría:", err);
        $toast.error("Error al eliminar categoría");
    } finally {
        loading.value = false;
    }
};

const updateCategory = async () => {
    if (!editingCategory.value?.name?.trim()) return;

    try {
        loading.value = true;
        const { error: updateError } = await useFetch(`/api/v1/updateCategory/${editingCategory.value.id}`, {
            method: "PUT",
            body: { name: editingCategory.value.name },
            headers: {
                'Authorization': `Bearer ${user.value?.token}`
            }
        });

        if (updateError.value) {
            throw updateError.value;
        }

        editingCategory.value = null;
        await fetchCategories();
        $toast.success("¡Categoría actualizada exitosamente!");
    } catch (err) {
        console.error("Error al actualizar categoría:", err);
        $toast.error("Error al actualizar categoría");
    } finally {
        loading.value = false;
    }
};

// Funciones auxiliares
const openCreateModal = () => {
    showCreateModal.value = true;
    newCategory.value = { name: "" };
};

const editCategory = (category: any) => {
    editingCategory.value = { ...category };
};

// Inicialización y watchers
onMounted(() => {
    fetchCategories();
});

// Recargar cuando cambia la ruta (si es necesario)
watch(() => route.path, (newPath, oldPath) => {
    if (newPath !== oldPath) {
        fetchCategories();
    }
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