<template>
    <div>

        <h1 class="text-5xl text-center my-4"> Clientes</h1>
        <!-- <div>
            {{ status }}
            <button @click="refresh" class="px-4 py-2 bg-green-400 shadow-md rounded-md"> Recargar</button>
            <div v-if="pending">Cargando...</div>
            <div v-else-if="error">{{ error.message }}</div>
            <div v-else class="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
                <div class="shadow-md px-4 py-2" v-for="c in clientes" :key="c.id">
                    <img :src="c.foto" class=" rounded-full mx-auto" alt="">
                    <h3 class="text-2xl text-center"> {{ c.name }}</h3>
                </div>
            </div>
            <div class="flex gap-2">
                <button v-for="i in 3" :key="n" class="px-2 bg-slate-400" @click="irPagina(i)">
                    {{ i }}
                </button>
            </div>
        </div> -->
    </div>
</template>

<script setup>

const pagina = ref(1);
//const { data: clientes, pending, error, refresh, execute, status } =
// useFetch(`https://reqres.in/api/users?page=${pagina}`, {
//     // lazy: true
//     transform: (clientes) => {
//         return clientes.data.map((p) => ({
//             id: p.id,
//             name: p.first_name,
//             last_name: p.last_name,
//             foto: p.avatar
//         }));
//     },
//     //watch:[pagina],
//     query: {
//         page: pagina
//     }
// });

const { data: cliente } = await useAsyncData('cliente', async () => {
    const [personas, aleatorios] = await Promise.all([
        $fetch("https://reqres.in/api/users"),
        $fetch("https://reqres.in/api/unknow"),
    ])
    return { personas, aleatorios }
})
console.log(cliente.value.personas);
console.log(cliente.value.aleatorios);
const irPagina = (numeroPagina) => {
    pagina.value = numeroPagina;
}
// const requisAsyncData = await useAsyncData("cliente", () => $fetch('https://reqres.in/api/users?page=2'));


</script>
