<template>
    <Servicios :services="services" />
</template>

<script setup>

import servicesData from '../../pages/services/services.json' // O donde tengas tus datos
import Servicios from './Servicios.vue';

const services = ref(servicesData)

</script>