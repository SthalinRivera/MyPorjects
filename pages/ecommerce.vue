<script lang="ts" setup>
import ProductCard from '~/components/UI/Card/ProductCard.vue';
import Sale from '~/components/UI/CardSale/Sale.vue';
import CategorySidebar from '~/components/UI/CategorySidebar.vue';
import FlashSaleSidebar from '~/components/UI/FlashSaleSidebar.vue';
import MainContent from '~/components/UI/MainContent.vue';



definePageMeta({
    layout: "ecommerce",
});


import { ref } from 'vue'
import Subscription from '~/components/UI/Subscription/Subscription.vue';
import PromotionProductCard from '~/components/UI/Card/PromotionProductCard.vue';

// Imagen dinámica (pon aquí la ruta que quieras)
const backgroundImage = ref('/banner-4.webp')  // Tu imagen dentro de /public
</script>

<template>
    <div class="">
        <div class="">
            <!-- Main grid layout -->
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <!-- Left sidebar - Categories -->
                <div class="lg:col-span-1">
                    <CategorySidebar />
                </div>

                <!-- Main content -->
                <div class="lg:col-span-2">
                    <MainContent />
                </div>

                <!-- Right sidebar - Flash sale -->
                <div class="lg:col-span-1">
                    <FlashSaleSidebar />
                </div>
            </div>

            <UICarouselAutoSlide></UICarouselAutoSlide>
            <div class="grid grid-cols-1 lg:grid-cols-4">
                <!-- Left sidebar - Categories -->
                <div class="">

                    <Sale></Sale>
                </div>

                <!-- Right sidebar - Flash sale -->
                <div class="col-span-3">
                    <PromotionProductCard></PromotionProductCard>
                </div>
            </div>

            <Categories></Categories>

            <div class="grid grid-cols-1 lg:grid-cols-4">
                <!-- Left sidebar - Categories -->
                <div class="col-span-3">
                    <ProductCard></ProductCard>
                </div>

                <!-- Right sidebar - Flash sale -->
                <div class="">
                    <Sale></Sale>
                </div>
            </div>
            <!-- Imagen dinámica -->
            <img :src="backgroundImage" alt="Colección exclusiva" class="w-full h-full object-cover" />
            <Subscription></Subscription>
        </div>
    </div>
</template>

<style>
/* Smooth transitions for dark mode */
html {
    @apply transition-colors duration-300;
}

/* Custom scrollbar for dark mode */
.dark ::-webkit-scrollbar {
    width: 8px;
}

.dark ::-webkit-scrollbar-track {
    @apply bg-gray-800;
}

.dark ::-webkit-scrollbar-thumb {
    @apply bg-gray-600 rounded-full;
}

.dark ::-webkit-scrollbar-thumb:hover {
    @apply bg-gray-500;
}
</style>