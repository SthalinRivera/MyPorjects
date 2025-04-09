<template>
    <div>
        <!-- Mobile Toggle Button -->
        <button @click="toggleMobileSidebar"
            class="md:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 transition-all hover:scale-105">
            <Icon :name="isMobileSidebarOpen ? 'heroicons:x-mark' : 'heroicons:bars-3-bottom-left'"
                class="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        <!-- Sidebar -->
        <div ref="sidebar" :class="[
            'fixed md:relative z-30 h-screen transition-all duration-300 flex flex-col justify-between',
            'bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900',
            'border-r border-gray-200 dark:border-gray-700',
            'shadow-xl dark:shadow-gray-900/40',
            isExpanded ? 'w-72' : 'w-20',
            isHovered && !isExpanded ? 'w-32' : '',
            isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        ]" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
            <!-- Header -->
            <div
                class="px-4 py-5 flex items-center justify-between backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-b border-gray-100 dark:border-gray-700">
                <NuxtLink to="/dashboard" class="flex items-center space-x-3 overflow-hidden"
                    @click="closeMobileSidebar">
                    <div
                        class="w-9 h-9 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shrink-0">
                        <Icon name="heroicons:cube" class="w-5 h-5" />
                    </div>
                    <transition name="fade">
                        <span v-if="showTitle"
                            class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-500 dark:from-indigo-400 dark:to-purple-400">
                            Dashboard
                        </span>
                    </transition>
                </NuxtLink>
                <button @click="toggleSidebar"
                    class="p-2 rounded-lg focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-all"
                    aria-label="Toggle sidebar">
                    <Icon :name="isExpanded ? 'heroicons:chevron-double-left' : 'heroicons:chevron-double-right'"
                        class="w-5 h-5 text-gray-600 dark:text-gray-300 transition-transform hover:scale-110" />
                </button>
            </div>

            <!-- User Profile -->
            <div class="px-3 mt-2 mb-4">
                <NuxtLink to="/profile" class="flex items-center p-2 rounded-xl transition-all group" :class="[
                    'hover:bg-white dark:hover:bg-gray-700/50',
                    'hover:shadow-md hover:shadow-indigo-100/50 dark:hover:shadow-indigo-900/20',
                    'border border-transparent hover:border-gray-200 dark:hover:border-gray-600'
                ]" @click="closeMobileSidebar">
                    <div class="relative shrink-0">
                        <img class="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-800 group-hover:border-indigo-300 dark:group-hover:border-indigo-500 transition-all"
                            :src="user.urlFoto || 'https://avatars.dicebear.com/api/initials/' + (user.name || 'User') + '.svg'"
                            alt="User avatar">
                        <div
                            class="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-800">
                        </div>
                    </div>
                    <transition name="slide-fade">
                        <div v-if="showUserInfo" class="ml-3 min-w-0">
                            <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {{ user.name || 'Usuario' }}
                            </p>
                            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {{ user.email || 'usuario@ejemplo.com' }}
                            </p>
                        </div>
                    </transition>
                </NuxtLink>
            </div>

            <!-- Navigation Menu -->
            <nav class="flex-1 overflow-y-auto py-2 px-2">
                <ul class="space-y-1">
                    <li v-for="item in menuItems" :key="item.to">
                        <NuxtLink :to="item.to" class="flex items-center p-3 rounded-xl transition-all group relative"
                            :class="[
                                $route.path.startsWith(item.to)
                                    ? 'bg-indigo-50/80 text-indigo-600 dark:bg-gray-700/80 dark:text-indigo-400'
                                    : 'hover:bg-gray-100/70 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300',
                                'hover:shadow-sm hover:shadow-indigo-100/30 dark:hover:shadow-indigo-900/10'
                            ]" @click="closeMobileSidebar">
                            <div class="relative flex-shrink-0">
                                <Icon :name="item.icon" class="w-5 h-5 transition-transform group-hover:scale-110" />
                                <div v-if="$route.path.startsWith(item.to)"
                                    class="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-full">
                                </div>
                            </div>

                            <div class="min-w-0 flex items-center">
                                <transition name="slide-fade">
                                    <span v-if="showMenuText" class="ml-3 font-medium truncate">
                                        {{ isMobile ? item.shortTitle || item.title : item.title }}
                                    </span>
                                </transition>
                                <transition name="fade">
                                    <span v-if="showMenuText && item.badge"
                                        class="ml-2 px-2 py-0.5 text-xs rounded-full whitespace-nowrap flex-shrink-0"
                                        :class="[
                                            item.badge === 'new' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : '',
                                            item.badge === 'pro' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' : ''
                                        ]">
                                        {{ item.badge === 'new' ? 'Nuevo' : 'Pro' }}
                                    </span>
                                </transition>
                            </div>
                        </NuxtLink>
                    </li>
                </ul>
            </nav>

            <!-- Logout Button -->
            <div class="px-3 mb-5">
                <button @click="salir"
                    class="flex items-center w-full p-3 rounded-xl transition-all group hover:bg-red-50/70 dark:hover:bg-red-900/10 hover:text-red-600 dark:hover:text-red-400">
                    <Icon name="heroicons:arrow-left-on-rectangle"
                        class="w-5 h-5 transition-transform group-hover:scale-110 flex-shrink-0" />
                    <transition name="slide-fade">
                        <span v-if="showMenuText" class="ml-3 font-medium">
                            Cerrar sesión
                        </span>
                    </transition>
                </button>
            </div>
        </div>

        <!-- Mobile Overlay -->
        <div v-if="isMobileSidebarOpen" @click="isMobileSidebarOpen = false"
            class="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden transition-opacity duration-300"></div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { user, clear } = useUserSession();
