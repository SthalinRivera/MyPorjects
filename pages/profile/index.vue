<template>
    <div class="min-h-screen ">
        <!-- Header -->


        <!-- Contenido principal -->
        <main class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <!-- Sección para usuarios no autenticados -->
            <div v-if="!loggedIn" class="text-center py-12">
                <div
                    class="mx-auto w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
                    <UIcon name="i-heroicons-user" class="text-4xl text-gray-500 dark:text-gray-400" />
                </div>
                <h2 class="text-xl font-medium text-gray-900 dark:text-white mb-2">No has iniciado sesión</h2>
                <p class="text-gray-600 dark:text-gray-400 mb-6">Inicia sesión para acceder a tu perfil y personalizar
                    tu experiencia</p>
                <UButton to="/login" color="primary" variant="solid" label="Iniciar sesión" class="mx-auto" />
            </div>

            <!-- Sección para usuarios autenticados -->
            <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Columna izquierda - Información del perfil -->
                <div class="lg:col-span-1">
                    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                        <div class="flex flex-col items-center">
                            <div class="relative mb-4">
                                <img :src="user?.avatar || 'https://ui-avatars.com/api/?name=' + user?.name"
                                    class="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow"
                                    alt="Avatar">
                                <UButton icon="i-heroicons-camera" color="gray" variant="solid" size="sm"
                                    class="absolute bottom-0 right-0" @click="isAvatarModalOpen = true" />
                            </div>
                            <h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ user?.name }}</h2>
                            <p class="text-gray-600 dark:text-gray-400">{{ user?.email }}</p>
                            <div class="mt-4 flex space-x-3">
                                <UButton icon="i-heroicons-pencil" label="Editar perfil" color="primary" variant="solid"
                                    @click="isEditModalOpen = true" />
                                <UButton icon="i-heroicons-arrow-right-on-rectangle" label="Cerrar sesión" color="red"
                                    variant="outline" @click="logout" />
                            </div>
                        </div>

                        <div class="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Información personal</h3>
                            <ul class="space-y-3">
                                <li class="flex items-center">
                                    <UIcon name="i-heroicons-envelope" class="text-gray-500 dark:text-gray-400 mr-3" />
                                    <span class="text-gray-600 dark:text-gray-300">{{ user?.email }}</span>
                                </li>
                                <li class="flex items-center">
                                    <UIcon name="i-heroicons-phone" class="text-gray-500 dark:text-gray-400 mr-3" />
                                    <span class="text-gray-600 dark:text-gray-300">{{ user?.phoneNumber ||
                                        'Noespecificado' }}</span>
                                </li>
                                <li class="flex items-center">
                                    <UIcon name="i-heroicons-calendar" class="text-gray-500 dark:text-gray-400 mr-3" />
                                    <span class="text-gray-600 dark:text-gray-300">Miembro desde {{
                                        formatDate(user?.created) }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Columna derecha - Contenido del usuario -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- Estadísticas -->
                    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Tus estadísticas</h3>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div class="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                                <div class="text-blue-600 dark:text-blue-400 text-sm font-medium">Pedidos</div>
                                <div class="text-2xl font-bold text-gray-900 dark:text-white mt-1">24</div>
                            </div>
                            <div class="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
                                <div class="text-green-600 dark:text-green-400 text-sm font-medium">Favoritos</div>
                                <div class="text-2xl font-bold text-gray-900 dark:text-white mt-1">12</div>
                            </div>
                            <div class="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
                                <div class="text-purple-600 dark:text-purple-400 text-sm font-medium">Comentarios</div>
                                <div class="text-2xl font-bold text-gray-900 dark:text-white mt-1">5</div>
                            </div>
                        </div>
                    </div>

                    <!-- Actividad reciente -->
                    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Actividad reciente</h3>
                        <ul class="divide-y divide-gray-200 dark:divide-gray-700">
                            <li v-for="activity in recentActivities" :key="activity.id" class="py-3">
                                <div class="flex items-center">
                                    <div class="flex-shrink-0">
                                        <UIcon :name="activity.icon" class="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    </div>
                                    <div class="ml-4">
                                        <p class="text-sm font-medium text-gray-900 dark:text-white">{{ activity.title
                                        }}</p>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">{{ activity.description }}
                                        </p>
                                        <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">{{ activity.time }}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>

        <!-- Modal para editar perfil -->
        <UModal v-model="isEditModalOpen">
            <UCard>
                <template #header>
                    <h2 class="text-xl font-bold text-gray-900 dark:text-white">Editar perfil</h2>
                </template>

                <UForm :schema="profileSchema" :state="editForm" class="space-y-4" @submit="updateProfile">
                    <UFormGroup label="Nombre completo" name="name">
                        <UInput v-model="editForm.name" />
                    </UFormGroup>

                    <UFormGroup label="Correo electrónico" name="email">
                        <UInput v-model="editForm.email" type="email" />
                    </UFormGroup>

                    <UFormGroup label="Teléfono" name="phoneNumber">
                        <UInput v-model="editForm.phoneNumber" type="tel" />
                    </UFormGroup>

                    <div class="flex justify-end space-x-3 pt-4">
                        <UButton label="Cancelar" color="gray" variant="ghost" @click="isEditModalOpen = false" />
                        <UButton type="submit" label="Guardar cambios" color="primary" :loading="isUpdating" />
                    </div>
                </UForm>
            </UCard>
        </UModal>

        <!-- Modal para cambiar avatar -->
        <UModal v-model="isAvatarModalOpen">
            <UCard>
                <template #header>
                    <h2 class="text-xl font-bold text-gray-900 dark:text-white">Cambiar foto de perfil</h2>
                </template>

                <div class="space-y-4">
                    <div class="flex justify-center">
                        <div class="relative">
                            <img :src="avatarPreview || user?.avatar || 'https://ui-avatars.com/api/?name=' + user?.name"
                                class="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow"
                                alt="Avatar preview">
                        </div>
                    </div>

                    <UFormGroup label="Subir nueva imagen">
                        <UInput type="file" accept="image/*" @change="handleAvatarUpload" />
                    </UFormGroup>

                    <div class="flex justify-end space-x-3 pt-4">
                        <UButton label="Cancelar" color="gray" variant="ghost" @click="isAvatarModalOpen = false" />
                        <UButton label="Guardar foto" color="primary" :loading="isUploading" @click="saveAvatar" />
                    </div>
                </div>
            </UCard>
        </UModal>
    </div>
</template>

<script setup lang="ts">
import { object, string } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
const { user } = useUserSession();



// Modales
const isEditModalOpen = ref(false)
const isAvatarModalOpen = ref(false)

// Formulario de edición
const editForm = reactive({
    name: user.value?.name || '',
    email: user.value?.email || '',
    phoneNumber: user.value?.phoneNumber || ''
})

// Esquema de validación
const profileSchema = object({
    name: string().required('El nombre es requerido').min(3, 'Mínimo 3 caracteres'),
    email: string().required('El email es requerido').email('Email inválido'),
    phoneNumber: string().matches(/^[0-9]{9,15}$/, 'Teléfono inválido').optional()
})

// Avatar
const avatarPreview = ref<string | null>(null)
const isUploading = ref(false)
const isUpdating = ref(false)

// Actividad reciente (datos de ejemplo)
const recentActivities = [
    {
        id: 1,
        icon: 'i-heroicons-shopping-bag',
        title: 'Nuevo pedido realizado',
        description: 'Pedido #1234 completado',
        time: 'Hace 2 horas'
    },
    {
        id: 2,
        icon: 'i-heroicons-heart',
        title: 'Producto añadido a favoritos',
        description: 'Camiseta de algodón orgánico',
        time: 'Hace 1 día'
    },
    {
        id: 3,
        icon: 'i-heroicons-chat-bubble-left-ellipsis',
        title: 'Nuevo comentario',
        description: '¡Me encanta este producto!',
        time: 'Hace 3 días'
    }
]

// Formatear fecha
const formatDate = (dateString?: string) => {
    if (!dateString) return 'Fecha desconocida'
    return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

// Manejar subida de avatar
const handleAvatarUpload = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (input.files && input.files[0]) {
        const reader = new FileReader()
        reader.onload = (e) => {
            avatarPreview.value = e.target?.result as string
        }
        reader.readAsDataURL(input.files[0])
    }
}

// Guardar avatar
const saveAvatar = async () => {
    isUploading.value = true
    try {
        // Aquí iría la lógica para subir el avatar al servidor
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulación
        useToast().success('Foto de perfil actualizada')
        isAvatarModalOpen.value = false
    } catch (error) {
        useToast().error('Error al actualizar la foto')
    } finally {
        isUploading.value = false
    }
}

// Actualizar perfil
const updateProfile = async (event: FormSubmitEvent<any>) => {
    isUpdating.value = true
    try {
        // Aquí iría la lógica para actualizar el perfil en el servidor
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulación
        useToast().success('Perfil actualizado correctamente')
        isEditModalOpen.value = false
    } catch (error) {
        useToast().error('Error al actualizar el perfil')
    } finally {
        isUpdating.value = false
    }
}

// Cerrar sesión
const logout = async () => {
    await signOut()
    await navigateTo('/')
    useToast().success('Sesión cerrada correctamente')
}
</script>

<style scoped>
/* Transiciones para modales */
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}
</style>