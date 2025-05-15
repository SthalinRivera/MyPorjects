<template>
    <div class="flex flex-col items-center justify-center  px-4 transition-colors duration-500">
        <div class="mx-auto text-center max-w-4xl relative">


            <!-- Texto principal -->
            <h1
                class="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold dark:text-white text-gray-800 leading-tight">
                <span class="inline-block">{{ $t("i_develop_solutions") }}</span>
                <br />
                <span class="text-transparent bg-clip-text bg-gradient-to-tr from-[#FF8660] to-[#8000FF]">
                    {{ $t("and_share") }} <span
                        class="inline-block animate-wiggle dark:text-white text-gray-900">knowledge</span>
                </span>
            </h1>

            <!-- Texto secundario -->
            <p class="relative mt-8 text-lg md:text-xl dark:text-gray-300 text-gray-600 max-w-2xl mx-auto">
                {{ $t("home_decription") }}
                <span class="font-semibold dark:text-purple-300 text-purple-600">{{ $t("contenido_interactivo")
                }}</span> {{ $t("and") }}
                <span class="font-semibold dark:text-pink-300 text-pink-600"> {{ $t("practical_examples") }} </span>.
            </p>

            <!-- Botones de acción -->
            <div class="relative flex flex-wrap justify-center gap-4 mt-12">
                <button
                    class="px-8 py-3 rounded-full bg-gradient-to-r from-[#8000FF] to-[#FF8660] text-white font-medium shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105">
                    View My Work
                </button>
                <button
                    class="px-8 py-3 rounded-full dark:bg-white/10 bg-gray-800/5 dark:text-white text-gray-800 font-medium border dark:border-white/20 border-gray-300 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
                    Explore Content
                </button>
            </div>

            <!-- Elemento decorativo flotante -->
            <div
                class="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl -z-10">
            </div>
        </div>


    </div>
</template>

<script setup>
import { onMounted } from 'vue'

// Efecto de escritura opcional
onMounted(() => {
    const words = ["solutions", "experiences", "projects", "dreams"];
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

<style>
@keyframes float {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
    }

    100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
    }
}

@keyframes wiggle {

    0%,
    100% {
        transform: rotate(-3deg);
    }

    50% {
        transform: rotate(3deg);
    }
}

@keyframes bounce {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-15px);
    }
}

.animate-wiggle {
    display: inline-block;
    animation: wiggle 2s ease-in-out infinite;
    transition: all 0.5s ease;
}

.animate-bounce {
    animation: bounce 2s infinite;
}

.animate-float {
    animation: float linear infinite;
}
</style>