<template>
  <div class="w-full ">
    <!-- Primera sección -->
    <div class="grid grid-cols-1 lg:grid-cols-4 md:gap-6">
      <div class="lg:col-span-1">
        <CategorySidebar />
      </div>
      <div class="lg:col-span-3">
        <UICarouselPortadaSlider></UICarouselPortadaSlider>
      </div>
    </div>
    <Categories></Categories>
    <PromotionPromotionsGrid></PromotionPromotionsGrid>

    <Publicidad></Publicidad>
    <CardProductsHome></CardProductsHome>
    <ParallaxSection></ParallaxSection>
    <Faq></Faq>

    <div id="subscribe">
      <ParallaxSuscription></ParallaxSuscription>
    </div>

  </div>
</template>


<script setup lang="ts">
import CategorySidebar from './Categories/CategorySidebar.vue';
import CardProductsHome from './product/CardProductsHome.vue';
import FlashSaleSidebar from './promotion/FlashSaleSidebar.vue';
import MainContent from './promotion/MainContent.vue';
import ParallaxSection from './UI/Parallax/ParallaxSection.vue';
import ParallaxSuscription from './UI/Parallax/ParallaxSuscription.vue';


</script>
