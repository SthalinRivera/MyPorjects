<template>
    <div>
        <nav
            class="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-200">
            <div class="max-w-screen-xl flex items-center justify-between mx-auto px-4 py-3">
                <!-- Logo -->
                <NuxtLink to="/" class="flex items-center gap-2">
                    <span class="font-medium text-lg text-gray-800 dark:text-white transition-colors">
                        SunShineMadeForYou
                    </span>

                </NuxtLink>

                <!-- Mobile Menu Button -->
                <button
                    class="lg:hidden rounded-md p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors"
                    @click="toggleMobileMenu">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        <path v-else stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <!-- Navigation Items -->
                <div :class="[isMobileMenuOpen ? 'flex' : 'hidden lg:flex']"
                    class="absolute lg:relative top-16 lg:top-0 left-0 right-0 flex-col lg:flex-row items-center bg-white dark:bg-gray-900 lg:bg-transparent lg:dark:bg-transparent w-full lg:w-auto py-4 lg:py-0 shadow-md lg:shadow-none z-50 transition-all">

                    <!-- Nav Links -->
                    <div
                        class="flex flex-col lg:flex-row items-center lg:items-stretch w-full lg:w-auto space-y-3 lg:space-y-0 lg:space-x-6">
                        <div v-for="ruta in rutasSistemas()" :key="ruta.name" class="w-full lg:w-auto">
                            <template v-if="ruta && (!ruta.permiso || ruta.permiso === user?.permiso)">
                                <NuxtLink :to="ruta.path"
                                    class="block py-2 px-4 w-full text-center lg:text-left text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors lg:hover:bg-transparent">
                                    {{ ruta.name }}
                                </NuxtLink>
                            </template>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="flex items-center mt-4 lg:mt-0 lg:ml-6 space-x-4">
                        <!-- Dark Mode Toggle -->
                        <ClientOnly>
                            <button @click="isDark = !isDark"
                                class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none"
                                aria-label="Toggle Dark Mode">
                                <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            </button>
                            <template #fallback>
                                <div class="w-9 h-9"></div>
                            </template>
                        </ClientOnly>

                        <!-- Language Selector -->
                        <select v-model="locale"
                            class="px-3 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-md text-sm text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer transition-colors">
                            <option value="es">ES</option>
                            <option value="en">EN</option>
                        </select>

                        <!-- User Menu -->
                        <ClientOnly v-if="loggedIn">
                            <LayoutUsuario />
                        </ClientOnly>

                        <!-- Favorites -->
                        <NuxtLink to="/product/favorites"
                            class="relative p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span v-if="totalItemsFavorite > 0"
                                class="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full font-medium">
                                {{ totalItemsFavorite }}
                            </span>
                        </NuxtLink>

                        <!-- Cart -->
                        <button type="button" @click="isCartOpen = true"
                            class="relative p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <span v-if="totalItems > 0"
                                class="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full font-medium">
                                {{ totalItems }}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Shopping Cart Modal -->
        <ShoppingCart :isOpen="isCartOpen" @update:isOpen="isCartOpen = $event" />
    </div>
</template>

<script setup lang="ts">
import rutasSistemas from '~/utils/rutasSistemas';

const { locale } = useI18n();
const isCartOpen = ref(false); // Estado separado para el carrito
const isMobileMenuOpen = ref(false); // Estado separado para el menú móvil
const { loggedIn, user } = useUserSession();

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const productStore = useProductShoppingCartStore();
const { totalItems } = storeToRefs(productStore);

const favoriteProductStore = useProductStore();
const { totalItemsFavorite } = storeToRefs(favoriteProductStore);

const colorMode = useColorMode();
const isDark = computed({
    get() {
        return colorMode.value === 'dark';
    },
    set() {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
    }
});
</script>

<style scoped>
/* Transitions for mobile menu */
.lg\:flex {
    transition: all 0.3s ease;
}
</style>