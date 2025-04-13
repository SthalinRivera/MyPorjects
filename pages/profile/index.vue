<template>
    <div class="min-h-screen">
        <main class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <!-- Sección para usuarios no autenticados -->
            <div v-if="!loggedIn" class="text-center py-12">
                <div
                    class="mx-auto w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
                    <UIcon name="i-heroicons-user" class="text-4xl text-gray-500 dark:text-gray-400" />
                </div>
                <h2 class="text-xl font-medium text-gray-900 dark:text-white mb-2">No has iniciado sesión</h2>
                <p class="text-gray-600 dark:text-gray-400 mb-6">
                    Inicia sesión para acceder a tu perfil
                </p>

                <UButton to="/login" color="primary" variant="solid" label="Iniciar Sesión" icon="i-heroicons-user"
                    trailing-icon="i-heroicons-arrow-right-20-solid"
                    class="px-6 py-3 font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 transform bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white sm:[&>span]:block  sm:inline-flex">
                </UButton>

            </div>

            <!-- Sección para usuarios autenticados -->
            <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Columna izquierda - Información del perfil -->
                <div class="lg:col-span-1">
                    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                        <div class="flex flex-col items-center">
                            <div class="relative mb-4">
                                <img :src="user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`"
                                    class="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow"
                                    alt="Avatar" />
                                <UButton icon="i-heroicons-camera" color="gray" variant="solid" size="sm"
                                    class="absolute bottom-0 right-0" @click="isAvatarModalOpen = true" />
                            </div>
                            <h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ user.name }}</h2>
                            <p class="text-gray-600 dark:text-gray-400">{{ user.email }}</p>

                            <!-- Badge de rol -->
                            <UBadge :label="user.role" :color="user.role === 'ADMINISTRADOR' ? 'red' : 'primary'"
                                class="mt-2" />

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
                                    <span class="text-gray-600 dark:text-gray-300">{{ user.email }}</span>
                                </li>
                                <li class="flex items-center">
                                    <UIcon name="i-heroicons-phone" class="text-gray-500 dark:text-gray-400 mr-3" />
                                    <span class="text-gray-600 dark:text-gray-300">
                                        {{ user.phoneNumber || 'No especificado' }}</span>
                                </li>
                                <li class="flex items-center">
                                    <UIcon name="i-heroicons-shield-check"
                                        class="text-gray-500 dark:text-gray-400 mr-3" />
                                    <span class="text-gray-600 dark:text-gray-300">Rol: {{ user.role }}</span>
                                </li>
                                <li class="flex items-center">
                                    <UIcon name="i-heroicons-calendar" class="text-gray-500 dark:text-gray-400 mr-3" />
                                    <span class="text-gray-600 dark:text-gray-300">Miembro desde {{
                                        formatDate(user.createdAt) }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Columna derecha - Contenido adicional -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- Dashboard rápido para admin -->
                    <div v-if="user.role === 'ADMINISTRADOR'"
                        class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Panel de control</h3>
                            <UIcon name="i-heroicons-shield-exclamation"
                                class="text-blue-500 dark:text-blue-400 text-xl" />
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <UCard class="hover:shadow-md transition-all cursor-pointer group" :ui="{
                                body: { padding: 'p-3 sm:p-4' },
                                ring: 'ring-1 ring-gray-200 dark:ring-gray-700'
                            }" @click="navigateTo('/dashboard/users')">
                                <div class="flex items-center gap-3">
                                    <div class="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg">
                                        <UIcon name="i-heroicons-users"
                                            class="text-blue-600 dark:text-blue-400 text-xl" />
                                    </div>
                                    <div>
                                        <h4 class="font-medium text-gray-800 dark:text-gray-200">Usuarios</h4>
                                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Gestionar usuarios</p>
                                    </div>
                                </div>
                            </UCard>

                            <UCard class="hover:shadow-md transition-all cursor-pointer group" :ui="{
                                body: { padding: 'p-3 sm:p-4' },
                                ring: 'ring-1 ring-gray-200 dark:ring-gray-700'
                            }" @click="navigateTo('/dashboard/')">
                                <div class="flex items-center gap-3">
                                    <div class="bg-green-50 dark:bg-green-900/30 p-2 rounded-lg">
                                        <UIcon name="i-heroicons-chart-bar"
                                            class="text-green-600 dark:text-green-400 text-xl" />
                                    </div>
                                    <div>
                                        <h4 class="font-medium text-gray-800 dark:text-gray-200">Estadísticas</h4>
                                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Ver métricas</p>
                                    </div>
                                </div>
                            </UCard>

                            <UCard class="hover:shadow-md transition-all cursor-pointer group" :ui="{
                                body: { padding: 'p-3 sm:p-4' },
                                ring: 'ring-1 ring-gray-200 dark:ring-gray-700'
                            }" @click="navigateTo('/dashboard/')">
                                <div class="flex items-center gap-3">
                                    <div class="bg-purple-50 dark:bg-purple-900/30 p-2 rounded-lg">
                                        <UIcon name="i-heroicons-cog"
                                            class="text-purple-600 dark:text-purple-400 text-xl" />
                                    </div>
                                    <div>
                                        <h4 class="font-medium text-gray-800 dark:text-gray-200">Configuración</h4>
                                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Ajustes del sistema</p>
                                    </div>
                                </div>
                            </UCard>
                        </div>
                    </div>

                    <!-- Sección de actividad reciente -->
                    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Tu actividad</h3>
                        <div class="space-y-4">
                            <div v-for="item in 3" :key="item"
                                class="flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition">
                                <div class="bg-primary-100 dark:bg-primary-900/50 p-2 rounded-full">
                                    <UIcon name="i-heroicons-bell" class="text-primary-600 dark:text-primary-400" />
                                </div>
                                <div>
                                    <p class="font-medium">Notificación de ejemplo</p>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">Hace 2 días</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- Modal para editar perfil -->
        <UModal v-model="isEditModalOpen">
            <UCard>
                <template #header>
                    <div class="flex items-center justify-between">
                        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Editar perfil</h2>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                            @click="isEditModalOpen = false" />
                    </div>
                </template>

                <UForm :state="user" class="space-y-4" @submit="updateProfile">
                    <UFormGroup label="Nombre completo" name="name">
                        <UInput v-model="user.name" />
                    </UFormGroup>

                    <UFormGroup label="Correo electrónico" name="email">
                        <UInput v-model="user.email" type="email" disabled />
                    </UFormGroup>

                    <UFormGroup label="Teléfono" name="phoneNumber">
                        <UInput v-model="user.phoneNumber" type="tel" placeholder="+1234567890" />
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
                    <div class="flex items-center justify-between">
                        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Cambiar foto de perfil</h2>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                            @click="isAvatarModalOpen = false" />
                    </div>
                </template>

                <div class="space-y-4">
                    <div class="flex justify-center">
                        <div class="relative">
                            <img :src="avatarPreview || user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`"
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
const { loggedIn, user, clear } = useUserSession()
const router = useRouter()

