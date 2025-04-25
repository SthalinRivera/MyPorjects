export default defineNuxtRouteMiddleware(() => {
    const { loggedIn, user } = useUserSession()

    if (loggedIn.value) {
        const permiso = user.value?.role
        if (permiso === 'ADMINISTRADOR') {
            return navigateTo('/dashboard')
        } else {
            return navigateTo('/profile')
        }
    }
})
