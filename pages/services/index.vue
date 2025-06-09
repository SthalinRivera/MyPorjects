<template>
    <Servicios :services="services" />
</template>

<script setup>
import Servicios from '~/components/Servicios/Servicios.vue';
import servicesData from './services.json' // O donde tengas tus datos

const services = ref(servicesData)

// Define la metadata para SEO
useHead({
    title: 'Nuestros Servicios Profesionales',
    meta: [
        { name: 'description', content: 'Descubre nuestros servicios profesionales en diseño web, ecommerce, landing pages y asesoría académica.' }
    ]
})
</script>