// Modales
const isEditModalOpen = ref(false)
const isAvatarModalOpen = ref(false)

// Avatar
const avatarPreview = ref<string | null>(null)
const avatarFile = ref<File | null>(null)
const isUploading = ref(false)
const isUpdating = ref(false)

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

const logout = async () => {
    await clear()
    router.push('/')
    useToast().success('Sesión cerrada correctamente')
}

const handleAvatarUpload = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (input.files && input.files[0]) {
        avatarFile.value = input.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
            avatarPreview.value = e.target?.result as string
        }
        reader.readAsDataURL(input.files[0])
    }
}

const saveAvatar = async () => {
    isUploading.value = true
    try {
        // Simular subida de imagen
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Actualizar avatar (en un caso real, llamarías a tu API)
        if (avatarPreview.value) {
            user.avatar = avatarPreview.value
        }

        useToast().success('Foto de perfil actualizada')
        isAvatarModalOpen.value = false
    } catch (error) {
        useToast().error('Error al actualizar la foto')
    } finally {
        isUploading.value = false
    }
}

const updateProfile = async () => {
    isUpdating.value = true
    try {
        // Simular actualización (en un caso real, llamarías a tu API)
        await new Promise(resolve => setTimeout(resolve, 1000))
        useToast().success('Perfil actualizado correctamente')
        isEditModalOpen.value = false
    } catch (error) {
        useToast().error('Error al actualizar el perfil')
    } finally {
        isUpdating.value = false
    }
}
</script>

<style scoped>
/* Transiciones suaves para los modales */
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

/* Efecto hover para items de actividad */
.hover-item {
    transition: all 0.2s ease;
}

.hover-item:hover {
    transform: translateY(-2px);
}
</style>