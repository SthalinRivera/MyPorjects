<template>
  <div class="my-4">
    <div class=" mx-auto px-4">
      <div class="flex flex-col lg:flex-row gap-8 items-center">
        <!-- Contenido de texto -->
        <div class="lg:w-1/2">
          <h1
            class="text-slate-900 dark:text-white font-bold text-2xl mb-6 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-20 after:bg-pink-500 after:rounded-full pb-2">
            Preguntas Frecuentes
          </h1>
          <p class="text-sm sm:text-base text-gray-500 dark:text-gray-400 my-4">
            Encuentra respuestas a las preguntas más comunes sobre nuestros productos y servicios.
          </p>

          <div class="space-y-4">
            <div v-for="(faq, index) in faqs" :key="index"
              class="faq-item rounded-xl overflow-hidden transition-all duration-300" :class="{
                'bg-white dark:bg-gray-800 shadow-sm': openIndex !== index,
                'bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700': openIndex === index
              }">
              <button @click="toggleAnswer(index)"
                class="w-full text-left px-6 py-5 flex justify-between items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 rounded-xl"
                :aria-expanded="openIndex === index">
                <div class="flex items-center gap-4">
                  <div
                    class="flex-shrink-0 w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center">
                    <UIcon :name="faq.icon" class="text-lg text-pink-600 dark:text-pink-400" dynamic />
                  </div>
                  <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
                    {{ faq.question }}
                  </h3>
                </div>
                <UIcon name="i-ri-arrow-down-s-line"
                  class="text-xl text-gray-500 dark:text-gray-400 transition-transform duration-300"
                  :class="{ 'transform rotate-180': openIndex === index }" dynamic />
              </button>

              <div v-show="openIndex === index" class="px-6 pb-6 transition-all duration-300">
                <div class="pl-14 pr-6 text-gray-600 dark:text-gray-300">
                  <p class="leading-relaxed">{{ faq.answer }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Imagen decorativa -->
        <div class="lg:w-1/2 hidden lg:block">
          <img src="/questios.jpeg" alt="Persona revisando preguntas frecuentes"
            class="w-full h-auto rounded-xl object-cover shadow-lg">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';

interface FAQItem {
  question: string;
  answer: string;
  icon: string;
}

const faqs: Ref<FAQItem[]> = ref([
  {
    question: '¿Cuentan con tienda física?',
    answer: 'No, por el momento todo es virtual',
    icon: 'i-ri-global-line'
  },
  {
    question: '¿Cuál es el costo de los envíos?',
    answer: 'Ofrecemos envíos gratuitos para pedidos superiores a S/ 30. Para pedidos menores, el costo varía según la ubicación (S/ 5-10 a nivel nacional).',
    icon: 'i-ri-money-dollar-circle-line'
  },
  {
    question: '¿Cuánto tardan los envíos?',
    answer: 'Los envíos estándar tardan 3-5 días hábiles. Envíos express: 24-48 horas (productos seleccionados).',
    icon: 'i-ri-time-line'
  },
  {
    question: '¿Hacen envíos internacionales?',
    answer: 'No, por ahora solo trabajamos en territorio Nacional muy pronto.',
    icon: 'i-ri-plane-line'
  },
]);

const openIndex = ref<number | null>(null);

const toggleAnswer = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index;
};
</script>

<style scoped>
.dark .faq-container {
  background-color: #111827;
}

.faq-item {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.faq-item button {
  outline: none;
}

.faq-item div[aria-expanded="true"] {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>