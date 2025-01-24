<!-- components/Sidebar.vue -->
<template>
    <div :class="sidebarClass"
        class="bg-white text-gray-800 h-screen transition-all duration-300 flex flex-col justify-between rounded-lg  shadow-[4px_0_15px_rgba(0,0,0,0.2)] z-50">
        <!-- Logo o Encabezado -->
        <div class="px-6 py-4 flex items-center justify-between">
            <h1 class="text-2xl font-semibold">D</h1>
            <span v-if="isExpanded" class="text-lg font-bold">Dashboard</span>
            <button @click="toggleSidebar" class="bg-gray-100 p-2 rounded-full focus:outline-none hover:bg-gray-200">
                <!-- Ícono dependiendo del estado -->
                <svg v-if="isExpanded" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                </svg>

                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                </svg>

            </button>
        </div>
        <div class="border-t border-gray-300"> </div>

        <NuxtLink to="/" class="flex items-center space-x-4 text-lg p-2 rounded-lg hover:bg-gray-100 transition">
            <div>
                <img class="rounded-full w-10" :src="user.urlFoto" alt="avatar" />
            </div>
            <div v-if="isExpanded" class="flex justify-start flex-col items-start">
                <p class="cursor-pointer text-sm leading-5 text-slate-800">{{ user.name }}</p>
                <p class="cursor-pointer text-xs leading-3 text-gray-900">{{ user.email }}</p>
            </div>

        </NuxtLink>
        <div class="border-t border-gray-300"> </div>
        <!-- Menú de Navegación -->
        <div class="flex-1 overflow-y-auto">
            <ul class="space-y-4 px-2">
                <!-- Enlace Dashboard -->
                <li>
                    <NuxtLink to="/dashboard"
                        class="flex items-center space-x-4 text-lg p-2 rounded-lg hover:bg-gray-100 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="h-8 w-8">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                        </svg>
                        <span v-if="isExpanded">Dashboard</span>
                    </NuxtLink>
                </li>

                <!-- Enlace Productos -->
                <li>
                    <NuxtLink to="/dashboard/order-history"
                        class="flex items-center space-x-4 text-lg p-2 rounded-lg hover:bg-gray-100 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>

                        <span v-if="isExpanded">Order History </span>
                    </NuxtLink>
                </li>

                <!-- Más enlaces... -->
                <!-- Enlace Configuración -->
                <li class="">
                    <NuxtLink to="/settings"
                        class="flex items-center space-x-4 text-lg p-2 rounded-lg hover:bg-gray-100 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                        <span v-if="isExpanded">Settings</span>
                    </NuxtLink>
                </li>
            </ul>
        </div>
        <div class="border-t border-gray-300"> </div>
        <!-- Footer del Sidebar -->
        <NuxtLink to="/" @click="salir"
            class="flex items-center space-x-4 text-lg p-2 rounded-lg hover:bg-gray-100 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
            </svg>

            <span v-if="isExpanded">Salir</span>
        </NuxtLink>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
const { user, clear } = useUserSession();
// Estado para saber si el sidebar está expandido o colapsado
const isExpanded = ref(true);

// Clases dinámicas para el tamaño del sidebar
const sidebarClass = computed(() => {
    return isExpanded.value ? 'w-64' : 'w-16';
});

// Función para alternar la expansión del sidebar
const toggleSidebar = () => {
    isExpanded.value = !isExpanded.value;
};

// Función de logout
const salir = () => {
    clear(); // Limpiar la sesión
    const router = useRouter(); // Obtener el router
    router.push('/'); // Redirigir a la página principal
};
</script>


<style scoped>
/* Añadir estilos personalizados si es necesario */
</style>
