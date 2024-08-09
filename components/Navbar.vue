<template>
    <div>
        <nav class="bg-white border-gray-200 dark:bg-gray-900">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                <div class="flex items-center flex-shrink-0 text-white mr-6">
                    <NuxtLink to="/">

                        <div class="flex items-center justify-between">
                            <span
                                class="font-semibold text-xl tracking-tight mr-2 text-slate-900 dark:text-slate-200">Sthalin
                                Rivera</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-6  text-blue-400">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                            </svg>
                        </div>
                    </NuxtLink>
                </div>
                <div class="block lg:hidden">
                    <button
                        class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
                        @click="toggleMenu">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-6">
                            <!-- Icono de hamburguesa -->
                            <path stroke-linecap="round" stroke-linejoin="round"
                                :class="{ 'hidden': isOpen, 'block': !isOpen }"
                                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                            <!-- Icono de X -->
                            <path :class="{ 'block': isOpen, 'hidden': !isOpen }" fill="currentColor"
                                d="M6 18L18 6M6 6l12 12" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>

                    </button>
                </div>


                <div :class="{ hidden: !isOpen, block: isOpen }"
                    class="w-full block  lg:flex lg:items-center lg:w-auto">
                    <div v-for="ruta in rutasSistemas()" :key="ruta.name">
                        <template v-if="ruta && (!ruta.permiso || ruta.permiso === user?.permiso)">
                            <NuxtLink :to="ruta.path"
                                class="block mt-4 lg:inline-block lg:mt-0 text-slate-900 hover:text-slate-900 mr-4 dark:text-white text-center">
                                {{ ruta.name }}
                            </NuxtLink>
                        </template>
                    </div>
                    <div class="flex items-center justify-between ">
                        <ClientOnly class="mr-4">
                            <div class="block w-auto  md:w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                            focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
                            dark:placeholder-gray-400 dark:text-white p-0.5 mr-2">
                                <UButton :icon="isDark
                                    ? 'i-heroicons-moon-20-solid'
                                    : 'i-heroicons-sun-20-solid'
                                    " color="gray" variant="ghost" aria-label="Theme" @click="isDark = !isDark" />
                            </div>
                            <template #fallback>
                                <div class="w-8 h-8"></div>
                            </template>
                        </ClientOnly>
                        <select v-model="locale" class="block w-auto py-2 md:w-34  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                            focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
                            dark:placeholder-gray-400 dark:text-white md:p-2 ">
                            <option value="es">es</option>
                            <option value="en">en</option>
                        </select>
                        <ClientOnly v-if="loggedIn">
                            <LayoutUsuario class="mx-2" />
                        </ClientOnly>
                    </div>
                </div>
            </div>
        </nav>

    </div>
</template>

<script setup lang="ts">
import rutasSistemas from '~/utils/rutasSistemas';

const { locale } = useI18n();
const isOpen = ref(false)
const { loggedIn, user } = useUserSession();
const toggleMenu = () => {
    isOpen.value = !isOpen.value;
}

const colorMode = useColorMode()
const isDark = computed({
    get() {
        return colorMode.value === 'dark'
    },
    set() {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
})



</script>

<style lang="scss" scoped></style>