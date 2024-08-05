<template>
    <div>
        <nav class="bg-white border-gray-200 dark:bg-gray-900">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                <div class="flex items-center flex-shrink-0 text-white mr-6">
                    <NuxtLink to="/">
                        <span class="font-semibold text-xl tracking-tight">Sthalin Rivera</span>
                    </NuxtLink>
                </div>
                <div class="block lg:hidden">
                    <button
                        class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
                        @click="toggleMenu">
                        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Menu</title>
                            <path :class="{ hidden: isOpen, 'inline-block': !isOpen }" class="fill-current"
                                d="M0 0h20v20H0z" />
                            <path :class="{ hidden: !isOpen, 'inline-block': isOpen }" class="fill-current"
                                d="M0 0h20v20H0z" />
                        </svg>
                    </button>
                </div>
                <div :class="{ hidden: !isOpen, block: isOpen }"
                    class="w-full block  lg:flex lg:items-center lg:w-auto">
                    <div class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
                        v-for="ruta in rutasSistemas()" :key="ruta.name">
                        <NuxtLink v-if="!ruta.permiso || ruta.permiso === user?.permiso" :to="ruta.path"
                            class="block mt-4 lg:inline-block lg:mt-0 text-slate-900 hover:text-white mr-4 dark:text-white">
                            {{ ruta.name }}
                        </NuxtLink>

                    </div>
                    <div class="flex items-center">
                        <ClientOnly>
                            <UButton :icon="isDark
                                ? 'i-heroicons-moon-20-solid'
                                : 'i-heroicons-sun-20-solid'
                                " color="gray" variant="ghost" aria-label="Theme" @click="isDark = !isDark" />

                            <template #fallback>
                                <div class="w-8 h-8" />
                            </template>
                        </ClientOnly>
                        <select v-model="locale" class="ml-8">
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