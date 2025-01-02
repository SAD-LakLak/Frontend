export default defineNuxtRouteMiddleware((to, from) => {
  const accessToken = process.client ? localStorage.getItem("auth.access") : null;

  if (!accessToken) {
    return navigateTo("/signIn");
  }
});
