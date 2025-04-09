<template>
    <div>
        <footer
            class="w-full bg-gradient-to-r from-white to-gray-100 dark:from-slate-800 dark:to-slate-900 text-slate-800 dark:text-slate-200 shadow-lg transition-colors duration-300">
            <div class="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                <div class="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
                    <div class="sm:col-span-2">
                        <a href="/" aria-label="Go home" title="Company" class="inline-flex items-center">
                            <svg class="w-8 text-pink-500 dark:text-pink-400" viewBox="0 0 24 24"
                                stroke-linejoin="round" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10"
                                stroke="currentColor" fill="none">
                                <rect x="3" y="1" width="7" height="12"></rect>
                                <rect x="3" y="17" width="7" height="6"></rect>
                                <rect x="14" y="1" width="7" height="6"></rect>
                                <rect x="14" y="11" width="7" height="12"></rect>
                            </svg>
                            <span
                                class="ml-2 text-xl font-bold tracking-wide text-slate-800 dark:text-white uppercase">SunShineMADEForYou</span>
                        </a>
                        <div class="mt-6 lg:max-w-sm">
                            <p class="text-sm text-slate-600 dark:text-slate-300">
                                Descubre lo mejor en moda y accesorios con nuestros productos exclusivos.
                            </p>
                            <p class="mt-4 text-sm text-slate-600 dark:text-slate-300">
                                Estilo, calidad y elegancia en un solo lugar.
                            </p>
                        </div>
                    </div>
                    <div class="space-y-2 text-sm">
                        <p class="text-base font-bold tracking-wide text-slate-800 dark:text-white">Contacto</p>
                        <div class="flex">
                            <p class="mr-1 text-slate-600 dark:text-slate-300">Teléfono:</p>
                            <a href="tel:850-123-5021"
                                class="transition-colors duration-300 hover:text-pink-600 dark:hover:text-pink-400">+51
                                919753974 - +51 922869225</a>
                        </div>
                        <div class="flex">
                            <p class="mr-1 text-slate-600 dark:text-slate-300">Email:</p>
                            <a href="mailto:info@lorem.mail"
                                class="transition-colors duration-300 hover:text-pink-600 dark:hover:text-pink-400">sunshine@gmail.com</a>
                        </div>
                        <div class="flex">
                            <p class="mr-1 text-slate-600 dark:text-slate-300">Dirección:</p>
                            <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer"
                                class="transition-colors duration-300 hover:text-pink-600 dark:hover:text-pink-400">
                                Quilmana - Cañete - Lima</a>
                        </div>
                    </div>
                    <div>
                        <span class="text-base font-bold tracking-wide text-slate-800 dark:text-white">Síguenos</span>
                        <div class="flex items-center mt-2 space-x-4">

                            <a href="https://www.instagram.com/sunshinemadeforyou?igsh=a2FrdHdhbTZiYng1" target="_blank"
                                class="text-slate-600 dark:text-slate-300 hover:text-pink-500 dark:hover:text-pink-400 transition-transform transform hover:scale-110">
                                <i class="ri-instagram-fill ri-xl"></i>
                            </a>
                            <a href="https://www.facebook.com/share/18p364PybW/" target="_blank"
                                class="text-slate-600 dark:text-slate-300 hover:text-pink-500 dark:hover:text-pink-400 transition-transform transform hover:scale-110">
                                <i class="ri-facebook-fill ri-xl"></i>
                            </a>
                        </div>
                        <p class="mt-4 text-sm text-slate-600 dark:text-slate-300">
                            Síguenos en nuestras redes para más ofertas y novedades.
                        </p>
                    </div>
                </div>
                <div
                    class="flex flex-col-reverse justify-between pt-5 pb-10 border-t border-gray-200 dark:border-slate-700 lg:flex-row">
                    <p class="text-sm text-slate-600 dark:text-slate-400">
                        © 2025 Sunshine. Todos los derechos reservados.
                    </p>
                    <ul class="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
                        <li>
                            <a href="/faq"
                                class="text-sm text-slate-600 dark:text-slate-300 transition-colors duration-300 hover:text-pink-600 dark:hover:text-pink-400">F.A.Q</a>
                        </li>
                        <li>
                            <a href="/politica-privacidad"
                                class="text-sm text-slate-600 dark:text-slate-300 transition-colors duration-300 hover:text-pink-600 dark:hover:text-pink-400">Política
                                de privacidad</a>
                        </li>
                        <li>
                            <a href="/terminos-condiciones"
                                class="text-sm text-slate-600 dark:text-slate-300 transition-colors duration-300 hover:text-pink-600 dark:hover:text-pink-400">Términos
                                y condiciones</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped></style>