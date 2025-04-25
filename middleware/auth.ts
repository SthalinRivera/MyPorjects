const { user } = useUserSession();

export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn } = useUserSession();

  console.log("estas logueados", user.value?.role);

  if (!loggedIn.value) {
    return navigateTo("/login");
  }

  if (to.meta.role && to.meta.role !== user.value?.role) {
    throw createError({
      statusCode: 401,
      message: 'Usted no tiene permiso para acceder a esta ruta ;('
    });

  }
});
