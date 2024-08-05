<template>
    <div>
        <p>Componente  detalles videos</p>
        <p>autos Rivera Stalin</p>

        <p>{{diferenciaEnDias}} dias atras </p>
    </div>
</template>

<script setup lang="ts">
const {diasPasados, diferenciaEnDias}=useFormateo();
const dataVideo=new Date(2021,9,2)
diasPasados(dataVideo)
</script>

<style></style>