const route = useRoute();
const router = useRouter();

// Sidebar states
const isExpanded = ref(true);
const isHovered = ref(false);
const isMobileSidebarOpen = ref(false);
const isMobile = ref(false);
const sidebar = ref(null);

// Menu items with optional short titles for mobile
const menuItems = [
    {
        to: '/dashboard',
        title: 'Dashboard',
        shortTitle: 'Inicio',
        icon: 'heroicons:chart-bar'
    },
    {
        to: '/dashboard/orders',
        title: 'Historial de Pedidos',
        shortTitle: 'Pedidos',
        icon: 'heroicons:shopping-bag',
        badge: 'new'
    },
    {
        to: '/dashboard/categories',
        title: 'Gestión de Categorías',
        shortTitle: 'Categorías',
        icon: 'heroicons:rectangle-stack'
    },
    {
        to: '/dashboard/products',
        title: 'Administrar Productos',
        shortTitle: 'Productos',
        icon: 'heroicons:archive-box'
    },
    {
        to: '/dashboard/sales',
        title: 'Reportes de Ventas',
        shortTitle: 'Ventas',
        icon: 'heroicons:banknotes',
        badge: 'pro'
    },
];

// Computed properties
const showTitle = computed(() => isExpanded.value || isHovered.value);
const showMenuText = computed(() => isExpanded.value || isHovered.value);
const showUserInfo = computed(() => isExpanded.value || isHovered.value);

// Toggle sidebar
const toggleSidebar = () => {
    isExpanded.value = !isExpanded.value;
};

// Mobile sidebar functions
const toggleMobileSidebar = () => {
    isMobileSidebarOpen.value = !isMobileSidebarOpen.value;
};

const closeMobileSidebar = () => {
    if (isMobile.value) {
        isMobileSidebarOpen.value = false;
    }
};

// Check screen size
const checkScreenSize = () => {
    isMobile.value = window.innerWidth < 768;
    if (!isMobile.value) {
        isMobileSidebarOpen.value = true;
        isExpanded.value = true;
    } else {
        isExpanded.value = false;
    }
};

// Close mobile sidebar on route change
watch(() => route.path, () => {
    closeMobileSidebar();
});

// Initialize and cleanup
onMounted(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', checkScreenSize);
});

// Logout function
const salir = async () => {
    try {
        await clear();
        router.push('/');
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
};
</script>

<style scoped>
/* Animations */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-fade-enter-active {
    transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.15s ease-in;
}

.slide-fade-enter-from {
    transform: translateX(-10px);
    opacity: 0;
}

.slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}

/* Scrollbar styling */
nav::-webkit-scrollbar {
    width: 4px;
}

nav::-webkit-scrollbar-track {
    background: transparent;
}

nav::-webkit-scrollbar-thumb {
    background-color: rgba(165, 180, 252, 0.5);
    border-radius: 4px;
}

.dark nav::-webkit-scrollbar-thumb {
    background-color: rgba(99, 102, 241, 0.5);
}

/* Acrylic effect */
.backdrop-blur-sm {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

/* Responsive adjustments */
@media (max-width: 767px) {
    .fixed {
        width: 85vw !important;
        min-width: 260px;
        max-width: 300px;
    }

    nav ul li a {
        padding: 12px 10px;
    }

    .truncate {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;
        max-width: 160px;
    }
}

/* iOS viewport fix */
@supports (-webkit-touch-callout: none) {
    .h-screen {
        min-height: -webkit-fill-available;
    }
}
</style>