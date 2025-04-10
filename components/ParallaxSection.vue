<script setup lang="ts">
import { useMotion } from "@vueuse/motion";
import { ref } from "vue";

const titleRef = ref(null);

// Animación del texto
useMotion(titleRef, {
  initial: { opacity: 0, y: 50 },
  enter: { opacity: 1, y: 0, transition: { duration: 1000 } }
});
</script>

<template>
  <div class="h-96 flex items-center justify-center bg-cover bg-center relative rounded-xl"
    style="background-image: url('/banner1.jpg')">
    <!-- <div class="absolute inset-0 bg-black/100"></div> -->
    <h1 ref="titleRef" class="text-xl md:text-2xl font-bold text-slate-900 relative z-10 text-center  px-4">
      Diseñados para brillar contigo
    </h1>
  </div>
</template>
