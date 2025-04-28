// middleware/visit.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.server) return; // Solo ejecuta en el cliente
    const userId = useState('userId').value; // Si no tienes auth, puedes dejar esto como null
    await useFetch('/api/v1/addVisit', {
        method: 'POST',
        body: {
            path: to.path,
            userId,
        },
    });

});
