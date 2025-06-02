<template>
    <div class="lex items-center justify-center px-4 py-12 ">
        <div class="max-w-4xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
            <!-- Columna izquierda - Información personal -->
            <div class="space-y-6">
                <h1 class="text-4xl font-bold dark:text-white text-gray-800">
                    Hola 👋 soy<br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8660] to-[#8000FF]">Sthalin
                        Rivera</span>
                </h1>

                <div class="space-y-4">


                    <p class="text-lg dark:text-gray-300 text-gray-600">
                        <strong class="dark:text-white text-gray-800">Desarrollador web con experiencia en Nuxt,
                            Laravel, PostgreSQL y análisis estadístico</strong>
                    </p>
                </div>

                <div class="flex flex-wrap gap-4">
                    <NuxtLink to="/product"
                        class="px-6 py-2 rounded-full bg-gradient-to-r from-[#8000FF] to-[#FF8660] text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                        Ver mis proyectos
                    </NuxtLink>
                    <a href="https://wa.me/51910985938?text=Hola,%20quiero%20más%20información%20sobre%20tu%20trabajo"
                        target="_blank" rel="noopener noreferrer"
                        class="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M20.52 3.48A11.89 11.89 0 0012 0C5.37 0 0 5.38 0 12a11.9 11.9 0 001.61 6.05L0 24l6.29-1.65A11.91 11.91 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.18-3.48-8.52zM12 22a9.93 9.93 0 01-5.1-1.38l-.37-.22-3.73.98.99-3.64-.24-.38A10.01 10.01 0 1122 12c0 5.52-4.48 10-10 10zm5.46-7.34c-.3-.15-1.77-.88-2.05-.98s-.47-.15-.66.15-.76.98-.93 1.17-.34.22-.64.07a8.21 8.21 0 01-2.42-1.49 9.11 9.11 0 01-1.7-2.1c-.17-.3-.02-.46.13-.6.13-.13.3-.34.45-.51.15-.17.2-.3.3-.51s.05-.38-.03-.53-.66-1.57-.91-2.15c-.24-.58-.48-.5-.66-.51h-.56c-.17 0-.46.07-.7.34s-.93.91-.93 2.22 1 .96 1.14 1.03c.15.07.3.1.34.2s.05.28-.05.44c-.10.15-.22.3-.34.46s-.22.3-.3.5a2.83 2.83 0 00.56 2.56c.15.2 2.2 3.38 5.34 4.74.75.32 1.34.52 1.8.66.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.15-1.51.27-.75.27-1.39.19-1.51s-.27-.22-.56-.36z" />
                        </svg>
                        WhatsApp
                    </a>
                </div>
            </div>

            <!-- Columna derecha - Estadísticas -->
            <div class="grid grid-cols-2 gap-4">
                <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                    <h3 class="text-3xl font-bold dark:text-white text-gray-800">4+</h3>
                    <p class="dark:text-gray-300 text-gray-600">Años de experiencia</p>
                </div>
                <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                    <h3 class="text-3xl font-bold dark:text-white text-gray-800">24+</h3>
                    <p class="dark:text-gray-300 text-gray-600">Proyectos completados</p>
                </div>
                <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                    <h3 class="text-3xl font-bold dark:text-white text-gray-800">23+</h3>
                    <p class="dark:text-gray-300 text-gray-600">Comentarios de clientes</p>
                </div>
                <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                    <h3 class="text-3xl font-bold dark:text-white text-gray-800">2+</h3>
                    <p class="dark:text-gray-300 text-gray-600">Países con clientes</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Puedes mantener el mismo script si lo deseas
import { onMounted } from 'vue'

onMounted(() => {
    const words = ["experiencias", "proyectos", "sueños", "ideas", "pasión"];
    let currentWord = 0;
    const element = document.querySelector('.animate-wiggle');

    if (element) {
        setInterval(() => {
            currentWord = (currentWord + 1) % words.length;
            element.style.opacity = '0';

            setTimeout(() => {
                element.textContent = words[currentWord];
                element.style.opacity = '1';
            }, 500);
        }, 3000);
    }
});
</script>