<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import ProductCard from '~/components/UI/Card/ProductCard.vue';

import CategorySidebar from '~/components/Categories/CategorySidebar.vue';
import FlashSaleSidebar from '~/components/promotion/FlashSaleSidebar.vue';
import MainContent from '~/components/promotion/MainContent.vue';
import Subscription from '~/components/UI/Subscription/Subscription.vue';
import PromotionProductCard from '~/components/UI/Card/PromotionProductCard.vue';
import Sale from '~/components/UI/CardSale/Sale.vue';

definePageMeta({
    layout: "ecommerce",
});

// Banners dinámicos
const banners = ref([
    {
        id: 'promociones',
        src: '/banner-sale-offer-reverse-1.webp',
        alt: 'Colección exclusiva de promociones',
        height: '600px',
    },
    {
        id: 'destacados',
        src: '/banner-sale-offer-reverse-2.webp',
        alt: 'Productos destacados',
        height: '600px',
    },
    {
        id: 'destacados',
        src: '/banner-sale-offer-reverse-2.webp',
        alt: 'Productos destacados',
        height: '600px',
    },
    // Puedes seguir agregando más aquí
]);

// Simulación de cargar banners dinámicamente (cuando conectes a API)
const fetchBanners = async () => {
    try {
        // const response = await fetch('/api/banners');
        // banners.value = await response.json();
    } catch (error) {
        console.error('Error al cargar los banners:', error);
    }
}

onMounted(() => {
    fetchBanners();
});
</script>

<template>
    <div class="space-y-10">
        <!-- Primera sección -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div class="lg:col-span-1">
                <CategorySidebar />
            </div>
            <div class="lg:col-span-2">
                <MainContent />
            </div>
            <div class="lg:col-span-1">
                <FlashSaleSidebar />
            </div>
        </div>

        <UICarouselAutoSlide />

        <!-- Mostrar banners -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div class="hidden md:block">
                <Sale v-if="banners.length > 0" :imageSrc="banners[0].src" :altText="banners[0].alt"
                    :height="banners[0].height" />
            </div>
            <div class="col-span-3">
                <PromotionProductCard />
            </div>
        </div>

        <Categories />

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div class="col-span-3">
                <ProductCard />
            </div>
            <div class="hidden md:block">
                <Sale v-if="banners.length > 1" :imageSrc="banners[1].src" :altText="banners[1].alt"
                    :height="banners[1].height" />
            </div>
        </div>

        <Subscription />
    </div>
</template>

<style>
html {
    @apply transition-colors duration-300;
}

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
