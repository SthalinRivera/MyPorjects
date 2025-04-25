// middleware/visit.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.server) return; // Solo ejecuta en el cliente

    const userId = useState('userId').value; // Si no tienes auth, puedes dejar esto como null


    console.log('Middleware ejecutado en cliente', to.path);

    const { data, error } = await useFetch('/api/v1/addVisit', {
        method: 'POST',
        body: {
            path: to.path,
            userId,
        },
    });

    if (error.value) {
        console.error('❌ Error al registrar la visita:', error.value);
    } else {
        console.log('✅ Visita registrada exitosamente:', data.value);
    }
});
